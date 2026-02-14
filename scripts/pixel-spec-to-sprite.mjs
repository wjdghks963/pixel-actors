#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function usage() {
  console.error("Usage: node scripts/pixel-spec-to-sprite.mjs <spec.json> [--out output.ts]");
}

const args = process.argv.slice(2);
if (args.length === 0) {
  usage();
  process.exit(1);
}

const input = args[0];
const outIndex = args.indexOf("--out");
const outPath = outIndex >= 0 ? args[outIndex + 1] : null;

if (!fs.existsSync(input)) {
  console.error(`Spec file not found: ${input}`);
  process.exit(1);
}

const raw = fs.readFileSync(input, "utf8");
const spec = JSON.parse(raw);

const name = spec.name;
const width = spec.width;
const height = spec.height;
const frames = spec.frames;
const palette = spec.palette || {};

if (!name || typeof name !== "string") {
  throw new Error("spec.name(string) is required");
}
if (!Number.isInteger(width) || width <= 0) {
  throw new Error("spec.width(positive int) is required");
}
if (!Number.isInteger(height) || height <= 0) {
  throw new Error("spec.height(positive int) is required");
}
if (!Array.isArray(frames) || frames.length === 0) {
  throw new Error("spec.frames(non-empty array) is required");
}

for (let i = 0; i < frames.length; i += 1) {
  const frame = frames[i];
  if (!Array.isArray(frame) || frame.length !== height) {
    throw new Error(`frame ${i} must have exactly ${height} rows`);
  }

  for (let y = 0; y < frame.length; y += 1) {
    const row = frame[y];
    if (typeof row !== "string" || row.length !== width) {
      throw new Error(`frame ${i} row ${y} must be string length ${width}`);
    }
  }
}

const unknown = new Set();
for (const frame of frames) {
  for (const row of frame) {
    for (const char of row) {
      if (char === ".") continue;
      if (!palette[char]) unknown.add(char);
    }
  }
}
if (unknown.size > 0) {
  throw new Error(`palette missing colors for: ${Array.from(unknown).join(", ")}`);
}

const safeVar = name
  .replace(/[^a-zA-Z0-9]/g, "")
  .replace(/^[0-9]/, "_$&");

const paletteObj = JSON.stringify(palette, null, 2);
const framesLiteral = frames
  .map((frame) => `  [\n${frame.map((row) => `    "${row}"`).join(",\n")}\n  ]`)
  .join(",\n");

const generated = `import type { Sprite } from "@wjdghks963/pixel-actors-core";
import { createActorComponent } from "@wjdghks963/pixel-actors-react";

const palette = ${paletteObj} as const;

type Pixel = [x: number, y: number, color: string];

function frameFromGrid(rows: string[]): Pixel[] {
  const pixels: Pixel[] = [];

  rows.forEach((row, y) => {
    row.split("").forEach((char, x) => {
      if (char === ".") return;
      const color = palette[char as keyof typeof palette];
      if (color) pixels.push([x, y, color]);
    });
  });

  return pixels;
}

export const ${safeVar}Sprite: Sprite = {
  width: ${width},
  height: ${height},
  frames: [
${framesLiteral}
  ].map(frameFromGrid)
};

export const ${safeVar} = createActorComponent(${safeVar}Sprite, "${safeVar}");
`;

if (outPath) {
  const absOut = path.resolve(outPath);
  fs.mkdirSync(path.dirname(absOut), { recursive: true });
  fs.writeFileSync(absOut, generated, "utf8");
  console.error(`Generated: ${absOut}`);
} else {
  process.stdout.write(generated);
}

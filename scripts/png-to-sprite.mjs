#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { PNG } from "pngjs";

const SYMBOLS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function usage() {
  console.error(`Usage:
  node scripts/png-to-sprite.mjs <input.png> --name <ActorName> [options]

Options:
  --frame-width <n>      Frame width for sprite sheets (default: image width)
  --frame-height <n>     Frame height for sprite sheets (default: image height)
  --max-colors <n>       Palette max colors (default: 24)
  --alpha-threshold <n>  Treat alpha below threshold as transparent (default: 16)
  --out-spec <path>      Output JSON spec path
  --out-ts <path>        Output generated TS actor file path

Examples:
  node scripts/png-to-sprite.mjs ./hero.png --name Hero --out-spec ./hero.spec.json
  node scripts/png-to-sprite.mjs ./sheet.png --name Bat --frame-width 16 --frame-height 16 --out-ts ./Bat.ts`);
}

function getArgValue(args, key, fallback = null) {
  const idx = args.indexOf(key);
  if (idx === -1) return fallback;
  return args[idx + 1] ?? fallback;
}

function toHex(n) {
  return n.toString(16).padStart(2, "0");
}

function rgbToHex(r, g, b) {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16)
  };
}

function colorDistanceSq(a, b) {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return dr * dr + dg * dg + db * db;
}

function nearestColor(hex, palette) {
  const rgb = hexToRgb(hex);
  let best = palette[0];
  let bestDist = Number.POSITIVE_INFINITY;

  for (const candidate of palette) {
    const dist = colorDistanceSq(rgb, hexToRgb(candidate));
    if (dist < bestDist) {
      bestDist = dist;
      best = candidate;
    }
  }

  return best;
}

const args = process.argv.slice(2);
const input = args[0];
if (!input || input.startsWith("--")) {
  usage();
  process.exit(1);
}

const name = getArgValue(args, "--name");
if (!name) {
  console.error("--name is required");
  process.exit(1);
}

const outSpec = getArgValue(args, "--out-spec");
const outTs = getArgValue(args, "--out-ts");
const alphaThreshold = Number.parseInt(getArgValue(args, "--alpha-threshold", "16"), 10);
const maxColors = Number.parseInt(getArgValue(args, "--max-colors", "24"), 10);

const png = PNG.sync.read(fs.readFileSync(input));
const frameWidth = Number.parseInt(getArgValue(args, "--frame-width", String(png.width)), 10);
const frameHeight = Number.parseInt(getArgValue(args, "--frame-height", String(png.height)), 10);

if (png.width % frameWidth !== 0 || png.height % frameHeight !== 0) {
  throw new Error(
    `Invalid frame size: image ${png.width}x${png.height}, frame ${frameWidth}x${frameHeight}`
  );
}

const cols = png.width / frameWidth;
const rows = png.height / frameHeight;
const frameCount = cols * rows;

const rawFrames = [];
const colorFreq = new Map();

for (let frameIndex = 0; frameIndex < frameCount; frameIndex += 1) {
  const fx = frameIndex % cols;
  const fy = Math.floor(frameIndex / cols);
  const frameRows = [];

  for (let y = 0; y < frameHeight; y += 1) {
    let rowText = "";

    for (let x = 0; x < frameWidth; x += 1) {
      const px = fx * frameWidth + x;
      const py = fy * frameHeight + y;
      const idx = (py * png.width + px) * 4;
      const r = png.data[idx];
      const g = png.data[idx + 1];
      const b = png.data[idx + 2];
      const a = png.data[idx + 3];

      if (a < alphaThreshold) {
        rowText += ".";
        continue;
      }

      const hex = rgbToHex(r, g, b);
      rowText += hex;
      colorFreq.set(hex, (colorFreq.get(hex) ?? 0) + 1);
    }

    frameRows.push(rowText);
  }

  rawFrames.push(frameRows);
}

let paletteColors = [...colorFreq.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, maxColors)
  .map(([hex]) => hex);

if (paletteColors.length === 0) {
  throw new Error("No visible pixels found. Check alpha threshold or PNG content.");
}

if (paletteColors.length > SYMBOLS.length) {
  throw new Error(`Too many colors (${paletteColors.length}). Max supported is ${SYMBOLS.length}.`);
}

const paletteMap = new Map();
for (let i = 0; i < paletteColors.length; i += 1) {
  paletteMap.set(paletteColors[i], SYMBOLS[i]);
}

const frames = rawFrames.map((rowsText) =>
  rowsText.map((rowText) => {
    let out = "";
    for (let i = 0; i < rowText.length; i += 7) {
      const token = rowText[i];
      if (token === ".") {
        out += ".";
        i -= 6;
        continue;
      }

      const hex = rowText.slice(i, i + 7);
      const mapped = paletteMap.get(hex) ?? paletteMap.get(nearestColor(hex, paletteColors));
      out += mapped;
    }
    return out;
  })
);

const palette = {};
for (const [hex, symbol] of paletteMap.entries()) {
  palette[symbol] = hex;
}

const spec = {
  name,
  width: frameWidth,
  height: frameHeight,
  palette,
  frames
};

if (outSpec) {
  const abs = path.resolve(outSpec);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, `${JSON.stringify(spec, null, 2)}\n`, "utf8");
  console.error(`Spec written: ${abs}`);
}

if (outTs) {
  const tmpSpec = outSpec
    ? path.resolve(outSpec)
    : path.join(process.cwd(), `.tmp-${Date.now()}-${name}.spec.json`);

  if (!outSpec) {
    fs.writeFileSync(tmpSpec, `${JSON.stringify(spec, null, 2)}\n`, "utf8");
  }

  const gen = spawnSync(
    process.execPath,
    ["scripts/pixel-spec-to-sprite.mjs", tmpSpec, "--out", path.resolve(outTs)],
    { stdio: "inherit" }
  );

  if (!outSpec && fs.existsSync(tmpSpec)) {
    fs.unlinkSync(tmpSpec);
  }

  if (gen.status !== 0) {
    process.exit(gen.status ?? 1);
  }
}

if (!outSpec && !outTs) {
  process.stdout.write(`${JSON.stringify(spec, null, 2)}\n`);
}

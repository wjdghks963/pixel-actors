export type Pixel = [x: number, y: number, color: string];
export type Frame = Pixel[];

export type Sprite = {
  width: number;
  height: number;
  frames: Frame[];
};

export function frameToBoxShadow(frame: Frame): string {
  if (frame.length === 0) {
    return "none";
  }

  return frame
    .map(([x, y, color]) => `${x}px ${y}px ${color}`)
    .join(", ");
}

export function spriteToKeyframes(name: string, sprite: Sprite): string {
  const { frames } = sprite;

  if (frames.length === 0) {
    return `@keyframes ${name} { 0% { box-shadow: none; } 100% { box-shadow: none; } }`;
  }

  const step = 100 / frames.length;
  const body = frames
    .map((frame, index) => {
      const pct = Number((index * step).toFixed(4));
      return `${pct}% { box-shadow: ${frameToBoxShadow(frame)}; }`;
    })
    .join(" ");

  return `@keyframes ${name} { ${body} 100% { box-shadow: ${frameToBoxShadow(frames[0])}; } }`;
}

export function createHash(input: string): string {
  let hash = 5381;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }

  return (hash >>> 0).toString(36);
}

export function clampFps(fps: number, min = 1, max = 30): number {
  if (!Number.isFinite(fps)) {
    return min;
  }

  return Math.min(Math.max(Math.round(fps), min), max);
}

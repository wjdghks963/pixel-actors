"use client";

import {
  clampFps,
  createHash,
  frameToBoxShadow,
  spriteToKeyframes,
  type Sprite
} from "@pixel-actors/core";
import { useEffect, useRef } from "react";
import type { CSSProperties, HTMLAttributes } from "react";
import {
  batSprite,
  bunnyKnightSprite,
  coinSprite,
  dragonSprite,
  fireSprite,
  ghostSprite,
  roboCatSprite,
  slimeMageSprite,
  starSprite
} from "./actors";

type CSSVariables = CSSProperties & Record<`--${string}`, string | number>;

export type MotionPreset = "none" | "float" | "orbit" | "zigzag" | "dash";

export type ActorProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  size?: number;
  fps?: number;
  paused?: boolean;
  flipX?: boolean;
  motion?: MotionPreset;
  motionDuration?: number;
  motionX?: number;
  motionY?: number;
  motionRotate?: number;
};

export type ActorComponent = (props: ActorProps) => JSX.Element;

export type ActorPetProps = {
  Actor: ActorComponent;
  actorProps?: ActorProps;
  areaWidth?: number;
  areaHeight?: number;
  speed?: number;
  wanderJitter?: number;
  padding?: number;
  className?: string;
  style?: CSSProperties;
};

const styleCache = new Set<string>();
const GLOBAL_MOTION_STYLE_ID = "pa-motion-global";
const GLOBAL_MOTION_CSS = `
.pa-motion-none {
  animation: none;
}

.pa-motion-float {
  animation: pa-motion-float var(--pa-motion-duration) ease-in-out infinite;
}

.pa-motion-orbit {
  animation: pa-motion-orbit var(--pa-motion-duration) linear infinite;
}

.pa-motion-zigzag {
  animation: pa-motion-zigzag var(--pa-motion-duration) cubic-bezier(0.37, 0, 0.18, 1) infinite;
}

.pa-motion-dash {
  animation: pa-motion-dash var(--pa-motion-duration) cubic-bezier(0.5, 0, 0.3, 1) infinite;
}

@keyframes pa-motion-float {
  0% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(0, calc(var(--pa-motion-y) * -1)) rotate(calc(var(--pa-motion-rotate) * -1)); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

@keyframes pa-motion-orbit {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(var(--pa-motion-x), calc(var(--pa-motion-y) * -1)) rotate(calc(var(--pa-motion-rotate) * -1)); }
  50% { transform: translate(calc(var(--pa-motion-x) * 0), calc(var(--pa-motion-y) * -2)) rotate(0deg); }
  75% { transform: translate(calc(var(--pa-motion-x) * -1), calc(var(--pa-motion-y) * -1)) rotate(var(--pa-motion-rotate)); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

@keyframes pa-motion-zigzag {
  0% { transform: translate(0, 0); }
  20% { transform: translate(var(--pa-motion-x), calc(var(--pa-motion-y) * -0.5)); }
  40% { transform: translate(calc(var(--pa-motion-x) * -0.7), calc(var(--pa-motion-y) * -1)); }
  60% { transform: translate(var(--pa-motion-x), calc(var(--pa-motion-y) * -1.4)); }
  80% { transform: translate(calc(var(--pa-motion-x) * -0.8), calc(var(--pa-motion-y) * -0.6)); }
  100% { transform: translate(0, 0); }
}

@keyframes pa-motion-dash {
  0% { transform: translate(0, 0) scale(1, 1); }
  35% { transform: translate(var(--pa-motion-x), calc(var(--pa-motion-y) * -0.35)) scale(1.04, 0.96); }
  50% { transform: translate(calc(var(--pa-motion-x) * 1.15), calc(var(--pa-motion-y) * -0.5)) scale(0.98, 1.02); }
  100% { transform: translate(0, 0) scale(1, 1); }
}
`.trim();

function injectStyleOnce(id: string, cssText: string): void {
  if (typeof document === "undefined") {
    return;
  }

  if (styleCache.has(id) || document.getElementById(id)) {
    styleCache.add(id);
    return;
  }

  const style = document.createElement("style");
  style.id = id;
  style.textContent = cssText;
  document.head.appendChild(style);
  styleCache.add(id);
}

export function ActorPet({
  Actor,
  actorProps,
  areaWidth = 420,
  areaHeight = 220,
  speed = 72,
  wanderJitter = 0.38,
  padding = 8,
  className,
  style
}: ActorPetProps) {
  const moverRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const directionTimerRef = useRef(0);
  const posRef = useRef({ x: padding, y: padding });
  const velRef = useRef({ x: speed, y: speed * 0.6 });
  const actorSize = Math.max(24, actorProps?.size ?? 72);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mover = moverRef.current;
    if (!mover) {
      return;
    }

    const maxX = Math.max(padding, areaWidth - actorSize - padding);
    const maxY = Math.max(padding, areaHeight - actorSize - padding);
    posRef.current = { x: Math.min(maxX, padding + 12), y: Math.min(maxY, padding + 12) };
    mover.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;

    const step = (timestamp: number) => {
      if (lastTimeRef.current == null) {
        lastTimeRef.current = timestamp;
      }

      const delta = Math.min(0.05, (timestamp - lastTimeRef.current) / 1000);
      lastTimeRef.current = timestamp;
      directionTimerRef.current += delta;

      if (directionTimerRef.current > 1.1) {
        directionTimerRef.current = 0;
        velRef.current.x += (Math.random() - 0.5) * speed * wanderJitter;
        velRef.current.y += (Math.random() - 0.5) * speed * wanderJitter;
      }

      const velLen = Math.hypot(velRef.current.x, velRef.current.y) || 1;
      const target = speed;
      velRef.current.x = (velRef.current.x / velLen) * target;
      velRef.current.y = (velRef.current.y / velLen) * target;

      posRef.current.x += velRef.current.x * delta;
      posRef.current.y += velRef.current.y * delta;

      if (posRef.current.x <= padding || posRef.current.x >= maxX) {
        velRef.current.x *= -1;
        posRef.current.x = Math.max(padding, Math.min(maxX, posRef.current.x));
      }

      if (posRef.current.y <= padding || posRef.current.y >= maxY) {
        velRef.current.y *= -1;
        posRef.current.y = Math.max(padding, Math.min(maxY, posRef.current.y));
      }

      mover.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      frameRef.current = window.requestAnimationFrame(step);
    };

    frameRef.current = window.requestAnimationFrame(step);

    return () => {
      if (frameRef.current != null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = null;
      lastTimeRef.current = null;
      directionTimerRef.current = 0;
    };
  }, [actorSize, areaHeight, areaWidth, padding, speed, wanderJitter]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: areaWidth,
        height: areaHeight,
        overflow: "hidden",
        ...style
      }}
    >
      <div ref={moverRef} style={{ position: "absolute", left: 0, top: 0, willChange: "transform" }}>
        <Actor {...actorProps} />
      </div>
    </div>
  );
}

export function createActorComponent(sprite: Sprite, displayName: string) {
  const stableSeed = JSON.stringify(sprite);
  const hash = createHash(stableSeed);
  const scopeClass = `pa-${hash}`;
  const keyframesName = `pa-kf-${hash}`;
  const styleId = `pa-style-${hash}`;
  const firstFrameShadow = frameToBoxShadow(sprite.frames[0] ?? []);
  const totalFrames = Math.max(sprite.frames.length, 1);

  const cssText = `
.${scopeClass} {
  position: relative;
  display: inline-block;
  width: calc(${sprite.width}px * var(--pa-scale));
  height: calc(${sprite.height}px * var(--pa-scale));
  line-height: 0;
}

.${scopeClass}::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  height: 1px;
  box-shadow: ${firstFrameShadow};
  transform-origin: 0 0;
  transform: translateX(var(--pa-shift-x)) scaleX(var(--pa-flip-x)) scale(var(--pa-scale));
  animation-name: ${keyframesName};
  animation-duration: var(--pa-duration);
  animation-timing-function: steps(${totalFrames}, end);
  animation-iteration-count: infinite;
  animation-play-state: var(--pa-play-state);
}

${spriteToKeyframes(keyframesName, sprite)}
`.trim();

  const component = ({
    size = 64,
    fps = 12,
    paused = false,
    flipX = false,
    motion = "none",
    motionDuration = 1.2,
    motionX = 10,
    motionY = 8,
    motionRotate = 3,
    className,
    style,
    ...rest
  }: ActorProps) => {
    const safeFps = clampFps(fps);
    const maxEdge = Math.max(sprite.width, sprite.height) || 1;
    const scale = size / maxEdge;
    const durationSeconds = totalFrames / safeFps;

    useEffect(() => {
      injectStyleOnce(styleId, cssText);
      injectStyleOnce(GLOBAL_MOTION_STYLE_ID, GLOBAL_MOTION_CSS);
    }, []);

    const motionClass = `pa-motion-${motion}`;
    const mergedClassName = className
      ? `${scopeClass} ${motionClass} ${className}`
      : `${scopeClass} ${motionClass}`;

    const inlineStyle: CSSVariables = {
      display: "inline-block",
      position: "relative",
      width: `${(sprite.width / maxEdge) * size}px`,
      height: `${(sprite.height / maxEdge) * size}px`,
      "--pa-scale": scale,
      "--pa-duration": `${durationSeconds}s`,
      "--pa-play-state": paused ? "paused" : "running",
      "--pa-flip-x": flipX ? -1 : 1,
      "--pa-shift-x": flipX ? `${sprite.width - 1}px` : "0px",
      "--pa-motion-x": `${motionX}px`,
      "--pa-motion-y": `${motionY}px`,
      "--pa-motion-rotate": `${motionRotate}deg`,
      "--pa-motion-duration": `${Math.max(0.2, motionDuration)}s`,
      ...style
    };

    return <span className={mergedClassName} style={inlineStyle} {...rest} />;
  };

  component.displayName = displayName;

  return component;
}

export const Bat = createActorComponent(batSprite, "Bat");
export const Fire = createActorComponent(fireSprite, "Fire");
export const Coin = createActorComponent(coinSprite, "Coin");
export const Star = createActorComponent(starSprite, "Star");
export const Ghost = createActorComponent(ghostSprite, "Ghost");
export const Dragon = createActorComponent(dragonSprite, "Dragon");
export const BunnyKnight = createActorComponent(bunnyKnightSprite, "BunnyKnight");
export const RoboCat = createActorComponent(roboCatSprite, "RoboCat");
export const SlimeMage = createActorComponent(slimeMageSprite, "SlimeMage");

export {
  batSprite,
  fireSprite,
  coinSprite,
  starSprite,
  ghostSprite,
  dragonSprite,
  bunnyKnightSprite,
  roboCatSprite,
  slimeMageSprite
};
export type { Sprite } from "@pixel-actors/core";

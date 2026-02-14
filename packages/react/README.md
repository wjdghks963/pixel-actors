# @wjdghks963/pixel-actors-react

React pixel animation components for Pixel Actors.

- Live Demo: https://wjdghks963.github.io/pixel-actors/
- GitHub: https://github.com/wjdghks963/pixel-actors
- Full Docs: https://github.com/wjdghks963/pixel-actors#readme

## Install

```bash
npm i @wjdghks963/pixel-actors-react
```

## Basic usage

```tsx
import { Bat } from "@wjdghks963/pixel-actors-react";

export default function Example() {
  return <Bat size={96} fps={12} motion="orbit" />;
}
```

## Autonomous pet mode

```tsx
import { ActorPet, Dragon } from "@wjdghks963/pixel-actors-react";

<ActorPet
  Actor={Dragon}
  areaWidth={640}
  areaHeight={220}
  actorProps={{ size: 84, fps: 16, motion: "none" }}
/>;
```

## Included actors

`Bat`, `Fire`, `Coin`, `Star`, `Ghost`, `Dragon`, `BunnyKnight`, `RoboCat`, `SlimeMage`

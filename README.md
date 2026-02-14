# Pixel Actors

Code-based pixel animation library for React.

- `@wjdghks963/pixel-actors-core`: sprite/frame/keyframes engine
- `@wjdghks963/pixel-actors-react`: ready-to-use actors + React APIs

---

## KO

### 1) 소개

`Pixel Actors`는 PNG 파일을 직접 렌더링하지 않고, 픽셀 데이터를 코드로 정의해 `box-shadow` 기반으로 애니메이션을 그리는 React 라이브러리입니다.

핵심 특징:
- DOM 1개 기반 렌더링(Actor당)
- SSR-safe 스타일 주입
- `size / fps / paused / flipX` 제어
- 모션 프리셋(`float`, `orbit`, `zigzag`, `dash`)
- HTML 영역 내부 자동 배회(`ActorPet`)
- 커스텀 actor 생성 CLI(spec/PNG 지원)

### 2) 설치 및 실행

```bash
npm install
npm run build
npm run dev:demo
```

데모: `http://localhost:3000`

### 3) 기본 사용법

```tsx
import { Bat } from "@wjdghks963/pixel-actors-react";

export default function Example() {
  return <Bat size={96} fps={12} />;
}
```

### 4) Props

#### Actor 공통 Props

| prop | type | default | 설명 |
|---|---|---:|---|
| `size` | `number` | `64` | 최종 표시 크기(px) |
| `fps` | `number` | `12` | 초당 프레임 |
| `paused` | `boolean` | `false` | 애니메이션 일시정지 |
| `flipX` | `boolean` | `false` | 좌우 반전 |
| `motion` | `"none" \| "float" \| "orbit" \| "zigzag" \| "dash"` | `"none"` | 이동 모션 프리셋 |
| `motionDuration` | `number` | `1.2` | 이동 모션 주기(초) |
| `motionX` | `number` | `10` | X축 이동 폭(px) |
| `motionY` | `number` | `8` | Y축 이동 폭(px) |
| `motionRotate` | `number` | `3` | 이동 시 회전 각도(deg) |

#### ActorPet Props

| prop | type | default | 설명 |
|---|---|---:|---|
| `Actor` | `ActorComponent` | - | 배회시킬 actor 컴포넌트 |
| `actorProps` | `ActorProps` | `{}` | 내부 Actor에 전달할 props |
| `areaWidth` | `number` | `420` | 배회 영역 너비 |
| `areaHeight` | `number` | `220` | 배회 영역 높이 |
| `speed` | `number` | `72` | 이동 속도 |
| `wanderJitter` | `number` | `0.38` | 랜덤 방향 변동량 |
| `padding` | `number` | `8` | 벽 충돌 여백 |

### 5) 모션 예시

```tsx
import { Dragon } from "@wjdghks963/pixel-actors-react";

<Dragon
  size={132}
  fps={18}
  motion="zigzag"
  motionDuration={1.1}
  motionX={16}
  motionY={10}
  motionRotate={4}
/>;
```

### 6) 자동 배회(옛날 데스크탑 펫 스타일)

```tsx
import { ActorPet, Dragon } from "@wjdghks963/pixel-actors-react";

<ActorPet
  Actor={Dragon}
  areaWidth={860}
  areaHeight={170}
  speed={88}
  wanderJitter={0.44}
  actorProps={{ size: 88, fps: 16, motion: "none" }}
/>;
```

### 7) 커스텀 Actor (spec -> 코드)

`examples/actor.spec.json` 형식으로 작성 후 변환합니다.

```bash
npm run generate:actor -- ./examples/actor.spec.json --out ./apps/demo-next/app/generated/MyCustomFox.ts
```

생성된 컴포넌트 사용:

```tsx
import { MyCustomFox } from "./generated/MyCustomFox";
```

### 8) PNG -> spec/코드 변환

```bash
# 단일 PNG -> spec
npm run generate:png -- ./assets/fox.png --name Fox --out-spec ./fox.spec.json

# 스프라이트시트 PNG -> TS 코드
npm run generate:png -- ./assets/bat-sheet.png --name BatCustom --frame-width 16 --frame-height 16 --out-ts ./BatCustom.ts
```

옵션:
- `--frame-width`, `--frame-height`: 스프라이트시트 프레임 분할
- `--max-colors`: 팔레트 최대 색상 수
- `--alpha-threshold`: 투명 픽셀 판정 임계값
- `--out-spec`, `--out-ts`: 출력 경로

권장:
- 원본 PNG가 크면 먼저 축소(예: 32x32, 64x64)
- `--max-colors`를 낮춰서 결과를 가볍게 유지

### 9) 현재 제공 Actor

- `Bat`
- `Fire`
- `Coin`
- `Star`
- `Ghost`
- `Dragon`
- `BunnyKnight`
- `RoboCat`
- `SlimeMage`

### 10) 릴리즈 체크리스트 (GitHub / npm)

1. 버전 업데이트 (`packages/*/package.json`)
2. `npm run build` 성공 확인
3. `npm run dev:demo` / `npm run build:demo` 검증
4. README/CHANGELOG 정리
5. Git tag 생성 (`v0.x.x`)
6. publish

```bash
npm publish --access public -w @wjdghks963/pixel-actors-core
npm publish --access public -w @wjdghks963/pixel-actors-react
```

---

## EN

### 1) What it is

`Pixel Actors` is a React library that renders animated pixel sprites from code (not image rendering at runtime), using `box-shadow`-based pixel drawing.

Highlights:
- One DOM node per actor
- SSR-safe style injection
- Actor controls: `size / fps / paused / flipX`
- Motion presets: `float`, `orbit`, `zigzag`, `dash`
- Autonomous wandering mode (`ActorPet`)
- Custom actor generation via spec/PNG CLI

### 2) Setup

```bash
npm install
npm run build
npm run dev:demo
```

Demo: `http://localhost:3000`

### 3) Basic usage

```tsx
import { Bat } from "@wjdghks963/pixel-actors-react";

export default function Example() {
  return <Bat size={96} fps={12} />;
}
```

### 4) Motion usage

```tsx
import { Dragon } from "@wjdghks963/pixel-actors-react";

<Dragon
  size={132}
  fps={18}
  motion="zigzag"
  motionDuration={1.1}
  motionX={16}
  motionY={10}
  motionRotate={4}
/>;
```

### 5) Autonomous pet mode

```tsx
import { ActorPet, Dragon } from "@wjdghks963/pixel-actors-react";

<ActorPet
  Actor={Dragon}
  areaWidth={860}
  areaHeight={170}
  speed={88}
  wanderJitter={0.44}
  actorProps={{ size: 88, fps: 16, motion: "none" }}
/>;
```

### 6) Custom actor from spec

```bash
npm run generate:actor -- ./examples/actor.spec.json --out ./apps/demo-next/app/generated/MyCustomFox.ts
```

Use generated actor:

```tsx
import { MyCustomFox } from "./generated/MyCustomFox";
```

### 7) PNG to spec/code

```bash
# single PNG -> spec
npm run generate:png -- ./assets/fox.png --name Fox --out-spec ./fox.spec.json

# sprite sheet -> TS actor code
npm run generate:png -- ./assets/bat-sheet.png --name BatCustom --frame-width 16 --frame-height 16 --out-ts ./BatCustom.ts
```

Options:
- `--frame-width`, `--frame-height`
- `--max-colors`
- `--alpha-threshold`
- `--out-spec`, `--out-ts`

### 8) Built-in actors

`Bat`, `Fire`, `Coin`, `Star`, `Ghost`, `Dragon`, `BunnyKnight`, `RoboCat`, `SlimeMage`

### 9) Release checklist

1. Update versions in `packages/*/package.json`
2. Verify `npm run build`
3. Validate demo (`npm run dev:demo`, `npm run build:demo`)
4. Update README/CHANGELOG
5. Tag release (`v0.x.x`)
6. Publish

```bash
npm publish --access public -w @wjdghks963/pixel-actors-core
npm publish --access public -w @wjdghks963/pixel-actors-react
```

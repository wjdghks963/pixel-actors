# Pixel Actors 실행 플랜

## 0. 현재 상태 (완료)
- 모노레포 구조 생성: `packages/core`, `packages/react`, `apps/demo-next`
- `@pixel-actors/core`:
  - `Pixel/Frame/Sprite` 타입
  - `frameToBoxShadow`, `spriteToKeyframes`, `createHash`, `clampFps`
- `@pixel-actors/react`:
  - `createActorComponent`
  - SSR-safe 스타일 주입(`useEffect`)
  - 기본 actor 5개(Bat, Fire, Coin, Star, Ghost)
- Next.js 데모:
  - actor import 및 렌더 페이지 구성

## 1. MVP 완료 조건 (v0.1.0)
- `npm install` 후 `npm run dev:demo` 실행 가능
- `npm run build:demo` + `npm run start:demo`에서 hydration mismatch 없음
- 동일 actor를 여러 번 사용해도 style 태그 중복 삽입 없음

## 2. 즉시 실행 순서
1. 의존성 설치
```bash
npm install
```
2. 패키지 빌드
```bash
npm run build
```
3. 데모 개발 서버 실행
```bash
npm run dev:demo
```
4. 프로덕션 검증
```bash
npm run build:demo
npm run start:demo
```

## 3. 배포 준비 체크리스트
- 패키지 버전 확인 (`0.1.0`)
- README 사용 예시/Props 표 정리
- CHANGELOG 작성
- `npm pack --workspaces`로 산출물 확인
- `npm publish --access public -w @pixel-actors/core`
- `npm publish --access public -w @pixel-actors/react`

## 4. 다음 우선 작업
1. 테스트 추가
- `core`: keyframes 생성 스냅샷 테스트
- `react`: style dedupe 및 props 동작 테스트
2. 품질 자동화
- GitHub Actions: typecheck/build/test
3. 수익화 확장 준비
- 무료/Pro actor 분리 전략 및 라이선스 문서화

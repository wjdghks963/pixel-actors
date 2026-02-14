"use client";

import {
  ActorPet,
  Bat,
  BunnyKnight,
  Coin,
  Dragon,
  Fire,
  Ghost,
  RoboCat,
  SlimeMage,
  Star
} from "@pixel-actors/react";
import { Cat } from "./generated/Cat";

export default function HomePage() {
  return (
    <main className="demo-shell">
      <section className="hero">
        <p className="hero-badge">PIXEL ACTORS</p>
        <h1>귀엽게 움직이는 픽셀 친구들</h1>
        <p className="hero-copy">
          PNG 없이 code + box-shadow만으로 만든 애니메이션 actor 10종입니다.
        </p>
      </section>

      <section className="pet-zone">
        <h2>Autonomous Pet Mode</h2>
        <p>HTML 영역 안에서 actor가 스스로 돌아다니는 모드입니다.</p>
        <ActorPet
          Actor={Dragon}
          areaWidth={860}
          areaHeight={170}
          speed={88}
          wanderJitter={0.44}
          className="pet-arena"
          style={{ width: "100%", maxWidth: 860 }}
          actorProps={{
            size: 88,
            fps: 16,
            motion: "none"
          }}
        />
      </section>

      <section className="actor-grid">
        <article className="actor-card">
          <div className="actor-meta">
            <h2>Bat</h2>
            <span>4 frames</span>
          </div>
          <div className="actor-stage">
            <Bat size={96} fps={12} motion="orbit" motionDuration={1.4} motionX={9} motionY={6} />
          </div>
        </article>

        <article className="actor-card">
          <div className="actor-meta">
            <h2>Fire</h2>
            <span>4 frames</span>
          </div>
          <div className="actor-stage">
            <Fire size={96} fps={12} motion="float" motionDuration={0.9} motionY={10} />
          </div>
        </article>

        <article className="actor-card">
          <div className="actor-meta">
            <h2>Coin</h2>
            <span>6 frames</span>
          </div>
          <div className="actor-stage">
            <Coin size={96} fps={14} motion="dash" motionDuration={1.1} motionX={12} motionY={5} />
          </div>
        </article>

        <article className="actor-card">
          <div className="actor-meta">
            <h2>Star</h2>
            <span>2 frames</span>
          </div>
          <div className="actor-stage">
            <Star size={96} fps={6} />
          </div>
        </article>

        <article className="actor-card">
          <div className="actor-meta">
            <h2>Ghost</h2>
            <span>4 frames</span>
          </div>
          <div className="actor-stage">
            <Ghost
              size={96}
              fps={10}
              flipX
              motion="zigzag"
              motionDuration={1.5}
              motionX={10}
              motionY={8}
            />
          </div>
        </article>

        <article className="actor-card">
          <div className="actor-meta">
            <h2>Dragon</h2>
            <span>8 frames / turbo</span>
          </div>
          <div className="actor-stage dragon-stage">
            <Dragon
              size={132}
              fps={18}
              motion="zigzag"
              motionDuration={1.1}
              motionX={16}
              motionY={10}
              motionRotate={4}
            />
            <span className="dragon-flame" aria-hidden />
          </div>
        </article>

        <article className="actor-card">
          <div className="actor-meta">
            <h2>BunnyKnight</h2>
            <span>6 frames</span>
          </div>
          <div className="actor-stage">
            <BunnyKnight size={118} fps={12} motion="dash" motionDuration={1.2} motionX={10} motionY={7} />
          </div>
        </article>

        <article className="actor-card">
          <div className="actor-meta">
            <h2>RoboCat</h2>
            <span>6 frames</span>
          </div>
          <div className="actor-stage">
            <RoboCat size={118} fps={12} motion="orbit" motionDuration={1.6} motionX={8} motionY={6} />
          </div>
        </article>

        <article className="actor-card">
          <div className="actor-meta">
            <h2>SlimeMage</h2>
            <span>6 frames</span>
          </div>
          <div className="actor-stage">
            <SlimeMage size={118} fps={10} motion="float" motionDuration={1.05} motionY={9} />
          </div>
        </article>

        <article className="actor-card">
          <div className="actor-meta">
            <h2>Cat (From PNG)</h2>
            <span>1 frame</span>
          </div>
          <div className="actor-stage">
            <Cat size={126} fps={1} motion="none" />
          </div>
        </article>
      </section>
    </main>
  );
}

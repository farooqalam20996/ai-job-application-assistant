// ParticlesBackground.jsx
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const options = {
    background: { color: { value: "#f6f9fc" } },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" } },
      modes: { repulse: { distance: 100 } },
    },
    particles: {
      color: { value: "#6c8cff" },
      links: { enable: true, color: "#cfdcff", distance: 140, opacity: 0.2, width: 1 },
      move: { enable: true, speed: 0.8 },
      number: { value: 35, density: { enable: true, area: 800 } },
      opacity: { value: 0.6 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 4 } },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    />
  );
}

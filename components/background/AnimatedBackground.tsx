'use client';

import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '@/context/portfolio-context';

// ==========================================
// CONSTANTS & VOCABULARIES
// ==========================================
const MATRIX_DOMAIN_TOKENS = [
  // C# / .NET
  'public', 'class', 'DbContext', 'async', 'await', 'Task<int>', 'DbSet',
  'Where', 'OrderBy', 'Select', 'Parallel', 'ToList', 'Guid', 'var',
  'Func', 'Action', 'try', 'catch', 'throw', 'new', 'override',
  // Python / ML / Big Data
  'def', 'import', 'pd', 'np', 'SMOTE', 'CatBoost', 'fit_resample',
  'X_train', 'y_train', 'f1_score', 'confusion_matrix', 'DataFrame', 'groupby',
  'mean', 'lambda', 'return', 'yield', 'True', 'False', 'None',
  // SQL / Relational
  'SELECT', 'FROM', 'WHERE', 'INNER', 'JOIN', 'GROUP', 'BY', 'HAVING',
  'ORDER', 'COUNT', 'AVG', 'WITH', 'OVER', 'PARTITION', 'INDEX',
  'CREATE', 'TABLE', 'DESC', 'ASC', 'TOP', 'DISTINCT', 'NOLOCK',
  // Syntax & Operators
  '=>', '{ }', '[ ]', '::', '0x1F', '0101', '&&', '||', '!=', '==', ';',
];

const GOTHIC_RUNES = [
  '0xDEAD', '0xBEEF', '0x7F', '◈', '◇', '⬡', '†', '‡', '∑', '0x00',
  'CRIMSON', '0x89', 'VALHALLA', 'V-NULL', '0xFA', '0x13',
];

const QUANTUM_LABELS = [
  '|ψ⟩ = α|0⟩ + β|1⟩',
  'Q-CORE: 4.8GHz',
  'ENTANGLED',
  'HADAMARD',
  'FIDELITY: 99.8%',
  '0x4F_SUPERPOS',
];

interface QuantumNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  pulseSpeed: number;
  label?: string;
}

interface QuantumRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  alpha: number;
}

interface Ember {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swaySpeed: number;
  swayDistance: number;
  opacity: number;
  baseX: number;
  seed: number;
  isRune: boolean;
  runeGlyph: string;
  color: string;
}

interface MouseState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  active: boolean;
}

export function AnimatedBackground() {
  const { theme, animationsEnabled } = usePortfolio();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse: MouseState = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // If animations are paused, clear canvas and exit early
    if (!animationsEnabled) {
      ctx.clearRect(0, 0, width, height);
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      };
    }

    const isMobile = width < 768;

    // 1. Matrix State
    const fontSize = isMobile ? 12 : 13;
    const columnSpacing = isMobile ? 22 : 26;
    const columns = Math.floor(width / columnSpacing);
    const matrixDrops: number[] = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * -60)
    );
    const matrixTokens: string[] = Array.from({ length: columns }, () =>
      MATRIX_DOMAIN_TOKENS[Math.floor(Math.random() * MATRIX_DOMAIN_TOKENS.length)]
    );

    // 2. Quantum State
    const quantumCount = isMobile ? 32 : 56;
    const maxLinkDist = isMobile ? 95 : 135;
    const quantumNodes: QuantumNode[] = Array.from({ length: quantumCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.6 + 1.2,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.03 + 0.02,
      label: i % 9 === 0 ? QUANTUM_LABELS[(i / 9) % QUANTUM_LABELS.length] : undefined,
    }));
    const quantumRipples: QuantumRipple[] = [];
    let lastRippleTime = 0;

    // 3. Gothic State
    const emberCount = isMobile ? 42 : 72;
    const embers: Ember[] = Array.from({ length: emberCount }, (_, i) => {
      const isRune = i % 7 === 0;
      return {
        x: Math.random() * width,
        y: height + Math.random() * 90,
        size: isRune ? (isMobile ? 10 : 12) : Math.random() * 2.4 + 1,
        speedY: Math.random() * 0.75 + 0.35,
        swaySpeed: Math.random() * 0.02 + 0.012,
        swayDistance: Math.random() * 24 + 10,
        opacity: Math.random() * 0.7 + 0.3,
        baseX: Math.random() * width,
        seed: Math.random() * 100,
        isRune,
        runeGlyph: GOTHIC_RUNES[Math.floor(Math.random() * GOTHIC_RUNES.length)],
        color: Math.random() > 0.4 ? '#ff1f5a' : Math.random() > 0.5 ? '#fb7185' : '#e11d48',
      };
    });

    let lastDrawTime = 0;
    const fpsLimit = isMobile ? 30 : 50;
    const frameInterval = 1000 / fpsLimit;

    // --- ENGINE 1: MATRIX CYBER ---
    const renderMatrixCyber = () => {
      ctx.fillStyle = 'rgba(4, 9, 6, 0.11)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "Courier New", monospace`;

      for (let i = 0; i < matrixDrops.length; i++) {
        const x = i * columnSpacing;
        const y = matrixDrops[i] * (fontSize + 4);

        if (matrixDrops[i] % 4 === 0 || Math.random() > 0.88) {
          matrixTokens[i] =
            MATRIX_DOMAIN_TOKENS[Math.floor(Math.random() * MATRIX_DOMAIN_TOKENS.length)];
        }
        const token = matrixTokens[i];

        if (Math.random() > 0.85) {
          ctx.fillStyle = '#f0fdf4';
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#00ff66';
          ctx.fillText(token, x, y);
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = 'rgba(0, 255, 102, 0.42)';
          ctx.fillText(token, x, y);
        }

        if (y > height && Math.random() > 0.98) {
          matrixDrops[i] = 0;
        }
        matrixDrops[i]++;
      }
    };

    // --- ENGINE 2: QUANTUM ---
    const renderQuantum = (currentTime: number) => {
      ctx.clearRect(0, 0, width, height);

      // Quantum ripples
      if (currentTime - lastRippleTime > 5500) {
        quantumRipples.push({
          x: mouse.active ? mouse.x : width / 2 + Math.sin(currentTime * 0.001) * 150,
          y: mouse.active ? mouse.y : height / 2 + Math.cos(currentTime * 0.001) * 100,
          radius: 5,
          maxRadius: Math.max(width, height) * 0.65,
          speed: isMobile ? 2.4 : 3.2,
          alpha: 0.35,
        });
        lastRippleTime = currentTime;
      }

      for (let r = quantumRipples.length - 1; r >= 0; r--) {
        const rip = quantumRipples[r];
        rip.radius += rip.speed;
        rip.alpha *= 0.986;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${rip.alpha * 0.45})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (rip.radius >= rip.maxRadius || rip.alpha <= 0.015) {
          quantumRipples.splice(r, 1);
        }
      }

      // Quantum nodes & links
      for (let i = 0; i < quantumNodes.length; i++) {
        const node = quantumNodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.pulsePhase += node.pulseSpeed;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const dxMouse = mouse.x - node.x;
        const dyMouse = mouse.y - node.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse > 0.001 && distMouse < 160 && mouse.active) {
          const force = (1 - distMouse / 160) * 0.55;
          node.x += (dxMouse / distMouse) * force;
          node.y += (dyMouse / distMouse) * force;
        }

        // Outer aura ring
        const auraRadius = node.radius + Math.sin(node.pulsePhase) * 1.8 + 1.4;
        ctx.beginPath();
        ctx.arc(node.x, node.y, auraRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.28)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#00f0ff';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node labels
        if (node.label && !isMobile) {
          ctx.font = '9px monospace';
          ctx.fillStyle = 'rgba(186, 230, 253, 0.65)';
          ctx.fillText(node.label, node.x + 8, node.y - 4);
        }

        // Inter-node laser links
        for (let j = i + 1; j < quantumNodes.length; j++) {
          const node2 = quantumNodes[j];
          const dx = node.x - node2.x;
          const dy = node.y - node2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxLinkDist) {
            const alpha = (1 - dist / maxLinkDist) * 0.38;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = alpha > 0.22 ? 1.0 : 0.6;
            ctx.stroke();

            // Energy packets
            if ((i + j) % 4 === 0) {
              const packetProgress = (currentTime * 0.0008 + i * 0.25) % 1;
              const px = node.x + (node2.x - node.x) * packetProgress;
              const py = node.y + (node2.y - node.y) * packetProgress;
              ctx.beginPath();
              ctx.arc(px, py, 1.3, 0, Math.PI * 2);
              ctx.fillStyle = '#ffffff';
              ctx.shadowBlur = 4;
              ctx.shadowColor = '#00f0ff';
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }
      }
    };

    // --- ENGINE 3: GOTHIC ---
    const renderGothic = (currentTime: number) => {
      ctx.clearRect(0, 0, width, height);

      // Warm obsidian-ruby hearth glow
      const breathe = Math.sin(currentTime * 0.0015) * 0.03 + 0.18;
      const hearthGlow = ctx.createRadialGradient(
        width / 2,
        height + 50,
        20,
        width / 2,
        height,
        height * 0.58
      );
      hearthGlow.addColorStop(0, `rgba(255, 31, 90, ${breathe})`);
      hearthGlow.addColorStop(0.55, 'rgba(225, 29, 72, 0.06)');
      hearthGlow.addColorStop(1, 'rgba(9, 5, 12, 0)');
      ctx.fillStyle = hearthGlow;
      ctx.fillRect(0, 0, width, height);

      // Embers & Runes
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y -= e.speedY;
        e.seed += e.swaySpeed;
        e.x = e.baseX + Math.sin(e.seed) * e.swayDistance;

        const dxMouse = mouse.x - e.x;
        const dyMouse = mouse.y - e.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse > 0.001 && distMouse < 130 && mouse.active) {
          const push = (1 - distMouse / 130) * 1.2;
          e.x -= (dxMouse / distMouse) * push * 2.2;
          e.y -= (dyMouse / distMouse) * push * 1.5;
        }

        if (e.y < -20) {
          e.y = height + Math.random() * 40;
          e.baseX = Math.random() * width;
          e.x = e.baseX;
          e.opacity = Math.random() * 0.7 + 0.3;
          e.seed = Math.random() * 100;
        }

        if (e.isRune) {
          ctx.font = `${e.size}px monospace`;
          ctx.fillStyle = `rgba(255, 113, 142, ${e.opacity * 0.8})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#ff1f5a';
          ctx.fillText(e.runeGlyph, e.x, e.y);
          ctx.shadowBlur = 0;
        } else {
          // Dual-layer glowing fiery ember
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.size * 1.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 31, 90, ${e.opacity * 0.32})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(e.x, e.y, e.size * 0.75, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 241, 242, ${e.opacity * 0.9})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = e.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Micro-spark arcs
        if (i % 5 === 0 && i + 1 < embers.length) {
          const eNext = embers[i + 1];
          const distEmbers = Math.hypot(e.x - eNext.x, e.y - eNext.y);
          if (distEmbers < 58) {
            ctx.beginPath();
            ctx.moveTo(e.x, e.y);
            ctx.lineTo(eNext.x, eNext.y);
            ctx.strokeStyle = `rgba(255, 42, 95, ${0.35 * (1 - distEmbers / 58)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    // Render loop
    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);

      const elapsed = currentTime - lastDrawTime;
      if (elapsed < frameInterval) return;
      lastDrawTime = currentTime - (elapsed % frameInterval);

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      if (theme === 'matrix') {
        renderMatrixCyber();
      } else if (theme === 'quantum') {
        renderQuantum(currentTime);
      } else if (theme === 'gothic') {
        renderGothic(currentTime);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme, animationsEnabled]);

  const canvasOpacity =
    theme === 'matrix' ? 'opacity-40 sm:opacity-50' : 'opacity-60 sm:opacity-70';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full block ${canvasOpacity} transition-opacity duration-500`}
      />
      <div className="absolute inset-0 tech-grid-overlay opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[rgba(0,0,0,0.40)] to-[rgba(0,0,0,0.88)] pointer-events-none" />
    </div>
  );
}

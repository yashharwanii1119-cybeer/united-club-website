import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * InteractiveBackground:
 * Handcrafted Paper-Style Motion Illustration for UNITED CLUB.
 *
 * CONCEPT:
 * - A powerful, muscular cartoon male athlete seated in an inclined commercial 45° LEG PRESS MACHINE.
 * - Handcrafted cut-paper aesthetic: layered cardstock silhouettes, subtle paper shadows (drop shadows),
 *   folded-edge seams, stylized anatomical cut-outs, and geometric gym architecture.
 * - Kinematic Leg Press Movement:
 *   * Starting Position: Knees deeply bent toward chest, carriage close to torso.
 *   * Push Phase (Scroll Down): Quads and glutes contract, knees extend along the 45° guide rails,
 *     pushing the heavy footplate loaded with Olympic weight plates away.
 *   * Lockout & Return (Scroll Up): Smoothly glides back to starting position in reverse.
 * - 100% Scroll-Controlled:
 *   * When idle: Completely frozen on the exact frame. 0 CPU/GPU idle draw loops.
 *   * Updates ONLY when scroll progress changes.
 * - United Club Brand Palette:
 *   * Layer 1 (Base Navy Paper): #040D1A / #07162C
 *   * Layer 2 (Machine & Chassis Paper): #0C2344 / #153B6E
 *   * Layer 3 (Royal Blue Cut-Outs & Accent Panels): #1D63D8 / #2563EB
 *   * Layer 4 (Athlete Muscular Paper Cut-Outs): #D7E1F0 / #F4F7FC with deep Navy shade layers
 *   * Layer 5 (Gold Highlights & Pins): #F2C14E
 */

const lerp = (a, b, t) => a + (b - a) * t;

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const statusRef = useRef(null);
  const pctRef = useRef(null);
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const animFrameIdRef = useRef(null);
  const isRunningRef = useRef(false);

  const drawPaperScene = useCallback((progress) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const p = Math.max(0, Math.min(1, progress));

    // Clear canvas
    ctx.clearRect(0, 0, w, h);

    // Responsive composition anchoring:
    // On desktop: positioned on the right (w * 0.65) so left text is unobstructed.
    // On tablet (768px - 1024px): w * 0.58, scale 0.88.
    // On mobile (< 768px): w * 0.52 (centered-right), scale adjusted to fit mobile screen without clipping,
    // and vertically offset slightly so it sits behind cards with an optimal subtle contrast.
    const isDesktop = w >= 1024;
    const isTablet = w >= 768 && w < 1024;
    const isSmallMobile = w < 480;

    let originX, originY, scale;
    if (isDesktop) {
      originX = w * 0.66;
      originY = h * 0.52;
      scale = Math.min(w, h) * 1.08;
    } else if (isTablet) {
      originX = w * 0.58;
      originY = h * 0.50;
      scale = Math.min(w, h) * 0.94;
    } else {
      originX = isSmallMobile ? w * 0.54 : w * 0.52;
      originY = h * 0.48;
      scale = Math.min(w * 0.96, h * 0.70);
    }

    // Kinetic calculation of leg press extension:
    // Uses a cyclic easing mapped to scroll progress so the user sees continuous complete reps
    // across the page journey, or a progressive deep press stroke.
    // Let's create a dynamic stroke curve: 0 -> full push -> return -> full push!
    // A sine-wave rep profile across 0.0 to 1.0 (approx 2.5 full, deep, heavy reps across the page)
    const repPhase = (p * Math.PI * 5) % (Math.PI * 2);
    // Smooth extension factor between 0.0 (compressed knees) and 1.0 (full 45° leg extension)
    const extension = (1 - Math.cos(repPhase)) * 0.5;

    // Optimized paper polygon rendering:
    // To achieve zero-lag 60/120fps scrolling, we avoid ctx.shadowBlur which triggers an expensive
    // software Gaussian blur filter pass on every draw call.
    // Instead, cut-paper drop shadow is simulated using an offset paper silhouette fill (dark cutout layer),
    // which is the authentic art technique for cut-paper layering and executes via hardware acceleration.
    const drawPaperPoly = (points, fillColor, strokeColor = null, lineWidth = 0, shadowBlur = 10, shadowOffset = 6) => {
      if (points.length < 3) return;

      // Authentic cut-paper silhouette drop shadow (zero blur GPU fill)
      if (shadowOffset > 0) {
        ctx.beginPath();
        const offX = shadowOffset * 0.6;
        const offY = shadowOffset;
        ctx.moveTo(points[0][0] + offX, points[0][1] + offY);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i][0] + offX, points[i][1] + offY);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(1, 4, 10, 0.68)';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
      }
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();

      // Paper cut outline
      if (strokeColor && lineWidth > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    };

    // Helper: Draw a paper cut circle (with fast offset cutout shadow)
    const drawPaperCircle = (cx, cy, r, fillColor, strokeColor = null, lineWidth = 0, shadowBlur = 8) => {
      if (shadowBlur > 0) {
        ctx.beginPath();
        ctx.arc(cx + 2.5, cy + 4, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(1, 4, 10, 0.60)';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = fillColor;
      ctx.fill();

      if (strokeColor && lineWidth > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    };

    // Helper: Paper fold line (crease)
    const drawPaperCrease = (x1, y1, x2, y2, isHighlight = false) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = isHighlight ? 'rgba(244, 247, 252, 0.28)' : 'rgba(2, 7, 16, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    };

    // =========================================================================
    // LAYER 1: COMPLETE IMMERSIVE PAPER-ART GYM ENVIRONMENT
    // Crafted with layered cut-paper cardstock, industrial architecture, and authentic strength equipment.
    // Enhanced with subtle scroll-reactive parallax depth offsets!
    // =========================================================================
    
    // Parallax displacements based on scroll progress (p):
    // Distant background moves very slowly, midground responds moderately, foreground framing glides snappily
    const bgParallaxX = (p - 0.5) * scale * 0.06;
    const midParallaxX = (p - 0.5) * scale * 0.12;

    const wallLeft = originX - scale * 0.72 + bgParallaxX;
    const wallRight = originX + scale * 0.70 + bgParallaxX;
    const wallTop = originY - scale * 0.52;
    const wallBottom = originY + scale * 0.52;

    // A. INDUSTRIAL CEILING BEAMS & HVAC DUCT PAPER CUT-OUTS (Distant Ceiling Architecture)
    // Horizontal steel I-beam girder running across top gym ceiling
    drawPaperPoly(
      [
        [wallLeft - scale * 0.15, wallTop - scale * 0.04],
        [wallRight + scale * 0.15, wallTop - scale * 0.04],
        [wallRight + scale * 0.15, wallTop + scale * 0.035],
        [wallLeft - scale * 0.15, wallTop + scale * 0.035],
      ],
      '#061325',
      'rgba(29, 99, 216, 0.3)',
      1.5,
      8,
      4
    );
    // Lower flange of the I-beam
    drawPaperPoly(
      [
        [wallLeft - scale * 0.15, wallTop + scale * 0.025],
        [wallRight + scale * 0.15, wallTop + scale * 0.025],
        [wallRight + scale * 0.15, wallTop + scale * 0.045],
        [wallLeft - scale * 0.15, wallTop + scale * 0.045],
      ],
      '#091D38',
      'rgba(244, 247, 252, 0.15)',
      1,
      6,
      3
    );
    // Industrial pendant track spotlight cans hanging from ceiling
    for (let lightIdx = 0; lightIdx < 3; lightIdx++) {
      const lx = wallLeft + scale * 0.28 + lightIdx * (scale * 0.38);
      // Pendant stem wire
      drawPaperPoly(
        [
          [lx - 1.5, wallTop + scale * 0.045],
          [lx + 1.5, wallTop + scale * 0.045],
          [lx + 1.5, wallTop + scale * 0.10],
          [lx - 1.5, wallTop + scale * 0.10],
        ],
        '#081B34',
        null,
        0,
        0,
        0
      );
      // Lamp shade cone (angled paper trapezoid)
      drawPaperPoly(
        [
          [lx - scale * 0.022, wallTop + scale * 0.10],
          [lx + scale * 0.022, wallTop + scale * 0.10],
          [lx + scale * 0.035, wallTop + scale * 0.13],
          [lx - scale * 0.035, wallTop + scale * 0.13],
        ],
        '#0D294E',
        'rgba(242, 193, 78, 0.4)',
        1,
        6,
        3
      );
      // Subtle cone light glow on the gym floor/wall
      ctx.save();
      const glowGrad = ctx.createRadialGradient(lx, wallTop + scale * 0.13, 2, lx, wallTop + scale * 0.24, scale * 0.15);
      glowGrad.addColorStop(0, 'rgba(242, 193, 78, 0.08)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(lx, wallTop + scale * 0.18, scale * 0.14, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // B. DISTANT GYM WALL PANELS & INDUSTRIAL ARCHITECTURAL CUT-OUTS
    drawPaperPoly(
      [
        [wallLeft + scale * 0.08, wallTop + scale * 0.04],
        [wallRight - scale * 0.02, wallTop + scale * 0.04],
        [wallRight + scale * 0.08, wallBottom - scale * 0.08],
        [wallLeft - scale * 0.04, wallBottom],
      ],
      '#07162C',
      'rgba(29, 99, 216, 0.22)',
      1.5,
      12,
      6
    );

    // Architectural diagonal slats / acoustic gym louvers
    for (let s = 0; s < 7; s++) {
      const sx = wallLeft + scale * 0.08 + s * (scale * 0.14);
      drawPaperPoly(
        [
          [sx, wallTop + scale * 0.06],
          [sx + scale * 0.08, wallTop + scale * 0.06],
          [sx + scale * 0.03, wallBottom - scale * 0.08],
          [sx - scale * 0.05, wallBottom - scale * 0.08],
        ],
        s % 2 === 0 ? 'rgba(12, 35, 68, 0.45)' : 'rgba(17, 48, 92, 0.35)',
        'rgba(29, 99, 216, 0.14)',
        1,
        4,
        2
      );
    }

    // C. FULL-LENGTH GYM MIRROR REFLECTION WALL (Deep Background Behind Racks)
    const mirrorLeft = wallLeft + scale * 0.12;
    const mirrorRight = wallLeft + scale * 0.58;
    const mirrorTop = wallTop + scale * 0.12;
    const mirrorBottom = originY + scale * 0.34;
    // Mirror glass panel with crisp bevel borders
    drawPaperPoly(
      [
        [mirrorLeft, mirrorTop],
        [mirrorRight, mirrorTop],
        [mirrorRight, mirrorBottom],
        [mirrorLeft, mirrorBottom],
      ],
      '#081D3B',
      'rgba(244, 247, 252, 0.25)',
      2,
      10,
      5
    );
    // Mirror glass reflection diagonal streaks (paper creases)
    drawPaperCrease(mirrorLeft + scale * 0.05, mirrorTop + scale * 0.02, mirrorLeft + scale * 0.22, mirrorBottom - scale * 0.02, true);
    drawPaperCrease(mirrorLeft + scale * 0.18, mirrorTop + scale * 0.02, mirrorLeft + scale * 0.35, mirrorBottom - scale * 0.02, true);

    // D. DUAL OLYMPIC POWER SQUAT RACK SILHOUETTE (Midground Left, Behind Athlete)
    // Sits in midground parallax layer
    const rackX = wallLeft + scale * 0.18 + midParallaxX;
    const rackY = originY + scale * 0.34;
    const rackH = scale * 0.38;
    const rackW = scale * 0.24;

    // Upright steel posts (Left & Right vertical columns)
    drawPaperPoly(
      [
        [rackX, rackY - rackH],
        [rackX + scale * 0.022, rackY - rackH],
        [rackX + scale * 0.022, rackY],
        [rackX, rackY],
      ],
      '#0C2548',
      'rgba(29, 99, 216, 0.5)',
      1.5,
      8,
      4
    );
    drawPaperPoly(
      [
        [rackX + rackW, rackY - rackH],
        [rackX + rackW + scale * 0.022, rackY - rackH],
        [rackX + rackW + scale * 0.022, rackY],
        [rackX + rackW, rackY],
      ],
      '#0C2548',
      'rgba(29, 99, 216, 0.5)',
      1.5,
      8,
      4
    );
    // Rack Upper Crossmember with Chin-Up Bar
    drawPaperPoly(
      [
        [rackX - scale * 0.01, rackY - rackH + scale * 0.01],
        [rackX + rackW + scale * 0.03, rackY - rackH + scale * 0.01],
        [rackX + rackW + scale * 0.03, rackY - rackH + scale * 0.032],
        [rackX - scale * 0.01, rackY - rackH + scale * 0.032],
      ],
      '#133766',
      'rgba(244, 247, 252, 0.35)',
      1.5,
      6,
      3
    );
    // Safety spotter arms on squat rack
    drawPaperPoly(
      [
        [rackX - scale * 0.02, rackY - rackH * 0.45],
        [rackX + rackW + scale * 0.04, rackY - rackH * 0.45],
        [rackX + rackW + scale * 0.04, rackY - rackH * 0.45 + scale * 0.018],
        [rackX - scale * 0.02, rackY - rackH * 0.45 + scale * 0.018],
      ],
      '#1D63D8',
      'rgba(242, 193, 78, 0.5)',
      1,
      6,
      3
    );
    // Olympic Barbell resting on the J-hooks inside the rack
    drawPaperPoly(
      [
        [rackX - scale * 0.08, rackY - rackH * 0.62],
        [rackX + rackW + scale * 0.10, rackY - rackH * 0.62],
        [rackX + rackW + scale * 0.10, rackY - rackH * 0.62 + scale * 0.012],
        [rackX - scale * 0.08, rackY - rackH * 0.62 + scale * 0.012],
      ],
      '#D7E1F0',
      '#040D1A',
      1,
      6,
      3
    );
    // Olympic Weight Plates loaded on the rack barbell ends
    drawPaperPoly(
      [
        [rackX - scale * 0.075, rackY - rackH * 0.62 - scale * 0.04],
        [rackX - scale * 0.065, rackY - rackH * 0.62 - scale * 0.04],
        [rackX - scale * 0.065, rackY - rackH * 0.62 + scale * 0.052],
        [rackX - scale * 0.075, rackY - rackH * 0.62 + scale * 0.052],
      ],
      '#1D63D8',
      '#040D1A',
      1.5,
      6,
      3
    );
    drawPaperPoly(
      [
        [rackX + rackW + scale * 0.085, rackY - rackH * 0.62 - scale * 0.04],
        [rackX + rackW + scale * 0.095, rackY - rackH * 0.62 - scale * 0.04],
        [rackX + rackW + scale * 0.095, rackY - rackH * 0.62 + scale * 0.052],
        [rackX + rackW + scale * 0.085, rackY - rackH * 0.62 + scale * 0.052],
      ],
      '#1D63D8',
      '#040D1A',
      1.5,
      6,
      3
    );

    // E. MULTI-TIER PRO-STYLE DUMBBELL RACK WITH CAST-IRON DUMBBELLS (Midground Deep Left)
    const dbRackX = wallLeft + scale * 0.44 + midParallaxX;
    const dbRackY = originY + scale * 0.35;
    const dbTierW = scale * 0.22;
    // Lower Shelf
    drawPaperPoly(
      [
        [dbRackX, dbRackY],
        [dbRackX + dbTierW, dbRackY - scale * 0.025],
        [dbRackX + dbTierW + scale * 0.01, dbRackY - scale * 0.015],
        [dbRackX, dbRackY + scale * 0.012],
      ],
      '#0C2344',
      'rgba(29, 99, 216, 0.4)',
      1,
      6,
      3
    );
    // Upper Shelf
    drawPaperPoly(
      [
        [dbRackX + scale * 0.015, dbRackY - scale * 0.055],
        [dbRackX + dbTierW + scale * 0.015, dbRackY - scale * 0.08],
        [dbRackX + dbTierW + scale * 0.025, dbRackY - scale * 0.07],
        [dbRackX + scale * 0.015, dbRackY - scale * 0.045],
      ],
      '#0C2344',
      'rgba(29, 99, 216, 0.4)',
      1,
      6,
      3
    );
    // Dumbbells lined up in neat ascending paper-cut pairs
    for (let db = 0; db < 4; db++) {
      const dbX = dbRackX + scale * 0.03 + db * (scale * 0.046);
      const dbY = dbRackY - scale * 0.058 - db * (scale * 0.005);
      // Dumbbell handle bar
      drawPaperPoly(
        [
          [dbX - scale * 0.004, dbY - scale * 0.014],
          [dbX + scale * 0.004, dbY - scale * 0.014],
          [dbX + scale * 0.004, dbY + scale * 0.014],
          [dbX - scale * 0.004, dbY + scale * 0.014],
        ],
        '#D7E1F0',
        null,
        0,
        0,
        0
      );
      // Top plate head
      drawPaperPoly(
        [
          [dbX - scale * 0.012, dbY - scale * 0.020],
          [dbX + scale * 0.012, dbY - scale * 0.020],
          [dbX + scale * 0.012, dbY - scale * 0.012],
          [dbX - scale * 0.012, dbY - scale * 0.012],
        ],
        '#051122',
        '#1D63D8',
        1,
        4,
        2
      );
      // Bottom plate head
      drawPaperPoly(
        [
          [dbX - scale * 0.012, dbY + scale * 0.012],
          [dbX + scale * 0.012, dbY + scale * 0.012],
          [dbX + scale * 0.012, dbY + scale * 0.020],
          [dbX - scale * 0.012, dbY + scale * 0.020],
        ],
        '#051122',
        '#1D63D8',
        1,
        4,
        2
      );
    }

    // F. INCLINED ADJUSTABLE WORKOUT BENCH (Midground near Dumbbell Rack)
    const benchX = wallLeft + scale * 0.36 + midParallaxX;
    const benchY = originY + scale * 0.36;
    // Bench angled back rest
    drawPaperPoly(
      [
        [benchX - scale * 0.05, benchY - scale * 0.07],
        [benchX - scale * 0.038, benchY - scale * 0.075],
        [benchX + scale * 0.01, benchY - scale * 0.01],
        [benchX - scale * 0.002, benchY - scale * 0.005],
      ],
      '#07162C',
      '#1D63D8',
      1.5,
      6,
      3
    );
    // Bench seat pad
    drawPaperPoly(
      [
        [benchX, benchY - scale * 0.008],
        [benchX + scale * 0.04, benchY - scale * 0.015],
        [benchX + scale * 0.04, benchY],
        [benchX, benchY + scale * 0.006],
      ],
      '#07162C',
      '#1D63D8',
      1.5,
      4,
      2
    );
    // Bench steel support frame
    drawPaperPoly(
      [
        [benchX - scale * 0.015, benchY],
        [benchX + scale * 0.035, benchY],
        [benchX + scale * 0.035, benchY + scale * 0.022],
        [benchX - scale * 0.015, benchY + scale * 0.022],
      ],
      '#0B213D',
      'rgba(244, 247, 252, 0.25)',
      1,
      4,
      2
    );

    // G. DISTANT CABLE CROSSOVER / DUAL PULLEY TOWER (Distant Right Background, Framing Machine)
    const cableTowerX = originX + scale * 0.52 + bgParallaxX;
    const cableTowerY = originY + scale * 0.38;
    const cableH = scale * 0.44;
    // Cable column vertical housing
    drawPaperPoly(
      [
        [cableTowerX, cableTowerY - cableH],
        [cableTowerX + scale * 0.04, cableTowerY - cableH],
        [cableTowerX + scale * 0.04, cableTowerY],
        [cableTowerX, cableTowerY],
      ],
      '#071B35',
      'rgba(29, 99, 216, 0.4)',
      1.5,
      8,
      4
    );
    // Weight selector stack cut-out slits inside the cable column
    for (let st = 0; st < 6; st++) {
      const stY = cableTowerY - cableH * 0.55 + st * (scale * 0.016);
      drawPaperPoly(
        [
          [cableTowerX + scale * 0.006, stY],
          [cableTowerX + scale * 0.034, stY],
          [cableTowerX + scale * 0.034, stY + scale * 0.010],
          [cableTowerX + scale * 0.006, stY + scale * 0.010],
        ],
        st % 2 === 0 ? '#0B2342' : '#0F2F59',
        'rgba(242, 193, 78, 0.3)',
        0.8,
        2,
        1
      );
    }
    // Top pulley wheel & cable track
    drawPaperCircle(cableTowerX + scale * 0.02, cableTowerY - cableH + scale * 0.018, scale * 0.014, '#1D63D8', '#F4F7FC', 1, 4);

    // H. TOASTER-STYLE WEIGHT PLATE STORAGE TREE (Near Leg Press Machine Base)
    const treeX = originX + scale * 0.38 + midParallaxX;
    const treeY = originY + scale * 0.38;
    // Central steel mast
    drawPaperPoly(
      [
        [treeX, treeY - scale * 0.16],
        [treeX + scale * 0.015, treeY - scale * 0.16],
        [treeX + scale * 0.015, treeY],
        [treeX, treeY],
      ],
      '#0C2549',
      'rgba(29, 99, 216, 0.45)',
      1,
      6,
      3
    );
    // Peg 1 with 45 lb Olympic plates (Royal Blue Cut Paper Disc)
    drawPaperPoly(
      [
        [treeX - scale * 0.035, treeY - scale * 0.13],
        [treeX - scale * 0.022, treeY - scale * 0.13],
        [treeX - scale * 0.022, treeY - scale * 0.05],
        [treeX - scale * 0.035, treeY - scale * 0.05],
      ],
      '#1D63D8',
      '#040D1A',
      1.5,
      6,
      3
    );
    // Peg 2 with 25 lb Olympic plates
    drawPaperPoly(
      [
        [treeX + scale * 0.032, treeY - scale * 0.10],
        [treeX + scale * 0.043, treeY - scale * 0.10],
        [treeX + scale * 0.043, treeY - scale * 0.035],
        [treeX + scale * 0.032, treeY - scale * 0.035],
      ],
      '#F2C14E',
      '#040D1A',
      1.5,
      6,
      3
    );
    // Cast iron Kettlebell resting on the floor beside the weight tree
    drawPaperCircle(treeX - scale * 0.05, treeY - scale * 0.018, scale * 0.022, '#081D3A', '#1D63D8', 1.5, 4);
    // Kettlebell handle arch
    drawPaperPoly(
      [
        [treeX - scale * 0.062, treeY - scale * 0.035],
        [treeX - scale * 0.038, treeY - scale * 0.035],
        [treeX - scale * 0.042, treeY - scale * 0.045],
        [treeX - scale * 0.058, treeY - scale * 0.045],
      ],
      '#D7E1F0',
      '#040D1A',
      1,
      2,
      1
    );

    // I. FLOOR HEAVY-DUTY RUBBER TILES & INTERLOCK SEAMS
    drawPaperPoly(
      [
        [wallLeft - scale * 0.15, originY + scale * 0.36],
        [wallRight + scale * 0.18, originY + scale * 0.36],
        [wallRight + scale * 0.22, originY + scale * 0.58],
        [wallLeft - scale * 0.20, originY + scale * 0.58],
      ],
      '#040D1A',
      'rgba(29, 99, 216, 0.45)',
      2,
      14,
      8
    );
    // Rubber gym mat floor seams (perspective cut grid lines)
    for (let mat = 0; mat < 5; mat++) {
      const mx = wallLeft + scale * 0.05 + mat * (scale * 0.28);
      drawPaperCrease(mx, originY + scale * 0.36, mx - scale * 0.08, originY + scale * 0.58, false);
    }
    // Floor distance depth division line
    drawPaperCrease(wallLeft - scale * 0.1, originY + scale * 0.44, wallRight + scale * 0.15, originY + scale * 0.44, true);

    // =========================================================================
    // LAYER 2: 45° COMMERCIAL LEG PRESS CHASSIS & STATIONARY MACHINE FRAME
    // =========================================================================
    // The leg press is viewed in an angled lateral/three-quarter profile:
    // - Inclined back pad support (approx 35° incline) on the left-center.
    // - Heavy tubular steel 45° dual guide rails angling upward toward the top-right.
    // - Substantial base A-frame and structural safety catches.

    const machineBaseX = originX - scale * 0.28;
    const machineBaseY = originY + scale * 0.38;

    // Heavy Lower Chassis Base Beam (Cut-Paper Steel Box)
    drawPaperPoly(
      [
        [machineBaseX - scale * 0.22, machineBaseY],
        [machineBaseX + scale * 0.65, machineBaseY],
        [machineBaseX + scale * 0.68, machineBaseY + scale * 0.06],
        [machineBaseX - scale * 0.25, machineBaseY + scale * 0.06],
      ],
      '#081D3B',
      'rgba(244, 247, 252, 0.35)',
      2,
      12,
      7
    );

    // 45° Main Tubular Steel Guide Rails (Twin Rails)
    // Rail origin at the base near athlete's pelvis, angling up to top-right
    const railStartX = originX - scale * 0.14;
    const railStartY = originY + scale * 0.18;
    const railAngle = -Math.PI / 4; // 45 degrees
    const railLength = scale * 0.68;
    const railEndX = railStartX + Math.cos(railAngle) * railLength;
    const railEndY = railStartY + Math.sin(railAngle) * railLength;

    const railThickness = scale * 0.035;
    const railNormalX = -Math.sin(railAngle) * railThickness;
    const railNormalY = Math.cos(railAngle) * railThickness;

    // Lower Guide Rail (Polished Chrome / Silver Paper)
    drawPaperPoly(
      [
        [railStartX, railStartY],
        [railEndX, railEndY],
        [railEndX + railNormalX, railEndY + railNormalY],
        [railStartX + railNormalX, railStartY + railNormalY],
      ],
      '#D7E1F0',
      '#1D63D8',
      2,
      14,
      8
    );
    // Rail chrome reflection crease
    drawPaperCrease(railStartX + railNormalX * 0.4, railStartY + railNormalY * 0.4, railEndX + railNormalX * 0.4, railEndY + railNormalY * 0.4, true);

    // Upper Stabilizer Rail Truss
    drawPaperPoly(
      [
        [railStartX + railNormalX * 1.6, railStartY + railNormalY * 1.6],
        [railEndX + railNormalX * 1.6, railEndY + railNormalY * 1.6],
        [railEndX + railNormalX * 2.1, railEndY + railNormalY * 2.1],
        [railStartX + railNormalX * 2.1, railStartY + railNormalY * 2.1],
      ],
      '#0C2344',
      'rgba(242, 193, 78, 0.4)',
      1.5,
      10,
      5
    );

    // Rail Top Stop Buffer & Heavy End Plates
    drawPaperPoly(
      [
        [railEndX - scale * 0.02, railEndY - scale * 0.02],
        [railEndX + scale * 0.04, railEndY - scale * 0.04],
        [railEndX + scale * 0.06 + railNormalX * 2.3, railEndY - scale * 0.04 + railNormalY * 2.3],
        [railEndX + railNormalX * 2.3, railEndY + railNormalY * 2.3],
      ],
      '#F2C14E',
      '#F4F7FC',
      2,
      12,
      6
    );

    // Rear A-Frame Support Upright
    drawPaperPoly(
      [
        [railEndX, railEndY],
        [railEndX + scale * 0.03, railEndY],
        [machineBaseX + scale * 0.58, machineBaseY],
        [machineBaseX + scale * 0.52, machineBaseY],
      ],
      '#081D3B',
      '#1D63D8',
      1.5,
      10,
      5
    );

    // Safety Lockout Lever Handle (Gold Paper)
    const leverX = originX - scale * 0.20;
    const leverY = originY + scale * 0.20;
    drawPaperPoly(
      [
        [leverX, leverY],
        [leverX + scale * 0.08, leverY - scale * 0.05],
        [leverX + scale * 0.09, leverY - scale * 0.04],
        [leverX + scale * 0.01, leverY + scale * 0.01],
      ],
      '#F2C14E',
      '#F4F7FC',
      1.5,
      8,
      4
    );
    drawPaperCircle(leverX + scale * 0.085, leverY - scale * 0.045, 6, '#F2C14E', '#040D1A', 1.5, 4);

    // =========================================================================
    // LAYER 3: ATHLETE ERGONOMIC SEAT & INCLINED BACK REST
    // =========================================================================
    // The padded seat assembly holds the muscular cartoon athlete securely
    const seatAngle = 0.52; // approx 30 degrees from horizontal
    const backRestAngle = -1.15; // approx 65 degrees incline backwards

    const seatPivotX = originX - scale * 0.22;
    const seatPivotY = originY + scale * 0.24;

    // Bottom Seat Cushion (Padded Royal Blue Cardstock)
    drawPaperPoly(
      [
        [seatPivotX - scale * 0.02, seatPivotY + scale * 0.02],
        [seatPivotX + scale * 0.16, seatPivotY - scale * 0.04],
        [seatPivotX + scale * 0.17, seatPivotY],
        [seatPivotX - scale * 0.01, seatPivotY + scale * 0.06],
      ],
      '#1D63D8',
      '#F4F7FC',
      2,
      10,
      5
    );

    // Inclined Back Pad (Thick Padded Cardstock)
    const backTopX = seatPivotX - scale * 0.24;
    const backTopY = seatPivotY - scale * 0.38;

    drawPaperPoly(
      [
        [seatPivotX - scale * 0.02, seatPivotY + scale * 0.03],
        [seatPivotX + scale * 0.03, seatPivotY],
        [backTopX + scale * 0.04, backTopY],
        [backTopX - scale * 0.01, backTopY],
      ],
      '#0C2344',
      '#1D63D8',
      2.5,
      14,
      8
    );

    // Contoured Head Rest Cushion
    drawPaperPoly(
      [
        [backTopX - scale * 0.01, backTopY],
        [backTopX + scale * 0.04, backTopY],
        [backTopX + scale * 0.03, backTopY - scale * 0.10],
        [backTopX - scale * 0.02, backTopY - scale * 0.10],
      ],
      '#1D63D8',
      '#F4F7FC',
      2,
      10,
      5
    );

    // Side Stabilizer Grip Handles (The athlete grips these for leverage)
    const handleX = seatPivotX + scale * 0.03;
    const handleY = seatPivotY + scale * 0.01;
    drawPaperPoly(
      [
        [handleX, handleY],
        [handleX + scale * 0.08, handleY - scale * 0.06],
        [handleX + scale * 0.09, handleY - scale * 0.05],
        [handleX + scale * 0.01, handleY + scale * 0.01],
      ],
      '#F2C14E',
      '#040D1A',
      2,
      8,
      4
    );

    // =========================================================================
    // LAYER 4: MUSCULAR CARTOON ATHLETE — HEAVY STRENGTH-ATHLETE PHYSIQUE
    // =========================================================================
    // Redesigned to be a powerful, heavyweight strength athlete / bodybuilder:
    // - Massive thick neck and diamond trapezius.
    // - Enormous 3D boulder shoulders (anterior/lateral deltoid cuts).
    // - Thick, heavy chest plates with deep muscular striations.
    // - Enormous bicep/tricep arms with vascular forearm cuts.
    // - Extremely thick, sweeping quadriceps and diamond gastrocnemius calves.

    // A. ATHLETE HEAD & HANDSOME MASCULINE FACE
    // Designed with attractive, heroic proportions:
    // - Strong, clean, square jawline and defined chin.
    // - Structured bridge and angled nose with depth and nostrils.
    // - Confident, determined eyes with defined iris, pupils, and catchlight.
    // - Sharp, masculine eyebrows with an intense, focused brow ridge.
    // - Clean, masculine parted lips set in determined focus (not angry, but powerful).
    // - Sculpted athletic hairstyle / styled taper with subtle highlights.

    const athHeadX = backTopX + scale * 0.07;
    const athHeadY = backTopY - scale * 0.055;

    // 1. BASE HEAD & JAW PROFILE (Handsome, chiseled masculine profile)
    drawPaperPoly(
      [
        [athHeadX - scale * 0.048, athHeadY - scale * 0.058], // back of cranium
        [athHeadX + scale * 0.025, athHeadY - scale * 0.058], // forehead top
        [athHeadX + scale * 0.055, athHeadY - scale * 0.038], // brow ledge
        [athHeadX + scale * 0.052, athHeadY - scale * 0.024], // eye indentation (nasion)
        [athHeadX + scale * 0.082, athHeadY - scale * 0.004], // nose tip (strong, straight nose bridge)
        [athHeadX + scale * 0.066, athHeadY + scale * 0.010], // nose subnasale / philtrum start
        [athHeadX + scale * 0.070, athHeadY + scale * 0.020], // upper lip
        [athHeadX + scale * 0.058, athHeadY + scale * 0.026], // lip indentation
        [athHeadX + scale * 0.068, athHeadY + scale * 0.034], // lower lip
        [athHeadX + scale * 0.055, athHeadY + scale * 0.044], // chin cleft groove
        [athHeadX + scale * 0.066, athHeadY + scale * 0.058], // chiseled masculine chin tip
        [athHeadX + scale * 0.030, athHeadY + scale * 0.064], // jaw angle (mandible)
        [athHeadX - scale * 0.015, athHeadY + scale * 0.045], // jaw hinge near ear
        [athHeadX - scale * 0.042, athHeadY + scale * 0.025], // lower base of skull
      ],
      '#F4F7FC',
      '#040D1A',
      3.0,
      12,
      6
    );

    // 2. CHISELED CHEEKBONE & JAWLINE PAPER SHADOW LAYER
    // Gives the face dimensional depth, bone structure, and handsome planes
    drawPaperPoly(
      [
        [athHeadX + scale * 0.010, athHeadY - scale * 0.018], // below eye
        [athHeadX + scale * 0.045, athHeadY - scale * 0.008], // cheekbone apex
        [athHeadX + scale * 0.030, athHeadY + scale * 0.025], // hollow of cheek
        [athHeadX + scale * 0.050, athHeadY + scale * 0.050], // toward chin
        [athHeadX + scale * 0.025, athHeadY + scale * 0.058], // jawline
        [athHeadX - scale * 0.005, athHeadY + scale * 0.040], // jaw base
      ],
      '#D7E1F0',
      'rgba(29, 99, 216, 0.4)',
      1.5,
      6,
      3
    );

    // Jawline Definition Crease (Sharp, angular jaw bone line)
    drawPaperCrease(athHeadX - scale * 0.010, athHeadY + scale * 0.042, athHeadX + scale * 0.048, athHeadY + scale * 0.056);

    // 3. MASCULINE STYLED ATHLETIC HAIR & TAPER
    // Modern undercut / swept athletic hairstyle in Deep Navy & Royal Blue
    drawPaperPoly(
      [
        [athHeadX - scale * 0.055, athHeadY - scale * 0.040],
        [athHeadX - scale * 0.050, athHeadY - scale * 0.068],
        [athHeadX - scale * 0.010, athHeadY - scale * 0.078],
        [athHeadX + scale * 0.035, athHeadY - scale * 0.070],
        [athHeadX + scale * 0.052, athHeadY - scale * 0.048], // front fringe
        [athHeadX + scale * 0.035, athHeadY - scale * 0.042],
        [athHeadX + scale * 0.018, athHeadY - scale * 0.052],
        [athHeadX - scale * 0.020, athHeadY - scale * 0.055],
        [athHeadX - scale * 0.025, athHeadY - scale * 0.015], // sideburn
        [athHeadX - scale * 0.038, athHeadY - scale * 0.012],
      ],
      '#07162C',
      '#1D63D8',
      2.5,
      10,
      5
    );

    // Styled hair strand layer (Royal Blue highlight cut-out)
    drawPaperPoly(
      [
        [athHeadX - scale * 0.030, athHeadY - scale * 0.068],
        [athHeadX + scale * 0.015, athHeadY - scale * 0.074],
        [athHeadX + scale * 0.044, athHeadY - scale * 0.056],
        [athHeadX + scale * 0.010, athHeadY - scale * 0.058],
      ],
      '#1D63D8',
      '#F2C14E',
      1.5,
      6,
      3
    );

    // 4. STRUCTURED NOSE WITH DEPTH
    // Under-nose shadow & nostril plane (gives realistic, handsome nose geometry)
    drawPaperPoly(
      [
        [athHeadX + scale * 0.050, athHeadY - scale * 0.010],
        [athHeadX + scale * 0.078, athHeadY - scale * 0.004], // nose tip
        [athHeadX + scale * 0.064, athHeadY + scale * 0.008], // base
        [athHeadX + scale * 0.048, athHeadY + scale * 0.004], // alar crease
      ],
      '#D7E1F0',
      '#040D1A',
      1.8,
      4,
      2
    );
    // Nostril accent
    drawPaperCircle(athHeadX + scale * 0.058, athHeadY + scale * 0.004, 2.0, '#040D1A', null, 0, 0);

    // 5. STRONG, HANDSOME EYEBROW (Confident, focused athletic tilt)
    drawPaperPoly(
      [
        [athHeadX + scale * 0.015, athHeadY - scale * 0.028],
        [athHeadX + scale * 0.038, athHeadY - scale * 0.034], // arch
        [athHeadX + scale * 0.058, athHeadY - scale * 0.026], // brow tail
        [athHeadX + scale * 0.054, athHeadY - scale * 0.020],
        [athHeadX + scale * 0.034, athHeadY - scale * 0.026],
        [athHeadX + scale * 0.016, athHeadY - scale * 0.022],
      ],
      '#040D1A',
      '#1D63D8',
      1.5,
      4,
      2
    );

    // 6. CONFIDENT, DETAILED EYE (Focused, determined gaze toward weights)
    // Eye White (Sclera) - almond shaped cut-out
    drawPaperPoly(
      [
        [athHeadX + scale * 0.024, athHeadY - scale * 0.016], // inner canthus
        [athHeadX + scale * 0.038, athHeadY - scale * 0.021], // upper eyelid apex
        [athHeadX + scale * 0.052, athHeadY - scale * 0.015], // outer canthus
        [athHeadX + scale * 0.038, athHeadY - scale * 0.011], // lower eyelid
      ],
      '#F4F7FC',
      '#040D1A',
      1.8,
      2,
      1
    );

    // Iris (Deep Royal Blue with clean graphic ring)
    drawPaperCircle(athHeadX + scale * 0.041, athHeadY - scale * 0.016, 4.2, '#1D63D8', '#040D1A', 1.2, 0);

    // Pupil (Sharp black center)
    drawPaperCircle(athHeadX + scale * 0.042, athHeadY - scale * 0.016, 2.2, '#040D1A', null, 0, 0);

    // Eye Catchlight (White sparkle dot indicating sharp focus and life)
    drawPaperCircle(athHeadX + scale * 0.044, athHeadY - scale * 0.018, 1.2, '#F4F7FC', null, 0, 0);

    // Upper Eyelash & Crease Line
    drawPaperCrease(athHeadX + scale * 0.020, athHeadY - scale * 0.022, athHeadX + scale * 0.052, athHeadY - scale * 0.018, false);

    // 7. CLEAN, MASCULINE LIPS & CHIN CLEFT (Determined focus)
    // Upper lip plane
    drawPaperPoly(
      [
        [athHeadX + scale * 0.052, athHeadY + scale * 0.016],
        [athHeadX + scale * 0.068, athHeadY + scale * 0.019],
        [athHeadX + scale * 0.050, athHeadY + scale * 0.024],
      ],
      '#D7E1F0',
      '#040D1A',
      1.5,
      3,
      1
    );

    // Lip center line / determined mouth crease
    drawPaperCrease(athHeadX + scale * 0.038, athHeadY + scale * 0.024, athHeadX + scale * 0.064, athHeadY + scale * 0.023, false);

    // Lower lip shelf
    drawPaperPoly(
      [
        [athHeadX + scale * 0.042, athHeadY + scale * 0.025],
        [athHeadX + scale * 0.062, athHeadY + scale * 0.025],
        [athHeadX + scale * 0.058, athHeadY + scale * 0.034],
        [athHeadX + scale * 0.042, athHeadY + scale * 0.031],
      ],
      '#E2ECF8',
      '#040D1A',
      1.5,
      4,
      2
    );

    // Chin cleft indentation (Handsome masculine feature)
    drawPaperCrease(athHeadX + scale * 0.052, athHeadY + scale * 0.050, athHeadX + scale * 0.060, athHeadY + scale * 0.055, false);

    // 8. ATHLETIC EAR WITH CARTILAGE CREASES
    const earX = athHeadX - scale * 0.015;
    const earY = athHeadY - scale * 0.005;
    drawPaperPoly(
      [
        [earX, earY - scale * 0.018],
        [earX - scale * 0.015, earY - scale * 0.012],
        [earX - scale * 0.016, earY + scale * 0.015],
        [earX, earY + scale * 0.022],
      ],
      '#D7E1F0',
      '#040D1A',
      2.0,
      4,
      2
    );
    drawPaperCrease(earX - scale * 0.008, earY - scale * 0.006, earX - scale * 0.006, earY + scale * 0.008);

    // B. MASSIVE, THICK NECK & MOUNTAINOUS TRAPEZIUS
    const neckBaseX = athHeadX - scale * 0.015;
    const neckBaseY = athHeadY + scale * 0.065;

    // Heavy trapezoid neck (extremely thick strength-athlete neck)
    drawPaperPoly(
      [
        [athHeadX - scale * 0.045, athHeadY + scale * 0.03],
        [athHeadX + scale * 0.035, athHeadY + scale * 0.04],
        [neckBaseX + scale * 0.07, neckBaseY + scale * 0.04],
        [neckBaseX - scale * 0.06, neckBaseY + scale * 0.03],
      ],
      '#D7E1F0',
      '#040D1A',
      2.8,
      10,
      5
    );

    // Mountainous Trapezius sweep rising behind the neck
    drawPaperPoly(
      [
        [neckBaseX - scale * 0.07, neckBaseY + scale * 0.01],
        [athHeadX - scale * 0.02, athHeadY + scale * 0.01],
        [neckBaseX + scale * 0.08, neckBaseY + scale * 0.02],
        [neckBaseX + scale * 0.02, neckBaseY + scale * 0.06],
      ],
      '#F4F7FC',
      '#1D63D8',
      2.2,
      8,
      4
    );

    // C. ENORMOUS BOULDER DELTOIDS (3D Three-Headed Shoulders)
    const shoulderX = neckBaseX + scale * 0.03;
    const shoulderY = neckBaseY + scale * 0.06;

    // Outer Shoulder Mass (Huge multi-layered boulder deltoid)
    drawPaperCircle(shoulderX, shoulderY, scale * 0.095, '#F4F7FC', '#040D1A', 3.5, 14);
    // Anterior deltoid muscle plate
    drawPaperPoly(
      [
        [shoulderX - scale * 0.05, shoulderY - scale * 0.04],
        [shoulderX + scale * 0.06, shoulderY - scale * 0.03],
        [shoulderX + scale * 0.07, shoulderY + scale * 0.05],
        [shoulderX - scale * 0.02, shoulderY + scale * 0.07],
      ],
      '#D7E1F0',
      '#1D63D8',
      2.0,
      8,
      4
    );
    // Lateral Deltoid striation creases
    drawPaperCrease(shoulderX - scale * 0.04, shoulderY + scale * 0.01, shoulderX + scale * 0.06, shoulderY - scale * 0.01);
    drawPaperCrease(shoulderX - scale * 0.02, shoulderY + scale * 0.03, shoulderX + scale * 0.05, shoulderY + scale * 0.02);

    // D. THICK, HEAVILY MUSCULAR CHEST & POWERFUL TORSO
    const hipJointX = seatPivotX + scale * 0.06;
    const hipJointY = seatPivotY - scale * 0.02;

    // Massive ribcage & deep latissimus dorsi foundation
    drawPaperPoly(
      [
        [shoulderX - scale * 0.06, shoulderY - scale * 0.03],
        [shoulderX + scale * 0.12, shoulderY + scale * 0.07],
        [hipJointX + scale * 0.08, hipJointY - scale * 0.04],
        [hipJointX - scale * 0.05, hipJointY + scale * 0.01],
      ],
      '#E2ECF8',
      '#040D1A',
      3.8,
      16,
      8
    );

    // Armor-Plated Pectoralis Major (Thick, protruding chest slab)
    drawPaperPoly(
      [
        [shoulderX - scale * 0.01, shoulderY + scale * 0.01],
        [shoulderX + scale * 0.13, shoulderY + scale * 0.05],
        [shoulderX + scale * 0.10, shoulderY + scale * 0.16],
        [shoulderX - scale * 0.02, shoulderY + scale * 0.11],
      ],
      '#F4F7FC',
      '#1D63D8',
      2.8,
      12,
      6
    );

    // Sternal cleavage and lower pec shelf cut-out
    drawPaperPoly(
      [
        [shoulderX + scale * 0.03, shoulderY + scale * 0.06],
        [shoulderX + scale * 0.12, shoulderY + scale * 0.09],
        [shoulderX + scale * 0.09, shoulderY + scale * 0.15],
        [shoulderX + scale * 0.02, shoulderY + scale * 0.12],
      ],
      '#D7E1F0',
      '#040D1A',
      1.8,
      6,
      3
    );

    // Serratus Anterior & Intercostal Muscle Racks (Thick muscle ribs)
    for (let rib = 0; rib < 4; rib++) {
      const rY = shoulderY + scale * 0.12 + rib * (scale * 0.03);
      drawPaperPoly(
        [
          [shoulderX - scale * 0.01 + rib * 3, rY],
          [shoulderX + scale * 0.05 + rib * 3, rY + 4],
          [shoulderX + scale * 0.04 + rib * 3, rY + 10],
          [shoulderX - scale * 0.02 + rib * 3, rY + 8],
        ],
        '#D7E1F0',
        '#1D63D8',
        1.5,
        4,
        2
      );
    }

    // Heavyweight Compression Singlet / Tank (Royal Blue with Gold Trim)
    drawPaperPoly(
      [
        [shoulderX - scale * 0.03, shoulderY + scale * 0.04],
        [shoulderX + scale * 0.07, shoulderY + scale * 0.06],
        [hipJointX + scale * 0.05, hipJointY - scale * 0.02],
        [hipJointX - scale * 0.03, hipJointY],
      ],
      '#1D63D8',
      '#F2C14E',
      2.0,
      8,
      4
    );

    // E. MASSIVE 22-INCH BICEPS, TRICEPS & THICK VASCULAR FOREARMS
    const elbowX = shoulderX - scale * 0.03;
    const elbowY = shoulderY + scale * 0.18;
    const handX = handleX + scale * 0.04;
    const handY = handleY - scale * 0.03;

    // Horseshoe Tricep (Posterior sweep)
    drawPaperPoly(
      [
        [shoulderX - scale * 0.05, shoulderY + scale * 0.04],
        [shoulderX - scale * 0.02, shoulderY + scale * 0.05],
        [elbowX - scale * 0.02, elbowY + scale * 0.02],
        [elbowX - scale * 0.06, elbowY],
      ],
      '#D7E1F0',
      '#040D1A',
      2.5,
      8,
      4
    );

    // Enormous Bicep Peak (Bulging contracted muscle ball)
    drawPaperPoly(
      [
        [shoulderX - scale * 0.02, shoulderY + scale * 0.04],
        [shoulderX + scale * 0.07, shoulderY + scale * 0.07],
        [elbowX + scale * 0.07, elbowY + scale * 0.01],
        [elbowX - scale * 0.02, elbowY + scale * 0.01],
      ],
      '#F4F7FC',
      '#040D1A',
      3.2,
      12,
      6
    );
    // Bicep contraction separation line
    drawPaperCrease(shoulderX + scale * 0.02, shoulderY + scale * 0.06, elbowX + scale * 0.03, elbowY);

    // Thick Forearm Flexor Mass (Popeye-level forearm thickness)
    drawPaperPoly(
      [
        [elbowX - scale * 0.04, elbowY],
        [elbowX + scale * 0.06, elbowY],
        [handX + scale * 0.04, handY + scale * 0.03],
        [handX - scale * 0.03, handY - scale * 0.01],
      ],
      '#F4F7FC',
      '#040D1A',
      3.2,
      12,
      6
    );

    // Forearm Brachioradialis Ridge & Vascular Paper Cuts
    drawPaperPoly(
      [
        [elbowX - scale * 0.01, elbowY + scale * 0.02],
        [elbowX + scale * 0.04, elbowY + scale * 0.03],
        [handX + scale * 0.02, handY + scale * 0.01],
        [handX - scale * 0.01, handY],
      ],
      '#D7E1F0',
      '#1D63D8',
      1.8,
      6,
      3
    );
    // Bulging forearm vein cut-out (Royal Blue cardstock crease)
    drawPaperCrease(elbowX + scale * 0.01, elbowY + scale * 0.04, handX + scale * 0.01, handY + scale * 0.01, false);

    // Large Clenched White/Gold Power Fist (Gripping the machine handle)
    drawPaperCircle(handX, handY, scale * 0.042, '#F4F7FC', '#040D1A', 2.8, 8);
    // Knuckle creases
    drawPaperCrease(handX - scale * 0.02, handY, handX + scale * 0.02, handY - scale * 0.01);
    drawPaperCrease(handX - scale * 0.015, handY + scale * 0.01, handX + scale * 0.025, handY);

    // =========================================================================
    // LAYER 5: MASSIVE BODYBUILDER LEGS & DYNAMIC 45° KINEMATICS
    // =========================================================================
    // The legs are the central highlight of the leg press:
    // - Huge sweeping quadriceps (vastus lateralis, rectus femoris, vastus medialis teardrop).
    // - Thick, dense hamstrings hanging below the femur.
    // - Massive diamond calves (gastrocnemius & soleus).
    // - Extremely powerful visual presence.

    // Kinetic Math:
    const maxTravel = scale * 0.36;
    const currentTravel = extension * maxTravel;

    const moveX = Math.cos(railAngle) * currentTravel;
    const moveY = Math.sin(railAngle) * currentTravel;

    const baseFootPlateX = originX + scale * 0.05;
    const baseFootPlateY = originY + scale * 0.04;

    const footPlateX = baseFootPlateX + moveX;
    const footPlateY = baseFootPlateY + moveY;

    // Firm Foot Plant on Footplate
    const footX = footPlateX - scale * 0.03;
    const footY = footPlateY + scale * 0.03;

    // Inverse Kinematics for Knee Articulation:
    const thighLength = scale * 0.28;
    const shinLength = scale * 0.26;

    const dx = footX - hipJointX;
    const dy = footY - hipJointY;
    const distHipFoot = Math.sqrt(dx * dx + dy * dy);

    const angleHF = Math.atan2(dy, dx);
    const clampedDist = Math.min(distHipFoot, thighLength + shinLength - 0.01);
    const cosAngleKnee = (thighLength * thighLength + clampedDist * clampedDist - shinLength * shinLength) / (2 * thighLength * clampedDist);
    const clampedCos = Math.max(-1, Math.min(1, cosAngleKnee));
    const kneeOffsetAngle = Math.acos(clampedCos);

    const finalKneeAngle = angleHF - kneeOffsetAngle;
    const kneeX = hipJointX + Math.cos(finalKneeAngle) * thighLength;
    const kneeY = hipJointY + Math.sin(finalKneeAngle) * thighLength;

    // --- A. THICK HANGING HAMSTRINGS (Underneath Thigh) ---
    drawPaperPoly(
      [
        [hipJointX - scale * 0.04, hipJointY + scale * 0.06],
        [hipJointX + scale * 0.02, hipJointY + scale * 0.05],
        [kneeX - scale * 0.01, kneeY + scale * 0.07],
        [kneeX - scale * 0.06, kneeY + scale * 0.06],
      ],
      '#0C2344',
      '#040D1A',
      2.8,
      10,
      5
    );

    // --- B. ENORMOUS SWEEPING QUADRICEPS (Vastus Lateralis & Rectus Femoris) ---
    // Massive upper quad sweep (Outer thigh flare)
    drawPaperPoly(
      [
        [hipJointX - scale * 0.03, hipJointY + scale * 0.05],
        [hipJointX + scale * 0.07, hipJointY - scale * 0.04],
        [kneeX + scale * 0.07, kneeY - scale * 0.03],
        [kneeX - scale * 0.04, kneeY + scale * 0.06],
      ],
      '#F4F7FC',
      '#040D1A',
      4.2,
      18,
      10
    );

    // Center Quad Core (Rectus Femoris belly)
    drawPaperPoly(
      [
        [hipJointX + scale * 0.02, hipJointY - scale * 0.01],
        [hipJointX + scale * 0.06, hipJointY - scale * 0.02],
        [kneeX + scale * 0.04, kneeY - scale * 0.01],
        [kneeX - scale * 0.01, kneeY + scale * 0.03],
      ],
      '#D7E1F0',
      '#1D63D8',
      2.5,
      10,
      5
    );

    // Vastus Medialis (Huge teardrop muscle plate above inner knee)
    drawPaperPoly(
      [
        [kneeX - scale * 0.02, kneeY],
        [kneeX + scale * 0.05, kneeY - scale * 0.02],
        [kneeX + scale * 0.03, kneeY + scale * 0.04],
        [kneeX - scale * 0.03, kneeY + scale * 0.04],
      ],
      '#E2ECF8',
      '#F2C14E',
      2.2,
      8,
      4
    );

    // Quad Striations (Deep muscle separation lines)
    drawPaperCrease(hipJointX + scale * 0.03, hipJointY + scale * 0.01, kneeX + scale * 0.02, kneeY + scale * 0.01);
    drawPaperCrease(hipJointX + scale * 0.05, hipJointY - scale * 0.01, kneeX + scale * 0.04, kneeY - scale * 0.01);

    // Heavy Armor-Plated Knee Cap (Patella)
    drawPaperCircle(kneeX, kneeY, scale * 0.038, '#F2C14E', '#040D1A', 3.0, 10);
    drawPaperCircle(kneeX, kneeY, scale * 0.018, '#F4F7FC', '#040D1A', 1.5, 4);

    // --- C. DIAMOND-DEVELOPED CALVES & LOWER LEG ---
    // Outer Calf Belly (Bulging gastrocnemius diamond sweep)
    drawPaperPoly(
      [
        [kneeX - scale * 0.04, kneeY + scale * 0.03],
        [kneeX + scale * 0.05, kneeY - scale * 0.01],
        [footX + scale * 0.03, footY - scale * 0.04],
        [footX - scale * 0.05, footY + scale * 0.02],
      ],
      '#F4F7FC',
      '#040D1A',
      3.8,
      14,
      8
    );

    // Inner Diamond Gastrocnemius Head (Layered Paper Cut)
    drawPaperPoly(
      [
        [kneeX - scale * 0.01, kneeY + scale * 0.02],
        [kneeX + scale * 0.04, kneeY],
        [footX + scale * 0.02, footY - scale * 0.03],
        [footX - scale * 0.02, footY],
      ],
      '#D7E1F0',
      '#1D63D8',
      2.2,
      8,
      4
    );

    // Thick Achilles Tendon & Soleus Plate
    drawPaperPoly(
      [
        [kneeX - scale * 0.03, kneeY + scale * 0.04],
        [kneeX - scale * 0.01, kneeY + scale * 0.05],
        [footX - scale * 0.03, footY + scale * 0.03],
        [footX - scale * 0.05, footY + scale * 0.02],
      ],
      '#0C2344',
      '#1D63D8',
      1.8,
      6,
      3
    );

    // Heavyweight Strength-Training High-Top Shoe
    const shoeAngle = railAngle + Math.PI / 2;
    drawPaperPoly(
      [
        [footX - scale * 0.04, footY + scale * 0.05],
        [footX + scale * 0.08, footY - scale * 0.04],
        [footX + scale * 0.09, footY - scale * 0.02],
        [footX - scale * 0.03, footY + scale * 0.07],
      ],
      '#1D63D8',
      '#F2C14E',
      3.0,
      12,
      6
    );
    // Shoe Grip Sole (Gold Cut-Paper)
    drawPaperPoly(
      [
        [footX - scale * 0.04, footY + scale * 0.05],
        [footX + scale * 0.08, footY - scale * 0.04],
        [footX + scale * 0.09, footY - scale * 0.03],
        [footX - scale * 0.03, footY + scale * 0.06],
      ],
      '#F2C14E',
      '#040D1A',
      2.0,
      6,
      3
    );
    // =========================================================================
    // LAYER 6: MOVING 45° WEIGHT SLED, FOOTPLATE & OLYMPIC PLATES
    // =========================================================================
    // The entire weight sled glides along with `moveX, moveY`

    // Footplate Platform (Diamond-Plate Rubber/Steel Deck)
    const plateAngle = railAngle + Math.PI / 2;
    const plateWidth = scale * 0.26;
    const plateHalfW = plateWidth / 2;

    const fpX1 = footPlateX - Math.cos(plateAngle) * plateHalfW;
    const fpY1 = footPlateY - Math.sin(plateAngle) * plateHalfW;
    const fpX2 = footPlateX + Math.cos(plateAngle) * plateHalfW;
    const fpY2 = footPlateY + Math.sin(plateAngle) * plateHalfW;

    // Thick Platform Backing (Dark Blue Paper)
    const fpThick = scale * 0.035;
    const fpNormX = Math.cos(railAngle) * fpThick;
    const fpNormY = Math.sin(railAngle) * fpThick;

    drawPaperPoly(
      [
        [fpX1, fpY1],
        [fpX2, fpY2],
        [fpX2 + fpNormX, fpY2 + fpNormY],
        [fpX1 + fpNormX, fpY1 + fpNormY],
      ],
      '#0C2344',
      '#F4F7FC',
      3.0,
      16,
      9
    );

    // Diamond grip tread lines on footplate
    for (let t = 1; t <= 4; t++) {
      const tx = lerp(fpX1, fpX2, t / 5);
      const ty = lerp(fpY1, fpY2, t / 5);
      drawPaperCrease(tx, ty, tx + fpNormX, ty + fpNormY, true);
    }

    // Heavy Weight Horn Pegs extending out from the sled
    const sledBodyX = footPlateX + fpNormX * 1.5;
    const sledBodyY = footPlateY + fpNormY * 1.5;

    // Weight Plate Carriage Chassis Box
    drawPaperPoly(
      [
        [sledBodyX - scale * 0.08, sledBodyY - scale * 0.08],
        [sledBodyX + scale * 0.08, sledBodyY - scale * 0.08],
        [sledBodyX + scale * 0.10, sledBodyY + scale * 0.08],
        [sledBodyX - scale * 0.06, sledBodyY + scale * 0.08],
      ],
      '#1D63D8',
      '#F2C14E',
      2.5,
      14,
      8
    );

    // Massive Loaded Olympic Weight Plates Stack (4 Heavy 45lb/20kg Plates)
    // The plates are large overlapping circular cut-outs mounted on the horn
    const plateStackX = sledBodyX + scale * 0.06;
    const plateStackY = sledBodyY - scale * 0.02;

    for (let pIdx = 0; pIdx < 4; pIdx++) {
      const pOffsetX = pIdx * (scale * 0.03);
      const pOffsetY = -pIdx * (scale * 0.015);
      const plateRadius = scale * (0.16 - pIdx * 0.008);

      // Plate Outer Rim (Layered Cardstock)
      drawPaperCircle(
        plateStackX + pOffsetX,
        plateStackY + pOffsetY,
        plateRadius,
        pIdx % 2 === 0 ? '#0C2344' : '#081D3B',
        '#F4F7FC',
        2.5,
        14
      );

      // Inner Hub Ring
      drawPaperCircle(
        plateStackX + pOffsetX,
        plateStackY + pOffsetY,
        plateRadius * 0.55,
        '#1D63D8',
        '#F2C14E',
        2.0,
        6
      );

      // Center Spindle Hole & Steel Lock Collar
      drawPaperCircle(
        plateStackX + pOffsetX,
        plateStackY + pOffsetY,
        plateRadius * 0.20,
        '#F2C14E',
        '#040D1A',
        2.0,
        4
      );

      // Embossed "UNITED CLUB 20KG" Plate Text
      if (pIdx === 3) {
        ctx.save();
        ctx.translate(plateStackX + pOffsetX, plateStackY + pOffsetY);
        ctx.rotate(railAngle);
        ctx.fillStyle = '#F4F7FC';
        ctx.font = 'bold 9px monospace';
        ctx.fillText('20KG', -12, -plateRadius * 0.65);
        ctx.fillStyle = '#F2C14E';
        ctx.font = '8px monospace';
        ctx.fillText('CALIBRATED', -25, plateRadius * 0.75);
        ctx.restore();
      }
    }

    // Heavy Olympic Clamp Collar (Gold Cut-Paper)
    drawPaperPoly(
      [
        [plateStackX + scale * 0.12, plateStackY - scale * 0.05],
        [plateStackX + scale * 0.16, plateStackY - scale * 0.05],
        [plateStackX + scale * 0.15, plateStackY + scale * 0.03],
        [plateStackX + scale * 0.11, plateStackY + scale * 0.03],
      ],
      '#F2C14E',
      '#040D1A',
      2,
      8,
      4
    );

    // =========================================================================
    // LAYER 7: DYNAMIC PAPER MOTION LINES & PROGRESS METRICS
    // =========================================================================
    // Action motion chevron arrows indicating the 45° drive vector
    if (extension > 0.15) {
      const arrowCount = Math.floor(extension * 4);
      for (let a = 0; a < arrowCount; a++) {
        const arDist = scale * (0.08 + a * 0.06);
        const arX = footPlateX + Math.cos(railAngle) * arDist;
        const arY = footPlateY + Math.sin(railAngle) * arDist;

        drawPaperPoly(
          [
            [arX - scale * 0.02, arY - scale * 0.02],
            [arX + scale * 0.02, arY - scale * 0.02],
            [arX, arY - scale * 0.05],
          ],
          '#F2C14E',
          '#F4F7FC',
          1.5,
          6,
          3
        );
      }
    }

    // Status display update via direct DOM refs (prevents full-component re-renders during scroll)
    const percentPress = Math.round(extension * 100);
    if (statusRef.current) {
      if (extension < 0.20) {
        statusRef.current.textContent = 'START POSITION // KNEES BENT';
      } else if (extension < 0.80) {
        statusRef.current.textContent = `DRIVING PLATFORM // ${percentPress}% EXTENSION`;
      } else {
        statusRef.current.textContent = 'FULL QUAD LOCKOUT // MAXIMUM DRIVE';
      }
    }
    if (pctRef.current) {
      pctRef.current.textContent = `[${Math.round(p * 100)}%]`;
    }
  }, []);

  // Window resize handler with DPR scaling (capped at 2 for performance)
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const curProg = docHeight > 0 ? Math.max(0, Math.min(1, window.scrollY / docHeight)) : 0;
      targetProgressRef.current = curProg;
      currentProgressRef.current = curProg;
      drawPaperScene(curProg);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [drawPaperScene]);

  // Buttery-smooth lerp animation loop:
  // Interpolates current progress smoothly to target scroll progress with zero jitter.
  // When target is reached and user is idle, RAF cancels itself completely (0 CPU/GPU usage).
  useEffect(() => {
    const updateInterpolation = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;

      // When difference is microscopic, snap to target and sleep
      if (Math.abs(diff) < 0.00015) {
        currentProgressRef.current = targetProgressRef.current;
        drawPaperScene(currentProgressRef.current);
        isRunningRef.current = false;
        animFrameIdRef.current = null;
        return;
      }

      // Optimized snappy dampening factor (0.24 provides immediate responsive tracking with zero lag or float)
      currentProgressRef.current += diff * 0.24;
      drawPaperScene(currentProgressRef.current);

      animFrameIdRef.current = window.requestAnimationFrame(updateInterpolation);
    };

    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const target = docHeight > 0 ? Math.max(0, Math.min(1, window.scrollY / docHeight)) : 0;
      targetProgressRef.current = target;

      // Start the interpolation loop if not already running
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animFrameIdRef.current = window.requestAnimationFrame(updateInterpolation);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animFrameIdRef.current) {
        window.cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawPaperScene]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#061426]">
      {/* 1. PAPER-STYLE ANIMATION CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block will-change-transform"
      />

      {/* 2. ATMOSPHERIC SCRIM (Subtly lightened and refined to leave the paper gym scene luminous and prominent) */}
      <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#061426]/75 via-[#061426]/50 md:via-[#061426]/35 to-[#061426]/10 md:to-transparent w-full md:w-[45%] pointer-events-none" />

      {/* Softened top & bottom vignettes */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#061426]/70 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#061426]/70 to-transparent pointer-events-none" />

      {/* Targeted spotlight glow directly framing the character & leg press machine with enhanced luminous depth */}
      <div
        className="absolute w-[750px] sm:w-[950px] h-[750px] sm:h-[950px] rounded-full blur-[130px] pointer-events-none transform-gpu mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(29,99,216,0.34) 0%, rgba(37,99,235,0.15) 45%, rgba(9,29,56,0) 75%)',
          right: '5%',
          top: '28%',
        }}
      />
      {/* Subtle warm rim glow accentuating the athlete's paper physique */}
      <div
        className="absolute w-[480px] sm:w-[580px] h-[480px] sm:h-[580px] rounded-full blur-[95px] pointer-events-none transform-gpu"
        style={{
          background: 'radial-gradient(circle, rgba(242,193,78,0.12) 0%, transparent 70%)',
          right: '18%',
          top: '38%',
        }}
      />

      {/* 3. TECHNICAL STATUS PILL (Active Theory / Paper Art Indicator) */}
      <div className="hidden lg:flex fixed bottom-8 left-8 z-20 items-center gap-3 px-4 py-2 rounded-full bg-[#07162c]/85 backdrop-blur-md border border-[#1D63D8]/35 text-[10px] tracking-widest text-[#B3C5DE] uppercase select-none pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#F2C14E] animate-pulse" />
        <span className="text-[#F2C14E] font-bold">PAPER ART :</span>
        <span ref={statusRef} className="font-mono text-white tracking-wider">READY AT PLATFORM</span>
        <span className="text-white/25">|</span>
        <span ref={pctRef} className="text-[#8EA4C4] font-mono">[0%]</span>
      </div>
    </div>
  );
};

export default InteractiveBackground;

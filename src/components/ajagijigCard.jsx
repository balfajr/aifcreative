import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, animate, useTransform, useAnimationFrame } from "framer-motion";

const AJ = [
  new URL("../assets/ajagijigfamilia/ajagijig-1.webp", import.meta.url).href,
  new URL("../assets/ajagijigfamilia/ajagijig-2.webp", import.meta.url).href,
  new URL("../assets/ajagijigfamilia/ajagijig-3.webp", import.meta.url).href,
  new URL("../assets/ajagijigfamilia/ajagijig-4.webp", import.meta.url).href,
  new URL("../assets/ajagijigfamilia/ajagijig-5.webp", import.meta.url).href,
  new URL("../assets/ajagijigfamilia/ajagijig-6.webp", import.meta.url).href,
  new URL("../assets/ajagijigfamilia/ajagijig-7.webp", import.meta.url).href,
];

// objek kartu
const CARDS = AJ.map((src, i) => ({ id: i + 1, image: src }));
const STEP_DEG = 360 / CARDS.length; // sudut antar kartu

function Card({ image, rotationDeg, w, h, ring, onCenter, onHoverStart, onHoverEnd }) {
  return (
    <div
      className="absolute will-change-transform overflow-hidden"
      style={{
        width: w,
        height: h,
        transformStyle: "preserve-3d",
        transform: `rotateY(${rotationDeg}deg) translateZ(${ring}px)`,
        left: "50%",
        top: "50%",
        marginLeft: -w / 2,
        marginTop: -h / 2,
      }}
    >
      <motion.button
        type="button"
        className="relative w-full h-full rounded-2xl overflow-hidden group outline-none focus:ring-2 focus:ring-white/30"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        onClick={() => onCenter?.(rotationDeg)}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        aria-label={`Pusatkan foto`}
        style={{ cursor: "pointer", willChange: "transform" }}
      >
        <img
          src={image}
          alt="aj"
          draggable="false"
          className="w-full h-full transition-[filter] duration-300 ease-out filter grayscale group-hover:grayscale-0 group-active:grayscale-0"
          style={{ objectFit: "cover", aspectRatio: "4 / 3" }}
        />
        {/* tanpa title; hanya ring & shadow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
        <div className="pointer-events-none absolute inset-0 shadow-[0_10px_36px_rgba(0,0,0,0.22),0_6px_18px_rgba(0,0,0,0.18)]" />
      </motion.button>
    </div>
  );
}

export default function AjagijigCard({ className = "" }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  const [sz, setSz] = useState({ w: 320, h: 240, ring: 480 });

  useEffect(() => {
    const compute = () => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const stageW = rect.width;

      let w, h, ring;
      if (stageW >= 1280) { w = 360; h = 270; ring = 550; }
      else if (stageW >= 1024) { w = 320; h = 240; ring = 480; }
      else if (stageW >= 768) { w = 280; h = 210; ring = 420; }
      else if (stageW >= 640) { w = 240; h = 180; ring = 360; }
      else { w = 200; h = 150; ring = 300; }

      setSz({ w, h, ring });
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", compute);
    return () => { ro.disconnect(); window.removeEventListener("resize", compute); };
  }, []);

  // === SATU SUMBER ROTASI + AUTOPLAY ===
  const totalRot = useMotionValue(0);
  const playingRef = useRef(true);

  // Scroll halaman → set orientasi awal (opsional, kecil), hanya jika belum hover/interact
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start center", "end center"] });
  const scrollMap = useTransform(scrollYProgress, [0, 1], [0, -80]);
  useEffect(() => {
    const unsub = scrollMap.on("change", (v) => {
      if (!playingRef.current) return; // saat pause karena hover/click, jangan ganggu
      // blend ringan menuju v biar nggak "lompat"
      const current = totalRot.get();
      const target = current + (v - current) * 0.1;
      totalRot.set(target);
    });
    return () => unsub();
  }, [scrollMap, totalRot]);

  // Autoplay pelan & infinite
  const SPEED_DEG_PER_S = 8; // pelan (ubah 4–12 sesuai selera)
  useAnimationFrame((t, delta) => {
    if (!playingRef.current) return;
    const inc = -(SPEED_DEG_PER_S * (delta / 1000)); // minus = searah jarum jam
    let next = totalRot.get() + inc;
    // Jaga angka tetap kecil agar stabil
    if (next > 1e6 || next < -1e6) next = next % 360;
    totalRot.set(next);
  });

  // Hover pause di seluruh stage
  const handleHoverStart = () => { playingRef.current = false; };
  const handleHoverEnd = () => { playingRef.current = true; };

  // Helper wrap target terdekat
  const nearestTurn = (targetDeg, currentDeg) => {
    const k = Math.round((currentDeg - targetDeg) / 360);
    return targetDeg + 360 * k;
  };

  // Klik kartu -> pusatkan & tetap pause selama hover
  const centerCard = (cardAngleDeg) => {
    playingRef.current = false; // freeze saat interaksi
    const current = totalRot.get();
    const target = nearestTurn(-cardAngleDeg, current);
    animate(totalRot, target, { type: "spring", stiffness: 90, damping: 20, mass: 1.2 });
  };

  const { w, h, ring } = sz;

  return (
    <section ref={sectionRef} className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <div ref={stageRef} className="relative mx-auto w-full h-full max-w-7xl px-4 sm:px-6">
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: "1200px" }}
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
        >
          {/* 3D Ring */}
          <motion.div
            className="relative will-change-transform"
            style={{ rotateY: totalRot, transformStyle: "preserve-3d", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          >
            <div style={{ position: "relative", width: 1, height: 1, transformStyle: "preserve-3d" }}>
              {CARDS.map((c, i) => (
                <Card
                  key={c.id}
                  image={c.image}
                  rotationDeg={(i / CARDS.length) * 360}
                  w={w}
                  h={h}
                  ring={ring}
                  onCenter={centerCard}
                  onHoverStart={handleHoverStart}
                  onHoverEnd={handleHoverEnd}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

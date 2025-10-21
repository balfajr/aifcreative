import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion";

const AJ = [
  new URL("../assets/ajagijigfamilia/ajagijig-1.jpg", import.meta.url).href,
  new URL("../assets/ajagijigfamilia/ajagijig-2.jpg", import.meta.url).href,
  new URL("../assets/ajagijigfamilia/ajagijig-3.jpg", import.meta.url).href,
  new URL("../assets/ajagijigfamilia/ajagijig-4.jpg", import.meta.url).href,
  new URL("../assets/ajagijigfamilia/ajagijig-5.jpg", import.meta.url).href,
  new URL("../assets/ajagijigfamilia/ajagijig-6.jpg", import.meta.url).href,
  new URL("../assets/ajagijigfamilia/ajagijig-7.jpg", import.meta.url).href,
];

// bentuk objek kartu dari AJ
const CARDS = AJ.map((src, i) => ({
  id: i + 1,
  image: src,
}));

function Card({ image, title, rotationDeg, w, h, ring }) {
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
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden group"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <img
          src={image}
          alt={title}
          draggable="false"
          className="w-full h-full transition-[filter] duration-300 ease-out filter grayscale group-hover:grayscale-0 group-active:grayscale-0"
          style={{ objectFit: "cover", aspectRatio: "4 / 3" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-0 right-0 text-center px-3 pointer-events-none">
          <h3 className="text-white text-sm sm:text-base lg:text-lg font-semibold drop-shadow">
            {title}
          </h3>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
        <div className="pointer-events-none absolute inset-0 shadow-[0_10px_36px_rgba(0,0,0,0.22),0_6px_18px_rgba(0,0,0,0.18)]" />
      </motion.div>
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

  // scroll → rotasi
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const scrollRot = useTransform(scrollYProgress, [0, 1], [0, -240]);

  // drag → rotasi
  const dragRot = useMotionValue(0);
  const dragStartRot = useRef(0);
  const DRAG_FACTOR = -0.3;
  const onDragStart = () => { dragStartRot.current = dragRot.get(); };
  const onDrag = (_e, info) => { dragRot.set(dragStartRot.current + info.offset.x * DRAG_FACTOR); };
  const onDragEnd = (_e, info) => { dragRot.set(dragRot.get() + info.velocity.x * DRAG_FACTOR * 0.3); };

  // gabungan
  const rotateY = useSpring(useTransform([scrollRot, dragRot], ([s, d]) => s + d), {
    stiffness: 70, damping: 18, mass: 0.9,
  });

  const { w, h, ring } = sz;

  return (
    <section ref={sectionRef} className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <div ref={stageRef} className="relative mx-auto w-full h-full max-w-7xl px-4 sm:px-6">
        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1200px" }}>
          <motion.div
            className="relative select-none cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            style={{ rotateY, transformStyle: "preserve-3d", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          >
            <div style={{ position: "relative", width: 1, height: 1, transformStyle: "preserve-3d" }}>
              {CARDS.map((c, i) => (
                <Card
                  key={c.id}
                  image={c.image}
                  title={c.title}
                  rotationDeg={(i / CARDS.length) * 360}
                  w={w}
                  h={h}
                  ring={ring}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

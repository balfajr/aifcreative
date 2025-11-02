import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PageBreak from "./infinitepagebreak"; 

const heroCopy =
  "AIF Creative is a playground for bold thinkers and boundary-benders. We don’t chase trends — we create motion. From concept to chaos, we craft experiences that move, shift, and stick.";

export default function Hero() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.35, triggerOnce: true });
  useEffect(() => { if (inView) controls.start("visible"); }, [controls, inView]);

  return (
    <section className="relative isolate flex min-h-dvh flex-col bg-black font-space">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-bl from-black via-stone-950 to-black [background-size:400%_400%] animate-gradient" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <div className="absolute -top-40 left-0 h-64 w-64 rounded-full bg-black blur-3xl mix-blend-overlay animate-pulse" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-black blur-3xl mix-blend-overlay animate-pulse" />
      </div>

      {/* Teks di bawah + jarak 10 */}
      <div className="mt-auto mx-auto w-full max-w-7xl px-4 md:px-8 px-safe mb-10">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, x: -40 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22,1,0.36,1] } },
          }}
          className="
            max-w-5xl text-left text-cream tracking-tighter font-extrabold
            leading-tight md:leading-[1.08]
            text-[22px] sm:text-[28px] md:text-[38px] lg:text-[48px] xl:text-[58px]
          "
        >
          {heroCopy}
        </motion.p>
      </div>

    </section>
  );
}

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PageBreak from "./infinitepagebreak";

const heroCopy =
  "AIF Creative is a playground for bold thinkers and boundary-benders. We don’t chase trends — we create motion. From concept to chaos, we craft experiences that move, shift, and stick.";

const Hero = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="relative isolate overflow-hidden bg-black font-space">
      {/* Background Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-bl from-black via-stone-950 to-black animate-gradient bg-[length:400%_400%]" />

      {/* Overlay Patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-40 left-0 h-64 w-64 rounded-full bg-black blur-3xl mix-blend-overlay animate-pulse" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-black blur-3xl mix-blend-overlay animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl items-end px-6 pb-[clamp(3rem,6vw,6rem)] pt-[clamp(4rem,10vw,7rem)] md:px-10 lg:px-16 safe-px">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="hero-prose max-w-5xl text-balance text-cream text-[clamp(1.75rem,4vw,3.5rem)] font-semibold leading-[1.15] tracking-normal"
        >
          {heroCopy}
        </motion.p>
      </div>

      <PageBreak />
    </section>
  );
};

export default Hero;

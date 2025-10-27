import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PageBreak from "./infinitepagebreak";

const Hero = () => {
  const text = "In the World of Endless Possibilities, We Help You Discover the Extraordinary.";

  const ctrls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    } else {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  const characterAnimation = {
    hidden: { opacity: 0, y: `0.25em` },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  return (
    <div className="font-space h-screen overflow-hidden relative">
      {/* Background Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-bl from-black via-stone-950 to-black animate-gradient bg-[length:400%_400%]"></div>

      {/* Overlay Patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-100 left-0 w-96 h-96 bg-black rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-10 h-full flex items-end">
        <motion.div
          className="text-4xl md:text-7xl tracking-normal leading-tight md:leading-tight font-semibold text-cream max-w-4xl"
          ref={ref}
          initial="hidden"
          animate={ctrls}
          variants={wordAnimation}
          transition={{ delayChildren: 1, staggerChildren: 0.05 }}
        >
          {text.split(" ").map((word, index) => (
            <motion.span 
              key={index} 
              className="inline-block mr-3 mb-1" 
              variants={wordAnimation}
            >
              {word.split("").map((char, i) => (
                <motion.span 
                  key={i} 
                  className="inline-block" 
                  variants={characterAnimation}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <PageBreak />
    </div>
  );
};

export default Hero;
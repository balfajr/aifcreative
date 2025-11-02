import { motion } from "framer-motion";
import Logo from "../assets/aifmulticolor.webp";

const Preloader = ({ setLoading }) => {
  return (
    <motion.div
      className="min-h-[100dvh] min-h-dvh bg-black flex flex-col justify-center items-center fixed inset-0 z-50"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }} // Animasi keluar lebih smooth
      transition={{ delay: 1, duration: 1, ease: "easeOut" }}
      onAnimationComplete={() => setLoading(false)}
    >
      <motion.img
        src={Logo}
        className="w-1/2"
        alt="logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="text-center text-cream absolute bottom-4 font-mono text-sm px-4"
      >
        @TRADEMARK AIF CREATIVE<br />
        ALL RIGHTS RESERVED BY AIF CREATIVE.
      </motion.p>
    </motion.div>
  );
};

export default Preloader;

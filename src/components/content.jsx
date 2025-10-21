import { motion } from "framer-motion";
import OOTB from "../components/SVG/Artboard 1.svg?react"; 

const Content = () => {
  return (
    <div className="bg-black h-full p-4 font-space px-4 md:px-8">
      {/* Main Section */}
      <motion.div 
        className="max-w-7xl mx-auto font-space my-10 text-4xl mb-4 md:text-6xl text-cream xl text-left font-extrabold tracking-wide"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <span className="text-white/70 font-extralight italic text-sm">We Are</span>&nbsp;
        <span>
          Master of Event Planning — Here's <br />
          <span className="hidden md:inline ml-4">&nbsp;&nbsp;</span> How We Do It
        </span>
      </motion.div>

      {/* Kontainer Utama Konten Biru */}
      <motion.div
        className="max-w-7xl bg-pink mt-10 mx-auto h-fit rounded-t-4xl p-8 md:p-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Kontainer FLEX utama: diubah menjadi flex-row di layar besar */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-4">

          {/* === Kolom Kiri (untuk semua teks) === */}
          <div className="flex flex-col md:w-5/6 gap-6">
            <motion.p
              className="text-white text-4xl md:text-5xl leading-tight font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              We provide the best services with <br />
              <motion.span
                className="text-yellow font-bold"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                viewport={{ once: true }}
              >
                out of the box
              </motion.span>{" "}
              idea
            </motion.p>
            
            {/* Paragraf Deskripsi */}
            <motion.p
              className="text-cream text-sm font-extralight leading-relaxed tracking-tight md:text-lg w-full text-justify"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.2 }}
              viewport={{ once: true }}
            >
              At AIF, we believe that true innovation is a dynamic journey—one
              that challenges conventions, embraces collaboration, and adapts to
              ever-evolving possibilities. Through our{" "}
              <span className="font-bold">"Break It, Make It, Flux It"</span>{" "}
              philosophy, we empower individuals and organizations to
              deconstruct limits, build meaningful solutions, and remain fluid
              in the face of change.
            </motion.p>
          </div>

          {/* === Kolom Kanan (untuk SVG) === */}
          <motion.div
            className="flex items-center justify-center md:w-2/6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            viewport={{ once: true }}
          >
            {/* Kunci: h-full membuat SVG mengisi tinggi kolom */}
            <OOTB className="w-full h-auto md:max-h-[330px]" /> 
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Content;
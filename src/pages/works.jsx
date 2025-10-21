// src/pages/WorksPage.jsx

import Navbar from '../components/navbar';
import Projects from '../components/Projects'; // 1. Impor komponen Projects Anda
import { motion } from 'framer-motion';
import Footer from '../components/footer';

const works = () => {
  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen pt-24">
        
        {/* Judul Halaman */}
        <motion.div 
          className="max-w-7xl mx-auto px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white font-space">
            Our <span className="text-white/70 font-light">Works</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mt-2 font-thin">
            A showcase of our passion, creativity, and successful collaborations.
          </p>
        </motion.div>

        {/* 2. Tampilkan komponen Projects di dalam halaman ini */}
        <Projects />

        <Footer />

      </div>
    </>
  );
};

export default works;
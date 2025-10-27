import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { PROJECTS } from '../data/projects';



const works = () => {
   const [q, setQ] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Semua event; urutkan terbaru dulu
  const all = useMemo(() => {
    return [...PROJECTS].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);

  // Simple search by title/client/event
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return all;
    return all.filter(p => {
      const hay = `${p.title} ${p.client} ${p.event} ${p.description}`.toLowerCase();
      return hay.includes(term);
    });
  }, [q, all]);

  // Helpers modal slideshow
  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImage(0);
    // lock scroll body
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImage(0);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    if (!selectedProject) return;
    setCurrentImage((i) => (i + 1) % selectedProject.images.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setCurrentImage((i) => (i - 1 + selectedProject.images.length) % selectedProject.images.length);
  };

  // Esc to close
  useEffect(() => {
    const onKey = (e) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject]);

  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen pt-24">
        <motion.div
          className="max-w-7xl mx-auto px-4"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-cream font-space">
            Our <span className="text-cream/70 font-light">Works</span>
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mt-2 font-thin">
            A showcase of our passion, creativity, and successful collaborations.
          </p>

          {/* Search */}
          <div className="mt-6">
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search by title, client, event..."
              className="w-full md:w-1/2 px-4 py-2 rounded-xl bg-white/10 text-cream placeholder-white/50 outline-none"
            />
          </div>
        </motion.div>

        {/* GRID SEMUA EVENT */}
        <div className="max-w-7xl my-8 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {filtered.map((project, i) => (
            <motion.button
              type="button"
              key={`works-${project.id}`}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              className="text-left rounded-xl overflow-hidden bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 hover:bg-white/10"
              onClick={() => openModal(project)}
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              <div className="p-4 text-cream">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-cream/80">{project.description}</p>
                <p className="text-cream/50 text-sm mt-1">Date: {project.date}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <Footer />
      </div>

      {/* MODAL SHOWCASE: hanya foto + nama event */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key={`overlay-${selectedProject.id}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
              className="relative bg-black/90 rounded-2xl w-full max-w-5xl p-4 md:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                className="absolute -top-3 -right-3 md:-top-4 md:-right-4 text-cream bg-black/80 border border-white/10 rounded-full p-2 hover:bg-white/10"
                onClick={closeModal}
                aria-label="Close"
              >
                ✕
              </button>

              {/* Image */}
              <div className="relative">
                <motion.img
                  key={`img-${selectedProject.id}-${currentImage}`}
                  src={selectedProject.images[currentImage]}
                  alt={`${selectedProject.title} ${currentImage + 1}`}
                  className="w-full h-[60vh] md:h-[70vh] object-cover rounded-xl"
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.35 }}
                />

                {/* Nav arrows */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 text-cream rounded-full p-2 md:p-3"
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      ❮
                    </button>
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 text-cream rounded-full p-2 md:p-3"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      ❯
                    </button>
                  </>
                )}
              </div>

              {/* Event title only */}
              <h3 className="text-cream text-xl md:text-2xl font-bold mt-4 text-center">
                {selectedProject.title}
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default works;
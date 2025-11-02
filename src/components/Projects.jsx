import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import Catur from "../assets/checkered.svg";
import { PROJECTS } from "../data/projects";

const colors = ["bg-red-500","bg-pink-500","bg-orange-300","bg-blue-600","bg-green-400","bg-red-400"];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Urutkan berdasarkan tanggal (terbaru dulu), ambil 6 pertama
  const latest = useMemo(() => {
    return [...PROJECTS]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % selectedProject.images.length);
  };
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
  };

  return (
    <div className="min-h-[100dvh] min-h-dvh bg-black font-space p-4 relative px-safe pb-safe">
      <img src={Catur} alt="Catur" className="w-10 absolute left-5 top-5" />
      <div className="max-w-7xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.2 }} viewport={{ once: true }}
          className='font-thin text-cream self-end mt-11 text-right text-3xl md:text-4xl'
        >
          (<span className='font-bold'>Our</span> Latest Work)
        </motion.p>
      </div>

      {/* GRID 6 TERBARU */}
      <div className="max-w-7xl my-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
        {latest.map((project, index) => (
          <motion.div
            key={`card-${project.id}`} // key unik & stabil
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            whileHover={{ scale: 1.02 }}
            className="group relative cursor-pointer overflow-hidden rounded-xl"
            onClick={() => { setSelectedProject(project); setCurrentImage(0); }}
          >
            <div className={`pointer-events-none absolute inset-0 -z-10 ${colors[index % colors.length]} mix-blend-multiply hover:mix-blend-soft-light transition-all`} />
            <img
              src={project.images[0]}
              alt={project.title}
              className="relative z-10 w-full h-64 object-cover hover:brightness-100 transition-all"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 text-cream">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-sm opacity:80">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key={`modal-${selectedProject.id}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-black/90 rounded-xl max-w-3xl w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-4 -right-4 text-cream bg-black rounded-full p-2 hover:bg-white/10 transition-all"
                onClick={() => setSelectedProject(null)}
                aria-label="Close"
              >
                ✕
              </button>

              <div className="relative">
                <motion.img
                  key={`img-${selectedProject.id}-${currentImage}`}
                  src={selectedProject.images[currentImage]}
                  alt={`${selectedProject.title} ${currentImage + 1}`}
                  className="w-full h-96 object-cover rounded-lg"
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.4 }}
                />
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full text-cream hover:bg-white/40"
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                >❮</button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full text-cream hover:bg-white/40"
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                >❯</button>
              </div>

              <h3 className="text-2xl text-cream font-bold mt-4">{selectedProject.title}</h3>
              <p className="text-cream mb-2">{selectedProject.modalDescription || selectedProject.description}</p>
              <div className="text-cream/80 mb-2">
                <p>{selectedProject.client || ""}</p>
                <p>{selectedProject.event || ""}</p>
                <p>{selectedProject.project || ""}</p>
                <p>{selectedProject.content || ""}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <p className="mx-auto text-cream text-base font-thin md:text-3xl md:ml-2">
          Every project tells a story—<span className="font-bold">this is ours</span>.
        </p>
      </div>
    </div>
  );
};

export default Projects;

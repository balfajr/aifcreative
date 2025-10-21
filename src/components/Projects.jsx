import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Catur from '../assets/checkered.svg';

const astranauts = Array.from({ length: 5 }, (_, i) => `/src/assets/astranauts/astranauts-${i + 1}.jpg`);

const marathon = Array.from({ length: 6 }, (_, i) => `/src/assets/astra-marathon/marathon-${i + 1}.jpg`);

const booth = Array.from({ length: 6 }, (_, i) => `/src/assets/astra-booth/astra-booth-${i + 1}.jpg`);

const beyondtech = Array.from({ length: 5 }, (_, i) => `/src/assets/beyondtech/beyondtech-${i + 1}.jpg`);

const AWM = Array.from({ length: 5 }, (_, i) => `/src/assets/AWM/awm-${i + 1}.jpeg`);

const SIA = Array.from({ length: 6 }, (_, i) => `/src/assets/SIA/SIA-${i + 1}.jpg`);

const colors = [
  "bg-red-500", "bg-pink-500", "bg-orange-300",
  "bg-blue-600", "bg-green-400", "bg-red-400"
];

const projects = [
  {
    id: 1,
    title: "Astranauts 2024",
    description: "Awarding",
    client: "Client: Astra",
    event: "Event By: Level Tujuh",
    project: "Project Team: AIF Creative",
    content: "Content & Multimedia: AIF Creative",
    images: astranauts
  },
  {
    id: 2,
    title: "Astra Half Marathon 2024", 
    description: "Event",
    client: "Client: Astra",
    event: "Event By: Level Tujuh",
    project: "Project Team: AIF Creative",
    content: "Content & Multimedia: AIF Creative",
    images: marathon 
    },
  {
    id: 3,
    title: "Astra Like Fest 2",
    description: "Activation",
    client: "Client: Astra",
    event: "Event By: Level Tujuh",
    project: "Project Team: AIF Creative",
    content: "Content & Multimedia: AIF Creative",
    images: booth
  },
  {
    id: 4,
    title: "BeyondTech App Launching",
    description: "Event",
    client: "Client: BeyondTech",
    event: "Event By: AIF Creative",
    project: "Project Team: AIF Creative",
    content: "Content & Multimedia: AIF Creative",
    images: beyondtech
  },
  {
    id: 5,
    title: "Asean Weekend Market 2023",
    description: "Event",
    client: "Client: Kadin",
    event: "Event By: DWKOM",
    project: "Project Team: AIF Creative",
    content: "Content & Multimedia: AIF Creative",
    images: AWM
  },
  {
    id: 6,
    title: "14th Satu Indonesia Awards",
    description: "Event",
    client: "Client: Astra",
    event: "Event By: Level Tujuh",
    project: "Project Team: AIF Creative",
    content: "Content & Multimedia: AIF Creative",
    images: SIA
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % selectedProject.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
  };

  return (
    <div className="min-h-screen bg-black font-space p-4 relative">
      <img src={Catur} alt="Catur" className="w-10 absolute left-5 top-5" />
      <div className="max-w-7xl mx-auto">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        viewport={{ once: true }}
        className='font-thin text-white self-end mt-11 text-right text-3xl md:text-4xl'>
        (<span className='font-bold'>Our</span> Latest Work)
      </motion.p>

      </div>
      <div className="max-w-7xl my-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="group relative cursor-pointer overflow-hidden rounded-xl"
            onClick={() => { setSelectedProject(project); setCurrentImage(0); }}
          >
            <div className={`absolute inset-0 ${colors[index % colors.length]} mix-blend-multiply hover:mix-blend-soft-light transition-all`} />
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-64 object-cover hover:brightness-100 transition-all" 
            />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-sm opacity-80">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-black/90 rounded-xl max-w-3xl w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-4 -right-4 text-white bg-black rounded-full p-2 hover:bg-white/10 transition-all"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>
              <div className="relative">
                <motion.img
                  key={selectedProject.images[currentImage]}
                  src={selectedProject.images[currentImage]}
                  alt={`Image ${currentImage + 1}`}
                  className="w-full h-96 object-cover rounded-lg"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                />
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-2 rounded-full text-white hover:bg-white/40"
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                >
                  ❮
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-2 rounded-full text-white hover:bg-white/40"
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                >
                  ❯
                </button>
              </div>
              <h3 className="text-2xl text-white font-bold mt-4">{selectedProject.title}</h3>
              <p className="text-white mb-2">{selectedProject.modalDescription || selectedProject.description}</p>
              <div className="text-white/80 mb-2 flex-col">
                <p>{selectedProject.client || ""}</p>
                <p>{selectedProject.event || ""}</p>
                <p className="text-white/80">{selectedProject.project || ""}</p>
                <p className="text-white/80">{selectedProject.content || ""}</p>
              </div>
             
            </motion.div>
          </motion.div>
        )}
        <div className="max-w-7xl mx-auto">
          <p className="mx-auto text-white text-base font-thin md:text-3xl md:ml-2">Every project tells a story—<span className="font-bold">this is ours</span>.</p>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Projects;
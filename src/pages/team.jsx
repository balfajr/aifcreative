import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { AiFillInstagram } from 'react-icons/ai';
import NavBar from '../components/navbar.jsx';
import Footer from '../components/footer';
import heinzImage from '../assets/profile/heinz.jpg';
import bejoImage from '../assets/profile/bejo.jpg';
import axcelImage from '../assets/profile/axcel.jpg';
import imamImage from '../assets/profile/imam.jpg';
import yogaImage from '../assets/profile/ybt.jpg';
import ranggaImage from '../assets/profile/rangga.jpg';
import raditaImage from '../assets/profile/radita.jpg';
import andrieImage from '../assets/profile/andrie.jpg';
import andriantoImage from '../assets/profile/andrianto.jpg';
import sendraImage from '../assets/profile/sendra.jpg';
import PageBreak from "../components/infinitepagebreak";
import AjagijigCard from "../components/ajagijigCard";
import ajLogo from '../assets/ajagijigfamilia/ajagijiglogo.jpg'; 









const TeamPage = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    { name: 'Heinz Monterie', position: 'Comissioner', image: heinzImage, instagram: 'https://instagram.com/heinzzem' },
    { name: 'Zulfi Fauzi', position: 'Chief Executive Officer', image: bejoImage, instagram: 'https://instagram.com/zow_zow' },
    { name: 'Andrie Aulia Akbar', position: 'Chief Finance Officer', image: andrieImage, instagram: 'https://instagram.com/andrieboi' },
    { name: 'Imam Luthfi', position: 'Creative Director', image: imamImage, instagram: 'https://instagram.com/mamskii' },
    { name: 'Andrianto', position: 'Production Director', image: andriantoImage, instagram: 'https://instagram.com/kingdobol' },
    { name: 'Yoga Boytama', position: 'Operation Manager', image: yogaImage, instagram: 'https://instagram.com/ygbytm' },
    { name: 'Rangga Tampubolon', position: 'Operation Supervisor', image: ranggaImage, instagram: 'https://instagram.com/ranggatampubolon' },
    { name: 'Axcel Adam Purnomo', position: 'Head Account Manager', image: axcelImage, instagram: 'https://instagram.com/aaxcel' },
    { name: 'Radita Bahri', position: 'Creative Manager', image: raditaImage, instagram: 'https://instagram.com/raditabahri' },
    { name: 'Sendra Ahmad', position: 'Creative Designer', image: sendraImage, instagram: 'https://instagram.com/sendraahmad' },
  ];
  
  // Animation variants for the grid container
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger the animation of children
      },
    },
  };

  // Animation variants for each team member card
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  // Animation for the modal backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };


  // Counter
function Counter({ from = 0, to = 1000, duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6, once: true });
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      setVal(Math.floor(from + (to - from) * p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView]);

  return <span ref={ref}>{val.toLocaleString()}+</span>;
}



  // Animation for the modal itself
  const modalVariants = {
    hidden: {
      y: "-50px",
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
        y: "50px",
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.2,
            ease: "easeIn"
        }
    }
  };


  return (
    <div>
      <NavBar />
      <div className="bg-black font-space min-h-screen py-16 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className="text-center mb-16"
          >
            <h1 className="text-4xl font-serif font-medium text-cream mb-4">
              Meet the team that <br />
              makes the <span className="italic">magic</span> happen
            </h1>
            <p className="text-lg text-cream/50 max-w-2xl mx-auto">
            Step into the world of our extraordinary event architects—a vibrant tapestry of creative minds, design maestros, and logistical wizards from diverse backgrounds, united by their passion for transforming your vision into unforgettable experiences.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={gridContainerVariants}
            initial="hidden"
            animate="show"
          >
            {teamMembers.map((member, index) => (
              <motion.div
              key={member.name}
              className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer"
              onClick={() => setSelectedMember(member)}
              variants={cardVariants}
              whileHover={{
                borderRadius: "16px",
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
            
                <div
                  style={{ backgroundImage: `url(${member.image})` }}
                  className="w-full h-64 bg-cover bg-center"
                  aria-label={member.name}
                >
                </div>
                <div className="p-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.position}</p>
                </div>
                <div className={`h-1 ${
                  index % 4 === 0 ? 'bg-yellow-400' : 
                  index % 4 === 1 ? 'bg-blue-400' : 
                  index % 4 === 2 ? 'bg-green-400' : 
                  'bg-purple-400'
                }`}></div>
              </motion.div>
            ))}
          </motion.div>
        <div>
          <p className="mt-6 text-4xl text-left text-cream">
  We’ve delivered <span className="font-semibold text-cream"><Counter to={99} /></span> projects.
          </p>
          <p className='text-left mt-4 text-cream text-sm'>
            Across brands and industries—with outcomes that matter.
          </p>

        </div>
      </div>
        </div>
      <PageBreak />

      {/* === Meet Our Man Power Team === */}
<section className="relative font-space overflow-hidden bg-black mx-auto  text-cream px-4 md:px-6 py-12 md:py-16">
  <div className="max-w-5xl mx-auto">

  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight  text-cream">
    Meet Our Man Power Team
  </h2>
  <p className="mt-3 text-cream/60 max-w-2xl">
    The backbone of every successful event.
  </p>
  <p className="mt-1 text-cream/60 max-w-3xl">
    With our trusted manpower partners, we’ve powered concerts, festivals, and corporate shows—
    bringing energy, discipline, and seamless execution on ground.
  </p>
  <div className="m-20 h-[70px] sm:h-[380px] md:h-[420px]">
    <AjagijigCard />
  </div>
  {/* Instagram partners – clean desktop, tetap bagus di mobile */}
<div className="mt-12">
  <a
    href="https://instagram.com/ajagijig_familia"
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6
               rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08]
               transition-shadow hover:shadow-[0_12px_40px_rgba(0,0,0,.35)]
               p-5 sm:p-6 lg:p-7"
  >
    {/* Logo */}
    <div className="shrink-0">
      <div className="h-14 w-14 sm:h-16 sm:w-16 lg:h-16 lg:w-16 rounded-full bg-black ring-1 ring-white/20 shadow
                      grid place-items-center overflow-hidden">
        <img src={ajLogo} alt="AJAGIJIG FAMILIA" className="h-13 w-13 object-contain" />
      </div>
    </div>

    {/* Text */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        <h3 className="text-cream font-semibold leading-tight text-base sm:text-lg lg:text-xl">
          AJAGIJIG FAMILIA
        </h3>
        <span className="hidden sm:inline text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/75">
          Manpower Partner
        </span>
      </div>
      <div className="text-cream/60 text-sm">@ajagijig_familia</div>

      <p className="mt-3 text-sm sm:text-base text-cream/60 leading-relaxed max-w-3xl">
        Trusted manpower partner for large-scale shows—crowd control, stage ops, and field execution.
      </p>

      <div className="mt-4">
        <span className="inline-flex items-center gap-2 text-xs sm:text-sm text-cream/90 group-hover:underline">
          View Instagram
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L14 5.414V17a1 1 0 11-2 0V5.414L9.707 8.121A1 1 0 018.293 6.707l4-4z" />
          </svg>
        </span>
      </div>
    </div>

      {/* icon IG (desktop only) */}
    <div className="hidden lg:flex opacity-60 group-hover:opacity-100 transition self-center">
      <AiFillInstagram size={24} />
    </div>


    {/* subtle divider */}
    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </a>
</div>

  

  </div>
</section>



      <Footer />

      {/* Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-96 shadow-lg relative"
              variants={modalVariants}
            >
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 z-10"
                onClick={() => setSelectedMember(null)}
              >
                &times;
              </button>
              <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-auto object-cover rounded-md mb-4" />
              <h3 className="text-xl font-medium text-gray-900">{selectedMember.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{selectedMember.position}</p>
              <a href={selectedMember.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-pink-500 hover:text-pink-700 transition-colors">
                <AiFillInstagram size={24} className="mr-2" /> Follow on Instagram
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default TeamPage;
import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowDownLeft } from "react-icons/fi";

// --- Sub-component for displaying labeled information ---
// This component now includes logic to make specific labels clickable.
const UnderlinedLabel = ({ label, value }) => {

  // Generates the appropriate hyperlink based on the label.
  const generateLink = () => {
    switch (label) {
      case 'ADDRESS':
        // Creates a Google Maps search URL.
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
      case 'PHONE':
        // Creates a WhatsApp "click to chat" link.
        const phoneNumber = value.replace(/\D/g, '');
        return `https://wa.me/${phoneNumber}`;
      case 'MAIL':
        // Creates a standard "mailto" link.
        return `mailto:${value}`;
      default:
        return null;
    }
  };

  const href = generateLink();

  // The original layout and design of your UnderlinedLabel is preserved here.
  // We only add the anchor tag `<a>` if a link is generated.
  return (
    <motion.div 
      className="mb-6 overflow-hidden"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex justify-between items-baseline py-2 gap-2">
        <span className="text-white/80 font-medium">{label}</span>
        {href ? (
          <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 font-medium hover:text-white transition-colors cursor-pointer"
          >
            {value}
          </a>
        ) : (
          <span className="text-white/60 font-medium">{value}</span>
        )}
      </div>
      <motion.div 
        className="w-full h-px bg-gray-300"
        initial={{ opacity: 0.7 }}
        whileHover={{ opacity: 1, backgroundColor: "#FFF" }} // Changed to white for better visibility on hover
      />
    </motion.div>
  );
};


// --- Main Footer Component (Original Layout) ---
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const links = [
    { name: "HOME", href: "/" },
    { name: "WORKS", href: "/works" },
    { name: "MEET OUR TEAM", href: "/team" },
    { name: "CONTACT", href: "/contact" },
    { name: "BACK TO TOP", action: scrollToTop },
  ];

  return (
    // The main container with your original classes
    <div className='h-full bg-black font-space relative overflow-hidden border-t border-white/80'>
      {/* This section is restored from your original code */}
      {/* <div className="max-w-7xl mx-auto flex flex-row h-full justify-between items-end py-7">
        <motion.div
          className="text-2xl md:text-5xl font-bold text-white text-start p-4 md:w-3/5 mb-8 md:mb-0"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
        <span className="font-thin">Your Ideas Deserve the Spotlight—</span>Let’s Make Them Shine
        </motion.div>
        <FiArrowDownLeft className="text-white text-9xl self-center md:self-end" />
      </div> 
      */}

      {/* The main content area with your original layout */}
      <div className="border-t-2 border-white/60">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center py-7 p-4">
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.href || "#"}
              onClick={link.action || undefined}
              className="relative text-sm md:text-xl text-cream/70 hover:text-white text-center group cursor-pointer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              {link.name}
              {/* This span for the underline animation is from your original code */}
              <motion.span
                className="absolute left-0 -bottom-1 w-full h-[1px] bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 0 }} // Start with no underline
                whileHover={{ scaleX: 1 }} // Show underline on hover
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        <div className='max-w-7xl mt-10 mx-auto px-8 flex flex-col md:flex-row md:gap-14 justify-center items-center'>
          <span className='text-cream text-5xl md:text-7xl font-extrabold font-space text-center leading-12 md:leading-20'>GET IN <br />TOUCH</span>
          <div className='flex-col font-space text-right grow w-full'>
            {/* The functional UnderlinedLabel is used here */}
            <UnderlinedLabel label="ADDRESS" value="Jalan Kemang Timur Raya No 29 Bangka Mampang Prapatan, Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12730" />
            <UnderlinedLabel label="PHONE" value="+62 813-1156-5794" />
            <UnderlinedLabel label="MAIL" value="aifcreative@gmail.com" />
          </div>
        </div>
        <p className='text-creamm/50 mx-auto text-xs text-center w-2/3 my-8'>@TRADEMARK AIF CREATIVE
          UNLESS EXPLICITLY STATED OTHERWISE, ALL RIGHTS INCLUDING THOSE IN COPYRIGHT IN THE CONTENT OF THIS 
          DOCUMENTS, LOGOS, TRADEMARKS, DESIGNS, ARE OWNED BY OR CONTROLLED FOR THESE PURPOSED BY AIF CREATIVE
        </p>
      </div>

      {/* Infinite Text Slider Section with your original design */}
      <div className="relative overflow-hidden flex items-center justify-center">
        <motion.div 
          className="relative px-8 py-2 text-cream text-3xl md:text-4xl font-bold overflow-hidden"
          style={{
            background: 'linear-gradient(45deg, #FF5554, #FF0057, #5C32AE, #4A29FE, #35EA77, #FFC101)',
            backgroundSize: '200% 200%',
            borderRadius: '0px'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            backgroundPosition: {
              repeat: Infinity,
              duration: 4,
              ease: 'linear',
            },
          }}
        >
          <motion.div 
            className="whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 8,
                ease: "linear",
              },
            }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="inline-block mx-4">
                BREAK IT <span className="mx-2">→</span> MAKE IT <span className="mx-2">→</span> FLUX IT <span className="mx-2">→</span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>      
    </div>
  );
};

export default Footer;

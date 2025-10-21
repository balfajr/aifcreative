import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Client = () => {
  const logos = [
    {
      src: new URL("../assets/clients/astra.png", import.meta.url).href,
      alt: "astra",
    },
    {
      src: new URL("../assets/clients/beyondtech.png", import.meta.url).href,
      alt: "beyondtech",
    },
    {
      src: new URL("../assets/clients/elite-academy.png", import.meta.url).href,
      alt: "elite-academy",
    },
    {
      src: new URL("../assets/clients/hyundai.png", import.meta.url).href,
      alt: "hyundai",
    },
    {
      src: new URL("../assets/clients/kadin.png", import.meta.url).href,
      alt: "kadin",
    },
    {
      src: new URL("../assets/clients/kementrianPerdagangan.png", import.meta.url).href,
      alt: "kementrianPerdagangan",
    },
    {
      src: new URL("../assets/clients/kementrianPerkerjaan.png", import.meta.url).href,
      alt: "kementrianPerkerjaan",
    },
    {
      src: new URL("../assets/clients/telkomsel.png", import.meta.url).href,
      alt: "telkomsel",
    },
  ];
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="bg-black h-full p-4 font-space pb-20">
      {/* Title */}
      <motion.div
        className="text-center mt-8 text-xl md:text-2xl text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        (Our <span className="font-bold">Satisfied Clients</span>)
      </motion.div>

      {/* Infinite Scrolling Logos */}
      <div className="relative mt-8 overflow-hidden py-4 bg-white rounded-xl shadow-lg">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex items-center"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          {duplicatedLogos.map((logo, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 mx-8"
              style={{ width: "160px", height: "80px" }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-full h-full object-contain filter drop-shadow-lg"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="font-space mx-auto px-4 flex flex-col gap-3">
        <p className="text-center text-white text-2xl mt-8 md:w-2/3 md:self-center">
          Their satisfaction isn't just a result—it's a reflection of our team's
          expertise, passion, and commitment to groundbreaking innovation
        </p>

        <Link to="/team" className="self-center mt-10">
          <motion.button
            className="relative group md:w-fit w-fit px-2 py-4 text-sm md:text-lg font-semibold text-white bg-pink rounded-lg transition-all shadow-[4px_4px_0px_#011]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, translateY: 1, boxShadow: 'none' }}
          >
            <span className="relative inline-block">
              Meet the Masters of <span className="font-thin">Creativity</span>
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white transition-all duration-300 scale-x-100 group-hover:scale-x-0"></span>
            </span>
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Client;

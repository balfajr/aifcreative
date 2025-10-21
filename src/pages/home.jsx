import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import PageBreak from "../components/infinitepagebreak";
import Content from "../components/content";
import Preloader from "../components/preLoader";
import Services from "../components/services";
import Project from "../components/Projects.jsx";
import Clients from "../components/client";
import Footer from "../components/footer";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setShowContent(true);
      }, 1100);
    }
  }, [loading]);

  return (
    <div>
      <AnimatePresence mode="wait">
        {loading && <Preloader setLoading={setLoading} />}
      </AnimatePresence>

      {showContent && (
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Navbar />
          <Hero />
          <PageBreak />
          <Content />
          <Services />
          <Project  />
          <Clients />
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

export default Home;

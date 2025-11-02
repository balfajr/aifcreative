import { motion } from 'framer-motion';

const InfiniteCheckerboard = () => {
  return (
    <div className="w-full h-4 overflow-hidden relative bg-black">
      <motion.div 
        className="absolute top-0 left-0 flex"
        animate={{ x: [0, -24] }} 
        transition={{ 
          repeat: Infinity, 
          duration: 1, 
          ease: "linear" 
        }}
      >
        {/* Duplicate pattern untuk seamless loop */}
        {[0, 1].map((duplicate) => (
          <div key={duplicate}>
            {/* Row 1: hitam cream hitam cream... */}
            <div className="flex">
              {[...Array(200)].map((_, i) => (
                <div 
                  key={`r1-${i}`} 
                  className={`w-2 h-2 ${i % 2 === 0 ? 'bg-black' : 'bg-amber-50'}`}
                />
              ))}
            </div>
            {/* Row 2: cream hitam cream hitam... */}
            <div className="flex">
              {[...Array(200)].map((_, i) => (
                <div 
                  key={`r2-${i}`} 
                  className={`w-2 h-2 ${i % 2 === 0 ? 'bg-amber-50' : 'bg-black'}`}
                />
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteCheckerboard;
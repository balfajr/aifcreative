import { motion } from 'framer-motion';

const InfiniteCheckerboard = () => {
  // Helper component for a single row
  const CheckerRow = ({ offset }) => (
    <div className="flex h-8">
      {[0, 1, 2, 3, 4, 5, 6].map((set) => (
        <div key={set} className="flex">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((index) => (
            <div 
              key={index} 
              className={`w-8 h-8 ${((index + offset) % 2 === 0) ? 'bg-black' : 'bg-white'}`}
            />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full h-16 overflow-hidden relative">
      <motion.div 
        className="absolute top-0 flex flex-col"
        animate={{ x: [0, -320] }} // Adjust the x value to match the width of the checkerboard
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }} // Adjust duration for smoothness
      >
        <CheckerRow offset={0} />
        <CheckerRow offset={1} />
      </motion.div>
    </div>
  );
};

export default InfiniteCheckerboard;

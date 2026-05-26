import { motion } from 'framer-motion';

const BlurText = ({ text, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {text}
    </motion.div>
  );
};

export default BlurText;

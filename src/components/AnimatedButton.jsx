import { motion } from 'framer-motion';

const AnimatedButton = ({ children, primary = false, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 ${
        primary
          ? 'bg-salmon text-white hover:brightness-110 shadow-md shadow-salmon/30 hover:shadow-lg hover:shadow-salmon/40'
          : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-salmon dark:hover:border-salmon hover:text-salmon dark:hover:text-salmon bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;

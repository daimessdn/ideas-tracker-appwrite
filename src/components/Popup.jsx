import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";

export default function Popup({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
            {children}

            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
              onClick={onClose}
            >
              <XIcon />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

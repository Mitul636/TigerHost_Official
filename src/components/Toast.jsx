import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function Toast({ message }) {
    return (
        <AnimatePresence>
            {message && (
                <div className="toast-container">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="toast-notification"
                    >
                        <CheckCircle className="w-5 h-5 text-orange" />
                        <span>{message}</span>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

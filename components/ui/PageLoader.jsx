"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoSHsvg from './LogoSHsvg'

const ArmenianShieldLoader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 4100);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-60 h- sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center translate-x-8 sm:translate-x-11">
            <motion.div
              className="w-60 h-60 sm:w-64 sm:h-64 md:w-80 md:h-80"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.1, 0.9, 1.05, 0.95, 1],
                opacity: [0, 1, 1, 1, 1, 1]
              }}
              transition={{ 
                duration: 2, 
                delay: 0.5,
                ease: "easeInOut"
              }}
            >
                <LogoSHsvg className="w-full h-full" />
            </motion.div>

            {/* Pulsating glow effect around the shield - Mobile */}
            <motion.div
                className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-20 sm:hidden"
                style={{ 
                    left: '-70px',
                    top: '-50px',
                    width: 'calc(100% + 80px)',
                    height: 'calc(100% + 80px)'
                }}
                animate={{ 
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: 2
                }}
            />

            {/* Pulsating glow effect around the shield - Desktop */}
            <motion.div
                className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-20 hidden sm:block"
                style={{ 
                    left: '-90px',
                    top: '-60px',
                    width: 'calc(100% + 100px)',
                    height: 'calc(100% + 100px)'
                }}
                animate={{ 
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: 2.5
                }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ArmenianPageLoader = ({ children }) => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {showLoader && (
        <ArmenianShieldLoader 
          onComplete={() => setShowLoader(false)}
        />
      )}
      
      {!showLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};

export default ArmenianPageLoader;
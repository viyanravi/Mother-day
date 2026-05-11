import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Flower2 } from 'lucide-react';

const MothersDayHero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{
        padding: '32px 20px',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, #fff5f2 0%, #fff 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        border: '2px solid rgba(225, 169, 154, 0.3)',
        boxShadow: '0 10px 30px rgba(225, 169, 154, 0.15)'
      }}
    >
      {/* Decorative Background Elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', top: -30, left: -30, opacity: 0.15, color: '#e1a99a' }}
      >
        <Flower2 size={120} />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', bottom: -40, right: -20, opacity: 0.1, color: '#e1a99a' }}
      >
        <Heart size={150} fill="currentColor" />
      </motion.div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                delay: i * 0.7,
                ease: "easeInOut"
              }}
            >
              {i === 1 ? (
                <Flower2 size={24} color="#e1a99a" />
              ) : (
                <Heart size={24} color="#e1a99a" fill="#e1a99a" />
              )}
            </motion.div>
          ))}
        </div>
        
        <h1 style={{ 
          margin: 0, 
          fontSize: '36px', 
          background: 'linear-gradient(45deg, #d48e7b, #e1a99a)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '900',
          letterSpacing: '-0.5px',
          lineHeight: '1.2'
        }}>
          Happy Mother's Day!
        </h1>
        <p style={{ 
          margin: '10px 0 0', 
          color: '#8e6d64', 
          fontWeight: '600',
          fontSize: '16px',
          letterSpacing: '0.5px'
        }}>
          TO THE BEST MOM IN THE UNIVERSE ❤️
        </p>
      </div>
    </motion.div>
  );
};

export default MothersDayHero;

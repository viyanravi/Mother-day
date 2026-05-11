import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

const DailySpin = ({ momPoints, setMomPoints, playSuccessSound }) => {
  const [spinResult, setSpinResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  
  const [lastFreeSpinDate, setLastFreeSpinDate] = useState(() => 
    localStorage.getItem('lastFreeSpinDate') || null
  );

  useEffect(() => {
    localStorage.setItem('lastFreeSpinDate', lastFreeSpinDate);
  }, [lastFreeSpinDate]);

  const today = new Date().toDateString();
  const hasFreeSpin = lastFreeSpinDate !== today;

  const handleSpin = () => {
    if (isSpinning) return;
    
    if (!hasFreeSpin) {
      if (momPoints < 50) return;
      setMomPoints(prev => prev - 50); // Cost for extra spin
    } else {
      setLastFreeSpinDate(today);
    }

    setIsSpinning(true);
    setSpinResult(null);

    const spinDuration = 2000;
    const spins = 5; // 5 full rotations
    const randomStop = Math.floor(Math.random() * 360);
    const newRotation = rotation + (360 * spins) + randomStop;
    
    setRotation(newRotation);

    setTimeout(() => {
      // Reward logic based on random stop
      const reward = Math.floor(Math.random() * 91) + 10;
      setSpinResult(reward);
      setMomPoints(prev => prev + reward);
      setIsSpinning(false);
      
      playSuccessSound(880, 1760);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f5d6c6', '#e1a99a', '#d4af37']
      });
    }, 1500);
  };

  return (
    <div className="glass-card" style={{ padding: '20px', marginBottom: '32px', textAlign: 'center', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
        <Gift color="#d4af37" />
        <h3 style={{ margin: 0, color: '#d4af37' }}>Daily XP Wheel</h3>
      </div>
      
      <p style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--text-muted)' }}>
        {hasFreeSpin ? "You have 1 FREE spin today!" : "Extra spins cost 50 XP."} Win up to 100 XP!
      </p>

      {/* Wheel Container */}
      <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 24px' }}>
        {/* Red Pointer */}
        <div style={{ 
          position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', 
          width: 0, height: 0, 
          borderLeft: '12px solid transparent', borderRight: '12px solid transparent', borderTop: '20px solid #e74c3c', 
          zIndex: 10, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
        }} />

        <motion.div 
          animate={{ rotate: rotation }}
          transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1] }} // smooth deceleration
          style={{ 
            width: '100%', height: '100%', borderRadius: '50%', 
            background: 'conic-gradient(#f5d6c6 0 60deg, #e1a99a 60deg 120deg, #d4af37 120deg 180deg, #f5d6c6 180deg 240deg, #e1a99a 240deg 300deg, #d4af37 300deg 360deg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
            border: '6px solid white'
          }}
        >
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'white', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }} />
        </motion.div>
      </div>

      {spinResult && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ marginBottom: '16px', fontWeight: '800', color: '#2ecc71', fontSize: '20px' }}>
          You won {spinResult} XP!
        </motion.div>
      )}

      <button 
        onClick={handleSpin}
        disabled={isSpinning || (!hasFreeSpin && momPoints < 50)}
        className="btn-primary"
        style={{ padding: '10px 24px', fontSize: '16px', background: hasFreeSpin ? '#2ecc71' : 'var(--rose-gold)' }}
      >
        {isSpinning ? 'Spinning...' : (hasFreeSpin ? 'Spin for FREE' : 'Spin (50 XP)')}
      </button>
    </div>
  );
};

export default DailySpin;

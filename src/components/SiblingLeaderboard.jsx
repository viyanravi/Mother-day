import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trophy, Crown, Star, AlertOctagon } from 'lucide-react';

const SiblingLeaderboard = ({ karma, dailyKarma, addKarma, avatars, decorations, updateAvatar, cycleDecoration }) => {
  const viyanPoints = karma.Viyan || 0;
  const nehyaPoints = karma.Nehya || 0;

  const leader = viyanPoints > nehyaPoints ? 'Viyan' : (nehyaPoints > viyanPoints ? 'Nehya' : null);

  const dailyViyan = dailyKarma?.Viyan || 0;
  const dailyNehya = dailyKarma?.Nehya || 0;
  const dailyLoser = dailyViyan > dailyNehya ? 'Nehya' : (dailyNehya > dailyViyan ? 'Viyan' : null);

  return (
    <div className="leaderboard">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 className="rose-gold-text" style={{ fontSize: '32px', marginBottom: '8px' }}>Family Rankings</h1>
        <p style={{ color: 'var(--text-muted)' }}>The battle for "Best Child" continues...</p>
      </div>

      <div className="flex-center" style={{ gap: '20px', marginBottom: '40px', alignItems: 'flex-end' }}>
        {/* Viyan (Left) */}
        <RankCard 
          name="Viyan" 
          points={viyanPoints} 
          isLeader={leader === 'Viyan'} 
          side="left"
          avatar={avatars.Viyan}
          decoration={decorations.Viyan}
          onUpdateAvatar={(url) => updateAvatar('Viyan', url)}
          onCycleDecoration={() => cycleDecoration('Viyan')}
        />

        <div style={{ paddingBottom: '60px', fontWeight: '800', fontSize: '24px', color: 'var(--rose-gold-dark)', opacity: 0.5 }}>VS</div>

        {/* Nehya (Right) */}
        <RankCard 
          name="Nehya" 
          points={nehyaPoints} 
          isLeader={leader === 'Nehya'} 
          side="right"
          avatar={avatars.Nehya}
          decoration={decorations.Nehya}
          onUpdateAvatar={(url) => updateAvatar('Nehya', url)}
          onCycleDecoration={() => cycleDecoration('Nehya')}
        />
      </div>

      {/* Mom's Controls */}
      <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Mom's Quick Actions</h3>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addKarma('Viyan', 10)}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px' }}
            >
              <Heart size={16} fill="white" /> Viyan helped!
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addKarma('Viyan', -10)}
              className="glass-card"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px', fontSize: '12px', color: 'var(--text-muted)' }}
            >
              Take points
            </motion.button>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addKarma('Nehya', 10)}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px' }}
            >
              <Heart size={16} fill="white" /> Nehya helped!
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addKarma('Nehya', -10)}
              className="glass-card"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px', fontSize: '12px', color: 'var(--text-muted)' }}
            >
              Take points
            </motion.button>
          </div>
        </div>
      </div>

      {/* Daily Chores Alert */}
      {dailyLoser && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card" 
          style={{ marginTop: '20px', padding: '16px', textAlign: 'center', background: 'rgba(231, 76, 60, 0.1)', border: '1px solid rgba(231, 76, 60, 0.3)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px', color: '#e74c3c' }}>
            <AlertOctagon size={24} />
            <h3 style={{ margin: 0 }}>Daily Chores Duty</h3>
          </div>
          <p style={{ fontWeight: '600', fontSize: '15px' }}>
            {dailyLoser} has the lowest points today ({dailyLoser === 'Viyan' ? dailyViyan : dailyNehya} vs {(dailyLoser === 'Viyan' ? dailyNehya : dailyViyan)}).<br/>
            Get to work, {dailyLoser}! 🧹🍽️
          </p>
        </motion.div>
      )}

      {/* Daily Chores Alert */}
      {dailyLoser && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card" 
          style={{ marginTop: '20px', padding: '16px', textAlign: 'center', background: 'rgba(231, 76, 60, 0.1)', border: '1px solid rgba(231, 76, 60, 0.3)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px', color: '#e74c3c' }}>
            <AlertOctagon size={24} />
            <h3 style={{ margin: 0 }}>Daily Chores Duty</h3>
          </div>
          <p style={{ fontWeight: '600', fontSize: '15px' }}>
            {dailyLoser} has the lowest points today ({dailyLoser === 'Viyan' ? dailyViyan : dailyNehya} vs {(dailyLoser === 'Viyan' ? dailyNehya : dailyViyan)}).<br/>
            Get to work, {dailyLoser}! 🧹🍽️
          </p>
        </motion.div>
      )}

      {leader && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card animate-float" 
          style={{ marginTop: '20px', padding: '24px', textAlign: 'center', background: 'rgba(212, 175, 55, 0.1)' }}
        >
          <Crown color="#d4af37" size={32} style={{ marginBottom: '12px' }} fill="#d4af37" />
          <h2 style={{ fontSize: '20px', marginBottom: '4px' }}>All-Time Favorite: {leader}</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Leading by {Math.abs(viyanPoints - nehyaPoints)} points!</p>
        </motion.div>
      )}
    </div>
  );
};

const RankCard = ({ name, points, isLeader, side, avatar, decoration, onUpdateAvatar, onCycleDecoration }) => {
  const fileInputRef = React.useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 150;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress heavily to save localStorage space
          const dataUrl = canvas.toDataURL('image/jpeg', 0.6); 
          onUpdateAvatar(dataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const getDecorationStyle = () => {
    switch(decoration) {
      case 'glow': return { boxShadow: '0 0 20px #e1a99a' };
      case 'floral': return { border: '4px dashed #e1a99a' }; // Simplified floral
      case 'stars': return { background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(212, 175, 55, 0.2))' };
      default: return {};
    }
  };

  return (
  <div style={{ flex: 1, textAlign: 'center' }}>
    <AnimatePresence>
      {isLeader && (
        <motion.div
          initial={{ scale: 0, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0 }}
          style={{ marginBottom: '8px', color: '#d4af37' }}
        >
          <Crown size={32} fill="#d4af37" style={{ filter: 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.5))' }} />
          <div style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase' }}>Best Child</div>
        </motion.div>
      )}
    </AnimatePresence>
    
    <motion.div
      animate={isLeader ? { y: -10 } : { y: 0 }}
      className="glass-card"
      style={{ 
        padding: '20px', 
        border: isLeader ? '2px solid #d4af37' : '1px solid var(--glass-border)',
        position: 'relative',
        ...getDecorationStyle()
      }}
    >
      <input 
        type="file" 
        accept="image/*" 
        style={{ display: 'none' }} 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
      />
      <div 
        onClick={() => fileInputRef.current.click()}
        style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          background: 'var(--rose-gold-light)', 
          margin: '0 auto 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          cursor: 'pointer',
          overflow: 'hidden',
          border: '2px solid white',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}
        title="Click to change photo"
      >
        {avatar ? (
          <img src={avatar} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          name[0]
        )}
      </div>
      <div style={{ fontWeight: '800', fontSize: '20px', marginBottom: '4px' }}>{name}</div>
      <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--rose-gold-dark)' }}>{points}</div>
      <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Points</div>
      
      <button 
        onClick={onCycleDecoration}
        style={{
          background: 'none',
          border: '1px solid var(--rose-gold)',
          borderRadius: '12px',
          padding: '4px 8px',
          fontSize: '10px',
          color: 'var(--rose-gold-dark)',
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
        Decorate ✨
      </button>
    </motion.div>
  </div>
)};

export default SiblingLeaderboard;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Droplets, 
  Footprints, 
  Book, 
  Trophy, 
  ShoppingBag, 
  Users, 
  Plus, 
  Heart,
  Wind,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Sub-components (will extract if they get too big)
import ExerciseDashboard from './components/ExerciseDashboard';
import RewardShop from './components/RewardShop';
import SiblingLeaderboard from './components/SiblingLeaderboard';
import ActivityTracker from './components/ActivityTracker';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // --- Global State ---
  const [momPoints, setMomPoints] = useState(() => 
    JSON.parse(localStorage.getItem('momPoints')) || 0
  );
  const [fitnessPoints, setFitnessPoints] = useState(() => 
    JSON.parse(localStorage.getItem('fitnessPoints')) || 0
  );
  const [streak, setStreak] = useState(() => 
    JSON.parse(localStorage.getItem('streak')) || 0
  );
  const [lastExerciseDate, setLastExerciseDate] = useState(() => 
    localStorage.getItem('lastExerciseDate') || null
  );
  const [streakFreezes, setStreakFreezes] = useState(() => 
    JSON.parse(localStorage.getItem('streakFreezes')) || 1
  );
  const [habits, setHabits] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('habits'));
      if (stored && Array.isArray(stored) && stored.length > 0) {
        return stored;
      }
    } catch (e) {
      console.error('Failed to parse habits', e);
    }
    return [
      { id: 'walk', name: '20 Min Walk', completed: false },
      { id: 'water', name: 'Drink Water', completed: false },
      { id: 'book', name: 'Read a Book', completed: false },
    ];
  });
  const [karma, setKarma] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('karma'));
    if (saved) {
      if (saved.Sister !== undefined) {
        return { Viyan: saved.Viyan, Nehya: saved.Sister };
      }
      return saved;
    }
    return { Viyan: 0, Nehya: 0 };
  });

  const [dailyKarma, setDailyKarma] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('dailyKarma'));
    const today = new Date().toDateString();
    if (saved && saved.date === today) {
      return saved;
    }
    return { date: today, Viyan: 0, Nehya: 0 };
  });

  const [avatars, setAvatars] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('avatars'));
    if (saved) {
      if (saved.Sister !== undefined) {
        return { Viyan: saved.Viyan, Nehya: saved.Sister };
      }
      return saved;
    }
    return { Viyan: null, Nehya: null };
  });

  const [decorations, setDecorations] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('decorations'));
    if (saved) {
      if (saved.Sister !== undefined) {
        return { Viyan: saved.Viyan, Nehya: saved.Sister };
      }
      return saved;
    }
    return { Viyan: 'default', Nehya: 'default' };
  });
  const [redeemedCoupons, setRedeemedCoupons] = useState(() => 
    JSON.parse(localStorage.getItem('redeemedCoupons')) || []
  );
  const [exerciseHistory, setExerciseHistory] = useState(() => 
    JSON.parse(localStorage.getItem('exerciseHistory')) || []
  );
  const [customCoupons, setCustomCoupons] = useState(() => 
    JSON.parse(localStorage.getItem('customCoupons')) || []
  );

  // --- Persistence ---
  useEffect(() => {
    localStorage.setItem('momPoints', JSON.stringify(momPoints));
    localStorage.setItem('fitnessPoints', JSON.stringify(fitnessPoints));
    localStorage.setItem('streak', JSON.stringify(streak));
    localStorage.setItem('lastExerciseDate', lastExerciseDate);
    localStorage.setItem('streakFreezes', JSON.stringify(streakFreezes));
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('karma', JSON.stringify(karma));
    localStorage.setItem('dailyKarma', JSON.stringify(dailyKarma));
    localStorage.setItem('avatars', JSON.stringify(avatars));
    localStorage.setItem('decorations', JSON.stringify(decorations));
    localStorage.setItem('redeemedCoupons', JSON.stringify(redeemedCoupons));
    localStorage.setItem('exerciseHistory', JSON.stringify(exerciseHistory));
    localStorage.setItem('customCoupons', JSON.stringify(customCoupons));
  }, [momPoints, fitnessPoints, streak, lastExerciseDate, streakFreezes, habits, karma, dailyKarma, avatars, decorations, redeemedCoupons, exerciseHistory, customCoupons]);

  // --- Habit Daily Refresh ---
  useEffect(() => {
    const today = new Date().toDateString();
    const lastHabitDate = localStorage.getItem('lastHabitDate');
    if (lastHabitDate !== today) {
      setHabits(prev => prev.map(h => ({ ...h, completed: false })));
      localStorage.setItem('lastHabitDate', today);
    }
  }, []);

  // --- Streak Logic ---
  useEffect(() => {
    if (!lastExerciseDate) return;
    
    const today = new Date().toDateString();
    const lastDate = new Date(lastExerciseDate).toDateString();
    
    if (today === lastDate) return; // Already logged today
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (lastDate !== yesterdayStr) {
      // Missed a day!
      if (streakFreezes > 0) {
        setStreakFreezes(prev => prev - 1);
        // Streak saved by freeze!
      } else {
        setStreak(0);
      }
    }
  }, []);

  // --- Actions ---
  const playLevelUpSound = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
    oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.5); // C6

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
  };

  const playSuccessSound = (freq1, freq2) => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq1, audioCtx.currentTime); 
    oscillator.frequency.exponentialRampToValueAtTime(freq2, audioCtx.currentTime + 0.2); 

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);
  };

  const completeExercise = (type, label) => {
    playSuccessSound(440, 880); // satisfying ping on every click

    setExerciseHistory(prev => [...prev, { date: new Date().toISOString(), type, label }]);
    setMomPoints(prev => prev + 10); // Reward MomPoints for exercising so balance updates!

    const today = new Date().toDateString();
    if (lastExerciseDate !== today) {
      setStreak(prev => prev + 1);
      setLastExerciseDate(today);
    }
    
    const oldLevel = Math.floor(fitnessPoints / 500);
    const newPoints = fitnessPoints + 100;
    setFitnessPoints(newPoints);
    
    const newLevel = Math.floor(newPoints / 500);
    if (newLevel > oldLevel) {
      playLevelUpSound();
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f5d6c6', '#e1a99a', '#d4af37']
      });
    }
  };

  const toggleHabit = (id) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id && !h.completed) {
        setMomPoints(p => p + 50);
        playSuccessSound(440, 880); // Habit ping
        return { ...h, completed: true };
      }
      return h;
    }));
  };

  const addKarma = async (name, amount = 10) => {
    if (amount > 0) playSuccessSound(660, 990); // Karma ping
    else playSuccessSound(300, 200); // Negative ping

    const otherName = name === 'Viyan' ? 'Nehya' : 'Viyan';
    const currentLeader = karma[name] > karma[otherName] ? name : (karma[otherName] > karma[name] ? otherName : null);
    
    const newKarma = {
      ...karma,
      [name]: karma[name] + amount
    };
    
    setKarma(newKarma);

    const today = new Date().toDateString();
    setDailyKarma(prev => {
      // If day rolled over, reset before applying amount
      const isNewDay = prev.date !== today;
      const baseViyan = isNewDay ? 0 : prev.Viyan;
      const baseNehya = isNewDay ? 0 : prev.Nehya;
      return {
        date: today,
        Viyan: name === 'Viyan' ? baseViyan + amount : baseViyan,
        Nehya: name === 'Nehya' ? baseNehya + amount : baseNehya
      };
    });

    const newLeader = newKarma[name] > newKarma[otherName] ? name : (newKarma[otherName] > newKarma[name] ? otherName : null);

    // Lead Change Alert
    if (newLeader && newLeader !== currentLeader && amount > 0) {
      const webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL || 'YOUR_SLACK_WEBHOOK_URL_HERE';
      const payload = {
        text: `🏆 **RANKING UPDATE:** ${newLeader} has just overtaken ${newLeader === 'Viyan' ? 'Nehya' : 'Viyan'} for 1st Place!`
      };

      try {
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (error) {
        console.error('Slack alert error:', error);
      }
    }
  };

  const updateAvatar = (name, dataUrl) => {
    setAvatars(prev => ({ ...prev, [name]: dataUrl }));
  };

  const cycleDecoration = (name) => {
    const decos = ['default', 'glow', 'floral', 'stars'];
    setDecorations(prev => {
      const currentIdx = decos.indexOf(prev[name]);
      const nextIdx = (currentIdx + 1) % decos.length;
      return { ...prev, [name]: decos[nextIdx] };
    });
  };

  return (
    <div className="container">
      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ExerciseDashboard 
              streak={streak} 
              fitnessPoints={fitnessPoints} 
              lastExerciseDate={lastExerciseDate}
              streakFreezes={streakFreezes}
              habits={habits}
              toggleHabit={toggleHabit}
              completeExercise={completeExercise}
              momPoints={momPoints}
            />
          </motion.div>
        )}
        
        {activeTab === 'shop' && (
          <motion.div
            key="shop"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <RewardShop 
              momPoints={momPoints} 
              setMomPoints={setMomPoints} 
              redeemedCoupons={redeemedCoupons}
              setRedeemedCoupons={setRedeemedCoupons}
              playSuccessSound={playSuccessSound}
              customCoupons={customCoupons}
              setCustomCoupons={setCustomCoupons}
            />
          </motion.div>
        )}

        {activeTab === 'tracker' && (
          <motion.div
            key="tracker"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ActivityTracker exerciseHistory={exerciseHistory} />
          </motion.div>
        )}

        {activeTab === 'leaderboard' && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SiblingLeaderboard 
              karma={karma} 
              dailyKarma={dailyKarma}
              addKarma={addKarma} 
              avatars={avatars}
              decorations={decorations}
              updateAvatar={updateAvatar}
              cycleDecoration={cycleDecoration}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <nav className="glass-card flex-center" style={{ 
        position: 'fixed', 
        bottom: 20, 
        left: 20, 
        right: 20, 
        height: 70, 
        zIndex: 100,
        justifyContent: 'space-around',
        padding: '0 10px'
      }}>
        <NavButton 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')} 
          icon={<Trophy size={24} />} 
          label="Power"
        />
        <NavButton 
          active={activeTab === 'shop'} 
          onClick={() => setActiveTab('shop')} 
          icon={<ShoppingBag size={24} />} 
          label="Shop"
        />
        <NavButton 
          active={activeTab === 'tracker'} 
          onClick={() => setActiveTab('tracker')} 
          icon={<Activity size={24} />} 
          label="Tracker"
        />
        <NavButton 
          active={activeTab === 'leaderboard'} 
          onClick={() => setActiveTab('leaderboard')} 
          icon={<Users size={24} />} 
          label="Sibs"
        />
      </nav>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    style={{
      background: 'none',
      border: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: active ? 'var(--rose-gold-dark)' : '#999',
      transition: 'color 0.3s'
    }}
  >
    {icon}
    <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: active ? '700' : '400' }}>{label}</span>
  </button>
);

export default App;

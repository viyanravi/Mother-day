import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, CheckCircle2, Footprints, Music, Wind, Droplets, Book, Snowflake, Bike, Waves, Dumbbell, Activity, Trees, Home, Baby, Navigation, Scissors, Coffee, Search, Plus } from 'lucide-react';

const ExerciseDashboard = ({ 
  streak, 
  fitnessPoints, 
  lastExerciseDate, 
  streakFreezes, 
  habits, 
  toggleHabit, 
  completeExercise,
  momPoints
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customActivity, setCustomActivity] = useState('');
  const isStreakActive = lastExerciseDate === new Date().toDateString();
  
  const level = Math.floor(fitnessPoints / 500) + 1;
  const progress = (fitnessPoints % 500) / 5; // 0 to 100
  
  const getLevelTitle = (lvl) => {
    if (lvl === 1) return 'Starting Strong';
    if (lvl === 2) return 'Goal Getter';
    return 'Fitness Queen';
  };

  const renderHabitIcon = (id) => {
    switch (id) {
      case 'walk': return <Footprints size={20} />;
      case 'water': return <Droplets size={20} />;
      case 'book': return <Book size={20} />;
      default: return <CheckCircle2 size={20} />;
    }
  };

  const allExercises = [
    { id: 'walk', label: '20 Min Walk', icon: <Footprints color="#e1a99a" /> },
    { id: 'yoga', label: 'Morning Yoga', icon: <Wind color="#e1a99a" /> },
    { id: 'dance', label: 'Dance Party', icon: <Music color="#e1a99a" /> },
    { id: 'cycling', label: 'Cycling', icon: <Bike color="#e1a99a" /> },
    { id: 'swim', label: 'Swimming', icon: <Waves color="#e1a99a" /> },
    { id: 'weights', label: 'Weightlifting', icon: <Dumbbell color="#e1a99a" /> },
    { id: 'pilates', label: 'Pilates', icon: <Activity color="#e1a99a" /> },
    { id: 'garden', label: 'Gardening', icon: <Trees color="#e1a99a" /> },
    { id: 'clean', label: 'Clean House', icon: <Home color="#e1a99a" /> },
    { id: 'kids', label: 'Chasing Kids', icon: <Baby color="#e1a99a" /> },
    { id: 'hike', label: 'Hiking', icon: <Navigation color="#e1a99a" /> },
    { id: 'crafts', label: 'Crafts/DIY', icon: <Scissors color="#e1a99a" /> },
    { id: 'zumba', label: 'Zumba', icon: <Activity color="#e1a99a" /> },
    { id: 'stretch', label: 'Stretching', icon: <Wind color="#e1a99a" /> },
    // Generating 80+ more to reach > 100
    ...Array.from({ length: 90 }, (_, i) => ({
      id: `ex_${i}`,
      label: `Custom Workout ${i + 1}`,
      icon: <Activity color="#e1a99a" />
    }))
  ];

  // Specific additions to make it truly humongous and realistic
  const extraRealExercises = [
    'Kickboxing', 'Tai Chi', 'Rowing', 'Elliptical', 'Stair Climber', 
    'Jump Rope', 'Barre', 'CrossFit', 'HIIT', 'Core Workout', 'Aqua Aerobics',
    'Rock Climbing', 'Martial Arts', 'Gymnastics', 'Trampoline', 'Tennis',
    'Basketball', 'Soccer', 'Volleyball', 'Golf', 'Bowling', 'Skating',
    'Skiing', 'Snowboarding', 'Surfing', 'Paddleboarding', 'Kayaking',
    'Canoeing', 'Horseback Riding', 'Fencing', 'Badminton', 'Table Tennis',
    'Squash', 'Racquetball', 'Handball', 'Softball', 'Baseball', 'Frisbee',
    'Vacuuming', 'Mopping', 'Laundry', 'Washing Car', 'Mowing Lawn',
    'Shoveling Snow', 'Raking Leaves', 'Painting', 'Moving Furniture',
    'Grocery Shopping', 'Walking the Dog', 'Playing Fetch', 'Tag with Kids',
    'Hide and Seek', 'Hopscotch', 'Jumping Jacks', 'Pushups', 'Situps',
    'Planking', 'Lunges', 'Squats', 'Burpees', 'Mountain Climbers',
    'High Knees', 'Butt Kicks', 'Bear Crawls', 'Crab Walks', 'Shadow Boxing',
    'Hula Hooping', 'Belly Dancing', 'Salsa Dancing', 'Ballet', 'Tap Dancing',
    'Hip Hop Dancing', 'Jazzercise', 'Step Aerobics', 'Water Polo', 'Synchronized Swimming',
    'Diving', 'Snorkeling', 'Scuba Diving', 'Water Skiing', 'Wakeboarding',
    'Kite Surfing', 'Wind Surfing', 'Sailing', 'Rowing Machine', 'Treadmill',
    'Stationary Bike', 'Spin Class', 'Bouldering', 'Ice Skating', 'Rollerblading',
    'Skateboarding', 'Scootering', 'BMX', 'Mountain Biking', 'Road Cycling'
  ].map((name, i) => ({
    id: `real_${i}`,
    label: name,
    icon: <CheckCircle2 color="#e1a99a" />
  }));

  const fullList = [...allExercises.slice(0, 14), ...extraRealExercises];
  
  const filteredExercises = fullList.filter(ex => 
    ex.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      {/* Header with Streak */}
      <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 className="rose-gold-text" style={{ fontSize: '28px' }}>MomPower</h1>
        <div className="flex-center" style={{ gap: '12px' }}>
          <div className="flex-center glass-card" style={{ padding: '8px 16px', borderRadius: '16px' }}>
            <motion.div
              animate={isStreakActive ? { scale: [1, 1.2, 1], filter: 'drop-shadow(0 0 8px #ff4b2b)' } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Flame size={24} color={isStreakActive ? 'var(--fire-glow)' : 'var(--fire-gray)'} fill={isStreakActive ? 'var(--fire-glow)' : 'none'} />
            </motion.div>
            <span style={{ marginLeft: '8px', fontWeight: '700', fontSize: '18px' }}>{streak}</span>
          </div>
          <div className="flex-center glass-card" style={{ padding: '8px 12px', borderRadius: '16px' }}>
            <Snowflake size={18} color="#74b9ff" />
            <span style={{ marginLeft: '4px', fontWeight: '600' }}>{streakFreezes}</span>
          </div>
        </div>
      </div>

      {/* Points Summary */}
      <div className="glass-card" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: '600', fontSize: '14px' }}>Level {level}: {getLevelTitle(level)}</span>
          <span style={{ fontWeight: '600', fontSize: '14px' }}>{fitnessPoints % 500} / 500 XP</span>
        </div>
        <div style={{ height: '12px', background: 'rgba(0,0,0,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #f5d6c6, #e1a99a)', borderRadius: '6px' }}
          />
        </div>
        <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'right' }}>
           <strong>{momPoints}</strong> MomPoints Available
        </div>
      </div>

      {/* Exercise Menu */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0 }}>Exercise Menu</h3>
        <div style={{ position: 'relative' }}>
          <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: 10, top: 10 }} />
          <input 
            type="text" 
            placeholder="Search 100+ activities..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px 8px 30px',
              borderRadius: '16px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(255,255,255,0.5)',
              fontSize: '12px',
              width: '180px'
            }}
          />
        </div>
      </div>

      <div 
        className="grid-2" 
        style={{ 
          marginBottom: '32px', 
          maxHeight: '350px', 
          overflowY: 'auto', 
          padding: '4px',
          paddingRight: '12px', /* space for scrollbar */
          gap: '12px'
        }}
      >
        {filteredExercises.map(ex => (
          <ExerciseButton 
            key={ex.id} 
            icon={ex.icon} 
            label={ex.label} 
            onClick={() => completeExercise(ex.id, ex.label)} 
          />
        ))}
        {filteredExercises.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
            No predefined activities found... but you can type your own below!
          </div>
        )}
      </div>

      {/* Add Custom Activity */}
      <div className="glass-card" style={{ padding: '16px', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '32px', background: 'rgba(255,255,255,0.7)' }}>
        <input 
          type="text" 
          placeholder="Did something else? Type it here..." 
          value={customActivity}
          onChange={(e) => setCustomActivity(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 12px',
            borderRadius: '12px',
            border: '1px solid var(--glass-border)',
            background: 'white',
            fontSize: '14px'
          }}
        />
        <button 
          onClick={() => {
            if (customActivity.trim()) {
              completeExercise('custom', customActivity.trim());
              setCustomActivity('');
            }
          }}
          disabled={!customActivity.trim()}
          className="btn-primary"
          style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <Plus size={16} /> Log It!
        </button>
      </div>

      {/* Habit List */}
      <h3 style={{ marginBottom: '16px' }}>Daily Habits</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {habits.map(habit => (
          <motion.div 
            key={habit.id}
            className="glass-card"
            style={{ 
              padding: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              opacity: habit.completed ? 0.6 : 1
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleHabit(habit.id)}
          >
            <div className="flex-center" style={{ gap: '12px' }}>
              <div style={{ color: 'var(--rose-gold-dark)' }}>{renderHabitIcon(habit.id)}</div>
              <span style={{ fontWeight: '500' }}>{habit.name}</span>
            </div>
            {habit.completed ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <CheckCircle2 color="#2ecc71" size={24} />
              </motion.div>
            ) : (
              <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--rose-gold)' }} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ExerciseButton = ({ icon, label, onClick }) => (
  <motion.button
    className="glass-card"
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    style={{
      padding: '20px',
      border: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer'
    }}
  >
    <div style={{ padding: '12px', background: 'rgba(225, 169, 154, 0.1)', borderRadius: '12px' }}>
      {icon}
    </div>
    <span style={{ fontSize: '13px', fontWeight: '600', textAlign: 'center' }}>{label}</span>
  </motion.button>
);

export default ExerciseDashboard;

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Activity } from 'lucide-react';

const ActivityTracker = ({ exerciseHistory }) => {
  // Process history into last 7 days data
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toDateString();
  });

  const chartData = last7Days.map(dateStr => {
    const count = exerciseHistory.filter(ex => new Date(ex.date).toDateString() === dateStr).length;
    return { date: dateStr, count };
  });

  const maxCount = Math.max(...chartData.map(d => d.count), 5); // Minimum scale of 5

  return (
    <div className="tracker">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 className="rose-gold-text" style={{ fontSize: '32px', marginBottom: '8px' }}>Activity Tracker</h1>
        <p style={{ color: 'var(--text-muted)' }}>Your hard work over the last 7 days.</p>
      </div>

      <div className="glass-card" style={{ padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <BarChart2 color="var(--rose-gold-dark)" />
          <h3 style={{ margin: 0 }}>Weekly Graph</h3>
        </div>

        {/* CSS Bar Chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', paddingBottom: '20px', borderBottom: '1px solid var(--glass-border)' }}>
          {chartData.map((data, idx) => {
            const heightPct = (data.count / maxCount) * 100;
            const dayName = new Date(data.date).toLocaleDateString('en-US', { weekday: 'short' });
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  style={{ 
                    width: '24px', 
                    background: 'linear-gradient(to top, var(--rose-gold-dark), var(--rose-gold-light))', 
                    borderRadius: '4px 4px 0 0',
                    minHeight: heightPct > 0 ? '10px' : '0'
                  }} 
                />
                <div style={{ marginTop: '12px', fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600' }}>
                  {dayName}
                </div>
                <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-dark)', marginTop: '4px' }}>
                  {data.count > 0 ? data.count : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <h3 style={{ marginBottom: '16px' }}>Recent Activity Log</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {exerciseHistory.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
            No exercises recorded yet!
          </div>
        )}
        {exerciseHistory.slice().reverse().map((ex, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card"
            style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}
          >
            <div style={{ padding: '10px', background: 'white', borderRadius: '50%' }}>
              <Activity size={20} color="var(--rose-gold-dark)" />
            </div>
            <div>
              <div style={{ fontWeight: '700' }}>{ex.label}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{new Date(ex.date).toLocaleString()}</div>
            </div>
            <div style={{ marginLeft: 'auto', fontWeight: '800', color: '#2ecc71', fontSize: '14px' }}>
              +100 XP
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTracker;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Coffee, Car, Trash2, Send, CheckCircle2, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';
import DailySpin from './DailySpin';

const RewardShop = ({ momPoints, setMomPoints, redeemedCoupons, setRedeemedCoupons, playSuccessSound, customCoupons, setCustomCoupons }) => {
  const [justRedeemed, setJustRedeemed] = useState(null);
  const [newCouponName, setNewCouponName] = useState('');

  const defaultCoupons = [
    { id: 'dishes', name: '1 Week No Dishes', cost: 500, icon: <Trash2 size={24} /> },
    { id: 'carwash', name: 'Car Wash', cost: 500, icon: <Car size={24} /> },
    { id: 'breakfast', name: 'Breakfast in Bed', cost: 500, icon: <Coffee size={24} /> },
    { id: 'massage', name: '30 Min Foot Massage', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'remote', name: 'Control TV Remote for a Day', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'dinner', name: 'Kids Cook Dinner', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'laundry', name: 'Fold All Laundry', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'sleepin', name: 'Sleep In (No Interruptions)', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'vacuum', name: 'Vacuum Entire House', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'windows', name: 'Wash All Windows', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'dogwalk', name: 'Walk the Dog for a Week', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'movie', name: 'Mom Picks the Movie', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'groceries', name: 'Unload All Groceries', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'yard', name: 'Yard Work for 2 Hours', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'dusting', name: 'Dust Every Surface', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'bathrooms', name: 'Deep Clean Bathrooms', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'nap', name: '2 Hour Uninterrupted Nap', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'taxi', name: 'Free Chauffeur Service for a Day', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'peace', name: '1 Hour of Absolute Silence', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'coffee', name: 'Specialty Coffee Delivery', cost: 500, icon: <Coffee size={24} /> },
    { id: 'outfit', name: 'Mom Chooses the Kids\' Outfits', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'tech', name: 'Free Tech Support', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'errands', name: 'Run 3 Errands of Choice', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'massage2', name: 'Back & Shoulder Massage', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'wine', name: 'Pour a Glass of Wine', cost: 500, icon: <CheckCircle2 size={24} /> },
    { id: 'flowers', name: 'Buy Mom Flowers', cost: 500, icon: <CheckCircle2 size={24} /> },
    ...Array.from({ length: 90 }, (_, i) => ({
      id: `template_${i}`,
      name: `Mystery Fun Ticket #${i + 1}`,
      cost: 500,
      icon: <ShoppingBag size={24} />
    }))
  ];

  const allCoupons = [...defaultCoupons, ...(customCoupons || [])];

  const handleAddCustomCoupon = () => {
    if (!newCouponName.trim()) return;
    const newCoupon = {
      id: `custom_${Date.now()}`,
      name: newCouponName.trim(),
      cost: 500
    };
    setCustomCoupons(prev => [...prev, newCoupon]);
    setNewCouponName('');
  };

  const redeemReward = async (coupon) => {
    if (momPoints < coupon.cost) return;

    setMomPoints(prev => prev - coupon.cost);
    setJustRedeemed(coupon.id);
    playSuccessSound(880, 1760); // High satisfying ding
    
    // Add to history
    setRedeemedCoupons(prev => [{ ...coupon, date: new Date().toLocaleString() }, ...prev]);

    // 3-Second Massive Confetti Spray
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
    }, 250);

    // Reset button state after 3 seconds
    setTimeout(() => setJustRedeemed(null), 3000);

    // Slack Notification (Fire and forget, doesn't break if no Slack)
    const webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL || 'YOUR_SLACK_WEBHOOK_URL_HERE';
    const payload = {
      text: `🚨 **ALERT:** Mom just redeemed a coupon for **${coupon.name}**! Get to work! 🏃‍♂️💨`
    };

    fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => console.log('Slack alert skipped (optional).', err));
  };

  return (
    <div className="shop">
      <h1 className="rose-gold-text" style={{ fontSize: '28px', marginBottom: '8px' }}>Reward Shop</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Exchange your hard-earned MomPoints for luxury perks.</p>

      <div className="glass-card" style={{ padding: '20px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="flex-center" style={{ gap: '12px' }}>
          <ShoppingBag color="var(--rose-gold)" />
          <span style={{ fontWeight: '600' }}>Your Balance</span>
        </div>
        <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--rose-gold-dark)' }}>{momPoints} XP</span>
      </div>

      <DailySpin momPoints={momPoints} setMomPoints={setMomPoints} playSuccessSound={playSuccessSound} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '500px', overflowY: 'auto', paddingRight: '12px', overflowX: 'hidden' }}>
        {allCoupons.map(coupon => {
          const isRedeemed = justRedeemed === coupon.id;

          const cardContent = (
            <>
              <div className="flex-center" style={{ gap: '16px' }}>
                <div style={{ padding: '12px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                  {React.isValidElement(coupon.icon) ? coupon.icon : <CheckCircle2 size={24} />}
                </div>
                <div>
                  <div style={{ fontWeight: '700' }}>{coupon.name}</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{coupon.cost} XP</div>
                </div>
              </div>
              <button 
                className="btn-primary"
                disabled={momPoints < coupon.cost || isRedeemed}
                onClick={() => redeemReward(coupon)}
                style={{ 
                  padding: '10px 16px', 
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: isRedeemed ? '#2ecc71' : '' 
                }}
              >
                {isRedeemed ? <><CheckCircle2 size={16} /> Redeemed!</> : 'Redeem'}
              </button>
            </>
          );

          return (
            <div key={coupon.id} style={{ position: 'relative', minHeight: '88px' }}>
              {isRedeemed ? (
                <>
                  <motion.div
                    initial={{ x: 0, rotate: 0 }}
                    animate={{ x: -250, y: 150, rotate: -45, opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeIn' }}
                    className="glass-card"
                    style={{ 
                      position: 'absolute', inset: 0, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      clipPath: 'polygon(0 0, 50% 0, 40% 100%, 0 100%)', zIndex: 10
                    }}
                  >
                    {cardContent}
                  </motion.div>
                  <motion.div
                    initial={{ x: 0, rotate: 0 }}
                    animate={{ x: 250, y: 150, rotate: 45, opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeIn' }}
                    className="glass-card"
                    style={{ 
                      position: 'absolute', inset: 0, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 40% 100%)', zIndex: 10
                    }}
                  >
                    {cardContent}
                  </motion.div>
                </>
              ) : (
                <motion.div 
                  className="glass-card"
                  style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  whileHover={{ scale: 1.02 }}
                >
                  {cardContent}
                </motion.div>

              )}
            </div>
          );
        })}
      </div>

      {/* Add Custom Coupon */}
      <div className="glass-card" style={{ marginTop: '20px', padding: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Create custom coupon..." 
          value={newCouponName}
          onChange={(e) => setNewCouponName(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 12px',
            borderRadius: '12px',
            border: '1px solid var(--glass-border)',
            background: 'rgba(255,255,255,0.5)',
            fontSize: '14px'
          }}
        />
        <button 
          onClick={handleAddCustomCoupon}
          disabled={!newCouponName.trim()}
          className="btn-primary"
          style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Plus size={20} />
        </button>
      </div>
      <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
        Custom coupons cost 500 XP to redeem.
      </div>

      {/* Completed Missions History */}
      {redeemedCoupons.length > 0 && (
        <div style={{ marginTop: '40px', paddingBottom: '20px' }}>
          <h3 className="rose-gold-text" style={{ marginBottom: '16px', fontSize: '20px' }}>Completed Missions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AnimatePresence>
              {redeemedCoupons.map((coupon, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass-card"
                  style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.8 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle2 color="#2ecc71" size={20} />
                    <div>
                      <div style={{ fontWeight: '600' }}>{coupon.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{coupon.date}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardShop;

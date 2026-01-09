import { motion } from 'motion/react';
import { ArrowLeft, IndianRupee, MessageCircle, Clock, Activity, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface BargainBotProps {
  onBack: () => void;
}

export function BargainBot({ onBack }: BargainBotProps) {
  const [floorPrice, setFloorPrice] = useState('14800');
  const [negotiationStyle, setNegotiationStyle] = useState<'firm' | 'friendly' | 'flexible'>('firm');
  const [urgencyLevel, setUrgencyLevel] = useState(3);
  const [showDetailedText, setShowDetailedText] = useState(
    localStorage.getItem('artisan_detailed_text') === 'true'
  );

  const activities = [
    { time: '5 min ago', message: 'Dubai hotel offered ₹11,100/piece (40% off). AI counter-offered ₹14,800/piece (20% off) with value justification.', status: 'active', icon: '◐' },
    { time: '2 hours ago', message: 'Temple Trust accepted ₹48,000 for bell set. Order confirmed.', status: 'completed', icon: '●' },
    { time: '1 day ago', message: 'Rejected ₹10,000 offer for Nataraja. Below minimum (₹14,800). Not negotiable.', status: 'rejected', icon: '✗' },
    { time: '3 days ago', message: 'Started negotiation for 12" Bronze Nataraja. Initial offer: ₹12,500', status: 'success', icon: '✓' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-emerald-950 dark:to-gray-900 p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header - Icon Prominent */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={onBack}
            className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          {showDetailedText && (
            <div>
              <h1 className="text-2xl text-gray-900 dark:text-white">Bargain-Bot Control</h1>
              <p className="text-gray-600 dark:text-gray-400">Configure your autonomous negotiation agent</p>
            </div>
          )}
        </motion.div>

        {/* Configuration Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl text-gray-900 dark:text-white">Negotiation Settings</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">AI will negotiate based on these parameters</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Floor Price */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Floor Price (₹)</label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="number"
                  value={floorPrice}
                  onChange={(e) => setFloorPrice(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="Enter minimum acceptable price"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">AI will not accept offers below this amount</p>
            </div>

            {/* Negotiation Style */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-3">Negotiation Style</label>
              <div className="grid grid-cols-3 gap-3">
                {(['firm', 'friendly', 'flexible'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => setNegotiationStyle(style)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      negotiationStyle === style
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <p className="text-gray-900 dark:text-white mb-1 capitalize">{style}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {style === 'firm' && 'Minimal compromise'}
                      {style === 'friendly' && 'Balanced approach'}
                      {style === 'flexible' && 'Maximum flexibility'}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency Level */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-3">
                Urgency Level: {urgencyLevel}/10
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={urgencyLevel}
                  onChange={(e) => setUrgencyLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${urgencyLevel * 10}%, ${document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'} ${urgencyLevel * 10}%, ${document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'} 100%)`
                  }}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Patient</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Urgent</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {urgencyLevel <= 3 && 'Will wait for better offers'}
                {urgencyLevel > 3 && urgencyLevel <= 7 && 'Balanced negotiation pace'}
                {urgencyLevel > 7 && 'Quick deal closure'}
              </p>
            </div>
          </div>

          <button className="w-full mt-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all"
            onClick={() => {
              console.log('💾 Saving bargain bot configuration:', {
                minPrice,
                maxPrice,
                negotiationStyle,
                autoAccept
              });
              alert(`✅ Configuration Saved!\n\nMin Price: ₹${minPrice}\nMax Price: ₹${maxPrice}\nStyle: ${negotiationStyle}\nAuto-accept: ${autoAccept ? 'Yes' : 'No'}\n\nVani will now negotiate within these limits for you!`);
            }}
          >
            Save Configuration
          </button>
        </motion.div>

        {/* Autonomous Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h3 className="text-xl text-gray-900 dark:text-white">Autonomous Activity Feed</h3>
          </div>

          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className={`p-4 rounded-xl border-l-4 ${
                  activity.status === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                  activity.status === 'completed' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' :
                  activity.status === 'rejected' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                  'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white mb-1">{activity.message}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs ${
                    activity.status === 'success' ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200' :
                    activity.status === 'completed' ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200' :
                    activity.status === 'rejected' ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200' :
                    'bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200'
                  }`}>
                    {activity.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-2xl text-gray-900 dark:text-white mb-1">8</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-green-600 dark:text-green-400 mb-1">24</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-amber-600 dark:text-amber-400 mb-1">₹12,450</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Earned Today</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
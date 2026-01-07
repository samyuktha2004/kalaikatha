import { motion } from 'motion/react';
import { ArrowLeft, Package, Clock, IndianRupee, Check, X as XIcon, MessageCircle, Calendar } from 'lucide-react';
import { useState } from 'react';

interface CustomOrdersProps {
  onBack: () => void;
}

export function CustomOrders({ onBack }: CustomOrdersProps) {
  const [showDetailedText] = useState(
    localStorage.getItem('artisan_detailed_text') === 'true'
  );
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [counterOffer, setCounterOffer] = useState('');

  const orders = [
    {
      id: '1',
      productName: 'Custom Embroidered Shawl',
      buyer: 'Priya Mehta',
      description: 'Traditional embroidery with peacock motifs on pashmina wool',
      specifications: 'Size: 2m x 1m, Colors: Royal blue and gold, Pattern: Peacock design with intricate border',
      quantity: 2,
      budget: 3200,
      dateRequired: '2026-02-15',
      images: ['https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=400'],
      expiresIn: '5 days',
      status: 'pending',
      aiSuggestion: {
        canFulfill: true,
        recommendedPrice: 3800,
        reasoning: 'Based on material costs (₹1200), labor hours (24h @ ₹80/h), and 15% profit margin',
        timeRequired: '18-21 days',
      }
    },
    {
      id: '2',
      productName: 'Terracotta Tea Set',
      buyer: 'Rajesh Kumar',
      description: 'Hand-painted tea set with traditional motifs, 6 cups + teapot',
      specifications: '6 cups (150ml each), 1 teapot (800ml), Red clay with black outline designs',
      quantity: 1,
      budget: 1200,
      dateRequired: '2026-02-01',
      images: ['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400'],
      expiresIn: '2 days',
      status: 'negotiating',
      yourOffer: 1400,
      aiSuggestion: {
        canFulfill: true,
        recommendedPrice: 1450,
        reasoning: 'Current offer ₹1400 is close to optimal. AI negotiating for ₹1450 based on your minimum range.',
        timeRequired: '12-15 days',
      }
    },
  ];

  const handleAccept = (orderId: string) => {
    console.log('Accepting order:', orderId);
    // Integration point for WhatsApp Business
  };

  const handleCounter = (orderId: string) => {
    console.log('Counter offer:', orderId, counterOffer);
  };

  const handleReject = (orderId: string) => {
    console.log('Rejecting order:', orderId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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
          <div>
            <h1 className="text-2xl text-gray-900 dark:text-white">Custom Orders</h1>
            {showDetailedText && <p className="text-gray-600 dark:text-gray-400">Review and respond to buyer requests</p>}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <Package className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="text-2xl text-gray-900 dark:text-white mb-1">{orders.filter(o => o.status === 'pending').length}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">New Requests</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl text-gray-900 dark:text-white mb-1">{orders.filter(o => o.status === 'negotiating').length}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">AI Negotiating</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-2xl text-gray-900 dark:text-white mb-1">0</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Accepted</p>
          </div>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg mb-1">{order.productName}</h3>
                    <p className="text-sm text-white/90">Requested by {order.buyer}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{order.expiresIn}</span>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-6 space-y-4">
                {/* Images */}
                {order.images.length > 0 && (
                  <div className="flex gap-2">
                    {order.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Reference"
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                    ))}
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4 className="text-sm text-gray-700 dark:text-gray-300 mb-1">Description</h4>
                  <p className="text-gray-900 dark:text-white">{order.description}</p>
                </div>

                {/* Specifications */}
                <div>
                  <h4 className="text-sm text-gray-700 dark:text-gray-300 mb-1">Specifications</h4>
                  <p className="text-gray-900 dark:text-white text-sm">{order.specifications}</p>
                </div>

                {/* Requirements Grid */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-1 flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      Quantity
                    </p>
                    <p className="text-lg text-gray-900 dark:text-white">{order.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-1 flex items-center gap-1">
                      <IndianRupee className="w-3 h-3" />
                      Budget
                    </p>
                    <p className="text-lg text-gray-900 dark:text-white">₹{order.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Required By
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {new Date(order.dateRequired).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* AI Suggestion */}
                <div className={`rounded-xl p-4 ${
                  order.aiSuggestion.canFulfill
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      order.aiSuggestion.canFulfill
                        ? 'bg-green-100 dark:bg-green-800'
                        : 'bg-red-100 dark:bg-red-800'
                    }`}>
                      <MessageCircle className={`w-5 h-5 ${
                        order.aiSuggestion.canFulfill
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm mb-1 ${
                        order.aiSuggestion.canFulfill
                          ? 'text-green-900 dark:text-green-300'
                          : 'text-red-900 dark:text-red-300'
                      }`}>
                        Azure AI Analysis
                      </h4>
                      <p className={`text-sm mb-2 ${
                        order.aiSuggestion.canFulfill
                          ? 'text-green-800 dark:text-green-400'
                          : 'text-red-800 dark:text-red-400'
                      }`}>
                        {order.aiSuggestion.reasoning}
                      </p>
                      {order.aiSuggestion.canFulfill && (
                        <div className="flex gap-4 text-xs">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Suggested Price: </span>
                            <span className="text-green-700 dark:text-green-400">₹{order.aiSuggestion.recommendedPrice.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Time: </span>
                            <span className="text-green-700 dark:text-green-400">{order.aiSuggestion.timeRequired}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {order.status === 'pending' && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => handleReject(order.id)}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                      <XIcon className="w-5 h-5" />
                      Decline
                    </button>
                    
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex-1 px-6 py-3 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-xl hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <IndianRupee className="w-5 h-5" />
                      Counter Offer
                    </button>
                    
                    <button
                      onClick={() => handleAccept(order.id)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Accept ₹{order.aiSuggestion.recommendedPrice.toLocaleString()}
                    </button>
                  </div>
                )}

                {order.status === 'negotiating' && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h4 className="text-sm text-blue-900 dark:text-blue-300">
                        AI is negotiating for you
                      </h4>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                      Your counter offer of ₹{order.yourOffer.toLocaleString()} has been sent. 
                      Azure AI is working to reach ₹{order.aiSuggestion.recommendedPrice.toLocaleString()} 
                      while staying above your minimum range.
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        View Negotiation
                      </button>
                      <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                        Accept Current Offer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp Integration Info */}
        {showDetailedText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm text-green-900 dark:text-green-300 mb-1">
                  WhatsApp Business Integration
                </h4>
                <p className="text-xs text-green-700 dark:text-green-400">
                  After accepting an order, you'll receive the buyer's WhatsApp contact to discuss 
                  further details and share progress updates.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

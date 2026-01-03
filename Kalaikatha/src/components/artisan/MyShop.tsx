import { motion } from 'motion/react';
import { ArrowLeft, Plus, Edit, Eye, ToggleLeft, ToggleRight, IndianRupee, Package } from 'lucide-react';
import { useState } from 'react';

interface MyShopProps {
  onBack: () => void;
}

export function MyShop({ onBack }: MyShopProps) {
  const [showDetailedText] = useState(
    localStorage.getItem('artisan_detailed_text') === 'true'
  );

  const listings = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400',
      name: 'Handwoven Silk Saree',
      price: 4500,
      stock: 3,
      views: 234,
      active: true,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1617090946034-ebc960daa9bd?w=400',
      name: 'Blue Pottery Vase',
      price: 850,
      stock: 12,
      views: 156,
      active: true,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=400',
      name: 'Embroidered Wall Hanging',
      price: 1200,
      stock: 5,
      views: 89,
      active: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={onBack}
            className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-2xl text-gray-900">My Shop</h1>
            {showDetailedText && <p className="text-gray-600">Manage your product listings</p>}
          </div>
        </motion.div>

        {/* Add New Product Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-6 mb-6 shadow-xl hover:shadow-2xl transition-all"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="text-lg">Add New Product</h3>
          </div>
        </motion.button>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl text-gray-900">{listings.filter(l => l.active).length}</p>
            <p className="text-xs text-gray-600">Active</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl text-gray-900">{listings.reduce((sum, l) => sum + l.views, 0)}</p>
            <p className="text-xs text-gray-600">Total Views</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-100 flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl text-gray-900">₹{(listings.reduce((sum, l) => sum + (l.price * l.stock), 0) / 1000).toFixed(0)}K</p>
            <p className="text-xs text-gray-600">Inventory</p>
          </div>
        </motion.div>

        {/* Listings */}
        <div className="space-y-4">
          {listings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex gap-4 p-4">
                {/* Product Image */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-full object-cover"
                  />
                  {!listing.active && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-xs">Paused</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{listing.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      <span className="text-lg text-indigo-600">₹{listing.price.toLocaleString()}</span>
                    </div>
                    <div>Stock: {listing.stock}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye className="w-3 h-3" />
                    <span>{listing.views} views</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button className="p-2 bg-indigo-100 hover:bg-indigo-200 rounded-lg transition-colors">
                    <Edit className="w-5 h-5 text-indigo-600" />
                  </button>
                  <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    {listing.active ? (
                      <ToggleRight className="w-5 h-5 text-green-600" />
                    ) : (
                      <ToggleLeft className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 flex justify-between items-center text-xs">
                <span className="text-gray-600">
                  {listing.active ? '✅ Live on marketplace' : '⏸️ Paused'}
                </span>
                <button className="text-indigo-600 hover:underline">
                  View Analytics →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { motion } from 'motion/react';
import { ArrowLeft, Instagram, ShoppingBag, Globe, Check, Sparkles, Copy } from 'lucide-react';
import { useState } from 'react';

interface MarketingReviewProps {
  onBack: () => void;
}

export function MarketingReview({ onBack }: MarketingReviewProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<'instagram' | 'amazon' | 'etsy'>('instagram');
  const [posted, setPosted] = useState(false);
  const [showDetailedText, setShowDetailedText] = useState(
    localStorage.getItem('artisan_detailed_text') === 'true'
  );

  const marketingContent = {
    instagram: {
      title: 'Handcrafted Blue Pottery Masterpiece 🏺✨',
      description: 'Each piece tells a story of 600 years of tradition. Made with love in the heart of Jaipur. #BluePottery #HandmadeInIndia #RajasthanCrafts #SupportArtisans #TraditionalArt',
      hashtags: ['#BluePottery', '#HandmadeInIndia', '#RajasthanCrafts', '#SupportArtisans', '#TraditionalArt', '#HeritageHandicraft'],
      image: 'https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?w=800',
    },
    amazon: {
      title: 'Traditional Blue Pottery Decorative Vase - Handcrafted in Jaipur, Rajasthan',
      description: 'Authentic Rajasthani Blue Pottery, handmade by master artisans. Perfect for home decor. GI Tagged heritage craft. Dimensions: 8"x6". Free shipping. 100% handcrafted. Eco-friendly materials.',
      keywords: 'blue pottery, rajasthan handicraft, handmade vase, jaipur pottery, traditional indian craft, home decor, artisan made, heritage craft',
      image: 'https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?w=800',
    },
    etsy: {
      title: 'Artisan Blue Pottery Vase | Traditional Indian Handicraft | Jaipur Heritage',
      description: 'One-of-a-kind blue pottery vase handcrafted using 400-year-old techniques. Each piece is unique and made to order. Ships worldwide. Supporting local artisan communities in Rajasthan.',
      tags: ['blue pottery', 'indian handicraft', 'jaipur pottery', 'handmade vase', 'traditional craft', 'heritage art', 'artisan made', 'home decor', 'unique gift'],
      image: 'https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?w=800',
    },
  };

  const content = marketingContent[selectedPlatform];

  const handlePost = () => {
    setPosted(true);
    setTimeout(() => setPosted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4 pt-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={onBack}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-2xl text-gray-900">Marketing Review</h1>
            <p className="text-gray-600">AI-generated content optimized for each platform</p>
          </div>
        </motion.div>

        {/* Platform Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-2 shadow-lg mb-6 flex gap-2"
        >
          <button
            onClick={() => setSelectedPlatform('instagram')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
              selectedPlatform === 'instagram'
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Instagram className="w-5 h-5" />
            <span>Instagram</span>
          </button>

          <button
            onClick={() => setSelectedPlatform('amazon')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
              selectedPlatform === 'amazon'
                ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Amazon</span>
          </button>

          <button
            onClick={() => setSelectedPlatform('etsy')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
              selectedPlatform === 'etsy'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Globe className="w-5 h-5" />
            <span>Etsy</span>
          </button>
        </motion.div>

        {/* Content Preview */}
        <motion.div
          key={selectedPlatform}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6"
        >
          <div className="grid md:grid-cols-2">
            {/* Left: Preview Image */}
            <div className="relative aspect-square md:aspect-auto">
              <img
                src={content.image}
                alt="Product"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                AI Enhanced
              </div>
            </div>

            {/* Right: Content */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm text-gray-500 uppercase tracking-wide">
                  {selectedPlatform === 'instagram' && 'Instagram Post'}
                  {selectedPlatform === 'amazon' && 'Amazon Listing'}
                  {selectedPlatform === 'etsy' && 'Etsy Product'}
                </h3>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <h2 className="text-xl text-gray-900 mb-4">{content.title}</h2>

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{content.description}</p>
              </div>

              {/* Platform-specific metadata */}
              {selectedPlatform === 'instagram' && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Recommended Hashtags:</p>
                  <div className="flex flex-wrap gap-2">
                    {marketingContent.instagram.hashtags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedPlatform === 'amazon' && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">SEO Keywords:</p>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">{marketingContent.amazon.keywords}</p>
                  </div>
                </div>
              )}

              {selectedPlatform === 'etsy' && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Product Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {marketingContent.etsy.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl p-6 mb-6 shadow-xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg mb-2">AI Marketing Insights</h3>
              <ul className="space-y-1 text-sm text-white/90">
                <li>✓ Content optimized for {selectedPlatform} algorithm</li>
                <li>✓ Best posting time: Today, 6:00 PM (Peak engagement)</li>
                <li>✓ Predicted reach: 2,500-3,000 users</li>
                <li>✓ Recommended price point: ₹2,200-2,800</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Execute Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          onClick={handlePost}
          disabled={posted}
          className={`w-full py-5 rounded-2xl shadow-2xl transition-all relative overflow-hidden ${
            posted
              ? 'bg-green-600'
              : 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:shadow-3xl'
          }`}
        >
          {posted ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center justify-center gap-3 text-white"
            >
              <Check className="w-6 h-6" />
              <span className="text-lg">Posted Successfully!</span>
            </motion.div>
          ) : (
            <>
              <motion.div
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              <span className="relative text-lg text-white">Execute Posting</span>
            </>
          )}
        </motion.button>

        {/* Preview Warning */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-gray-500 mt-4"
        >
          Review content carefully before posting. You can edit and customize as needed.
        </motion.p>
      </div>
    </div>
  );
}
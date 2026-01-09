import { motion } from 'motion/react';
import { ArrowLeft, Bell, Check, MessageCircle, Package, Eye, Gift, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Switch } from '../ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface WhatsAppNotificationsProps {
  onBack: () => void;
}

export function WhatsAppNotifications({ onBack }: WhatsAppNotificationsProps) {
  const { t, lang } = useTranslation();
  
  // Notification toggles (demo only, no backend)
  const [enabled, setEnabled] = useState(false);
  const [notifications, setNotifications] = useState({
    newOrders: true,
    productViews: true,
    schemeAlerts: true,
    payments: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // WhatsApp message mockups (language-aware)
  const getExampleMessages = () => {
    if (lang === 'ta') {
      return [
        {
          icon: Package,
          title: 'புதிய ஆர்டர்',
          message: '🎉 புதிய ஆர்டர்!\n\nமும்பையிலிருந்து வெண்கல நடராஜருக்கு\nவிலை: ₹5,000\n\n📱 விவரங்களைப் பார்க்க',
          time: '2 mins ago',
        },
        {
          icon: Eye,
          title: 'தயாரிப்பு பார்வைகள்',
          message: '👀 உங்கள் தீபம் செட்டுக்கு இன்று 5 புதிய பார்வைகள் கிடைத்தன!\n\nபார்வைகள்: 47 இந்த வாரம்\n\n📊 Analytics பார்க்க',
          time: '1 hour ago',
        },
        {
          icon: Gift,
          title: 'திட்ட எச்சரிக்கை',
          message: '🎁 புதிய திட்டம் கிடைக்கிறது!\n\nODOP ஏற்றுமதி மானியம்\nஉங்களுக்கு: ₹50,000 - ₹2,00,000\n\n✅ இப்போதே விண்ணப்பிக்கவும்',
          time: '3 hours ago',
        },
      ];
    } else if (lang === 'hi') {
      return [
        {
          icon: Package,
          title: 'नया ऑर्डर',
          message: '🎉 नया ऑर्डर!\n\nमुंबई से कांस्य नटराज के लिए\nमूल्य: ₹5,000\n\n📱 विवरण देखें',
          time: '2 mins ago',
        },
        {
          icon: Eye,
          title: 'उत्पाद देखे गए',
          message: '👀 आपके दीपक सेट को आज 5 नए व्यूज मिले!\n\nव्यूज: 47 इस सप्ताह\n\n📊 Analytics देखें',
          time: '1 hour ago',
        },
        {
          icon: Gift,
          title: 'योजना अलर्ट',
          message: '🎁 नई योजना उपलब्ध है!\n\nODOP निर्यात सब्सिडी\nआपके लिए: ₹50,000 - ₹2,00,000\n\n✅ अभी आवेदन करें',
          time: '3 hours ago',
        },
      ];
    } else {
      return [
        {
          icon: Package,
          title: 'New Order',
          message: '🎉 New Order!\n\nBronze Nataraja from Mumbai\nPrice: ₹5,000\n\n📱 View Details',
          time: '2 mins ago',
        },
        {
          icon: Eye,
          title: 'Product Views',
          message: '👀 Your Diya set got 5 new views today!\n\nViews: 47 this week\n\n📊 View Analytics',
          time: '1 hour ago',
        },
        {
          icon: Gift,
          title: 'Scheme Alert',
          message: '🎁 New scheme available!\n\nODOP Export Subsidy\nFor you: ₹50,000 - ₹2,00,000\n\n✅ Apply Now',
          time: '3 hours ago',
        },
      ];
    }
  };

  const exampleMessages = getExampleMessages();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 pt-20 pb-24">
      <div className="max-w-3xl mx-auto">
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
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <MessageCircle className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl text-gray-900 dark:text-white">
                {t('whatsapp.title')}
              </h1>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                {t('whatsapp.demo.badge')}
              </Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('whatsapp.subtitle')}
            </p>
          </div>
        </motion.div>

        {/* Demo Notice */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-2xl p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800 dark:text-blue-300">
              <p className="font-medium mb-1">{t('whatsapp.demo.badge')}</p>
              <p>{t('whatsapp.demo.note')}</p>
            </div>
          </div>
        </motion.div>

        {/* Enable WhatsApp Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    {t('whatsapp.enable')}
                    {enabled && <Check className="w-5 h-5 text-green-600" />}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {enabled ? t('whatsapp.status.connected') : t('whatsapp.status.notConnected')}
                  </CardDescription>
                </div>
                <Switch
                  checked={enabled}
                  onCheckedChange={setEnabled}
                  className="data-[state=checked]:bg-green-600"
                />
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Notification Types */}
        {enabled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{t('whatsapp.notificationTypes.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* New Orders */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <Package className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {t('whatsapp.notificationTypes.newOrders')}
                      </h3>
                      <Switch
                        checked={notifications.newOrders}
                        onCheckedChange={() => toggleNotification('newOrders')}
                        className="data-[state=checked]:bg-green-600"
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('whatsapp.notificationTypes.newOrdersDesc')}
                    </p>
                  </div>
                </div>

                {/* Product Views */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <Eye className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {t('whatsapp.notificationTypes.productViews')}
                      </h3>
                      <Switch
                        checked={notifications.productViews}
                        onCheckedChange={() => toggleNotification('productViews')}
                        className="data-[state=checked]:bg-green-600"
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('whatsapp.notificationTypes.productViewsDesc')}
                    </p>
                  </div>
                </div>

                {/* Scheme Alerts */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <Gift className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {t('whatsapp.notificationTypes.schemeAlerts')}
                      </h3>
                      <Switch
                        checked={notifications.schemeAlerts}
                        onCheckedChange={() => toggleNotification('schemeAlerts')}
                        className="data-[state=checked]:bg-green-600"
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('whatsapp.notificationTypes.schemeAlertsDesc')}
                    </p>
                  </div>
                </div>

                {/* Payments */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <DollarSign className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {t('whatsapp.notificationTypes.payments')}
                      </h3>
                      <Switch
                        checked={notifications.payments}
                        onCheckedChange={() => toggleNotification('payments')}
                        className="data-[state=checked]:bg-green-600"
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('whatsapp.notificationTypes.paymentsDesc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Example Messages Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('whatsapp.examples.title')}</CardTitle>
              <CardDescription>
                {lang === 'ta' ? 'WhatsApp இல் எப்படி தெரியும்' : lang === 'hi' ? 'WhatsApp पर कैसे दिखेगा' : 'How it looks on WhatsApp'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {exampleMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-[#DCF8C6] dark:bg-green-900/30 rounded-2xl rounded-tl-none p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="p-2 bg-green-600 rounded-full">
                      <msg.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        Kalaikatha Bot
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {msg.time}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line text-sm leading-relaxed">
                    {msg.message}
                  </p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('whatsapp.benefits.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Bell className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {t('whatsapp.benefits.instant')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('whatsapp.benefits.instantDesc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {t('whatsapp.benefits.simple')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('whatsapp.benefits.simpleDesc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Check className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {t('whatsapp.benefits.noMiss')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('whatsapp.benefits.noMissDesc')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

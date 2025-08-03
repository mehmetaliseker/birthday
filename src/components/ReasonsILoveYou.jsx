import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Seni Neden Seviyorum Bileşeni
 * SOLID Prensipleri:
 * S: Tek sorumluluk - Aşk nedenleri gösterimi
 * O: Açık/Kapalı - Yeni nedenler kolayca eklenebilir
 * L: Liskov - Standart liste davranışı
 * I: Interface - Minimal props arayüzü
 * D: Bağımlılık - Props ile bağımsız çalışır
 */
const ReasonsILoveYou = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [revealedReasons, setRevealedReasons] = useState([]);

  const reasons = [
    {
      id: 1,
      reason: "Gülüşün dünyamı aydınlatıyor",
      emoji: "😊",
      color: "from-pink-200 to-red-200"
    },
    {
      id: 2,
      reason: "Seninle her gün yeni bir macera",
      emoji: "🌟",
      color: "from-purple-200 to-pink-200"
    },
    {
      id: 3,
      reason: "Kalbimin tek sahibi sensin",
      emoji: "💖",
      color: "from-red-200 to-pink-200"
    },
    {
      id: 4,
      reason: "Seninle her şey daha güzel",
      emoji: "🌹",
      color: "from-pink-200 to-purple-200"
    },
    {
      id: 5,
      reason: "Seninle her an özel",
      emoji: "✨",
      color: "from-purple-200 to-red-200"
    },
    {
      id: 6,
      reason: "Sen benim en güzel şiirimsin",
      emoji: "💝",
      color: "from-pink-200 to-red-200"
    },
    {
      id: 7,
      reason: "Seninle her sabah güzel",
      emoji: "☀️",
      color: "from-yellow-200 to-pink-200"
    },
    {
      id: 8,
      reason: "Seninle her gece huzurlu",
      emoji: "🌙",
      color: "from-blue-200 to-purple-200"
    },
    {
      id: 9,
      reason: "Seninle her an mutluyum",
      emoji: "😍",
      color: "from-green-200 to-pink-200"
    },
    {
      id: 10,
      reason: "Sen benim en büyük aşkımsın",
      emoji: "💕",
      color: "from-pink-200 to-red-200"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setRevealedReasons(prev => {
        if (prev.length < reasons.length) {
          return [...prev, reasons[prev.length]];
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isVisible, reasons]);

  const handleRevealAll = () => {
    setRevealedReasons(reasons);
  };

  // Framer Motion animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className={`transition-all duration-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-6xl mx-auto p-6">
        {/* Başlık */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-romantic text-pink-600 mb-4">
            Seni Neden Seviyorum? 💕
          </h2>
          <p className="text-lg text-pink-700">
            Her gün yeni bir neden buluyorum seni sevmek için
          </p>
        </motion.div>

        {/* Nedenler grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reasons.map((item, index) => (
            <motion.div
              key={item.id}
              className={`transition-all duration-1000 transform ${
                revealedReasons.includes(item)
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-95 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className={`bg-gradient-to-r ${item.color} rounded-2xl p-6 shadow-xl border-2 border-pink-200 hover:border-pink-300 transition-all duration-300`}
                whileHover={{ 
                  boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.25)",
                  borderColor: "rgb(236, 72, 153)"
                }}
              >
                <div className="text-center">
                  <motion.div 
                    className="text-4xl mb-4 animate-bounce"
                    whileHover={{ scale: 1.3, rotate: 360 }}
                  >
                    {item.emoji}
                  </motion.div>
                  <p className="text-lg font-handwriting text-pink-800 leading-relaxed">
                    {item.reason}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Tümünü göster butonu */}
        {revealedReasons.length < reasons.length && (
          <motion.div 
            className="text-center mb-8"
            variants={itemVariants}
          >
            <motion.button
              onClick={handleRevealAll}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(236, 72, 153, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Tüm Nedenleri Göster 💕
            </motion.button>
          </motion.div>
        )}

        {/* İlerleme çubuğu */}
        <motion.div 
          className="max-w-md mx-auto mb-8"
          variants={itemVariants}
        >
          <div className="bg-pink-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-pink-500 to-red-500 h-full transition-all duration-1000 ease-out"
              style={{ width: `${(revealedReasons.length / reasons.length) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(revealedReasons.length / reasons.length) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="text-center text-pink-600 mt-2">
            {revealedReasons.length} / {reasons.length} neden gösterildi
          </p>
        </motion.div>

        {/* Özel mesaj */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-pink-200"
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.25)" }}
          >
            <p className="text-xl font-handwriting text-pink-800 leading-relaxed mb-4">
              "Seni sevmek için sayısız nedenim var, ama en önemlisi seninle her an mutlu olmam.
              Sen benim en güzel şiirim, en tatlı rüyam, en büyük aşkımsın.
              Seni her geçen gün daha çok seviyorum. 💕"
            </p>

            <div className="flex justify-center items-center space-x-4 mt-6">
              <motion.div 
                className="text-3xl animate-pulse"
                whileHover={{ scale: 1.3, rotate: 360 }}
              >
                💖
              </motion.div>
              <motion.div 
                className="text-3xl animate-bounce"
                whileHover={{ scale: 1.3 }}
              >
                💕
              </motion.div>
              <motion.div 
                className="text-3xl animate-pulse"
                whileHover={{ scale: 1.3, rotate: -360 }}
              >
                💝
              </motion.div>
              <motion.div 
                className="text-3xl animate-bounce"
                whileHover={{ scale: 1.3 }}
              >
                💕
              </motion.div>
              <motion.div 
                className="text-3xl animate-pulse"
                whileHover={{ scale: 1.3, rotate: 360 }}
              >
                💖
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Sayaç */}
        <motion.div 
          className="text-center mt-8"
          variants={itemVariants}
        >
          <motion.div 
            className="bg-gradient-to-r from-pink-100 to-red-100 rounded-2xl p-6 shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-2xl font-romantic text-pink-700">
              Seni {reasons.length} farklı nedenden dolayı seviyorum! 💕
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReasonsILoveYou; 
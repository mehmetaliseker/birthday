import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Aşk Mesajları Bileşeni
 * SOLID Prensipleri:
 * S: Tek sorumluluk - Aşk mesajları gösterimi
 * O: Açık/Kapalı - Yeni mesajlar kolayca eklenebilir
 * L: Liskov - Standart mesaj davranışı
 * I: Interface - Minimal props arayüzü
 * D: Bağımlılık - Props ile bağımsız çalışır
 */
const LoveMessages = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const loveMessages = [
    {
      text: "Seninle her gün yeni bir macera...",
      emoji: "💕",
      color: "from-pink-200 to-red-200"
    },
    {
      text: "Gülüşün dünyamı aydınlatıyor",
      emoji: "✨",
      color: "from-purple-200 to-pink-200"
    },
    {
      text: "Seni her geçen gün daha çok seviyorum",
      emoji: "💖",
      color: "from-red-200 to-pink-200"
    },
    {
      text: "Hayatımın en güzel hediyesi sensin",
      emoji: "🎁",
      color: "from-pink-200 to-purple-200"
    },
    {
      text: "Seninle her şey daha güzel",
      emoji: "🌹",
      color: "from-red-200 to-purple-200"
    },
    {
      text: "İyi ki varsın, iyi ki doğdun",
      emoji: "🌟",
      color: "from-purple-200 to-red-200"
    },
    {
      text: "Sen benim en güzel şiirimsin",
      emoji: "💝",
      color: "from-pink-200 to-red-200"
    },
    {
      text: "Her sabah seni düşünerek uyanıyorum",
      emoji: "☀️",
      color: "from-yellow-200 to-pink-200"
    }
  ];

  // Mesaj değiştirme animasyonu
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % loveMessages.length);
        setIsVisible(true);
      }, 1000);
    }, 5000);

    return () => clearInterval(messageInterval);
  }, [loveMessages.length]);

  const currentMessage = loveMessages[currentMessageIndex];

  // Framer Motion animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="text-center py-8 px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Mesaj kartı */}
        <motion.div 
          className={`transition-all duration-1000 transform ${
            isVisible 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-4'
          }`}
          variants={messageVariants}
          key={currentMessageIndex}
        >
          <motion.div 
            className={`bg-gradient-to-r ${currentMessage.color} rounded-2xl p-8 shadow-xl border-2 border-pink-300/50`}
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.25)" }}
          >
            {/* Emoji */}
            <motion.div 
              className="text-6xl mb-4 animate-bounce"
              whileHover={{ scale: 1.2, rotate: 360 }}
            >
              {currentMessage.emoji}
            </motion.div>
            
            {/* Mesaj metni */}
            <p className="text-2xl md:text-3xl font-handwriting text-pink-800 leading-relaxed italic">
              "{currentMessage.text}"
            </p>
            
            {/* Dekoratif çizgi */}
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-pink-400 to-red-400 mx-auto mt-6 rounded-full animate-pulse"
              whileHover={{ scaleX: 1.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Mesaj sayacı */}
        <motion.div 
          className="mt-6 flex justify-center space-x-2"
          variants={itemVariants}
        >
          {loveMessages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                  setCurrentMessageIndex(index);
                  setIsVisible(true);
                }, 500);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentMessageIndex
                  ? 'bg-pink-500 scale-125'
                  : 'bg-pink-300'
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </motion.div>

        {/* Özel mesaj */}
        <motion.div 
          className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-lg text-pink-700 font-medium">
            Seninle geçirdiğim her an için teşekkür ederim. 
            Bu özel gününde seni daha da çok sevdiğimi bilmeni istiyorum. 
            İyi ki doğdun, aşkım! 🌹💕
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoveMessages; 
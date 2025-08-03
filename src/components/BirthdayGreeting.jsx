import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Doğum Günü Mesajı Bileşeni
 * SOLID Prensipleri:
 * S: Tek sorumluluk - Doğum günü mesajı animasyonu
 * O: Açık/Kapalı - Yeni animasyon efektleri eklenebilir
 * L: Liskov - Standart mesaj davranışı
 * I: Interface - Minimal props arayüzü
 * D: Bağımlılık - Props ile bağımsız çalışır
 */
const BirthdayGreeting = () => {
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const messages = [
    "🎂 Doğum Günün Kutlu Olsun! 🎂",
    "Seninle her gün bir kutlama gibi...",
    "Hayatımın en güzel hediyesi sensin ❤️",
    "Seni çok seviyorum! 💕",
    "Bu özel gününde yanındayım 🌟"
  ];

  // Yazı animasyonu
  useEffect(() => {
    if (!isTyping) return;

    const currentMessage = messages[textIndex];
    
    if (currentText.length < currentMessage.length) {
      const timer = setTimeout(() => {
        setCurrentText(currentMessage.slice(0, currentText.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Mesaj tamamlandığında bekle
      const timer = setTimeout(() => {
        setIsTyping(false);
        setTimeout(() => {
          setCurrentText('');
          setTextIndex((prev) => (prev + 1) % messages.length);
          setIsTyping(true);
        }, 2000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentText, textIndex, isTyping, messages]);

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
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
      <div className="max-w-4xl mx-auto">
        {/* Ana başlık */}
        <motion.div className="mb-8" variants={itemVariants}>
          <h2 className="text-3xl md:text-5xl font-bold text-pink-600 mb-4 animate-bounce">
            🎉 HAPPY BIRTHDAY! 🎉
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-red-400 mx-auto rounded-full animate-pulse"></div>
        </motion.div>

        {/* Yazı animasyonu */}
        <motion.div 
          className="min-h-[120px] flex items-center justify-center"
          variants={textVariants}
        >
          <div className="relative">
            <span className="text-2xl md:text-3xl font-medium text-pink-700 leading-relaxed">
              {currentText}
              {isTyping && (
                <span className="animate-pulse text-pink-500">|</span>
              )}
            </span>
          </div>
        </motion.div>

        {/* Dekoratif elementler */}
        <motion.div 
          className="flex justify-center items-center space-x-4 mt-8"
          variants={itemVariants}
        >
          <motion.div 
            className="text-4xl animate-spin-slow"
            whileHover={{ scale: 1.2, rotate: 360 }}
          >
            🎈
          </motion.div>
          <motion.div 
            className="text-4xl animate-bounce" 
            style={{ animationDelay: '0.5s' }}
            whileHover={{ scale: 1.2 }}
          >
            🎁
          </motion.div>
          <motion.div 
            className="text-4xl animate-spin-slow" 
            style={{ animationDelay: '1s' }}
            whileHover={{ scale: 1.2, rotate: -360 }}
          >
            🎊
          </motion.div>
          <motion.div 
            className="text-4xl animate-bounce" 
            style={{ animationDelay: '1.5s' }}
            whileHover={{ scale: 1.2 }}
          >
            🎉
          </motion.div>
          <motion.div 
            className="text-4xl animate-spin-slow" 
            style={{ animationDelay: '2s' }}
            whileHover={{ scale: 1.2, rotate: 360 }}
          >
            💝
          </motion.div>
        </motion.div>

        {/* Romantik mesaj */}
        <motion.div 
          className="mt-8 p-6 bg-gradient-to-r from-pink-100 to-red-100 rounded-2xl shadow-lg"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-lg md:text-xl text-pink-800 font-medium italic">
            "Seninle geçirdiğim her an, hayatımın en değerli hazinesi. 
            Bu özel gününde seni daha da çok sevdiğimi bilmeni istiyorum. 
            İyi ki doğdun, aşkım! 🌹"
          </p>
        </motion.div>

        {/* Kalp animasyonu */}
        <motion.div 
          className="mt-6 flex justify-center space-x-2"
          variants={itemVariants}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="text-2xl animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
            >
              ❤️
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BirthdayGreeting; 
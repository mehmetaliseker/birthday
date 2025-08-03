import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Samimi Doğum Günü Mesajı Bileşeni
 * SOLID Prensipleri:
 * S: Tek sorumluluk - Samimi mesaj gösterimi
 * O: Açık/Kapalı - Yeni mesaj türleri eklenebilir
 * L: Liskov - Standart mesaj davranışı
 * I: Interface - Minimal props arayüzü
 * D: Bağımlılık - Props ile bağımsız çalışır
 */
const HeartfeltMessage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Framer Motion animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className={`transition-all duration-2000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-4xl mx-auto p-6">
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-pink-200"
          variants={itemVariants}
          whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.25)" }}
        >
          {/* Başlık */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-romantic text-pink-600 mb-4">
              Sevgili Aşkım...
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-red-400 mx-auto rounded-full"></div>
          </motion.div>

          {/* Mesaj içeriği */}
          <div className="space-y-6 text-lg leading-relaxed">
            <motion.p 
              className="text-pink-800 font-handwriting text-xl"
              variants={textVariants}
            >
              Bugün senin doğum günün ve benim için dünyanın en özel günü. 
              Seninle geçirdiğim her an, hayatımın en değerli hazinesi.
            </motion.p>

            <motion.p 
              className="text-pink-700"
              variants={textVariants}
            >
              Seninle tanıştığım günden beri, hayatım renklendi, gülüşüm çoğaldı. 
              Her sabah seni düşünerek uyanıyorum ve her gece seni hayal ederek uyuyorum. 
              Sen benim en güzel şiirim, en tatlı rüyam, en büyük aşkımsın.
            </motion.p>

            <motion.p 
              className="text-pink-700"
              variants={textVariants}
            >
              Bu özel gününde seni daha da çok sevdiğimi bilmeni istiyorum. 
              Seninle geçirdiğim her an için şükrediyorum. 
              Seninle her gün yeni bir macera, her an yeni bir mutluluk.
            </motion.p>

            <motion.p 
              className="text-pink-700"
              variants={textVariants}
            >
              İyi ki doğdun, iyi ki varsın, iyi ki benimsin. 
              Seninle geçireceğimiz nice güzel yıllar olsun. 
              Seni sonsuza kadar seveceğim.
            </motion.p>

            <motion.div 
              className="text-center mt-8"
              variants={itemVariants}
            >
              <p className="text-2xl font-romantic text-pink-600">
                Seni Çok Seviyorum! 💕
              </p>
              <p className="text-lg text-pink-500 mt-2">
                - Senin Aşkın
              </p>
            </motion.div>
          </div>

          {/* Dekoratif elementler */}
          <motion.div 
            className="flex justify-center items-center space-x-4 mt-8"
            variants={itemVariants}
          >
            <motion.div 
              className="text-3xl animate-bounce"
              whileHover={{ scale: 1.3, rotate: 360 }}
            >
              🌹
            </motion.div>
            <motion.div 
              className="text-3xl animate-pulse"
              whileHover={{ scale: 1.3 }}
            >
              💝
            </motion.div>
            <motion.div 
              className="text-3xl animate-bounce"
              whileHover={{ scale: 1.3, rotate: -360 }}
            >
              ✨
            </motion.div>
            <motion.div 
              className="text-3xl animate-pulse"
              whileHover={{ scale: 1.3 }}
            >
              💕
            </motion.div>
            <motion.div 
              className="text-3xl animate-bounce"
              whileHover={{ scale: 1.3, rotate: 360 }}
            >
              🌟
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeartfeltMessage; 
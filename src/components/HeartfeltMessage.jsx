import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeartfeltMessage = ({ onYesClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [showHeartExplosion, setShowHeartExplosion] = useState(false);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [noButtonHidden, setNoButtonHidden] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);


  const noButtonTexts = [
    "Hayır",
    "Emin misin?",
    "Tekrar düşün...",
    "Cidden mi?",
    "Lütfen?",
    "Kaba olma",
    "Üzülürüm ki...",
    "Son şansın!",
    "Çok lütfen?",
    "Kalbimi kırıyorsun!",
    "İyi başkasına sorarım!",
    "Şaka yaptım",
    "Çaresiz hale geliyorum!",
    "Cidden inatçısın!",
    "Hayır bir seçenek değildi!"
  ];



  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleNoClick = () => {
    setNoClickCount(prev => {
      const next = prev + 1;

      return next;
    });
    setYesButtonSize(prev => prev + 0.2);
  };

  const handleYesClick = () => {
    setYesClicked(true); // buton içeriğini değiştir
    setNoButtonHidden(true); // Hayır butonunu kaldır
    setYesButtonSize(2); // butonu büyüt
    setShowHeartExplosion(true);
    onYesClick?.(); // App'e bildir (FloatingHearts için)

    setTimeout(() => {
      setShowHeartExplosion(false);
    }, 5000);
  };

  // Heart explosion animation variants
  const heartExplosionVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: [0, 1.5, 1],
      opacity: [0, 1, 0],
      transition: { 
        duration: 3,
        ease: "easeOut"
      }
    }
  };

  const floatingHeartVariants = {
    hidden: { scale: 0, opacity: 0, y: 0 },
    visible: (i) => ({
      scale: [0, 1, 0.8],
      opacity: [0, 1, 0],
      y: [0, -100 - i * 20, -200 - i * 30],
      x: [0, (i % 2 === 0 ? 1 : -1) * (50 + i * 10), (i % 2 === 0 ? 1 : -1) * (100 + i * 20)],
      transition: {
        duration: 2 + i * 0.2,
        ease: "easeOut",
        delay: i * 0.1
      }
    })
  };

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
      style={{ zIndex: 1000, position: 'relative' }}
    >
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-pink-200"
          variants={itemVariants}
          whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.25)" }}
        >
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-romantic text-pink-600 mb-4">
              Güzelim...
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-red-400 mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-6 text-lg leading-relaxed">
            <motion.p
              className="text-pink-700 leading-relaxed"
              variants={textVariants}
            >
              Seninle tanıştığım günden beri, hayatım renklendi, gülüşüm çoğaldı.
              Her sabah seni düşünerek uyanıyorum ve her gece seni hayal ederek uyuyorum.
              Sen benim en güzel şiirim, en tatlı rüyam, en büyük aşkımsın.
            </motion.p>

            <motion.p
              className="text-pink-700 leading-relaxed"
              variants={textVariants}
            >
              Seninle geçireceğimiz nice güzel yıllar olsun.
              Seni ne olursa olsun sonsuza kadar seveceğim.
            </motion.p>

            <motion.div
              className="text-center mt-8"
              variants={itemVariants}
            >
              <p className="text-2xl font-romantic text-pink-600">
                Seni Çok Seviyorum! 💕
              </p>
              <p className="text-lg text-pink-500 mt-2">
                - Mehmet Ali
              </p>
            </motion.div>

            <motion.div
              className="text-center mt-10 p-4 sm:p-6 bg-pink-50 rounded-xl border border-pink-200"
              variants={itemVariants}
            >
              <p className="text-xl sm:text-2xl font-romantic text-pink-600 mb-4 sm:mb-6">
                Sevgilim olur musun?
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 relative">
                {yesClicked ? (
                  <motion.button
                    onClick={handleYesClick}
                    className="w-full sm:w-auto bg-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                    style={{ transform: `scale(${yesButtonSize})`, zIndex: 50 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Biliyordum! 💖
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleYesClick}
                    className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                    whileTap={{ scale: 2 }}
                    style={{ transform: `scale(${yesButtonSize})`, zIndex: 50 }}
                  >
                    Evet 💕
                  </motion.button>
                )}

                {!noButtonHidden && (
                  <motion.button
                    onClick={handleNoClick}
                    className="w-full sm:w-auto bg-gray-400 hover:bg-gray-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ zIndex: 10 }}
                  >
                    {noButtonTexts[Math.min(noClickCount, noButtonTexts.length - 1)]}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Heart explosion animation */}
      {showHeartExplosion && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2000 }}>
          {/* Main heart explosion */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            variants={heartExplosionVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-9xl">💖</div>
          </motion.div>
          
          {/* Multiple floating hearts */}
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              custom={i}
              variants={floatingHeartVariants}
              initial="hidden"
              animate="visible"
            >
              {['💖', '💕', '💝', '💗', '💓'][i % 5]}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default HeartfeltMessage;
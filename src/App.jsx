import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import PhotoCarousel from './components/PhotoCarousel';
import FloatingHearts from './components/FloatingHearts';
import BirthdayGreeting from './components/BirthdayGreeting';
import BackgroundMusic from './components/BackgroundMusic';
import FloatingBalloons from './components/FloatingBalloons';
import SparkleEffects from './components/SparkleEffects';
import LoveMessages from './components/LoveMessages';
import HeartfeltMessage from './components/HeartfeltMessage';
import ReasonsILoveYou from './components/ReasonsILoveYou';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showHeartfelt, setShowHeartfelt] = useState(false);
  const [showReasons, setShowReasons] = useState(false);
  const audioRef = useRef(null);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setShowGreeting(true);
    }, 1000);

    const messageTimer = setTimeout(() => {
      setShowMessages(true);
    }, 2000);

    const heartfeltTimer = setTimeout(() => {
      setShowHeartfelt(true);
    }, 3000);

    const reasonsTimer = setTimeout(() => {
      setShowReasons(true);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(messageTimer);
      clearTimeout(heartfeltTimer);
      clearTimeout(reasonsTimer);
    };
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-purple-100 overflow-hidden relative">
      {/* Arka plan müziği */}
      <BackgroundMusic audioRef={audioRef} />
      
      {/* Yüzen kalpler animasyonu */}
      <FloatingHearts isActive={isLoaded} />
      
      {/* Yüzen balonlar */}
      <FloatingBalloons isActive={isLoaded} />
      
      {/* Kıvılcım efektleri */}
      <SparkleEffects isActive={isLoaded} />
      
      {/* Ana içerik */}
      <motion.div 
        className={`transition-all duration-2000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Başlık */}
        <motion.header 
          className="text-center pt-8 pb-4"
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-4 animate-pulse">
            🎂 Doğum Günün Kutlu Olsun! 🎂
          </h1>
        </motion.header>

        {/* Fotoğraf carousel */}
        <motion.main 
          className="container mx-auto px-4 py-8"
          variants={fadeInUp}
        >
          <PhotoCarousel />
        </motion.main>

        {/* Doğum günü mesajı */}
        {showGreeting && (
          <motion.div variants={fadeInUp}>
            <BirthdayGreeting />
          </motion.div>
        )}

        {/* Aşk mesajları */}
        {showMessages && (
          <motion.div variants={fadeInUp}>
            <LoveMessages />
          </motion.div>
        )}

        {showHeartfelt && (
          <motion.div variants={fadeInUp}>
            <HeartfeltMessage />
          </motion.div>
        )}

        {showReasons && (
          <motion.div variants={fadeInUp}>
            <ReasonsILoveYou />
          </motion.div>
        )}
      </motion.div>

      {/* Alt bilgi */}
      <motion.footer 
        className="text-center py-8 px-4"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <p className="text-lg font-handwriting text-pink-700 mb-4">
              "Seninle geçirdiğim her an için teşekkür ederim. 
              Bu özel gününde seni daha da çok sevdiğimi bilmeni istiyorum. 
              İyi ki doğdun, aşkım! 🌹💕"
            </p>
            <div className="flex justify-center space-x-4">
              <div className="text-2xl animate-pulse">💖</div>
              <div className="text-2xl animate-bounce">💕</div>
              <div className="text-2xl animate-pulse">💝</div>
              <div className="text-2xl animate-bounce">💕</div>
              <div className="text-2xl animate-pulse">💖</div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
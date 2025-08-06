import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Fotoğraf Carousel Bileşeni
 * SOLID Prensipleri:
 * S: Tek sorumluluk - Fotoğraf gösterimi ve geçişleri
 * O: Açık/Kapalı - Yeni fotoğraflar kolayca eklenebilir
 * L: Liskov - Standart carousel davranışı
 * I: Interface - Minimal props arayüzü
 * D: Bağımlılık - Props ile bağımsız çalışır
 */
const imageFiles = [
  '/images/deniz1.jpeg',
  '/images/deniz2.jpeg',
  '/images/deniz3.jpeg',
  '/images/deniz4.jpeg',
];

const PhotoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageSizes, setImageSizes] = useState([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const imgRef = useRef(null);

  // Görüntü boyutlarını yükle
  useEffect(() => {
    let isMounted = true;
    Promise.all(
      imageFiles.map(
        (src) =>
          new Promise((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
            img.onerror = () => resolve({ width: 800, height: 600 }); // fallback
            img.src = src;
          })
      )
    ).then((sizes) => {
      if (isMounted) setImageSizes(sizes);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Otomatik geçiş
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextPhoto();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning]);

  // Geçerli fotoğrafın boyutunu ayarla
  useEffect(() => {
    if (imageSizes[currentIndex]) {
      // Responsive oranı koru, max genişlik/height uygula
      const maxW = 700;
      const maxH = 500;
      let { width, height } = imageSizes[currentIndex];
      let ratio = Math.min(maxW / width, maxH / height, 1);

      if (currentIndex === 3) {
        ratio *= 0.85;
      }
      setContainerSize({ width: width * ratio, height: height * ratio });
    }
  }, [currentIndex, imageSizes]);

  const nextPhoto = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % imageFiles.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevPhoto = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + imageFiles.length) % imageFiles.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPhoto = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Framer Motion animasyon varyantları
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      style={{ maxWidth: '100vw' }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl shadow-2xl flex justify-center items-center"
        animate={{ width: containerSize.width, height: containerSize.height }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        style={{ margin: '0 auto', background: '#fff' }}
      >
        {/* Ana fotoğraf */}
        <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
          <motion.img
            ref={imgRef}
            key={currentIndex}
            src={imageFiles[currentIndex]}
            alt={`Fotoğraf ${currentIndex + 1}`}
            className={`object-contain w-full h-full ${isTransitioning ? 'scale-110 blur-sm' : 'scale-100 blur-0'}`}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%' }}
          />
          {/* Fotoğraf üzerinde romantik overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          {/* Fotoğraf numarası */}
          <motion.div
            className="absolute top-4 right-4 bg-pink-500/80 text-white px-3 py-1 rounded-full text-sm font-medium"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {currentIndex + 1} / {imageFiles.length}
          </motion.div>
        </div>
        {/* Gezinme butonları */}
        <motion.button
          type="button"
          onClick={prevPhoto}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-pink-600 p-3 rounded-full shadow-lg transition-all duration-300 "
        >
          ❮
        </motion.button>
        <motion.button
          type="button"
          onClick={nextPhoto}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-pink-600 p-3 rounded-full shadow-lg transition-all duration-300 "
        >
          ❯
        </motion.button>
        {/* Nokta göstergeleri */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {imageFiles.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToPhoto(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-pink-500 scale-125' : 'bg-white/60 hover:bg-white/80'
                }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </motion.div>
      {/* Fotoğraf açıklaması */}
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-pink-600 text-lg font-medium">
          Seninle geçirdiğim her an, hayatımın en güzel hediyesi ❤️
        </p>
      </motion.div>
    </motion.div>
  );
};

export default PhotoCarousel; 
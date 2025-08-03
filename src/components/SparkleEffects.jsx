import { useState, useEffect } from 'react';

/**
 * Kıvılcım Efektleri Bileşeni
 * SOLID Prensipleri:
 * S: Tek sorumluluk - Kıvılcım animasyonları
 * O: Açık/Kapalı - Yeni efekt türleri eklenebilir
 * L: Liskov - Standart animasyon davranışı
 * I: Interface - Minimal props arayüzü
 * D: Bağımlılık - Props ile bağımsız çalışır
 */
const SparkleEffects = ({ isActive }) => {
  const [sparkles, setSparkles] = useState([]);

  // Kıvılcım oluşturma fonksiyonu
  const createSparkle = () => {
    const sparkle = {
      id: Date.now() + Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 3000 + 2000,
      delay: Math.random() * 2000,
      color: ['#ffd700', '#ff6b9d', '#ff8fab', '#ffb3c1', '#e91e63', '#9c27b0'][Math.floor(Math.random() * 6)],
      opacity: Math.random() * 0.8 + 0.2
    };
    return sparkle;
  };

  // Kıvılcım animasyonu
  useEffect(() => {
    if (!isActive) return;

    const addSparkle = () => {
      setSparkles(prev => [...prev, createSparkle()]);
    };

    // İlk kıvılcımları oluştur
    const initialSparkles = Array.from({ length: 20 }, () => createSparkle());
    setSparkles(initialSparkles);

    // Düzenli olarak yeni kıvılcımlar ekle
    const interval = setInterval(addSparkle, 500);

    return () => clearInterval(interval);
  }, [isActive]);

  // Kıvılcım temizleme
  useEffect(() => {
    const cleanup = setInterval(() => {
      setSparkles(prev => prev.filter(sparkle => {
        const age = Date.now() - sparkle.id;
        return age < sparkle.duration;
      }));
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute animate-ping"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            opacity: sparkle.opacity,
            borderRadius: '50%',
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
            animationDelay: `${sparkle.delay}ms`,
            animationDuration: `${sparkle.duration}ms`
          }}
        >
          {/* Kıvılcım merkezi */}
          <div 
            className="w-full h-full rounded-full animate-pulse"
            style={{ 
              backgroundColor: sparkle.color,
              boxShadow: `0 0 ${sparkle.size}px ${sparkle.color}`
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SparkleEffects; 
import { useState, useEffect } from 'react';

/**
 * Yüzen Kalpler Animasyon Bileşeni
 * SOLID Prensipleri:
 * S: Tek sorumluluk - Kalp animasyonları
 * O: Açık/Kapalı - Yeni animasyon türleri eklenebilir
 * L: Liskov - Standart animasyon davranışı
 * I: Interface - Minimal props arayüzü
 * D: Bağımlılık - Props ile bağımsız çalışır
 */
const FloatingHearts = ({ isActive }) => {
  const [hearts, setHearts] = useState([]);

  // Kalp oluşturma fonksiyonu
  const createHeart = () => {
    const heart = {
      id: Date.now() + Math.random(),
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 50,
      size: Math.random() * 20 + 15, 
      speed: Math.random() * 2 + 1, 
      rotation: Math.random() * 360,
      color: ['#ff6b9d', '#ff8fab', '#ffb3c1', '#ff6b9d', '#e91e63'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 3000 
    };
    return heart;
  };

  // Kalp animasyonu
  useEffect(() => {
    if (!isActive) return;

    const addHeart = () => {
      setHearts(prev => [...prev, createHeart()]);
    };

    // İlk kalpleri oluştur (daha az sayıda)
    const initialHearts = Array.from({ length: 5 }, () => createHeart());
    setHearts(initialHearts);

    // Düzenli olarak yeni kalpler ekle (daha seyrek)
    const interval = setInterval(addHeart, 1500);

    return () => clearInterval(interval);
  }, [isActive]);

  // Kalp temizleme
  useEffect(() => {
    const cleanup = setInterval(() => {
      setHearts(prev => prev.filter(heart => heart.y > -100));
    }, 750);

    return () => clearInterval(cleanup);
  }, []);

  // Kalp pozisyon güncelleme
  useEffect(() => {
    if (!isActive) return;

    const updateHearts = () => {
      setHearts(prev => 
        prev.map(heart => ({
          ...heart,
          y: heart.y - heart.speed,
          rotation: heart.rotation + 0.5 // Daha yavaş dönüş
        }))
      );
    };

    const animationFrame = setInterval(updateHearts, 80); // Daha yavaş güncelleme
    return () => clearInterval(animationFrame);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute animate-pulse"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            transform: `rotate(${heart.rotation}deg) scale(${heart.size / 30})`,
            color: heart.color,
            fontSize: `${heart.size}px`,
            transition: 'all 0.2s ease-out',
            animationDelay: `${heart.delay}ms`,
            opacity: 0.7 
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts; 
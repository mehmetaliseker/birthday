import { useState, useEffect } from 'react';

/**
 * Yüzen Balonlar Animasyon Bileşeni
 * SOLID Prensipleri:
 * S: Tek sorumluluk - Balon animasyonları
 * O: Açık/Kapalı - Yeni balon türleri eklenebilir
 * L: Liskov - Standart animasyon davranışı
 * I: Interface - Minimal props arayüzü
 * D: Bağımlılık - Props ile bağımsız çalışır
 */
const FloatingBalloons = ({ isActive }) => {
  const [balloons, setBalloons] = useState([]);
  const MAX_BALLOONS = 20; // Maksimum balon sayısı sınırı

  // Balon oluşturma fonksiyonu
  const createBalloon = () => {
    const balloon = {
      id: Date.now() + Math.random(),
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 100,
      size: Math.random() * 30 + 25, // Daha küçük balonlar
      speed: Math.random() * 1.2 + 0.6, // Daha yavaş hareket
      swing: Math.random() * 2 - 1,
      color: ['#ff6b9d', '#ff8fab', '#ffb3c1', '#ff6b9d', '#e91e63', '#9c27b0', '#ff9800'][Math.floor(Math.random() * 7)],
      delay: Math.random() * 4000 // Daha uzun gecikme
    };
    return balloon;
  };

  // Balon animasyonu
  useEffect(() => {
    if (!isActive) return;

    const addBalloon = () => {
      setBalloons(prev => {
        // Maksimum balon sayısını kontrol et
        if (prev.length >= MAX_BALLOONS) {
          return prev;
        }
        return [...prev, createBalloon()];
      });
    };

    // İlk balonları oluştur (daha az sayıda)
    const initialBalloons = Array.from({ length: 3 }, () => createBalloon());
    setBalloons(initialBalloons);

    // Düzenli olarak yeni balonlar ekle (daha seyrek - 5 saniyede bir)
    const interval = setInterval(addBalloon, 5000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Balon temizleme (daha hızlı temizleme)
  useEffect(() => {
    const cleanup = setInterval(() => {
      setBalloons(prev => prev.filter(balloon => balloon.y > -150));
    }, 1500); // Daha hızlı temizleme (1.5 saniyede bir)

    return () => clearInterval(cleanup);
  }, []);

  // Balon pozisyon güncelleme
  useEffect(() => {
    if (!isActive) return;

    const updateBalloons = () => {
      setBalloons(prev => 
        prev.map(balloon => ({
          ...balloon,
          y: balloon.y - balloon.speed,
          x: balloon.x + balloon.swing * 0.3 // Daha az sallanma
        }))
      );
    };

    const animationFrame = setInterval(updateBalloons, 120); // Daha yavaş güncelleme
    return () => clearInterval(animationFrame);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      className="floating-balloons"
      style={{ zIndex: 0, position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}
    >
      {balloons.map(balloon => (
        <div
          key={balloon.id}
          className="absolute"
          style={{
            left: `${balloon.x}px`,
            top: `${balloon.y}px`,
            transform: `scale(${balloon.size / 50})`,
            transition: 'all 0.2s ease-out',
            animationDelay: `${balloon.delay}ms`,
            opacity: 0.5 // Daha şeffaf balonlar (0.8'den 0.5'e düşürüldü)
          }}
        >
          {/* Balon gövdesi */}
          <div 
            className="w-16 h-20 rounded-full animate-bounce"
            style={{ 
              backgroundColor: balloon.color,
              boxShadow: `0 4px 8px ${balloon.color}40`
            }}
          >
            {/* Balon parıltısı */}
            <div 
              className="w-4 h-4 rounded-full absolute top-2 left-3"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
              }}
            />
          </div>
          
          {/* Balon ipi */}
          <div 
            className="w-0.5 bg-gray-400 mx-auto"
            style={{ 
              height: '20px',
              marginTop: '-2px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingBalloons; 
import { useEffect, useRef, useState } from 'react';

/**
 * Arka Plan Müziği Bileşeni
 * SOLID Prensipleri:
 * S: Tek sorumluluk - Müzik çalma ve kontrol
 * O: Açık/Kapalı - Yeni müzik türleri eklenebilir
 * L: Liskov - Standart müzik davranışı
 * I: Interface - Minimal props arayüzü
 * D: Bağımlılık - Props ile bağımsız çalışır
 */
const BackgroundMusic = ({ audioRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Müzik dosyası URL'i (örnek - gerçek müzik dosyası ile değiştirilecek)
  const musicUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'; // Örnek ses

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }
  }, [audioRef]);

  const handleToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.log('Müzik çalınamadı:', error);
        });
      }
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Gizli audio elementi */}
      <audio
        ref={audioRef}
        src={musicUrl}
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onError={(e) => console.log('Müzik yüklenemedi:', e)}
      />
      
      {/* Tek müzik toggle butonu */}
      <button
        onClick={handleToggle}
        className={`p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg ${
          isPlaying 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-pink-500 hover:bg-pink-600 text-white'
        }`}
        title={isPlaying ? 'Müziği Duraklat' : 'Müziği Çal'}
      >
        {isPlaying ? '⏸️' : '🎵'}
      </button>
    </div>
  );
};

export default BackgroundMusic; 
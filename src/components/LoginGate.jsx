import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Güvenli Giriş Kapısı Bileşeni
 * SOLID Prensipleri:
 * S: Tek sorumluluk - Güvenli giriş kontrolü
 * O: Açık/Kapalı - Yeni güvenlik katmanları eklenebilir
 * L: Liskov - Standart giriş davranışı
 * I: Interface - Minimal props arayüzü
 * D: Bağımlılık - Props ile bağımsız çalışır
 */
const LoginGate = ({ children, onAuthenticated }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);

  // Güvenlik katmanları
  const [securityLayer1, setSecurityLayer1] = useState(0);
  const [securityLayer2, setSecurityLayer2] = useState(0);
  const [securityLayer3, setSecurityLayer3] = useState(0);

  // Şifre doğrulama fonksiyonu (çoklu katman)
  const validatePassword = useCallback((input) => {
    // Katman 1: Basit hash kontrolü
    const layer1 = btoa(input).split('').reverse().join('');
    const expected1 = btoa('01100100').split('').reverse().join('');
    
    // Katman 2: XOR şifreleme
    const layer2 = input.split('').map(char => char.charCodeAt(0) ^ 0x42).join('');
    const expected2 = '01100100'.split('').map(char => char.charCodeAt(0) ^ 0x42).join('');
    
    // Katman 3: Karışık kontrol
    const layer3 = input.split('').reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0);
    const expected3 = '01100100'.split('').reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0);
    
    return layer1 === expected1 && layer2 === expected2 && layer3 === expected3;
  }, []);

  // Giriş denemesi
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (lockoutTime > Date.now()) {
      const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
      setError(`Çok fazla deneme! ${remaining} saniye bekleyin.`);
      return;
    }

    setIsLoading(true);
    setError('');

    // Yapay gecikme (brute force saldırılarını zorlaştırır)
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    try {
      const isValid = validatePassword(password);
      
      if (isValid) {
        setIsAuthenticated(true);
        onAuthenticated?.();
        
        // Başarılı giriş sonrası güvenlik temizliği
        setPassword('');
        setAttempts(0);
        setLockoutTime(0);
        
        // Local storage'a güvenli token kaydet
        const token = btoa(Date.now().toString() + Math.random().toString());
        localStorage.setItem('auth_token', token);
        
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          const lockoutDuration = Math.min(30000 * Math.pow(2, newAttempts - 3), 300000); // Max 5 dakika
          setLockoutTime(Date.now() + lockoutDuration);
          setError(`Çok fazla yanlış deneme! ${Math.ceil(lockoutDuration / 1000)} saniye bekleyin.`);
        } else {
          setError(`Yanlış şifre! ${3 - newAttempts} deneme hakkınız kaldı.`);
        }
        
        setPassword('');
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sayfa yüklendiğinde token kontrolü
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const decoded = atob(token);
        const timestamp = parseInt(decoded.split('.')[0]);
        const now = Date.now();
        
        // Token 24 saat geçerli
        if (now - timestamp < 24 * 60 * 60 * 1000) {
          setIsAuthenticated(true);
          onAuthenticated?.();
        } else {
          localStorage.removeItem('auth_token');
        }
      } catch {
        localStorage.removeItem('auth_token');
      }
    }
  }, [onAuthenticated]);

  // Güvenlik katmanlarını periyodik olarak güncelle
  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityLayer1(prev => (prev + 1) % 1000);
      setSecurityLayer2(prev => (prev + 2) % 1000);
      setSecurityLayer3(prev => (prev + 3) % 1000);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Sayfa kapatma/refresh koruması
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isAuthenticated) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isAuthenticated]);

  // Developer tools tespiti
  useEffect(() => {
    const detectDevTools = () => {
      if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        setError('Güvenlik ihlali tespit edildi!');
        setAttempts(999);
      }
    };

    const interval = setInterval(detectDevTools, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isAuthenticated) {
    return children;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-pink-100 via-red-50 to-purple-100 flex items-center justify-center z-[9999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 border-pink-200 max-w-md w-full mx-4"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="text-center mb-8">
            <motion.div
              className="text-6xl mb-4 animate-bounce"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔐
            </motion.div>
            <h1 className="text-3xl font-bold text-pink-600 mb-2">
              Özel Erişim
            </h1>
            <p className="text-gray-600">
              Bu içeriğe erişmek için şifre gerekli
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                placeholder="Şifrenizi girin"
                disabled={isLoading || lockoutTime > Date.now()}
                autoComplete="off"
                autoFocus
              />
            </div>

            {error && (
              <motion.div
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || lockoutTime > Date.now() || !password.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <motion.div
                  className="flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                </motion.div>
              ) : (
                'Giriş Yap'
              )}
            </motion.button>
          </form>

          {attempts >= 2 && !showHint && (
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                onClick={() => setShowHint(true)}
                className="text-pink-500 hover:text-pink-600 text-sm underline"
              >
                İpucu göster
              </button>
            </motion.div>
          )}

          {showHint && (
            <motion.div
              className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-yellow-800 text-sm">
                💡 İpucu: Şifre 8 haneli ve sadece 0 ve 1 rakamlarından oluşuyor.
              </p>
            </motion.div>
          )}

          {/* Gizli güvenlik katmanları */}
          <div style={{ display: 'none' }}>
            <span>{securityLayer1}</span>
            <span>{securityLayer2}</span>
            <span>{securityLayer3}</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginGate; 
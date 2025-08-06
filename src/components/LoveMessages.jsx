import { motion } from 'framer-motion';

const LoveMessages = () => {
  const currentMessage = {
    emoji: '🎂',
    text: 'İyi ki doğdun, seni çok seviyorum!',
    color: 'from-pink-100 to-red-100'
  };

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
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
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="transition-all duration-1000 transform opacity-100 scale-100 translate-y-0"
          variants={messageVariants}
        >
          <motion.div
            className={`bg-gradient-to-r ${currentMessage.color} rounded-2xl p-8 shadow-xl border-2 border-pink-300/50`}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.25)"
            }}
          >
            <motion.div
              className="text-6xl mb-4 animate-bounce"
              whileHover={{ scale: 1.2, rotate: 360 }}
            >
              {currentMessage.emoji}
            </motion.div>

            <p className="text-2xl md:text-3xl font-handwriting text-pink-800 leading-relaxed italic">
              "{currentMessage.text}"
            </p>

            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-pink-400 to-red-400 mx-auto mt-6 rounded-full animate-pulse"
              whileHover={{ scaleX: 1.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Özel mesaj (sabit metin) */}
        <motion.div
          className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-lg text-pink-700 font-medium">
            Seninle geçirdiğim her an için teşekkür ederim. 
            İyi ki doğdun 🌹💕
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoveMessages;

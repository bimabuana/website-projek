import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FaFish } from 'react-icons/fa';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-500 to-cyan-200 flex items-center justify-center relative overflow-hidden">
      
      {/* Gelombang air atas */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-100 to-transparent rounded-b-full opacity-30 animate-pulse" />
      
      {/* Ikan Animasi */}
      <motion.div
        className="absolute left-10 bottom-20 text-sky-900 text-6xl"
        animate={{ x: [0, 20, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <FaFish />
      </motion.div>

      {/* Konten Utama */}
      <motion.div
        className="bg-white/70 backdrop-blur-lg rounded-3xl p-10 text-center shadow-xl max-w-md z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold text-sky-700 mb-2">Filter.IO</h1>
        <p className="text-sky-800 font-medium mb-6">
          Sistem Filter Air Otomatis Berbasis IoT
        </p>
        <p className="text-sm text-gray-700 mb-6">
          Pantau kualitas air dan kontrol pompa akuariummu secara real-time lewat dashboard yang cerdas.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <button type="button" className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-full shadow-md transition-all">
              Masuk
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-white hover:bg-sky-100 text-sky-700 border border-sky-500 px-6 py-2 rounded-full shadow-md transition-all">
              Daftar
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Gelembung */}
      <div className="absolute bottom-0 right-0 animate-bounce-slow">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="10" fill="#bae6fd" opacity="0.5" />
          <circle cx="30" cy="70" r="6" fill="#a5f3fc" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

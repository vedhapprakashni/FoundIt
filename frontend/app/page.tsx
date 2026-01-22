'use client';
import { motion } from 'framer-motion';
import { Search, MapPin, Grid } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative">
      <div className="text-center mb-12 z-20">
        <motion.h1
          className="text-6xl md:text-8xl font-black mb-4 tracking-tighter"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <span className="text-genz-pink drop-shadow-sm">Found</span>
          <span className="text-black drop-shadow-sm">It</span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-500 font-medium"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Lost something? Found something? <br /> We gotchu. 🤝
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl z-20 mb-12">
        {/* Lost Card */}
        <Link href="/lost">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 flex flex-col items-center justify-center h-full min-h-[300px] cursor-pointer group hover:bg-genz-pink/5 transition-colors hover:border-genz-pink/30"
          >
            <div className="bg-genz-pink/10 p-6 rounded-full mb-6 group-hover:bg-genz-pink/20 transition-colors">
              <Search size={48} className="text-genz-pink" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">I Lost Something 😿</h2>
            <p className="text-gray-500 text-center text-sm">Upload a pic and we'll help you find it.</p>
          </motion.div>
        </Link>

        {/* Found Card */}
        <Link href="/found">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 flex flex-col items-center justify-center h-full min-h-[300px] cursor-pointer group hover:bg-black/5 transition-colors hover:border-black/30"
          >
            <div className="bg-black/10 p-6 rounded-full mb-6 group-hover:bg-black/20 transition-colors">
              <MapPin size={48} className="text-black" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">I Found Something 😼</h2>
            <p className="text-gray-500 text-center text-sm">Be a hero. Help it get back home.</p>
          </motion.div>
        </Link>

        {/* Browse Feed Card */}
        <Link href="/feed">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 flex flex-col items-center justify-center h-full min-h-[300px] cursor-pointer group hover:bg-purple-500/5 transition-colors hover:border-purple-500/30"
          >
            <div className="bg-purple-100 p-6 rounded-full mb-6 group-hover:bg-purple-200 transition-colors">
              <Grid size={48} className="text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Browse Items 🕵️‍♀️</h2>
            <p className="text-gray-500 text-center text-sm">See what's been found around campus.</p>
          </motion.div>
        </Link>
      </div>

      <p className="absolute bottom-8 text-gray-400 text-sm z-20">
        No login required. Just vibes. ✨
      </p>
    </div>
  );
}

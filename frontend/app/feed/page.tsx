'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface FoundItem {
    id: number;
    description: string;
    found_location: string;
    image_url: string;
}

export default function FeedPage() {
    const [items, setItems] = useState<FoundItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/found')
            .then(res => {
                setItems(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-genz-pink transition-colors mb-8">
                    <ArrowLeft size={20} className="mr-2" /> Back Home
                </Link>

                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-genz-pink to-black w-fit mb-2">
                        Found Items Feed 🕵️‍♀️
                    </h1>
                    <p className="text-gray-500">See what's been found around campus.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin text-genz-pink" size={48} />
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 bg-white/50 rounded-2xl border border-gray-200">
                        <p className="text-xl text-gray-400">Nothing found yet.</p>
                        <p className="text-gray-400 text-sm">That's... good?</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl overflow-hidden group hover:shadow-2xl transition-all"
                            >
                                <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                                    <img
                                        src={`http://localhost:8000/${item.image_url}`}
                                        alt="Found item"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1 mb-1">Item #{item.id}</h3>
                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                        <MapPin size={14} className="mr-1" />
                                        {item.found_location}
                                    </div>
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 min-h-[40px]">
                                        {item.description}
                                    </p>
                                    <button className="bg-black text-white font-bold py-2 text-sm rounded-full w-full hover:scale-105 transition-all shadow-lg active:scale-95">
                                        Is this yours?
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

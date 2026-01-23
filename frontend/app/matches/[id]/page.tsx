'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Loader2, Check } from 'lucide-react';
import Link from 'next/link';

interface Match {
    found_item: {
        id: number;
        description: string;
        found_location: string;
        contact_info?: string;
        image_url: string;
    };
    score: number;
}

export default function MatchesPage() {
    const params = useParams();
    const id = params?.id;
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [claimedItems, setClaimedItems] = useState<number[]>([]);

    const handleClaim = (foundId: number) => {
        setClaimedItems([...claimedItems, foundId]);
    };

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/matches/${id}`)
                .then(res => {
                    setMatches(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [id]);

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-genz-pink transition-colors mb-8">
                    <ArrowLeft size={20} className="mr-2" /> Back Home
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-genz-pink to-black w-fit">
                        Potential Matches
                    </h1>
                    <p className="text-gray-500">We found {matches.length} items that look similar.</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin text-genz-pink" size={48} />
                    </div>
                ) : matches.length === 0 ? (
                    <div className="text-center py-20 bg-white/50 rounded-2xl border border-gray-200">
                        <p className="text-xl text-gray-400">No matches found yet. 🥲</p>
                        <p className="text-gray-400 text-sm">Check back later!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {matches.map((match, i) => (
                            <motion.div
                                key={match.found_item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl overflow-hidden group hover:shadow-2xl transition-all"
                            >
                                <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                                    {/* Use backend URL for images. Assuming localhost:8000 for dev */}
                                    <img
                                        src={`http://localhost:8000/${match.found_item.image_url}`}
                                        alt="Found item"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                                        {(match.score * 100).toFixed(0)}% Match
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800 line-clamp-1">Found Item #{match.found_item.id}</h3>
                                            <div className="flex items-center text-gray-500 text-sm mt-1">
                                                <MapPin size={14} className="mr-1" />
                                                {match.found_item.found_location}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                                        {match.found_item.description}
                                    </p>

                                    {claimedItems.includes(match.found_item.id) ? (
                                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-in fade-in zoom-in duration-300">
                                            <div className="flex items-center text-green-700 font-bold mb-2">
                                                <Check size={18} className="mr-2" />
                                                Claimed! ✅
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold block text-gray-800">Contact Finder:</span>
                                                {match.found_item.contact_info || "No contact info provided"}
                                            </p>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleClaim(match.found_item.id)}
                                            className="bg-black text-white font-bold py-2 text-sm rounded-full w-full hover:scale-105 transition-all shadow-lg active:scale-95"
                                        >
                                            Claim Item
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import DragDropUpload from '@/components/DragDropUpload';
import { useRouter } from 'next/navigation';

export default function LostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        contact_pref: 'phone',
        contact_detail: '',
        image: null as File | null
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('contact_pref', formData.contact_pref);
            data.append('contact_detail', formData.contact_detail);
            if (formData.image) {
                data.append('image', formData.image);
            } else {
                alert('Please upload an image!');
                setLoading(false);
                return;
            }

            const res = await axios.post('http://localhost:8000/lost', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data) {
                setSuccess(true);
                setTimeout(() => router.push(`/matches/${res.data.id}`), 2000);
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong. check backend.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500"
                >
                    <Check size={48} strokeWidth={3} />
                </motion.div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-genz-pink to-black">
                    Posted Successfully!
                </h2>
                <p className="text-gray-500 mt-2">Checking for matches...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 flex flex-col items-center">
            <div className="w-full max-w-2xl">
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-genz-pink transition-colors mb-8">
                    <ArrowLeft size={20} className="mr-2" /> Back
                </Link>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 md:p-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-genz-pink to-black" />

                    <h1 className="text-3xl font-bold mb-2">Report Lost Item 😿</h1>
                    <p className="text-gray-500 mb-8">Tell us what you lost. We'll do our magic.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">Upload Photo (Required)</label>
                            <DragDropUpload onFileSelect={(file) => setFormData({ ...formData, image: file })} />
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">Item Name / Title</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Blue Nike Backpack"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-genz-pink focus:ring-2 focus:ring-genz-pink/20 outline-none transition-all bg-gray-50/50"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
                            <textarea
                                required
                                placeholder="Any specific details? scratches, location lost..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-genz-pink focus:ring-2 focus:ring-genz-pink/20 outline-none transition-all bg-gray-50/50 min-h-[100px]"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        {/* Contact */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <label className="block text-sm font-semibold mb-2 text-gray-700">Contact Via</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-genz-pink focus:ring-2 focus:ring-genz-pink/20 outline-none transition-all bg-gray-50/50"
                                    value={formData.contact_pref}
                                    onChange={e => setFormData({ ...formData, contact_pref: e.target.value })}
                                >
                                    <option value="phone">Phone</option>
                                    <option value="email">Email</option>
                                    <option value="discord">Discord</option>
                                    <option value="insta">Instagram</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-semibold mb-2 text-gray-700">Contact Details</label>
                                <input
                                    type="text"
                                    required
                                    placeholder={formData.contact_pref === 'discord' ? 'username#1234' : 'Enter detail...'}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-genz-pink focus:ring-2 focus:ring-genz-pink/20 outline-none transition-all bg-gray-50/50"
                                    value={formData.contact_detail}
                                    onChange={e => setFormData({ ...formData, contact_detail: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-genz-pink text-white font-bold py-3 px-6 rounded-full hover:scale-105 transition-all shadow-lg active:scale-95 w-full flex items-center justify-center"
                        >
                            {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                            {loading ? 'Posting...' : 'Post Lost Item'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

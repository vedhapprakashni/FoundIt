'use client';
import { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

interface DragDropUploadProps {
    onFileSelect: (file: File | null) => void;
}

export default function DragDropUpload({ onFileSelect }: DragDropUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            validateAndProcess(file);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndProcess(e.target.files[0]);
        }
    };

    const validateAndProcess = (file: File) => {
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
            processFile(file);
        } else {
            alert('Only JPG or JPEG images are allowed! 🚫');
        }
    };

    const processFile = (file: File) => {
        const url = URL.createObjectURL(file);
        setPreview(url);
        onFileSelect(file);
    };

    const removeImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        onFileSelect(null);
    };

    return (
        <div className="w-full">
            <label
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative w-full h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group
                    ${isDragging ? 'border-genz-pink bg-genz-pink/10 scale-[1.02]' : 'border-gray-300 hover:border-genz-blue hover:bg-gray-50'}
                    ${preview ? 'border-none p-0 overflow-hidden' : ''}
                `}
            >
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                />

                {preview ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover rounded-2xl"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full hover:bg-red-100 transition-colors text-red-500"
                        >
                            <X size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-gray-400 group-hover:text-genz-blue transition-colors">
                        <div className={`p-4 rounded-full bg-gray-100 mb-2 group-hover:bg-blue-50 transition-colors ${isDragging ? 'bg-pink-50' : ''}`}>
                            <Upload size={32} />
                        </div>
                        <p className="font-semibold text-sm">Click to upload or drag & drop</p>
                        <p className="text-xs mt-1">SVG, PNG, JPG (max 5MB)</p>
                    </div>
                )}
            </label>
        </div>
    );
}

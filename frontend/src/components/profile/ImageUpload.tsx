"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Check } from "lucide-react";
import { gsap } from "gsap";

interface ImageUploadProps {
    currentImage?: string;
    onImageChange: (base64: string) => void;
}

export default function ImageUpload({ currentImage, onImageChange }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const validateAndProcessFile = (file: File) => {
        setError(null);

        // Check type
        if (!file.type.startsWith("image/")) {
            setError("File must be an image");
            return;
        }

        // Check size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("Image must be less than 5MB");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setPreview(result);
            onImageChange(result);

            // Animate success
            if (wrapperRef.current) {
                gsap.fromTo(wrapperRef.current,
                    { scale: 0.95 },
                    { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" }
                );
            }
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndProcessFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndProcessFile(e.target.files[0]);
        }
    };

    const clearImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        onImageChange("");
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Profile Picture</label>
            <div
                ref={wrapperRef}
                className={`relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${dragActive ? "border-primary bg-primary/10" : "border-border hover:bg-secondary/50"}
          ${error ? "border-destructive/50 bg-destructive/5" : ""}
        `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
            >
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                />

                {preview ? (
                    <div className="relative w-full h-full p-2 flex items-center justify-center">
                        <img
                            src={preview}
                            alt="Preview"
                            className="h-full w-auto rounded-full object-cover aspect-square shadow-sm"
                        />
                        <button
                            onClick={clearImage}
                            className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:scale-110 transition-transform"
                        >
                            <X size={16} />
                        </button>
                        <div className="ml-4 text-sm text-green-500 font-medium flex items-center gap-1">
                            <Check size={16} /> Ready to upload
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                        <Upload className={`w-8 h-8 mb-2 ${dragActive ? "text-primary" : "text-muted-foreground"}`} />
                        <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground/70">SVG, PNG, JPG (MAX. 5MB)</p>
                    </div>
                )}
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}

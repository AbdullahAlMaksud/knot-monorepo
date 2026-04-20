"use client";

import { Facebook, Linkedin, Twitter } from "lucide-react";

export default function ShareButtons({ title }: { title: string }) {
    const url = typeof window !== "undefined" ? window.location.href : "";

    const share = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    };

    return (
        <div className="flex items-center gap-6 mt-2 text-gray-600">
            <a href={share.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
                <Facebook size={18} />
            </a>
            <a href={share.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition">
                <Linkedin size={18} />
            </a>
            <a href={share.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition">
                <Twitter size={18} />
            </a>
        </div>
    );
}
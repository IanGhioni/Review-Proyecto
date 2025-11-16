"use client";

import Image from "next/image";

export default function FullscreenImage({ src, open, onClose }) {
    if (!open) return null;

    return (
        <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]"
        >
        <img
            src={src}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-xl"
        />
        </div>
    );
}

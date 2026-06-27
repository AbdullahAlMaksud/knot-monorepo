"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";

interface FullScreenMediaModalProps {
  mediaUrl: string;
  isVideo: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function FullScreenMediaModal({
  mediaUrl,
  isVideo,
  isOpen,
  onClose,
}: FullScreenMediaModalProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animateState, setAnimateState] = useState(isOpen ? "open" : "closed");

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setAnimateState("open");
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setAnimateState("closing");
      const timer = setTimeout(() => {
        setShouldRender(false);
        setAnimateState("closed");
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md">
      {/* Backdrop area click closes the modal */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-all duration-200"
        aria-label="Close full-screen media"
      >
        <X className="size-6" />
      </button>

      {/* Media Container */}
      <div
        className={`relative max-w-5xl max-h-[90vh] w-full h-full p-4 flex items-center justify-center transition-all duration-300 ${
          animateState === "open" ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {isVideo ? (
          <video
            src={mediaUrl}
            controls
            autoPlay
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mediaUrl}
            alt="Full-screen preview"
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl select-none"
          />
        )}
      </div>
    </div>
  );
}

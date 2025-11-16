// src/components/PropertyResumenPageGallery.jsx
import { useState, useEffect, useRef } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight, FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import "../styles/PropertyResumenPageGallery.css";
import { motion } from "framer-motion";

export default function PropertyResumePageGallery({ images, currentIndex = 0, onClose }) {
  const [current, setCurrent] = useState(currentIndex);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setCurrent(currentIndex);
  }, [currentIndex]);

  const currentImage = images[current];

  const isVideo = currentImage.src?.toLowerCase()?.endsWith(".mp4");

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetVideoState();
  };

  const nextImage = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    resetVideoState();
  };

  const resetVideoState = () => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="lightbox-overlay fixed inset-0 z-50 bg-white/30 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">

        {/* VISOR PRINCIPAL */}
        <div className="flex-1 relative">

          {/* MOSTRAR VIDEO O IMAGEN */}
          {isVideo ? (
            <video
              ref={videoRef}
              src={currentImage.src}
              className="object-contain w-full h-[400px] md:h-[500px] rounded-t-xl md:rounded-l-xl"
              autoPlay
              muted
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          ) : (
            <img
              src={currentImage.src}
              alt={currentImage.title || `Foto ${current + 1}`}
              className="object-contain w-full h-[400px] md:h-[500px] rounded-t-xl md:rounded-l-xl"
            />
          )}

          {/* BOTONES DE CONTROL DE VIDEO */}
          {isVideo && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full flex items-center gap-4 text-white">
              {/* Play / Pause */}
              <button onClick={togglePlay} className="text-xl hover:text-red-400 transition">
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              {/* Mute / Unmute */}
              <button onClick={toggleMute} className="text-xl hover:text-red-400 transition">
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            </div>
          )}

          {/* TÍTULO */}
          {currentImage.title && (
            <motion.div
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 left-4 flex items-center bg-white shadow-lg px-3 py-1 border-l-2 border-red-500 font-semibold text-red-500"
            >
              {currentImage.title}
            </motion.div>
          )}

          {/* CONTADOR */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg font-medium text-sm">
            {current + 1} / {images.length}
          </div>

          {/* DESCRIPCIÓN */}
          {current !== 0 && currentImage.description && (
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg max-w-[90%] md:max-w-[70%] text-sm">
              {currentImage.description}
            </div>
          )}

          {/* CERRAR */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
          >
            <FaTimes />
          </button>

          {/* FLECHAS */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* MINIATURAS */}
        <div
          className="flex md:flex-col md:w-28 overflow-x-auto md:overflow-y-auto mt-2 md:mt-0 md:ml-2 gap-2"
          style={{ maxHeight: "600px", flexShrink: 0 }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.title || `Mini ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                i === current ? "border-rojo-inmobiliario scale-105" : "border-transparent"
              } w-20 h-20 object-cover md:w-20 md:h-20`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

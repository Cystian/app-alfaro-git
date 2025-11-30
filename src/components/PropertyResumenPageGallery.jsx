// src/components/PropertyResumenPageGallery.jsx
import { useState, useEffect, useRef } from "react";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import "../styles/PropertyResumenPageGallery.css";
import { motion } from "framer-motion";

export default function PropertyResumePageGallery({
  images,
  currentIndex = 0,
  onClose,
}) {
  const [current, setCurrent] = useState(currentIndex);
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

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
    setProgress(0);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setIsPlaying(true);
      }
    }, 150);
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
        <div className="flex-1 relative bg-white">

          {/* VIDEO */}
          {isVideo ? (
            <div className="relative">
              <video
                ref={videoRef}
                src={currentImage.src}
                className="object-contain w-full h-[400px] md:h-[500px] rounded-t-xl md:rounded-l-xl"
                autoPlay
                muted
                playsInline
                onTimeUpdate={(e) =>
                  setProgress(
                    (e.target.currentTime / e.target.duration) * 100 || 0
                  )
                }
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* BARRA DE PROGRESO */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
                <div
                  className="h-full bg-[#DF011A] transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* CONTROLES */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full flex items-center gap-4 text-white">
                <button onClick={togglePlay} className="text-xl hover:text-[#DF011A]">
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>

                <button onClick={toggleMute} className="text-xl hover:text-[#DF011A]">
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
              </div>
            </div>
          ) : (
            /* IMAGEN */
            <img
              src={currentImage.src}
              alt={currentImage.title || `Foto ${current + 1}`}
              className="object-contain w-full h-[400px] md:h-[500px] rounded-t-xl md:rounded-l-xl"
            />
          )}

          {/* TÍTULO */}
          {currentImage.title && (
            <motion.div
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 left-4 flex items-center bg-white shadow-lg px-3 py-1 border-l-2 border-[#DF011A] font-semibold text-[#DF011A]"
            >
              {currentImage.title}
            </motion.div>
          )}

          {/* CONTADOR */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg font-medium text-sm">
            {current + 1} / {images.length}
          </div>

          {/* DESCRIPCIÓN */}
          {current !== 0 && currentImage.description && (
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg max-w-[90%] md:max-w-[70%] text-sm">
              {currentImage.description}
            </div>
          )}

          {/* CERRAR */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-opacity-80 transition"
          >
            <FaTimes />
          </button>

          {/* FLECHAS */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-opacity-80 transition"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-opacity-80 transition"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* MINIATURAS */}
        <div
          className="flex md:flex-col md:w-28 overflow-x-auto md:overflow-y-auto mt-2 md:mt-0 md:ml-2 gap-2"
          style={{ maxHeight: "600px", flexShrink: 0 }}
        >
          {images.map((img, i) => {
            const isThumbVideo = img.src.toLowerCase().endsWith(".mp4");

            return (
              <div key={i}>
                {isThumbVideo ? (
                  <video
                    src={img.src}
                    className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer ${
                      i === current
                        ? "border-rojo-inmobiliario scale-105"
                        : "border-transparent"
                    }`}
                    muted
                    playsInline
                    onClick={() => setCurrent(i)}
                  />
                ) : (
                  <img
                    src={img.src}
                    alt={img.title || `Mini ${i + 1}`}
                    onClick={() => setCurrent(i)}
                    className={`cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                      i === current
                        ? "border-rojo-inmobiliario scale-105"
                        : "border-transparent"
                    } w-20 h-20 object-cover md:w-20 md:h-20`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

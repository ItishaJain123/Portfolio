import { useState, useRef } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

const AudioIntro = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30); // fallback duration
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 w-full max-w-2xl mx-auto">
      <div className="flex items-center space-x-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-xl transition-all duration-300"
        >
          {isPlaying ? (
            <Pause className="w-7 h-7" />
          ) : (
            <Play className="w-7 h-7 ml-1" />
          )}
        </button>

        {/* Audio Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Volume2 className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-black text-base">
              👋 Meet Itisha (30s)
            </h3>
          </div>

          <p className="text-gray-600 text-sm mb-3">
            Listen to a quick personal intro about my journey and passion for
            development.
          </p>

          {/* Progress Bar */}
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${
                    duration > 0 ? (currentTime / duration) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 font-mono w-20 text-right">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(Math.floor(audioRef.current.currentTime));
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(Math.floor(audioRef.current.duration));
          }
        }}
      >
        <source src="/itisha audio.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioIntro;

import React from 'react';
import { Play, Pause } from 'lucide-react';

function SongCard({ song, isActive, isPlaying, onClick }) {
  // Extract YouTube video ID safely
  const getVideoId = (url = '') => {
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1];
    }

    if (url.includes('watch?v=')) {
      return url.split('watch?v=')[1];
    }

    return '';
  };

  const videoId = getVideoId(song?.url);

  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    : 'https://via.placeholder.com/320x180?text=No+Thumbnail';

  return (
    <div
      className={`song-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="card-thumb">
        <img src={thumbnailUrl} alt={song?.title} loading="lazy" />

        <div className="play-overlay">
          <div className="play-btn">
            {isActive && isPlaying ? (
              <Pause size={24} fill="white" />
            ) : (
              <Play size={24} fill="white" />
            )}
          </div>
        </div>

        {isActive && (
          <div className="now-playing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      <div className="card-meta">
        <h3>{song?.title}</h3>
        <p>{song?.artist}</p>
        <span className="genre-tag">{song?.genre}</span>
      </div>
    </div>
  );
}

export default SongCard;
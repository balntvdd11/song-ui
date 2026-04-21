import React from 'react';
import SongCard from './SongCard';

function SongList({ songs, selectedSong, isPlaying, onSelectSong, title = "All Songs" }) {
  if (songs.length === 0) {
    return (
      <section className="song-list-section">
        <h2>{title}</h2>
        <div className="empty-state">
          <p>No songs found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="song-list-section">
      <div className="section-header">
        <h2>{title}</h2>
        <span className="song-count">{songs.length} songs</span>
      </div>
      <div className="song-grid">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            isActive={selectedSong?.id === song.id}
            isPlaying={isPlaying && selectedSong?.id === song.id}
            onClick={() => onSelectSong(song)}
          />
        ))}
      </div>
    </section>
  );
}

export default SongList;

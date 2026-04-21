import React, { useState, useEffect } from 'react';
import { Home, TrendingUp, Music2, Heart, Settings, ExternalLink, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import Header from './components/Header';
import SongList from './components/SongList';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://song-api-qu0g.onrender.com/natividad/songss')
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
        setSelectedSong(data[0]);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const getEmbedUrl = (url) => {
    const id = url.split('youtu.be/')[1];
    return `[youtube.com](https://www.youtube.com/embed/${id}?autoplay=1&rel=0)`;
  };

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setIsPlaying(true);
  };

  const handleNext = () => {
    const currentIndex = songs.findIndex((s) => s.id === selectedSong?.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setSelectedSong(songs[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = songs.findIndex((s) => s.id === selectedSong?.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setSelectedSong(songs[prevIndex]);
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'trending', icon: TrendingUp, label: 'Trending' },
    { id: 'music', icon: Music2, label: 'Music' },
    { id: 'favorites', icon: Heart, label: 'Favorites' },
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">
            <Music2 size={24} />
          </div>
          <span>Tune<span className="accent">Flow</span></span>
        </div>

        <nav className="nav-menu">
          <div className="nav-section">
            <span className="nav-label">Menu</span>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                onClick={() => setActiveNav(item.id)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {isLoading ? (
          <div className="loading-state">
            <div className="loader"></div>
            <p>Loading your music...</p>
          </div>
        ) : (
          <>
            {/* Featured Player */}
            {selectedSong && (
              <section className="featured-section">
                <div className="featured-card">
                  <div className="video-wrapper">
                    <div className="video-container">
                      <iframe
                        src={getEmbedUrl(selectedSong.url)}
                        title="Player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  <div className="featured-info">
                    <div className="featured-badges">
                      <span className="badge genre">{selectedSong.genre}</span>
                      <span className="badge now-playing">Now Playing</span>
                    </div>

                    <h1 className="featured-title">{selectedSong.title}</h1>
                    <p className="featured-artist">{selectedSong.artist}</p>
                    <p className="featured-album">{selectedSong.album}</p>

                    <div className="player-controls">
                      <button className="control-btn" onClick={handlePrevious}>
                        <SkipBack size={20} />
                      </button>
                      <button
                        className="control-btn play"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                      </button>
                      <button className="control-btn" onClick={handleNext}>
                        <SkipForward size={20} />
                      </button>
                      <button className="control-btn volume">
                        <Volume2 size={18} />
                      </button>
                    </div>

                    <a
                      href={selectedSong.url}
                      target="_blank"
                      rel="noreferrer"
                      className="youtube-link"
                    >
                      <ExternalLink size={16} />
                      Open in YouTube
                    </a>
                  </div>
                </div>
              </section>
            )}

            {/* Song List */}
            <SongList
              songs={filteredSongs}
              selectedSong={selectedSong}
              isPlaying={isPlaying}
              onSelectSong={handleSongSelect}
              title={searchTerm ? `Results for "${searchTerm}"` : 'Recommended for you'}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;

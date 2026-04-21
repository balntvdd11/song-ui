import React from 'react';
import { Search, Bell, User } from 'lucide-react';

function Header({ searchTerm, onSearchChange }) {
  return (
    <header className="header">
      <div className="search-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search songs, artists, albums..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="header-actions">
        <button className="icon-btn">
          <Bell size={20} />
        </button>
        <button className="icon-btn avatar">
          <User size={20} />
        </button>
      </div>
    </header>
  );
}

export default Header;

import React from 'react';
import { Search, X } from 'lucide-react';

function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="search-bar">
      <Search size={18} className="search-bar-icon" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="clear-btn" onClick={() => onChange('')}>
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;

import React from 'react';

const SearchResults = ({ locations, onLocationSelect }) => {
  return (
    <div className="search-results">
      <ul>
        {locations.map(location => (
          <li key={location.id}>
            <button onClick={() => onLocationSelect(location.id)}>
              {location.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;

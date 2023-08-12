import React from 'react';

const SearchResults = ({ results, onLocationSelect }) => {
  if (!Array.isArray(results)) {
    return null; // or some other UI element to handle the case when results is not an array
  }
  return (
    <div className="search-results">
      <ul>
        {results.map(location => (
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

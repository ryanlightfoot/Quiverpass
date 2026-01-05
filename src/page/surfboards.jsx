import React, { useState, useMemo, useEffect, useRef } from 'react';
import { MapPin, Filter, X, Search, Waves, Star, Map } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';

// Fix for default marker icons in React - suppress errors if icons fail to load
try {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
} catch (error) {
  console.warn('Leaflet default icons could not be loaded, using custom icons');
}

// Component to handle initial zoom based on markers
const SetBoundsRect = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length === 2) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, bounds]);
  return null;
};

const Surfboards = ({ onRentClick }) => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [filters, setFilters] = useState({
    city: '',
    school: '',
    country: '',
    boardType: '',
    skillLevel: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const contentSectionRef = useRef(null);

  // Sample data
  const surfSchools = [
    { id: 1, name: 'Bali Surf Academy', city: 'Canggu', country: 'Indonesia', lat: -8.6465, lng: 115.1362 },
    { id: 2, name: 'Malibu Surf School', city: 'Malibu', country: 'USA', lat: 34.0259, lng: -118.7798 },
    { id: 3, name: 'Byron Bay Surf Co', city: 'Byron Bay', country: 'Australia', lat: -28.6474, lng: 153.6020 },
    { id: 4, name: 'Ericeira Surf Camp', city: 'Ericeira', country: 'Portugal', lat: 39.0215, lng: -9.4157 },
    { id: 5, name: 'Taghazout Surf', city: 'Taghazout', country: 'Morocco', lat: 30.5333, lng: -9.7000 },
  ];

  const surfboards = [
    { id: 1, schoolId: 1, name: 'Shortboard Pro', type: 'Shortboard', skillLevel: 'Advanced', length: '6\'0"', price: 25, school: 'Bali Surf Academy', city: 'Canggu', country: 'Indonesia' },
    { id: 2, schoolId: 1, name: 'Funboard Classic', type: 'Funboard', skillLevel: 'Intermediate', length: '7\'6"', price: 20, school: 'Bali Surf Academy', city: 'Canggu', country: 'Indonesia' },
    { id: 3, schoolId: 2, name: 'Longboard Heritage', type: 'Longboard', skillLevel: 'Beginner', length: '9\'0"', price: 30, school: 'Malibu Surf School', city: 'Malibu', country: 'USA' },
    { id: 4, schoolId: 2, name: 'Hybrid All-Round', type: 'Hybrid', skillLevel: 'Intermediate', length: '7\'0"', price: 22, school: 'Malibu Surf School', city: 'Malibu', country: 'USA' },
    { id: 5, schoolId: 3, name: 'Fish Board', type: 'Fish', skillLevel: 'Intermediate', length: '5\'10"', price: 18, school: 'Byron Bay Surf Co', city: 'Byron Bay', country: 'Australia' },
    { id: 6, schoolId: 3, name: 'Mini Mal', type: 'Mini Malibu', skillLevel: 'Beginner', length: '8\'0"', price: 24, school: 'Byron Bay Surf Co', city: 'Byron Bay', country: 'Australia' },
    { id: 7, schoolId: 4, name: 'Performance Shortboard', type: 'Shortboard', skillLevel: 'Advanced', length: '6\'2"', price: 28, school: 'Ericeira Surf Camp', city: 'Ericeira', country: 'Portugal' },
    { id: 8, schoolId: 4, name: 'Beginner Soft Top', type: 'Soft Top', skillLevel: 'Beginner', length: '8\'6"', price: 15, school: 'Ericeira Surf Camp', city: 'Ericeira', country: 'Portugal' },
    { id: 9, schoolId: 5, name: 'Gun Board', type: 'Gun', skillLevel: 'Advanced', length: '7\'6"', price: 35, school: 'Taghazout Surf', city: 'Taghazout', country: 'Morocco' },
    { id: 10, schoolId: 5, name: 'Funboard Easy', type: 'Funboard', skillLevel: 'Beginner', length: '7\'8"', price: 20, school: 'Taghazout Surf', city: 'Taghazout', country: 'Morocco' },
  ];

  // Get unique values for filters
  const cities = [...new Set(surfboards.map(b => b.city))];
  const schools = [...new Set(surfboards.map(b => b.school))];
  const countries = [...new Set(surfboards.map(b => b.country))];
  const boardTypes = [...new Set(surfboards.map(b => b.type))];
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];

  // Filter surfboards
  const filteredSurfboards = useMemo(() => {
    return surfboards.filter(board => {
      if (filters.city && board.city !== filters.city) return false;
      if (filters.school && board.school !== filters.school) return false;
      if (filters.country && board.country !== filters.country) return false;
      if (filters.boardType && board.type !== filters.boardType) return false;
      if (filters.skillLevel && board.skillLevel !== filters.skillLevel) return false;
      if (selectedArea && board.schoolId !== selectedArea.id) return false;
      return true;
    });
  }, [filters, selectedArea]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      school: '',
      country: '',
      boardType: '',
      skillLevel: ''
    });
    setSelectedArea(null);
  };

  const handleAreaClick = (school) => {
    setSelectedArea(school);
    setFilters(prev => ({
      ...prev,
      city: school.city,
      country: school.country,
      school: school.name
    }));
    
    setTimeout(() => {
      if (contentSectionRef.current) {
        contentSectionRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  const activeFiltersCount = Object.values(filters).filter(v => v).length + (selectedArea ? 1 : 0);

  const centerLat = surfSchools.reduce((sum, s) => sum + s.lat, 0) / surfSchools.length;
  const centerLng = surfSchools.reduce((sum, s) => sum + s.lng, 0) / surfSchools.length;

  // Calculate bounds for initial zoom only
  const initialBounds = useMemo(() => {
    const lats = surfSchools.map(s => s.lat);
    const lngs = surfSchools.map(s => s.lng);
    return [
      [Math.min(...lats) - 5, Math.min(...lngs) - 5], 
      [Math.max(...lats) + 5, Math.max(...lngs) + 5] 
    ];
  }, []);

  // Hard limits for the map (One World Only)
  const maxWorldBounds = [
    [-90, -180],
    [90, 180]
  ];

  const createCustomIcon = (isActive) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background: ${isActive ? '#C9A470' : '#165B68'};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid #F4F0E6;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(22, 91, 104, 0.3);
        transform: ${isActive ? 'scale(1.2)' : 'scale(1)'};
        transition: all 0.3s ease;
      ">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F4F0E6" stroke-width="2.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  };

  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMapKey(prev => prev + 1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="surfboards-page">
      <div className="map-section" id="map-container">
        {typeof window !== 'undefined' && (
          <MapContainer
            key={mapKey}
            center={[centerLat, centerLng]}
            zoom={2}
            minZoom={2} // Prevents zooming out too far
            maxBounds={maxWorldBounds} // Restrict to one world
            maxBoundsViscosity={1.0} // Sticky edges
            style={{ 
              height: '100%', 
              width: '100%', 
              minHeight: '500px',
              background: '#aad3df', // Set background color to match water (prevents grey flash)
              overflow: 'hidden' // Ensures no overflow issues
            }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              noWrap={true} // IMPORTANT: Stops the world from repeating horizontally
              bounds={[[-90, -180], [90, 180]]}
            />
            
            {/* Helper to auto-fit bounds on load */}
            <SetBoundsRect bounds={initialBounds} />

            {surfSchools.map(school => {
              const isActive = selectedArea?.id === school.id;
              return (
                <Marker
                  key={`${school.id}-${isActive}`}
                  position={[school.lat, school.lng]}
                  icon={createCustomIcon(isActive)}
                  eventHandlers={{
                    click: () => handleAreaClick(school),
                  }}
                >
                  <Tooltip permanent={false} direction="top" offset={[0, -40]}>
                    <div style={{ 
                      textAlign: 'center', 
                      padding: '6px 10px',
                      fontFamily: 'Oswald, sans-serif',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      color: '#165B68',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {school.city}
                    </div>
                  </Tooltip>
                  <Popup>
                    <div style={{ textAlign: 'center', padding: '4px' }}>
                      <strong style={{ color: '#165B68', fontFamily: 'Oswald, sans-serif' }}>
                        {school.name}
                      </strong>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#6B7280' }}>
                        {school.city}, {school.country}
                      </p>
                      <button
                        onClick={() => handleAreaClick(school)}
                        style={{
                          marginTop: '8px',
                          padding: '6px 12px',
                          background: '#165B68',
                          color: '#F4F0E6',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                        }}
                      >
                        View Boards
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
      </div>

      <div className="content-section" ref={contentSectionRef}>
        <div className="filter-bar">
          <button
            className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="filter-badge">{activeFiltersCount}</span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              <X size={16} />
              <span>Clear All</span>
            </button>
          )}

          <div className="results-count">
            {filteredSurfboards.length} {filteredSurfboards.length === 1 ? 'board' : 'boards'} found
          </div>
        </div>

        {showFilters && (
          <div className="filter-panel">
            <div className="filter-group">
              <label className="filter-label">Country</label>
              <select
                className="filter-select"
                value={filters.country}
                onChange={(e) => handleFilterChange('country', e.target.value)}
              >
                <option value="">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">City</label>
              <select
                className="filter-select"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Surf School</label>
              <select
                className="filter-select"
                value={filters.school}
                onChange={(e) => handleFilterChange('school', e.target.value)}
              >
                <option value="">All Schools</option>
                {schools.map(school => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Board Type</label>
              <select
                className="filter-select"
                value={filters.boardType}
                onChange={(e) => handleFilterChange('boardType', e.target.value)}
              >
                <option value="">All Types</option>
                {boardTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Skill Level</label>
              <select
                className="filter-select"
                value={filters.skillLevel}
                onChange={(e) => handleFilterChange('skillLevel', e.target.value)}
              >
                <option value="">All Levels</option>
                {skillLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {selectedArea && (
          <div className="selected-area-info">
            <MapPin size={20} />
            <div>
              <strong>{selectedArea.name}</strong>
              <span>{selectedArea.city}, {selectedArea.country}</span>
            </div>
            <button className="close-area-btn" onClick={() => setSelectedArea(null)}>
              <X size={18} />
            </button>
          </div>
        )}

        <div className="surfboards-grid">
          {filteredSurfboards.length > 0 ? (
            filteredSurfboards.map(board => (
              <div key={board.id} className="surfboard-card">
                <div className="surfboard-header">
                  <div className="surfboard-icon">
                    <Waves size={32} color="#165B68" />
                  </div>
                  <div className="surfboard-title-section">
                    <h3 className="surfboard-name">{board.name}</h3>
                    <div className="surfboard-location">
                      <MapPin size={14} />
                      <span>{board.city}, {board.country}</span>
                    </div>
                  </div>
                </div>
                <div className="surfboard-details">
                  <div className="surfboard-detail-item">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">{board.type}</span>
                  </div>
                  <div className="surfboard-detail-item">
                    <span className="detail-label">Length:</span>
                    <span className="detail-value">{board.length}</span>
                  </div>
                  <div className="surfboard-detail-item">
                    <span className="detail-label">Skill:</span>
                    <span className={`detail-value skill-${board.skillLevel.toLowerCase()}`}>
                      {board.skillLevel}
                    </span>
                  </div>
                </div>
                <div className="surfboard-footer">
                  <div className="surfboard-price">
                    <span className="price-amount">${board.price}</span>
                    <span className="price-period">/day</span>
                  </div>
                  <button 
                    className="rent-btn"
                    onClick={() => onRentClick && onRentClick(board)}
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <Waves size={48} color="#9CA3AF" />
              <h3>No surfboards found</h3>
              <p>Try adjusting your filters or select a different area on the map</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Surfboards;
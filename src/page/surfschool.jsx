import React, { useState } from 'react';
import { Waves, Calendar, MapPin, User, Clock, CheckCircle, XCircle } from 'lucide-react';
import '../App.css';

const Surfschool = () => {
  // Hardcoded rental data
  const [rentals] = useState([
    {
      id: 1,
      boardName: 'Shortboard Pro',
      boardType: 'Shortboard',
      length: '6\'0"',
      skillLevel: 'Advanced',
      renterName: 'John Smith',
      renterEmail: 'john.smith@email.com',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      status: 'active', // active, upcoming, completed
      totalPrice: 150,
      location: 'Canggu, Indonesia'
    },
    {
      id: 2,
      boardName: 'Funboard Classic',
      boardType: 'Funboard',
      length: '7\'6"',
      skillLevel: 'Intermediate',
      renterName: 'Sarah Johnson',
      renterEmail: 'sarah.j@email.com',
      startDate: '2024-01-25',
      endDate: '2024-01-30',
      status: 'upcoming',
      totalPrice: 100,
      location: 'Canggu, Indonesia'
    },
    {
      id: 3,
      boardName: 'Longboard Heritage',
      boardType: 'Longboard',
      length: '9\'0"',
      skillLevel: 'Beginner',
      renterName: 'Mike Davis',
      renterEmail: 'mike.davis@email.com',
      startDate: '2024-01-10',
      endDate: '2024-01-12',
      status: 'completed',
      totalPrice: 90,
      location: 'Malibu, USA'
    },
    {
      id: 4,
      boardName: 'Hybrid All-Round',
      boardType: 'Hybrid',
      length: '7\'0"',
      skillLevel: 'Intermediate',
      renterName: 'Emma Wilson',
      renterEmail: 'emma.w@email.com',
      startDate: '2024-01-18',
      endDate: '2024-01-22',
      status: 'active',
      totalPrice: 88,
      location: 'Malibu, USA'
    },
    {
      id: 5,
      boardName: 'Fish Board',
      boardType: 'Fish',
      length: '5\'10"',
      skillLevel: 'Intermediate',
      renterName: 'Tom Brown',
      renterEmail: 'tom.brown@email.com',
      startDate: '2024-02-01',
      endDate: '2024-02-05',
      status: 'upcoming',
      totalPrice: 90,
      location: 'Byron Bay, Australia'
    },
    {
      id: 6,
      boardName: 'Performance Shortboard',
      boardType: 'Shortboard',
      length: '6\'2"',
      skillLevel: 'Advanced',
      renterName: 'Lisa Anderson',
      renterEmail: 'lisa.a@email.com',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      status: 'upcoming',
      totalPrice: 140,
      location: 'Ericeira, Portugal'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all'); // all, active, upcoming, completed

  // Filter rentals based on status
  const filteredRentals = filterStatus === 'all' 
    ? rentals 
    : rentals.filter(rental => rental.status === filterStatus);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Calculate days until start or days remaining
  const getDaysInfo = (rental) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(rental.startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(rental.endDate);
    end.setHours(0, 0, 0, 0);

    if (rental.status === 'active') {
      const daysRemaining = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
      return daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Ends today';
    } else if (rental.status === 'upcoming') {
      const daysUntil = Math.ceil((start - today) / (1000 * 60 * 60 * 24));
      return daysUntil > 0 ? `Starts in ${daysUntil} days` : 'Starts today';
    } else {
      return 'Completed';
    }
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return { className: 'status-badge active', icon: <Clock size={14} />, text: 'Active' };
      case 'upcoming':
        return { className: 'status-badge upcoming', icon: <Calendar size={14} />, text: 'Upcoming' };
      case 'completed':
        return { className: 'status-badge completed', icon: <CheckCircle size={14} />, text: 'Completed' };
      default:
        return { className: 'status-badge', icon: null, text: status };
    }
  };

  const activeCount = rentals.filter(r => r.status === 'active').length;
  const upcomingCount = rentals.filter(r => r.status === 'upcoming').length;
  const completedCount = rentals.filter(r => r.status === 'completed').length;

  // Calendar functionality - initialize to January 2024 to show the hardcoded rentals
  const [selectedMonth, setSelectedMonth] = useState(new Date(2024, 0, 1));
  const [hoveredRental, setHoveredRental] = useState(null);

  // Get days in month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Check if date is in rental period
  const getRentalsForDate = (day) => {
    const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    
    return rentals.filter(rental => {
      // Parse date string properly (YYYY-MM-DD format)
      const [startYear, startMonth, startDay] = rental.startDate.split('-').map(Number);
      const start = new Date(startYear, startMonth - 1, startDay);
      start.setHours(0, 0, 0, 0);
      
      const [endYear, endMonth, endDay] = rental.endDate.split('-').map(Number);
      const end = new Date(endYear, endMonth - 1, endDay);
      end.setHours(0, 0, 0, 0);
      
      return date >= start && date <= end;
    });
  };

  // Change month
  const changeMonth = (direction) => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + direction, 1));
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = getDaysInMonth(selectedMonth);
  const firstDay = getFirstDayOfMonth(selectedMonth);
  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div className="surfschool-container">
      <main className="surfschool-content">
        <div className="surfschool-card">
          {/* Header */}
          <div className="surfschool-header">
            <div className="surfschool-header-top">
              <div>
                <h2 className="surfschool-title">Surf School Dashboard</h2>
                <p className="surfschool-subtitle">Manage your board rentals</p>
              </div>
              <div className="surfschool-stats">
                <div className="stat-item">
                  <span className="stat-value">{activeCount}</span>
                  <span className="stat-label">Active</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{upcomingCount}</span>
                  <span className="stat-label">Upcoming</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{completedCount}</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="surfschool-filters">
              <button
                className={`filter-status-btn ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                All Rentals
              </button>
              <button
                className={`filter-status-btn ${filterStatus === 'active' ? 'active' : ''}`}
                onClick={() => setFilterStatus('active')}
              >
                Active ({activeCount})
              </button>
              <button
                className={`filter-status-btn ${filterStatus === 'upcoming' ? 'active' : ''}`}
                onClick={() => setFilterStatus('upcoming')}
              >
                Upcoming ({upcomingCount})
              </button>
              <button
                className={`filter-status-btn ${filterStatus === 'completed' ? 'active' : ''}`}
                onClick={() => setFilterStatus('completed')}
              >
                Completed ({completedCount})
              </button>
            </div>
          </div>

          {/* Calendar View */}
          <div className="surfschool-calendar-section">
            <h3 className="calendar-section-title">Rental Calendar</h3>
            <div className="school-calendar-wrapper">
              <div className="school-calendar-header">
                <button 
                  className="calendar-nav-btn" 
                  onClick={() => changeMonth(-1)}
                  aria-label="Previous month"
                >
                  ←
                </button>
                <h3 className="calendar-month-year">
                  {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
                </h3>
                <button 
                  className="calendar-nav-btn" 
                  onClick={() => changeMonth(1)}
                  aria-label="Next month"
                >
                  →
                </button>
              </div>

              <div className="school-calendar-grid">
                {/* Day names header */}
                {dayNames.map(day => (
                  <div key={day} className="calendar-day-name">{day}</div>
                ))}

                {/* Calendar days */}
                {days.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="school-calendar-day empty"></div>;
                  }

                  const dateRentals = getRentalsForDate(day);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const currentDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
                  currentDate.setHours(0, 0, 0, 0);
                  const isToday = currentDate.getTime() === today.getTime();

                  return (
                    <div
                      key={day}
                      className={`school-calendar-day ${isToday ? 'today' : ''} ${dateRentals.length > 0 ? 'has-rentals' : ''}`}
                      onMouseEnter={() => dateRentals.length > 0 && setHoveredRental({ rental: dateRentals[0], day })}
                      onMouseLeave={() => setHoveredRental(null)}
                    >
                      <span className="calendar-day-number">{day}</span>
                      {dateRentals.length > 0 && (
                        <div className="calendar-rental-indicators">
                          {dateRentals.map((rental, idx) => (
                            <div
                              key={rental.id}
                              className={`rental-indicator ${rental.status}`}
                              style={{ 
                                zIndex: dateRentals.length - idx,
                                width: `${100 / dateRentals.length}%`
                              }}
                              title={`${rental.boardName} - ${rental.renterName}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="calendar-legend">
                <div className="legend-item">
                  <div className="legend-color active"></div>
                  <span>Active Rental</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color upcoming"></div>
                  <span>Upcoming Rental</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color completed"></div>
                  <span>Completed Rental</span>
                </div>
              </div>

              {/* Hover Tooltip */}
              {hoveredRental && hoveredRental.rental && (
                <div className="calendar-tooltip">
                  <div className="tooltip-board-name">{hoveredRental.rental.boardName}</div>
                  <div className="tooltip-renter">{hoveredRental.rental.renterName}</div>
                  <div className="tooltip-dates">
                    {formatDate(hoveredRental.rental.startDate)} - {formatDate(hoveredRental.rental.endDate)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rentals List */}
          <div className="rentals-list">
            {filteredRentals.length > 0 ? (
              filteredRentals.map(rental => {
                const statusBadge = getStatusBadge(rental.status);
                return (
                  <div key={rental.id} className="rental-card">
                    <div className="rental-card-header">
                      <div className="rental-board-info">
                        <div className="rental-board-icon">
                          <Waves size={24} color="#165B68" />
                        </div>
                        <div>
                          <h3 className="rental-board-name">{rental.boardName}</h3>
                          <div className="rental-board-specs">
                            <span>{rental.boardType}</span>
                            <span>•</span>
                            <span>{rental.length}</span>
                            <span>•</span>
                            <span className={`skill-${rental.skillLevel.toLowerCase()}`}>
                              {rental.skillLevel}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={statusBadge.className}>
                        {statusBadge.icon}
                        <span>{statusBadge.text}</span>
                      </div>
                    </div>

                    <div className="rental-card-body">
                      <div className="rental-detail-row">
                        <div className="rental-detail-item">
                          <User size={16} />
                          <div>
                            <span className="rental-detail-label">Renter</span>
                            <span className="rental-detail-value">{rental.renterName}</span>
                          </div>
                        </div>
                        <div className="rental-detail-item">
                          <MapPin size={16} />
                          <div>
                            <span className="rental-detail-label">Location</span>
                            <span className="rental-detail-value">{rental.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="rental-detail-row">
                        <div className="rental-detail-item">
                          <Calendar size={16} />
                          <div>
                            <span className="rental-detail-label">Start Date</span>
                            <span className="rental-detail-value">{formatDate(rental.startDate)}</span>
                          </div>
                        </div>
                        <div className="rental-detail-item">
                          <Calendar size={16} />
                          <div>
                            <span className="rental-detail-label">End Date</span>
                            <span className="rental-detail-value">{formatDate(rental.endDate)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="rental-card-footer">
                        <div className="rental-timing">
                          <Clock size={16} />
                          <span>{getDaysInfo(rental)}</span>
                        </div>
                        <div className="rental-price">
                          <span className="rental-price-label">Total:</span>
                          <span className="rental-price-value">${rental.totalPrice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rental-contact">
                      <a href={`mailto:${rental.renterEmail}`} className="contact-email">
                        {rental.renterEmail}
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-rentals">
                <Waves size={48} color="#9CA3AF" />
                <h3>No rentals found</h3>
                <p>No rentals match the selected filter</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Surfschool;


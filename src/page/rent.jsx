import React, { useState } from 'react';
import { ArrowLeft, Calendar, Waves, MapPin, CheckCircle } from 'lucide-react';
import '../App.css';

const Rent = ({ board, onBack }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current date for minimum selectable date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate days in month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Check if date is in range
  const isDateInRange = (date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  // Check if date is selected
  const isDateSelected = (date) => {
    if (!startDate && !endDate) return false;
    if (startDate && date.getTime() === startDate.getTime()) return 'start';
    if (endDate && date.getTime() === endDate.getTime()) return 'end';
    return false;
  };

  // Handle date click
  const handleDateClick = (day) => {
    const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
    date.setHours(0, 0, 0, 0);

    if (date < today) return; // Can't select past dates

    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date);
      setEndDate(null);
    } else if (date < startDate) {
      // Selected date is before start date, make it the new start
      setStartDate(date);
      setEndDate(null);
    } else {
      // Set end date
      setEndDate(date);
    }
  };

  // Calculate total days and price
  const totalDays = startDate && endDate 
    ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1 
    : 0;
  const totalPrice = totalDays * (board?.price || 0);

  // Handle month navigation
  const changeMonth = (direction) => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + direction, 1));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert('Please select both start and end dates');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Rental submitted:', {
        board: board,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        totalDays,
        totalPrice
      });
      setIsSubmitting(false);
      alert('Rental request submitted successfully!');
    }, 1000);
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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

  if (!board) {
    return (
      <div className="rent-container">
        <div className="rent-content">
          <div className="rent-card">
            <p>No surfboard selected. Please go back and select a board.</p>
            {onBack && (
              <button className="rent-back-btn" onClick={onBack}>
                <ArrowLeft size={20} />
                <span>Back to Surfboards</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rent-container">
      <main className="rent-content">
        <div className="rent-card">
          {/* Back Button */}
          {onBack && (
            <button className="rent-back-btn" onClick={onBack} aria-label="Go back">
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          )}

          {/* Header */}
          <div className="rent-header">
            <h2 className="rent-title">Rent Surfboard</h2>
            <p className="rent-subtitle">Select your rental dates</p>
          </div>

          <div className="rent-main-content">
            {/* Surfboard Details Section */}
            <div className="rent-board-details">
              <div className="rent-board-header">
                <div className="rent-board-icon">
                  <Waves size={40} color="#165B68" />
                </div>
                <div className="rent-board-info">
                  <h3 className="rent-board-name">{board.name}</h3>
                  <div className="rent-board-location">
                    <MapPin size={16} />
                    <span>{board.city}, {board.country}</span>
                  </div>
                </div>
              </div>

              <div className="rent-board-specs">
                <div className="rent-spec-item">
                  <span className="rent-spec-label">Type:</span>
                  <span className="rent-spec-value">{board.type}</span>
                </div>
                <div className="rent-spec-item">
                  <span className="rent-spec-label">Length:</span>
                  <span className="rent-spec-value">{board.length}</span>
                </div>
                <div className="rent-spec-item">
                  <span className="rent-spec-label">Skill Level:</span>
                  <span className={`rent-spec-value skill-${board.skillLevel.toLowerCase()}`}>
                    {board.skillLevel}
                  </span>
                </div>
                <div className="rent-spec-item">
                  <span className="rent-spec-label">School:</span>
                  <span className="rent-spec-value">{board.school}</span>
                </div>
                <div className="rent-spec-item">
                  <span className="rent-spec-label">Price:</span>
                  <span className="rent-spec-value price">${board.price}/day</span>
                </div>
              </div>
            </div>

            {/* Calendar Section */}
            <div className="rent-calendar-section">
              <div className="calendar-header">
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

              <div className="calendar-grid">
                {/* Day names header */}
                {dayNames.map(day => (
                  <div key={day} className="calendar-day-name">{day}</div>
                ))}

                {/* Calendar days */}
                {days.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="calendar-day empty"></div>;
                  }

                  const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
                  date.setHours(0, 0, 0, 0);
                  const isPast = date < today;
                  const isInRange = isDateInRange(date);
                  const selected = isDateSelected(date);
                  const isStart = selected === 'start';
                  const isEnd = selected === 'end';

                  return (
                    <button
                      key={day}
                      className={`calendar-day ${isPast ? 'past' : ''} ${isInRange ? 'in-range' : ''} ${isStart ? 'start-date' : ''} ${isEnd ? 'end-date' : ''} ${selected ? 'selected' : ''}`}
                      onClick={() => handleDateClick(day)}
                      disabled={isPast}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Selected dates display */}
              <div className="selected-dates">
                <div className="selected-date-item">
                  <span className="selected-date-label">Start Date:</span>
                  <span className="selected-date-value">
                    {startDate ? formatDate(startDate) : 'Not selected'}
                  </span>
                </div>
                <div className="selected-date-item">
                  <span className="selected-date-label">End Date:</span>
                  <span className="selected-date-value">
                    {endDate ? formatDate(endDate) : 'Not selected'}
                  </span>
                </div>
              </div>

              {/* Rental Summary */}
              {totalDays > 0 && (
                <div className="rental-summary">
                  <div className="summary-row">
                    <span>Rental Period:</span>
                    <span>{totalDays} {totalDays === 1 ? 'day' : 'days'}</span>
                  </div>
                  <div className="summary-row">
                    <span>Price per day:</span>
                    <span>${board.price}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <form onSubmit={handleSubmit} className="rent-form">
            <button 
              type="submit" 
              className="rent-submit-btn"
              disabled={!startDate || !endDate || isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Confirm Rental'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Rent;


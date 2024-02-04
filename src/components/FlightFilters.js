
import React from 'react';
import './FlightFilters.css';
const FILTER_OPTIONS = [
  { value: 'departure-time', label: 'Departure Time' },
  { value: 'arrival-time', label: 'Arrival Time' },
  { value: 'duration', label: 'Duration' },
  { value: 'price', label: 'Price' },
];

const FlightFilters = ({ filter, onFilterChange }) => (
  <div className="filter-container">
    <label htmlFor="flight-filter" className="filter-label">Filter:</label>
    <select
      id="flight-filter"
      value={filter}
      onChange={(e) => onFilterChange(e.target.value)}
      className="filter-select"
    >
      {FILTER_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);


export default FlightFilters;
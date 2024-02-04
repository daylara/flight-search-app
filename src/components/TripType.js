import React, { useState } from 'react';
import './TripType.css';
const TripType = ({onChange}) => {
  const [tripType, setTripType] = useState('one-way');

  const handleTabClick = (tabId) => {
    setTripType(tabId);
    onChange(tabId);
  };

  return (
    <nav className="js-nav2 direction-btns" data-nav-id="search-bar-buttons">
      <ul className="nav__list2">
        <li className="nav__item2">
          <div
            className={`nav__link2 ${tripType === 'one-way' ? 'b-nav-tab nav__link_active2': ''}`}
            onClick={() => handleTabClick('one-way')}
            data-transform="0"
            id="search_cheap_one_way_button"
          >
            One-way
          </div>
        </li>
        <li className="nav__item2">
          <div
            className={`nav__link2 ${tripType === 'round-trip' ? 'b-nav-tab nav__link_active2' : ''}`}
            onClick={() => handleTabClick('round-trip')}
            data-transform="100"
            id="search_cheap_double_way_button"
          >
            Round-trip
          </div>
        </li>
      </ul>
      <div className="nav__slider2">
        <div
          className="nav__slider-rect2"
          style={{ transform: `translate(${tripType === 'one-way' ? '0' : '100%'})` }}
        ></div>
      </div>
    </nav>
  );
};

export default TripType;
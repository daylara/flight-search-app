import React, { Component } from 'react';
import './App.css';
import FlightSearch from './components/FlightSearch';
import FlightOffers from './components/FlightOffers';
import FlightFilters from './components/FlightFilters';
import mockFetch from './mock-fetch';
import queryString from 'query-string';
import moment from 'moment';
import MyImage from './amadeus.png';



const SEARCH_URL = 'https://example.com/api/flights/search';



class App extends Component {
  constructor(props) {
    super(props);

    this.searchFlights = this.searchFlights.bind(this);
    this.state = {
      legs: [],
      offers: [],
      isloading: false,
      selectedFilter: 'departure-time', // default filter
    };
  }
  handleFilterChange = (selectedFilter) => {
    this.setState({ selectedFilter });
  };

  

  

  async searchFlights(origin, destination, departureDate, returnDate) {
    this.setState({ isloading: true });
    const searchCriteria = {
      departureAirport: origin,
      arrivalAirport: destination,
      departureDate: departureDate,
      returnDate: returnDate,
      maxOfferCount: 10,
      key: '<TR>'
    };

    const queryStringified = queryString.stringify(searchCriteria);
    console.log(queryStringified);
    const url = `${SEARCH_URL}?${queryStringified}`;
    console.log('Legsss:', this.state.legs);
    console.log('Offersss:', this.state.offers);


    try {

      const response = await mockFetch(url);
      console.log('GDFG',response);


      if (response.status !== 200) {
        throw new Error(`HTTP hata: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.legs);
      const filteredLegs = data.legs.filter((leg) =>
        leg.departureAirport.city.toLowerCase() === origin.toLowerCase() &&
        leg.arrivalAirport.city.toLowerCase() === destination.toLowerCase()
      );
      
      function logLegAirportCodes(leg) {
        console.log(leg.legId);
        console.log('Departure Airport Code:', leg.departureAirport.code);
        console.log('Arrival Airport Code:', leg.arrivalAirport.code);
      }
      data.legs.forEach((leg) => {
        logLegAirportCodes(leg);
      });
      
      console.log("yyy ", filteredLegs);
      this.setState({
        legs: filteredLegs,
        offers: data.offers,
        isloading: false,
      });
    } catch (error) {
      console.error('API isteği basarisiz:', error);

    }





  }

  render() {
    console.log('Legs:', this.state.legs);
    console.log('Offers:', this.state.offers);

    return (
      <div className="App">
        <div className='image-area'>
         <img src={MyImage} alt="My Image" />
        </div>
        <header>
          <h1 className="App-title">Flight Search</h1>
        </header>
        <div className="App-content">
        <div className="search-filters-container">
                <FlightSearch onSearch={this.searchFlights} />
                <FlightFilters filter={this.state.filter} onFilterChange={this.handleFilterChange} />
            </div>
            <FlightOffers
                legs={this.state.legs}
                offers={this.state.offers}
                isLoading={this.state.isloading}
                selectedFilter={this.state.selectedFilter}
                onFilterChange={this.handleFilterChange}
            />
        </div>
      </div>
    );
  }
}

export default App;


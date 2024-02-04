
import React, { PureComponent } from 'react';
import './FlightSearch.css';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TripType from './TripType';

export default class extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      origin: '',
      destination: '',
      departureDate: new Date(),
      returnDate: new Date(),
      tripType: 'one-way',
      originError: '',
      destinationError: '',
      departureDateError: '',
      returnDateError: '',
    };
    this.onOriginChange = this.onOriginChange.bind(this);
    this.onDestinationChange = this.onDestinationChange.bind(this);
    this.departureDateChange = this.departureDateChange.bind(this);
    this.returnDateChange = this.returnDateChange.bind(this);
    this.onSearchFlights = this.onSearchFlights.bind(this);
    this.onTripTypeChange = this.onTripTypeChange.bind(this);
    this.validateOrigin = this.validateOrigin.bind(this);
    this.validateDestination = this.validateDestination.bind(this);


  }


  onTripTypeChange(tripType) {
    this.setState({ tripType });
  }
  
  onOriginChange(e) {
    const origin = e.target.value;
    const originError = this.validateOrigin(origin);
    this.setState({ origin, originError });
  }
  
  onDestinationChange(e) {
    const destination = e.target.value;
    const destinationError = this.validateDestination(destination);
    this.setState({ destination, destinationError });
  }

  departureDateChange(date) {
    const formattedDate = new Date(date).toISOString().slice(0, 10);

    // Update state with formatted date
    this.setState({ departureDate: formattedDate });
  }


  returnDateChange(date) {
    const formattedDate = new Date(date).toISOString().slice(0, 10);

      this.setState({
        returnDate: formattedDate,
      });
    
  }
  onSearchFlights(event) {
    event.preventDefault();
    const { origin, destination, departureDate, returnDate } = this.state;
    const originError = this.validateOrigin(origin);
    const destinationError = this.validateDestination(destination);
   
   
    if (!originError && !destinationError) {
      // Proceed with the search
      this.props.onSearch(origin, destination, departureDate, returnDate);
    }
    else{
      this.setState({
        originError: 'Origin is required',
        destinationError: 'Destination is required',
      })
    }

    
  }
  validateOrigin = () => {
    const { origin } = this.state;
    if (!origin) {
      return 'Origin is required';
    }
    return '';
  };
  
  validateDestination = () => {
    const { destination } = this.state;
    if (!destination) {
      return 'Destination is required';
    }
    return '';
  };




  render() {
    const parsedDepartureDate = Date.parse(this.state.departureDate);
    const parsedReturnDate = Date.parse(this.state.returnDate);
    
   
    return (
      <form className="fs-container" onSubmit={this.onSearchFlights}>
        <div className="trip-type-container">
          <TripType
            onChange={this.onTripTypeChange} // Attach change handler
          />
        </div>
        <div className="input-container">
          <FormGroup controlId="origin" bsSize="large" >
            <FormControl
              className="form-control"
              type="text"
              placeholder="Origin"
              value={this.state.origin} // Connect value to state
              onChange={this.onOriginChange} // Attach change handler
            />
          </FormGroup>
          <FormGroup controlId="origin" bsSize="large">
            <FormControl
              className="form-control"
              type="text"
              placeholder="Destination"
              value={this.state.destination} // Connect value to state
              onChange={this.onDestinationChange} // Attach change handler
            />
          </FormGroup>
          <DatePicker
            placeholderText="Departure date"
            selected={parsedDepartureDate} // Use parsedDepartureDate here
            onChange={this.departureDateChange}
          />

          <div className="form-group">
            <DatePicker
              id="return-date"
              selected={parsedReturnDate}
              disabled={this.state.tripType === "one-way"}
              onChange={this.returnDateChange}
              placeholderText="Select return date"
            />
          </div>


          <Button
            className='button-style'
            type="submit"
            bsStyle="primary"
            bsSize="large"
          >
            {'Search'}
          </Button>
        </div>
      </form>
    );
  }
}
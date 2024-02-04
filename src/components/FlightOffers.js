import React from 'react';
import './FlightOffers.css';
import moment from 'moment';
import { ScaleLoader } from 'react-spinners';
import { useEffect, useState } from 'react';

const OfferCard = ({ leg }) => {
    const departureTime = moment(leg.departureTime);
    const arrivalTime = moment(leg.arrivalTime);

    const durationAsMinutes = parseDuration(leg.flightDuration);
    const hourDuration = parseInt(durationAsMinutes / 60, 10);
    const minuteDuration = durationAsMinutes % 60;
    console.log(hourDuration);
    // console.log('offers for legId="%s"', leg.legId, offers);
    return (
        <div className="fs-offer">
            <div className="fs-offer-col">
                <div className="fs-offer__time">
                    <div className="airport-code">{leg.departureAirport.code}</div>
                    <div>{`${departureTime.format("LT")}`}</div>
                </div>
                <div className="fs-offer__airline">
                    {leg.airlineName}
                </div>
            </div>
            <div className="fs-offer-col">
                <h2 className="icon">→ </h2>
            </div>
            <div className="fs-offer-col">
                <div className="fs-offer__time">
                    <div className="airport-code">{leg.arrivalAirport.code}</div>
                    <div>{`${arrivalTime.format("LT")}`}</div>
                </div>
            </div>
            <div className="fs-offer-col">
                <div className="fs-offer__duration">
                    {hourDuration ? `${hourDuration} hr ` : ''}
                    {minuteDuration ? `${minuteDuration} min` : ''}
                </div>
                <div className="fs-offer__stops">{
                    //[segments[0].departureAirportCode].concat(segments.map((segment) => segment.arrivalAirportCode)).join(' - ')
                }</div>
            </div>
            <div className="fs-offer-col">
                <div className="fs-offer__price">{leg.price}  ₺</div>
            </div>
        </div>
    );
};

const parseDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);

    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;

    return hours * 60 + minutes;
};


const sortOffersByPriceAscending = (legs) => {
    return legs.sort((legA, legB) => {
        const fareA = parseFloat(legA.price);
        const fareB = parseFloat(legB.price);
        return fareA - fareB;
    });
};

const sortOffersByDurationAscending = (legs) => {
    return legs.sort((legA, legB) => {
        const durationA = parseDuration(legA.flightDuration);
        const durationB = parseDuration(legB.flightDuration)
        return durationA - durationB;
    });
};

const sortOffersByDepartureTime = (legs) => {
    return legs.sort((legA, legB) => {
        const departureTimeA = moment(legA.departureTime);
        const departureTimeB = moment(legB.departureTime);
        return departureTimeA - departureTimeB;
    });
};
const sortOffersByArrivalTime = (legs) => {
    return legs.sort((legA, legB) => {
        const arrivalTimeA = moment(legA.arrivalTime);
        const arrivalTimeB = moment(legB.arrivalTime);
        return arrivalTimeA - arrivalTimeB;
    });
};
/*
A React component that outputs all of the flight search results.
Input props:
    isLoading: a boolean that represents whether or not results are loading
    legs: an array of flight legs
    offers: an array of offers for all flight legs
*/
const FlightOffers = ({ isLoading = false, legs = [], selectedFilter }) => {
    const [sortedOffers, setSortedOffers] = useState([...legs]);
    useEffect(() => {
        let sorted = [...legs];

        if (selectedFilter === 'departure-time') {
            sorted = sortOffersByDepartureTime(sorted);
        } else if (selectedFilter === 'arrival-time') {
            sorted = sortOffersByArrivalTime(sorted);
        }else if (selectedFilter === 'duration') {
            sorted = sortOffersByDurationAscending(sorted);
        } else if (selectedFilter === 'price') {
            sorted = sortOffersByPriceAscending(sorted);
        }
       

        setSortedOffers(sorted);
    }, [legs, selectedFilter]);
    if (isLoading) {
        return (
            <div className="fs-offers">
                <div className="fs-offers-loading">
                    <ScaleLoader isLoading />
                </div>
            </div>
        );
    }
    return (
        <div className="fs-offers">
            {sortedOffers.length > 0 && (
                <h2 className="city-names">{`${sortedOffers[0].departureAirport.city} →  ${sortedOffers[0].arrivalAirport.city}`}</h2>
            )}
            {sortedOffers.map((leg) => (
                <div key={leg.legId}>
                    <OfferCard leg={leg} />
                </div>
            ))}
        </div>
    );
};

export default FlightOffers;
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng, LatLngExpression } from "leaflet";
import { Polyline } from "react-leaflet";
import React, { useContext } from 'react';
import axios from 'axios';
import { DateContext } from "../../../pages/_app";

const redoptions = { color: "red" };

let ppolys: LatLngExpression[][] = [];

async function LocationGet() {
    const { date, setDate } = useContext(DateContext);
    console.log(date);
    await axios.get(`http://localhost:3000/api/locationcut?date=${date}`)
        .then(res => {
            ppolys = res.data;
        })
        .catch(err => {
            console.log('Error', err);
        })
}

const LinePoly: React.FC = () => {
    LocationGet();
    return (
        <React.Fragment>
            <Polyline pathOptions={redoptions} positions={ppolys}></Polyline>
        </React.Fragment>
    )
}
export default LinePoly;
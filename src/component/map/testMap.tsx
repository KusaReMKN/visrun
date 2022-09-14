import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng, LatLngExpression } from "leaflet";
import { Polyline } from "react-leaflet";
import { useState } from 'react';
import React from 'react';
import axios from 'axios';

const redoptions = { color: "red" };
const position = new LatLng(38.72311671577611, 141.0346841825174);
const zoomlebel = 18;

let ppolys: LatLngExpression[][] = [];

async function LocationGet() {

    await axios.get('http://localhost:3000/api/locationcut')
        .then(res => {

            ppolys = res.data;
        })
        .catch(err => {
            console.log('Error', err);
        })
}

const MultiPoly = () => {
    LocationGet();
    return (
        <React.Fragment>
            <Polyline pathOptions={redoptions} positions={ppolys}></Polyline>
        </React.Fragment>
    )
}

const testMap: React.FC = () => {
    console.log(ppolys);
    return (
        <MapContainer center={position} zoom={zoomlebel}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MultiPoly />
        </MapContainer>
    )
}
export default testMap;
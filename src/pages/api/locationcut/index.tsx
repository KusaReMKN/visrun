import React from 'react';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

interface LatLng {
    lat: number,
    lng: number,
}

interface LatLngTime extends LatLng {
    time: string
}

export interface LatLngpost {
    hairetu: LatLng[][],
}
const getDateString = (d: Date) => {
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
}

async function LocationGet(req: NextApiRequest, res: NextApiResponse) {
    let today: Date;

    if ("date" in req.query) {
        today = new Date(req.query.date as string);
        if (Number.isNaN(today.getTime())) {
            today = new Date();
        }
    } else {
        today = new Date();
    }


    let hairetu: LatLng[][] = [];
    console.time()
    await axios.get(`http://localhost:3000/api/getdata?date=${getDateString(today)}`)
        .then(res => {
            console.log(res.data);
            let locationpoint: LatLng[] = [{ lat: res.data[0].lat, lng: res.data[0].lng }]
            for (let i = 1; i < res.data.length; i++) {
                const time = new Date(res.data[i].datetime);
                const time0 = new Date(res.data[i - 1].datetime);

                if (time.getTime() - time0.getTime() < 30000) {
                    locationpoint.push({ lat: res.data[i].lat, lng: res.data[i].lng })
                } else {
                    hairetu.push(locationpoint.map(v => v));
                    locationpoint.length = 0;
                    locationpoint.push({ lat: res.data[i].lat, lng: res.data[i].lng })
                }
            }
            hairetu.push(locationpoint.map(v => v));
        })
        .catch(err => {
            console.log('API接続時エラー' + err.error);
        })
    console.timeEnd();
    res.json(hairetu);
    res.end();
}

export default LocationGet;


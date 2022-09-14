import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';
import Decimal from "decimal.js";
import jsonallview from "../db/show";


interface LatLng {
    lat: number,
    lng: number,
}

export interface LatLngTime extends LatLng {
    datetime: string
}

function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

async function getTodayDistanceTraveled() {
    //const today = nowData();
    const today = new Date();
    const ababa = await jsonallview();
    let data: LatLngTime[] = [];
    console.log(ababa);
    // for (const rows of ababa) {
    //     data.push({ datetime: rows[0], lat: +rows[1], lng: +rows[2] })
    // }
    let location: LatLng[] = [];
    for (const rows of ababa) {
        const time = new Date(rows.datetime);
        console.log(time);
        if (isSameDay(today, time)) {
            location.push({ lat: rows.lat, lng: rows.lng });
        }
    }
    return location;
}

function calcDistance(p: LatLng, q: LatLng) {
    const deg2rad = (deg: Decimal) => deg.mul(Decimal.acos(-1).div(180));
    const plat = deg2rad(new Decimal(p.lat));
    const plng = (new Decimal(p.lng));
    const qlat = deg2rad(new Decimal(q.lat));
    const qlng = (new Decimal(q.lng));
    const rad = new Decimal(6378137);
    const dlng = deg2rad(plng.sub(qlng));
    const sinsin = plat.sin().mul(qlat.sin());
    const coscos = plat.cos().mul(qlat.cos()).mul(dlng.cos());
    const sincos = sinsin.add(coscos);
    const d = rad.mul(sincos.acos());
    return (d.toNumber());
}

const getTodayDistanceSum = (data: LatLng[]) => {
    let sum = 0;
    for (let i = 1; i < data.length; i++) {
        sum += calcDistance(data[i - 1], data[i]);
    }
    return sum;
}

const todayDistanceAll = async (req: NextApiRequest, res: NextApiResponse) => {
    const location: LatLng[] = await getTodayDistanceTraveled();
    console.log(location);
    const todayDistance: number = getTodayDistanceSum(location);
    res.json(todayDistance);
    res.end();
}
export default todayDistanceAll;
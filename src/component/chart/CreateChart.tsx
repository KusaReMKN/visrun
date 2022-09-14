import React, { useContext } from 'react';
import { DateContext } from "../../pages/_app";
import axios from 'axios';
import { Bar, getDatasetAtEvent } from 'react-chartjs-2';
import { LatLngTime } from '../../pages/api/chart/Distancesum';
import Decimal from 'decimal.js';
import { LatLng } from 'leaflet';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
} from "chart.js";
import e from 'express';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement
)

const data = {
    //x軸のラベル
    labels: [] as string[],
    datasets: [
        {
            //ここにデータが入る
            data: [] as number[],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            // グラフの枠線の色
            borderColor: [
                'rgb(255, 99, 132)',
            ],
            // グラフの枠線の太さ
            borderWidth: 1,
        }
    ]
};
const getDateString = (d: Date) => {
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
}

const getSunday = (date: string) => {
    const now = new Date(date);
    const nanitimaeka = now.getDay();
    const target = now.getTime() - (1000 * 60 * 60 * 24 * nanitimaeka);
    return new Date(target);
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

async function getChartData(date: string) {
    const nextdata = await new Promise<LatLngTime[]>((res) => {
        axios.get(`http://localhost:3000/api/getdata?date=${date}`)
            .then((r) => {
                res(r as unknown as LatLngTime[]);
            })
    })
}

const CreateChart = () => {
    data.labels = [];
    data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0];
    const { date, setDate } = useContext(DateContext);
    console.log('createchart')
    getChartData(date);
    const sunday = getSunday(date)
    for (let i = 0; i < 7; i++) {
        const week = new Date(sunday.getTime() + (1000 * 60 * 60 * 24 * i));
        const weekString = getDateString(week);
        data.labels.push(weekString);
        axios.get(`http://localhost:3000/api/getdata?date=${weekString}`)
            .then((res) => {
                console.time();
                data.datasets[0].data[week.getDay()] = getTodayDistanceSum(res.data);
                console.timeEnd();
            })
    }
    console.log(data);
    return <Bar data={data} />
}
export default CreateChart;
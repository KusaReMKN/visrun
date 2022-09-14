// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import Decimal from 'decimal.js';


//どうやらleafletを使ったLatLngはサーバー側でつかえないので
//自作LatLngを使ってやります
interface LatLng {
  lat: number,
  lng: number,
}

interface LatLngTime extends LatLng {
  time: string
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function getTodayDistanceTraveled(req: NextApiRequest, res: NextApiResponse) {
  //const today = nowData();

  const today = new Date("2022/6/16");  //debug
  const ababa = JSON.parse(fs.readFileSync('./src/pages/api/ababamaru.json', 'utf-8'));
  let data: LatLngTime[] = [];
  for (const rows of ababa) {
    data.push({ time: rows[0], lat: rows[1], lng: rows[2] })
  }
  let location: LatLng[] = [];
  for (const rows of data) {
    const time = new Date(rows.time);
    if (isSameDay(today, time)) {
      location.push({ lat: rows.lat, lng: rows.lng });
    }
  }
  res.json(location);
  res.end();
}
export default getTodayDistanceTraveled;





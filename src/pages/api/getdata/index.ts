import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { LatLngTime } from '../chart/Distancesum';
const dbFile = './visrun.db';

const getDateString = (d: Date) => {
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
}

async function getTodayData(today: string, yesterday: string) {
    const db = new sqlite3.Database(dbFile);
    const rows = await new Promise<LatLngTime[]>(res => {
        const todaySearchsql = `
            SELECT * FROM visrun
                WHERE datetime LIKE '${today}%'
                OR datetime LIKE '${yesterday}%'
            `.trim();
        db.serialize(() => db.all(todaySearchsql, (err, rows) => res(rows)))
    })
    db.close();
    return rows;
}

const getdata = async (req: NextApiRequest, res: NextApiResponse) => {
    let today: Date;

    if ("date" in req.query) {
        today = new Date(req.query.date as string);
        if (Number.isNaN(today.getTime())) {
            today = new Date();
        }
    } else {
        today = new Date();
    }
    const yesterday = new Date(today.getTime() - (1000 * 60 * 60 * 24));
    const todayString = getDateString(today);
    const yesterdayString = getDateString(yesterday);

    const data = await getTodayData(todayString, yesterdayString);
    const todayData: LatLngTime[] = [];
    for (const row of data) {
        const date = new Date(row.datetime);
        if (date.toLocaleDateString() === today.toLocaleDateString()) {
            todayData.push(row);
        }
    }

    res.json(todayData);
    res.end();
}
export default getdata;
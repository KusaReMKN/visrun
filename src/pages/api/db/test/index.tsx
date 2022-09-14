import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';
import { LatLng } from "leaflet";
import Decimal from "decimal.js";
import { time } from "console";
import jsonallview from "../show";


async function getData(req: NextApiRequest, res: NextApiResponse) {

    const ababa = await jsonallview();

    res.json(ababa);
    res.end();
}
export default getData;

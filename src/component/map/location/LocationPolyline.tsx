// import React from 'react';
// import axios from 'axios';

// import { Polyline } from 'react-leaflet';
// import { LatLng } from 'leaflet';
// import { useState } from 'react';


// const redoptions = { color: 'red' };
// const blue = { color: 'blue' };
// //表示されてる配列
// const [hairetu, setHairetu] = useState<LatLng[][]>([]);

// //LocationPolylineが動かないのはLocationgetのせい

// async function LocationGet() {

//     await axios.get('http://localhost:3000/api/db/show')
//         .then(res => {
//             let locationpoint: LatLng[] = [new LatLng(res.data[0].lat, res.data[0].lng)]
//             for (let i = 1; i < res.data.length; i++) {
//                 const time = new Date(res.data[i].time);
//                 const time0 = new Date(res.data[i - 1].time);
//                 if (time.getTime() - time0.getTime() < 3000) {
//                     locationpoint.push(new LatLng(res.data[i].lat, res.data[i].lng))
//                 } else {
//                     setHairetu([...hairetu, locationpoint]);
//                     locationpoint.length = 0;
//                     locationpoint.push(new LatLng(res.data[i].lat, res.data[i].lng))
//                 }
//             }
//         })
//         .catch(err => {
//             console.log('API接続時エラー' + err.error);
//         })
// }

// const LocationPolyline: React.FC = () => {
//     LocationGet();
//     return (
//         <React.Fragment>

//         </React.Fragment>
//     )
// }
// export default LocationPolyline;
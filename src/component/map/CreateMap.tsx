import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLng } from "leaflet";
import LinePoly from "../map/location/line";

//LocationPolylineを入れると動かなくなるらしい
const position = new LatLng(38.72311671577611, 141.0346841825174);
const zoomlebel = 18;

const Map: React.FC = () => {
    return (
        <MapContainer center={position} zoom={zoomlebel}>

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LinePoly />

        </MapContainer>
    )
}
export default Map;
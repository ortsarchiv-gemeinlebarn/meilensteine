import proj4 from 'proj4';
proj4.defs("EPSG:31259", "+proj=tmerc +lat_0=0 +lon_0=16.3333333333333 +k=1 +x_0=750000 +y_0=-5000000 +ellps=bessel +towgs84=577.326,90.129,463.919,5.137,1.474,5.297,2.4232 +units=m +no_defs +type=crs");


import { defineCustomElements } from "@ortsarchiv-gemeinlebarn/components/dist/components/index.js";
defineCustomElements();

import './map-screen';
import './map-fundort';
import './map-strasse';

// // Map Standorte
// document.getElementById("map-standorte")?.addEventListener("readyMap", ($event) => {
//     const map = $event.detail;

//     map.getView().setCenter([1759424.107577, 6163175.814151]);
//     map.getView().setZoom(11);
// });


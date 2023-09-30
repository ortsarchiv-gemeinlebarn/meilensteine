import { GeoJSON } from 'ol/format';
import { Vector as VectorSource, XYZ } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Stroke, Fill, Style } from 'ol/style';

import * as fundort_meilensteine from '../data/fundort/meilensteine_3857.json';
import * as fundort_loecher from '../data/fundort/loecher_3857.json';
import * as fundort_schotterentnahmen from '../data/fundort/schotterentnahmen_3857.json';
import * as fundort_referenzlinien from '../data/fundort/referenzlinien_3857.json';
import * as fundort_strasse from '../data/fundort/strasse_3857.json';

document.getElementById("map-fund")?.addEventListener("readyMap", ($event) => {
    const map = $event.detail;

    map.getView().setCenter([1758922.985, 6163196.460]);
    map.getView().setZoom(21.4);

    map.addLayer(new TileLayer({
        title: 'Overlay',
        // opacity: 0.7,
        extent: [1758789.407500, 6163104.980435, 1759039.693100, 6163301.040100],
        source: new XYZ({
            attributions: '',
            minZoom: 10,
            maxZoom: 24,
            url: 'https://data.ortsarchiv-gemeinlebarn.org/meilensteine/geo/tiles/before3857/{z}/{x}/{y}.png',
            tileSize: [256, 256]
        }),
        zIndex: 50
    }));

    map.addLayer(new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(fundort_schotterentnahmen)
        }),
        style: [
            new Style({
                stroke: new Stroke({
                    color: 'rgba(255, 255, 0, 0.75)',
                    width: 1,
                }),
                fill: new Fill({
                    color: 'rgba(255, 255, 0, 0.35)',
                })
            })
        ],
        zIndex: 90
    }));

    map.addLayer(new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(fundort_referenzlinien)
        }),
        style: [
            new Style({
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.35)',
                    width: 1,
                })
            })
        ],
        zIndex: 99
    }));

    map.addLayer(new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(fundort_loecher)
        }),
        style: [
            new Style({
                stroke: new Stroke({
                    color: 'black',
                    width: 1,
                }),
                fill: new Fill({
                    color: 'rgba(255, 0, 0, 0.75)',
                })
            })
        ],
        zIndex: 100
    }));

    map.addLayer(new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(fundort_meilensteine)
        }),
        style: [
            new Style({
                stroke: new Stroke({
                    color: 'black',
                    width: 1,
                }),
                fill: new Fill({
                    color: 'rgba(255, 255, 0, 0.75)',
                })
            })
        ],
        zIndex: 100
    }));
});

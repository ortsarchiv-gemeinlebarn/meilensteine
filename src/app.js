import { GeoJSON } from 'ol/format';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Circle as CircleStyle, Stroke, Fill, Style } from 'ol/style';

import * as fundort from '../data/fundort.geo.json';
import * as kastelle from '../data/kastelle.geo.json';
import * as roemerstrasse from '../data/roemerstrasse.geo.json';

import { defineCustomElements } from "@ortsarchiv-gemeinlebarn/components/dist/components/index.js";
defineCustomElements();


// Map Fundorte
document.getElementById("map-fundort")?.addEventListener("readyMap", ($event) => {
    const map = $event.detail;

    map.getView().setCenter([1758924.107577, 6163175.814151]);
    map.getView().setZoom(17);

    map.addLayer(new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(fundort)
        }),
        style: [
            new Style({
                stroke: new Stroke({
                    color: 'black',
                    width: 4,
                }),
                fill: new Fill({
                    color: 'rgba(255, 0, 0, 0.4)',
                }),

            })
        ],
        zIndex: 100
    }));
});

// Map Strassen
document.getElementById("map-strassen")?.addEventListener("readyMap", ($event) => {
    const map = $event.detail;

    map.getView().setCenter([1761262.005747, 6153562.962098]);
    map.getView().setZoom(11);

    map.addLayer(new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(roemerstrasse)
        }),
        style: [
            new Style({
                zIndex: 0,
                stroke: new Stroke({
                    color: 'blue',
                    width: 7,
                })
            }),
            new Style({
                zIndex: 1,
                stroke: new Stroke({
                    color: 'orange',
                    width: 2,
                })
            }),
        ],
        zIndex: 100
    }));

    map.addLayer(new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(kastelle)
        }),
        style: [
            new Style({
                zIndex: 0,
                image: new CircleStyle({
                    radius: 12,
                    fill: new Fill({
                        color: 'blue',
                    }),
                }),
            }),
            new Style({
                zIndex: 1,
                image: new CircleStyle({
                    radius: 10,
                    fill: new Fill({
                        color: 'yellow',
                    }),
                }),
            }),
            new Style({
                zIndex: 2,
                image: new CircleStyle({
                    radius: 5,
                    fill: new Fill({
                        color: 'blue',
                    }),
                }),
            }),
        ],
        zIndex: 101
    }));
});

import { GeoJSON } from 'ol/format';
import { OSM, Vector as VectorSource, GeoTIFF } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Circle as CircleStyle, Stroke, Fill, Style } from 'ol/style';

import proj4 from 'proj4';
proj4.defs("EPSG:31259", "+proj=tmerc +lat_0=0 +lon_0=16.3333333333333 +k=1 +x_0=750000 +y_0=-5000000 +ellps=bessel +towgs84=577.326,90.129,463.919,5.137,1.474,5.297,2.4232 +units=m +no_defs +type=crs");

import * as kastelle from '../data/kastelle.geo.json';

import * as schotterentnahmen from '../data/schotterentnahmen_3857.geo.json';
import * as loecher from '../data/loecher_3857.geo.json';
import * as meilensteine from '../data/meilensteine_3857.geo.json';
import * as referenzlinien from '../data/referenzlinien_3857.geo.json';

import * as strasseGesichert from '../data/strasse_gesichert_3857.geo.json';
import * as strasseUngesichert from '../data/strasse_ungesichert_3857.geo.json';
import * as strasseMeilensteine from '../data/strasse_meilensteine_3857.geo.json';

import { defineCustomElements } from "@ortsarchiv-gemeinlebarn/components/dist/components/index.js";
defineCustomElements();


// Map Standorte
document.getElementById("map-standorte")?.addEventListener("readyMap", ($event) => {
    const map = $event.detail;

    map.getView().setCenter([1759424.107577, 6163175.814151]);
    map.getView().setZoom(11);
});

// Map Fundort
document.getElementById("map-fund")?.addEventListener("readyMap", ($event) => {
    const map = $event.detail;

    map.getView().setCenter([1758922.985, 6163196.460]);
    map.getView().setZoom(21.4);

    // map.addLayer(new TileLayer({
    //     source: new GeoTIFF({
    //         sources: [
    //             {
    //                 // url: 'http://data.ortsarchiv-gemeinlebarn.org/meilensteine/geo/georef_verfearbungen_1997.tif'
    //                 // url: "http://localhost/georef_verfearbungen_1997.tif"
    //             },
    //         ],
    //     }),
    //     zIndex: 80
    // }));

    map.addLayer(new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(schotterentnahmen)
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
            features: new GeoJSON().readFeatures(referenzlinien)
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
            features: new GeoJSON().readFeatures(loecher)
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
            features: new GeoJSON().readFeatures(meilensteine)
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

// Map Schotterentnahmen
document.getElementById("map-schotterentnahmen")?.addEventListener("readyMap", ($event) => {
    const map = $event.detail;

    map.getView().setCenter([1759424.107577, 6163175.814151]);
    map.getView().setZoom(17);

    map.getLayers().forEach(l => {

        if (l.values_.name.indexOf('basemap-orthophoto') > -1) {
            l.setOpacity(0.75)
        }
    });

    map.addLayer(new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(schotterentnahmen)
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

    map.addLayer(new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(strasseMeilensteine)
        }),
        style: [
            new Style({
                stroke: new Stroke({
                    color: 'black',
                    width: 8,
                })
            }),
            new Style({
                stroke: new Stroke({
                    color: 'blue',
                    width: 6,
                })
            })
        ],
        zIndex: 100
    }));

    map.addLayer(new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(strasseGesichert)
        }),
        style: [
            new Style({
                stroke: new Stroke({
                    color: 'black',
                    width: 8,
                })
            }),
            new Style({
                stroke: new Stroke({
                    color: 'rgb(50,205,50)',
                    width: 6,
                })
            })
        ],
        zIndex: 100
    }));

    map.addLayer(new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(strasseUngesichert)
        }),
        style: [
            new Style({
                stroke: new Stroke({
                    color: 'black',
                    width: 8,
                })
            }),
            new Style({
                stroke: new Stroke({
                    color: 'red',
                    width: 6,
                })
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

    // map.addLayer(new VectorLayer({
    //     source: new VectorSource({
    //         features: new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(roemerstrasse)
    //     }),
    //     style: [
    //         new Style({
    //             zIndex: 0,
    //             stroke: new Stroke({
    //                 color: 'blue',
    //                 width: 7,
    //             })
    //         }),
    //         new Style({
    //             zIndex: 1,
    //             stroke: new Stroke({
    //                 color: 'orange',
    //                 width: 2,
    //             })
    //         }),
    //     ],
    //     zIndex: 100
    // }));

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

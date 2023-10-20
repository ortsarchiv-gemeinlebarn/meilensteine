import { GeoJSON } from 'ol/format';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Stroke, Fill, Style } from 'ol/style';

import * as fundort_schotterentnahmen from '../data/fundort/schotterentnahmen_3857.json';
import * as umgebung_schotterentnahmen from '../data/umgebung/schotterentnahmen_3857.json';
import * as fundort_strasse from '../data/fundort/strasse_3857.json';
import * as umgebung_strasse from '../data/umgebung/strasse_verlauf_3857.json';

document.getElementById("map-strasse")?.addEventListener("readyMap", ($event) => {
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
            features: new GeoJSON().readFeatures(fundort_schotterentnahmen)
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
            features: new GeoJSON().readFeatures(umgebung_schotterentnahmen)
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
            features: new GeoJSON().readFeatures(fundort_strasse)
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
            features: new GeoJSON().readFeatures(umgebung_strasse)
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
});

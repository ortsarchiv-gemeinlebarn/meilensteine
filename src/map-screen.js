import { GeoJSON } from 'ol/format';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Circle as CircleStyle, Stroke, Fill, Style } from 'ol/style';
import { createEmpty, getCenter, extend as extendExtent } from 'ol/extent';
import { easeOut } from 'ol/easing';
import { Overlay } from 'ol';


import * as fundort_meilensteine from '../data/fundort/meilensteine_3857.json';
import * as fundort_loecher from '../data/fundort/loecher_3857.json';
import * as fundort_schotterentnahmen from '../data/fundort/schotterentnahmen_3857.json';
import * as fundort_referenzlinien from '../data/fundort/referenzlinien_3857.json';
import * as fundort_strasse from '../data/fundort/strasse_3857.json';
import * as umgebung_schotterentnahmen from '../data/umgebung/schotterentnahmen_3857.json';
import * as umgebung_strasse_gesichert from '../data/umgebung/strasse_gesichert_3857.json';
import * as umgebung_strasse_ungesichert from '../data/umgebung/strasse_ungesichert_3857.json';

import * as kastelle from '../data/kontext/kastelle.json';
import * as wachtuerme from '../data/kontext/wachtuerme.json';
import * as staedte from '../data/kontext/staedte.json';

let screenMap;

const screenlayers = {
    fundort_meilensteine: null,
    fundort_loecher: null,
    fundort_schotterentnahmen: null,
    fundort_referenzlinien: null,
    fundort_strasse: null,
    umgebung_schotterentnahmen: null,
    umgebung_strasse: null,
    kastelle: null,
    wachtuerme: null,
    staedte: null,
};

document.querySelector("oag-screen-map").addEventListener("readyMap", ($event) => {
    screenMap = $event.detail;

    screenMap.getView().setCenter([1758950, 6163175]);
    screenMap.getView().setZoom(19);

    screenlayers.fundort_meilensteine = new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(fundort_meilensteine)
        }),
        style: [
            new Style({
                stroke: new Stroke({
                    color: 'rgba(255, 0, 0, 0.75)',
                    width: 1,
                }),
                fill: new Fill({
                    color: 'rgba(255, 0, 0, 0.35)',
                })
            })
        ],
        zIndex: 200
    });

    screenlayers.fundort_loecher = new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(fundort_loecher)
        }),
        style: [
            new Style({
                stroke: new Stroke({
                    color: 'rgba(255, 0, 0, 0.75)',
                    width: 1,
                }),
                fill: new Fill({
                    color: 'rgba(255, 0, 0, 0.35)',
                })
            })
        ],
        zIndex: 200
    });

    screenlayers.fundort_referenzlinien = new VectorLayer({
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
    });

    screenlayers.fundort_schotterentnahmen = new VectorLayer({
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
    });

    screenlayers.fundort_strasse = new VectorLayer({
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
    });

    // Umgebung
    screenlayers.umgebung_schotterentnahmen = new VectorLayer({
        source: new VectorSource({
            features: new GeoJSON().readFeatures(umgebung_schotterentnahmen)
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
    });

    // Kontext

    screenlayers.kastelle = new VectorLayer({

        source: new VectorSource({
            features: new GeoJSON({
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            }).readFeatures(kastelle)
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
    });

    screenlayers.wachtuerme = new VectorLayer({

        source: new VectorSource({
            features: new GeoJSON({
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            }).readFeatures(wachtuerme)
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
    });

    screenlayers.staedte = new VectorLayer({

        source: new VectorSource({
            features: new GeoJSON({
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            }).readFeatures(staedte)
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
    });

    screenMap.addLayer(screenlayers.fundort_meilensteine);
    screenMap.addLayer(screenlayers.fundort_loecher);
    screenMap.addLayer(screenlayers.fundort_schotterentnahmen);
    screenMap.addLayer(screenlayers.fundort_referenzlinien);
    screenMap.addLayer(screenlayers.fundort_strasse);
    screenMap.addLayer(screenlayers.umgebung_schotterentnahmen);
    screenMap.addLayer(screenlayers.kastelle);
    screenMap.addLayer(screenlayers.wachtuerme);
    screenMap.addLayer(screenlayers.staedte);

    screenlayers.fundort_referenzlinien.setVisible(false);
});

document.querySelectorAll('oag-screen-content-layer-item').forEach(el => {
    el.addEventListener('showLayer', (event) => setScreenLayerVisibilityBySlug(event.detail, true));
    el.addEventListener('hideLayer', (event) => setScreenLayerVisibilityBySlug(event.detail, false));
    el.addEventListener('highlightLayer', (event) => highlightInScreenMap(event.detail), false);
});

document.querySelectorAll('oag-screen-background-layer-item').forEach(el => {
    el.addEventListener('click', event => {

        const slug = event.srcElement.getAttribute('slug');

        document.querySelectorAll('oag-screen-background-layer-item').forEach(e => e.setAttribute('active', 'false'));
        event.srcElement.setAttribute('active', 'true');

        screenMap.getLayers().forEach(l => {
            console.log(l.values_.name);
            l.setVisible(l.values_.name.indexOf(slug) > -1)
        });

    });
});

function setScreenLayerVisibilityBySlug(slug, visible) {
    const layer = getScreenLayerBySlug(slug);
    layer.setVisible(visible);
}

function getScreenLayerBySlug(slug) {
    switch (slug) {
        case 'fundort-meilensteine':
            return screenlayers.fundort_meilensteine;
        case 'fundort-loecher':
            return screenlayers.fundort_loecher;
        case 'fundort-schotterentnahmen':
            return screenlayers.fundort_schotterentnahmen;
        case 'fundort-referenzlinien':
            return screenlayers.fundort_referenzlinien;
        case 'fundort-strasse':
            return screenlayers.fundort_strasse;
        case 'umgebung-schotterentnahmen':
            return screenlayers.umgebung_schotterentnahmen;
        case 'kastelle':
            return screenlayers.kastelle;
        case 'wachtuerme':
            return screenlayers.wachtuerme;
        case 'staedte':
            return screenlayers.staedte;
    }
}

function highlightInScreenMap(slug) {

    const duration = 1000;
    const maxZoom = 23;

    const view = screenMap.getView();
    const layer = getScreenLayerBySlug(slug);
    const features = layer.getSource().getFeatures();

    const extent = createEmpty();
    features.forEach(function (feature) { extendExtent(extent, feature.getGeometry().getExtent()); });

    const resolution = view.getResolutionForExtent(extent);
    const center = getCenter(extent);
    const zoom = (view.getZoomForResolution(resolution) < maxZoom) ? view.getZoomForResolution(resolution) : maxZoom;

    view.animate({
        center: center,
        duration: duration / 2,
        easing: easeOut
    });

    view.animate({
        zoom: zoom - 0.5,
        duration: duration / 2,
        easing: easeOut
    });

    setTimeout(() => features.forEach(feature => pulsatingCircleAnimation(feature)), duration);
}

function pulsatingCircleAnimation(feature) {
    const coordinates = getCenter(feature.getGeometry().getExtent());
    const element = document.createElement('div');
    element.setAttribute('class', 'pulsate');

    const overlay = new Overlay({
        element: element,
        position: coordinates,
        positioning: 'center-center',
        offset: [1, 1]
    });

    // screenMap.addOverlay(overlay);
}

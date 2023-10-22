import { GeoJSON } from 'ol/format';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { KastellStyle, WachtpostenStyle, StaedteStyle } from './layers-styles';

import * as kastelle from '../data/kontext/kastelle_3857.json';
import * as wachposten from '../data/kontext/wachposten_3857.json';
import * as staedte from '../data/kontext/staedte_3857.json';

document.getElementById("map-besiedelung")?.addEventListener("readyMap", ($event) => {
    const map = $event.detail;

    map.getView().setCenter([1740000, 6152000]);
    map.getView().setZoom(10);

    map.getInteractions().forEach(interaction => map.removeInteraction(interaction));

    map.addLayer(new VectorLayer({
        source: new VectorSource({ features: new GeoJSON().readFeatures(wachposten) }),
        style: (feature) => WachtpostenStyle(feature.getProperties().title, false),
        zIndex: 101
    }));

    map.addLayer(new VectorLayer({
        source: new VectorSource({ features: new GeoJSON().readFeatures(kastelle) }),
        style: (feature) => KastellStyle(feature.getProperties().title, false),
        zIndex: 102
    }));

    map.addLayer(new VectorLayer({
        source: new VectorSource({ features: new GeoJSON().readFeatures(staedte) }),
        style: (feature) => StaedteStyle(feature.getProperties().title, false),
        zIndex: 103
    }));
});

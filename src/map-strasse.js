import { GeoJSON } from "ol/format";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import {
    FundortStrasseStyle,
    SchotterentnahmenStyle,
    StrassenVerlaufStyle,
} from "./layers-styles";

import * as fundort_schotterentnahmen from "../assets/data/fundort/schotterentnahmen_3857.json";
import * as fundort_strasse from "../assets/data/fundort/strasse_3857.json";
import * as umgebung_schotterentnahmen from "../assets/data/umgebung/schotterentnahmen_3857.json";
import * as umgebung_strasse from "../assets/data/umgebung/strasse_verlauf_3857.json";

document
    .getElementById("map-strasse")
    ?.addEventListener("readyMap", ($event) => {
        const map = $event.detail;

        map.getView().setCenter([1759424.107577, 6163175.814151]);
        map.getView().setZoom(14);

        map.getInteractions().forEach((interaction) =>
            map.removeInteraction(interaction)
        );

        map.addLayer(
            new VectorLayer({
                source: new VectorSource({
                    features: new GeoJSON().readFeatures(
                        fundort_schotterentnahmen
                    ),
                }),
                style: (feature) =>
                    SchotterentnahmenStyle(feature.getProperties().title, true),
                zIndex: 101,
            })
        );

        map.addLayer(
            new VectorLayer({
                source: new VectorSource({
                    features: new GeoJSON().readFeatures(
                        umgebung_schotterentnahmen
                    ),
                }),
                style: (feature) =>
                    SchotterentnahmenStyle(feature.getProperties().title, true),
                zIndex: 101,
            })
        );

        map.addLayer(
            new VectorLayer({
                source: new VectorSource({
                    features: new GeoJSON().readFeatures(fundort_strasse),
                }),
                style: (feature) =>
                    FundortStrasseStyle(feature.getProperties().title, true),
                zIndex: 100,
            })
        );

        map.addLayer(
            new VectorLayer({
                source: new VectorSource({
                    features: new GeoJSON().readFeatures(umgebung_strasse),
                }),
                style: (feature) =>
                    StrassenVerlaufStyle(feature.getProperties().title, true),
                zIndex: 100,
            })
        );
    });

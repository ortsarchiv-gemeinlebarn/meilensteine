import { GeoJSON } from "ol/format";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource, XYZ } from "ol/source";
import { Fill, Stroke, Style } from "ol/style";

import * as fundort_loecher from "../assets/data/fundort/loecher_3857.json";
import * as fundort_meilensteine from "../assets/data/fundort/meilensteine_3857.json";
import * as fundort_referenzlinien from "../assets/data/fundort/referenzlinien_3857.json";
import * as fundort_schotterentnahmen from "../assets/data/fundort/schotterentnahmen_3857.json";

document.getElementById("map-fund")?.addEventListener("readyMap", ($event) => {
    const map = $event.detail;

    map.getView().setCenter([1758922.985, 6163196.46]);
    map.getView().setZoom(21.5);

    map.getInteractions().forEach((interaction) =>
        map.removeInteraction(interaction)
    );

    map.addLayer(
        new TileLayer({
            source: new XYZ({
                url: "https://gis{1-4}.ortsarchiv-gemeinlebarn.org/orthophoto/bev-2017250/epsg3857/{z}/{x}/{y}.png",
                tileSize: 512,
            }),
            zIndex: 30,
        })
    );

    map.addLayer(
        new VectorLayer({
            source: new VectorSource({
                features: new GeoJSON().readFeatures(fundort_schotterentnahmen),
            }),
            style: [
                new Style({
                    stroke: new Stroke({
                        color: "rgba(255, 255, 0, 0.75)",
                        width: 1,
                    }),
                    fill: new Fill({
                        color: "rgba(255, 255, 0, 0.35)",
                    }),
                }),
            ],
            zIndex: 90,
        })
    );

    map.addLayer(
        new VectorLayer({
            source: new VectorSource({
                features: new GeoJSON().readFeatures(fundort_referenzlinien),
            }),
            style: [
                new Style({
                    stroke: new Stroke({
                        color: "rgba(0, 0, 0, 0.35)",
                        width: 1,
                    }),
                }),
            ],
            zIndex: 99,
        })
    );

    map.addLayer(
        new VectorLayer({
            source: new VectorSource({
                features: new GeoJSON().readFeatures(fundort_loecher),
            }),
            style: [
                new Style({
                    stroke: new Stroke({
                        color: "black",
                        width: 1,
                    }),
                    fill: new Fill({
                        color: "rgba(255, 0, 0, 0.75)",
                    }),
                }),
            ],
            zIndex: 100,
        })
    );

    map.addLayer(
        new VectorLayer({
            source: new VectorSource({
                features: new GeoJSON().readFeatures(fundort_meilensteine),
            }),
            style: [
                new Style({
                    stroke: new Stroke({
                        color: "black",
                        width: 1,
                    }),
                    fill: new Fill({
                        color: "rgba(255, 255, 0, 0.75)",
                    }),
                }),
            ],
            zIndex: 100,
        })
    );
});

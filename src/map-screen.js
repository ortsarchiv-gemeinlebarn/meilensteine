import { easeOut } from "ol/easing";
import { createEmpty, extend as extendExtent, getCenter } from "ol/extent";
import { GeoJSON } from "ol/format";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { OrthofotoBasemap, OrthofotoBev2017250 } from "./layers";
import {
    FundortMeilensteineStyle,
    FundortPfahlloecherStyle,
    FundortStrasseStyle,
    KastellStyle,
    MeilensteinOrteStyle,
    SchotterentnahmenStyle,
    StaedteStyle,
    StrassenVerlaufStyle,
    WachtpostenStyle,
} from "./layers-styles";

import * as fundort_loecher from "../assets/data/fundort/loecher_3857.json";
import * as fundort_meilensteine from "../assets/data/fundort/meilensteine_3857.json";
import * as fundort_schotterentnahmen from "../assets/data/fundort/schotterentnahmen_3857.json";
import * as fundort_strasse from "../assets/data/fundort/strasse_3857.json";
import * as umgebung_schotterentnahmen from "../assets/data/umgebung/schotterentnahmen_3857.json";
import * as umgebung_strasse from "../assets/data/umgebung/strasse_verlauf_3857.json";

import * as kastelle from "../assets/data/kontext/kastelle_3857.json";
import * as meilensteine from "../assets/data/kontext/meilensteine_3857.json";
import * as staedte from "../assets/data/kontext/staedte_3857.json";
import * as wachposten from "../assets/data/kontext/wachposten_3857.json";

let screenMap;

const backgroundLayers = {
    basemapOrthofoto: OrthofotoBasemap,
    ortho2017: OrthofotoBev2017250,
};

const screenlayers = {
    fundort_meilensteine: null,
    fundort_loecher: null,
    fundort_schotterentnahmen: null,
    fundort_referenzlinien: null,
    fundort_strasse: null,
    umgebung_schotterentnahmen: null,
    umgebung_strasse: null,
    kastelle: null,
    wachposten: null,
    staedte: null,
    meilensteine: null,
};

const resetLayersStyles = () => {
    screenlayers.fundort_meilensteine.setStyle((feature) =>
        FundortMeilensteineStyle(feature.getProperties().title, false)
    );
    screenlayers.fundort_loecher.setStyle((feature) =>
        FundortPfahlloecherStyle(feature.getProperties().title, false)
    );
    screenlayers.fundort_strasse.setStyle((feature) =>
        FundortStrasseStyle(feature.getProperties().title, false)
    );
    screenlayers.fundort_schotterentnahmen.setStyle((feature) =>
        SchotterentnahmenStyle(feature.getProperties().title, false)
    );
    screenlayers.umgebung_schotterentnahmen.setStyle((feature) =>
        SchotterentnahmenStyle(feature.getProperties().title, false)
    );
    screenlayers.umgebung_strasse.setStyle((feature) =>
        StrassenVerlaufStyle(feature.getProperties().title, false)
    );

    screenlayers.kastelle.setStyle((feature) =>
        KastellStyle(feature.getProperties().title, false)
    );
    screenlayers.wachposten.setStyle((feature) =>
        WachtpostenStyle(feature.getProperties().title, false)
    );
    screenlayers.meilensteine.setStyle((feature) =>
        MeilensteinOrteStyle(feature.getProperties().title, false)
    );
    screenlayers.staedte.setStyle((feature) =>
        StaedteStyle(feature.getProperties().title, false)
    );

    screenlayers.kastelle.setZIndex(110);
    screenlayers.wachposten.setZIndex(110);
    screenlayers.meilensteine.setZIndex(110);
    screenlayers.staedte.setZIndex(110);
};

document
    .querySelector("oag-screen-map")
    .addEventListener("readyMap", ($event) => {
        screenMap = $event.detail;

        screenMap.getView().setCenter([1758950, 6163175]);
        screenMap.getView().setZoom(19);
        screenMap.getView().setMinZoom(10);
        screenMap.getView().setMaxZoom(23);

        screenlayers.fundort_meilensteine = new VectorLayer({
            source: new VectorSource({
                features: new GeoJSON().readFeatures(fundort_meilensteine),
            }),
            zIndex: 200,
        });

        screenlayers.fundort_loecher = new VectorLayer({
            source: new VectorSource({
                features: new GeoJSON().readFeatures(fundort_loecher),
            }),
            zIndex: 200,
        });

        screenlayers.fundort_strasse = new VectorLayer({
            source: new VectorSource({
                features: new GeoJSON().readFeatures(fundort_strasse),
            }),
            zIndex: 100,
        });

        screenlayers.fundort_schotterentnahmen = new VectorLayer({
            source: new VectorSource({
                features: new GeoJSON().readFeatures(fundort_schotterentnahmen),
            }),
            zIndex: 90,
        });

        // Umgebung
        screenlayers.umgebung_schotterentnahmen = new VectorLayer({
            source: new VectorSource({
                features: new GeoJSON().readFeatures(
                    umgebung_schotterentnahmen
                ),
            }),
            zIndex: 90,
        });

        screenlayers.umgebung_strasse = new VectorLayer({
            source: new VectorSource({
                features: new GeoJSON().readFeatures(umgebung_strasse),
            }),
            zIndex: 90,
        });

        // Kontext
        screenlayers.kastelle = new VectorLayer({
            source: new VectorSource({
                features: new GeoJSON().readFeatures(kastelle),
            }),
            zIndex: 110,
        });

        screenlayers.wachposten = new VectorLayer({
            source: new VectorSource({
                features: new GeoJSON().readFeatures(wachposten),
            }),
            zIndex: 110,
        });

        screenlayers.staedte = new VectorLayer({
            source: new VectorSource({
                features: new GeoJSON().readFeatures(staedte),
            }),
            zIndex: 110,
        });

        screenlayers.meilensteine = new VectorLayer({
            source: new VectorSource({
                features: new GeoJSON().readFeatures(meilensteine),
            }),
            zIndex: 110,
        });

        screenMap.addLayer(backgroundLayers.basemapOrthofoto);
        screenMap.addLayer(backgroundLayers.ortho2017);

        screenMap.addLayer(screenlayers.fundort_meilensteine);
        screenMap.addLayer(screenlayers.fundort_loecher);
        screenMap.addLayer(screenlayers.fundort_schotterentnahmen);
        screenMap.addLayer(screenlayers.fundort_strasse);
        screenMap.addLayer(screenlayers.umgebung_schotterentnahmen);
        screenMap.addLayer(screenlayers.umgebung_strasse);
        screenMap.addLayer(screenlayers.kastelle);
        screenMap.addLayer(screenlayers.wachposten);
        screenMap.addLayer(screenlayers.staedte);
        screenMap.addLayer(screenlayers.meilensteine);

        resetLayersStyles();
    });

document.querySelectorAll("oag-screen-content-layer-item").forEach((el) => {
    el.addEventListener("showLayer", (event) =>
        setScreenLayerVisibilityBySlug(event.detail, true)
    );
    el.addEventListener("hideLayer", (event) =>
        setScreenLayerVisibilityBySlug(event.detail, false)
    );
    el.addEventListener(
        "highlightLayer",
        (event) => highlightInScreenMap(event.detail),
        false
    );
});

document.querySelectorAll("oag-screen-background-layer-item").forEach((el) => {
    el.addEventListener("click", (event) => {
        const slug = event.srcElement.getAttribute("slug");

        document
            .querySelectorAll("oag-screen-background-layer-item")
            .forEach((e) => e.setAttribute("active", "false"));
        event.srcElement.setAttribute("active", "true");

        if (slug == "basemap-orthophoto") {
            backgroundLayers.basemapOrthofoto.setVisible(true);
            backgroundLayers.ortho2017.setVisible(false);
        }
        if (slug == "bev-2017") {
            backgroundLayers.basemapOrthofoto.setVisible(true);
            backgroundLayers.ortho2017.setVisible(true);
        }
    });
});

function setScreenLayerVisibilityBySlug(slug, visible) {
    const layer = getScreenLayerBySlug(slug);
    layer.setVisible(visible);
}

function getScreenLayerBySlug(slug) {
    switch (slug) {
        case "fundort-meilensteine":
            return screenlayers.fundort_meilensteine;
        case "fundort-loecher":
            return screenlayers.fundort_loecher;
        case "fundort-schotterentnahmen":
            return screenlayers.fundort_schotterentnahmen;
        case "fundort-referenzlinien":
            return screenlayers.fundort_referenzlinien;
        case "fundort-strasse":
            return screenlayers.fundort_strasse;
        case "umgebung-strasse":
            return screenlayers.umgebung_strasse;
        case "umgebung-schotterentnahmen":
            return screenlayers.umgebung_schotterentnahmen;
        case "kastelle":
            return screenlayers.kastelle;
        case "wachposten":
            return screenlayers.wachposten;
        case "staedte":
            return screenlayers.staedte;
        case "meilensteine":
            return screenlayers.meilensteine;
    }
}

function highlightInScreenMap(slug) {
    const duration = 2000;
    const maxZoom = 23;

    const view = screenMap.getView();
    const layer = getScreenLayerBySlug(slug);
    const features = layer.getSource().getFeatures();

    const extent = createEmpty();
    features.forEach(function (feature) {
        extendExtent(extent, feature.getGeometry().getExtent());
    });

    const resolution = view.getResolutionForExtent(extent);
    const center = getCenter(extent);
    const zoom =
        view.getZoomForResolution(resolution) < maxZoom
            ? view.getZoomForResolution(resolution)
            : maxZoom;

    view.animate({
        center: center,
        duration: duration / 2,
        easing: easeOut,
    });

    view.animate({
        zoom: zoom - 0.5,
        duration: duration / 2,
        easing: easeOut,
    });

    resetLayersStyles();

    layer.setZIndex(200);
    switch (slug) {
        case "fundort-meilensteine":
            layer.setStyle((feature) =>
                FundortMeilensteineStyle(feature.getProperties().title, true)
            );
            break;
        case "fundort-loecher":
            layer.setStyle((feature) =>
                FundortPfahlloecherStyle(feature.getProperties().title, true)
            );
            break;
        case "fundort-strasse":
            layer.setStyle((feature) =>
                FundortStrasseStyle(feature.getProperties().title, true)
            );
            break;
        case "fundort-schotterentnahmen":
            layer.setStyle((feature) =>
                SchotterentnahmenStyle(feature.getProperties().title, true)
            );
            break;
        case "umgebung-schotterentnahmen":
            layer.setStyle((feature) =>
                SchotterentnahmenStyle(feature.getProperties().title, true)
            );
            break;
        case "umgebung-strasse":
            layer.setStyle((feature) =>
                StrassenVerlaufStyle(feature.getProperties().title, true)
            );
            break;
        case "kastelle":
            layer.setStyle((feature) =>
                KastellStyle(feature.getProperties().title, true)
            );
            break;
        case "wachposten":
            layer.setStyle((feature) =>
                WachtpostenStyle(feature.getProperties().title, true)
            );
            break;
        case "meilensteine":
            layer.setStyle((feature) =>
                MeilensteinOrteStyle(feature.getProperties().title, true)
            );
            break;
    }
}

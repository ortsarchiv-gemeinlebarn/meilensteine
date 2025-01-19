/**
 * Preloading
 */

const application = document.getElementById("application");
const preloadTracker = {
    application: false,
    hero: false,
};

const preloadHandler = () => {
    if (preloadTracker.application && preloadTracker.hero)
        document.body.classList.add("loaded");
};

application?.addEventListener("loaded", () => {
    console.log("[OAG Meilensteine]", "Application loaded");
    preloadTracker.application = true;
    preloadHandler();
});

const heroPreload = new Image();
heroPreload.src =
    "https://data.ortsarchiv-gemeinlebarn.org/meilensteine/fotos/ausgrabung/Meilensteine-Fotos-033-gat.jpeg";
heroPreload.addEventListener("load", () => {
    console.log("[OAG Meilensteine]", "Hero Image loaded");
    preloadTracker.hero = true;
    preloadHandler();
});

/**
 * Proj4
 */

import proj4 from "proj4";
proj4.defs(
    "EPSG:31259",
    "+proj=tmerc +lat_0=0 +lon_0=16.3333333333333 +k=1 +x_0=750000 +y_0=-5000000 +ellps=bessel +towgs84=577.326,90.129,463.919,5.137,1.474,5.297,2.4232 +units=m +no_defs +type=crs"
);

/**
 * Components
 */

import { defineCustomElements } from "@ortsarchiv-gemeinlebarn/components/dist/components/index.js";
defineCustomElements();

window.openCockpit = () =>
    document
        .getElementsByTagName("oag-cockpit")[0]
        .setAttribute("visible", "true");
window.openScreenMap = () =>
    document
        .getElementsByTagName("oag-screen-map")[0]
        .setAttribute("visible", "true");

import "./map-besiedelung";
import "./map-fundort";
import "./map-screen";
import "./map-strasse";

import { Tile as TileLayer } from "ol/layer";
import { XYZ } from "ol/source";

const OrthofotoBasemap = new TileLayer({
    source: new XYZ({
        url: "https://mapsneu.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",
    }),
    zIndex: 29,
});

const OrthofotoBev2017250 = new TileLayer({
    source: new XYZ({
        url: "https://gis{1-4}.ortsarchiv-gemeinlebarn.org/orthophoto/bev-2017250/epsg3857/{z}/{x}/{y}.png",
        tileSize: 512,
    }),
    zIndex: 30,
});

export { OrthofotoBasemap, OrthofotoBev2017250 };

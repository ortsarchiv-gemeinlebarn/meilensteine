
import { Vector as VectorSource, XYZ } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Tile as TileLayer } from 'ol/layer';
import { GeoJSON } from 'ol/format';
import { Circle as CircleStyle, Stroke, Fill, Style } from 'ol/style';

import * as fundort_meilensteine from '../data/fundort/meilensteine_3857.json';
import * as fundort_loecher from '../data/fundort/loecher_3857.json';

const OrthofotoBasemap = new TileLayer({
    source: new XYZ({
        url: 'https://mapsneu.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg'
    }),
    zIndex: 29
});

const OrthofotoBev2017250 = new TileLayer({
    source: new XYZ({
        url: 'https://gis{1-4}.ortsarchiv-gemeinlebarn.org/orthophoto/bev-2017250/epsg3857/{z}/{x}/{y}.png',
        tileSize: 512,
    }),
    zIndex: 30,
});

export { OrthofotoBasemap, OrthofotoBev2017250 };

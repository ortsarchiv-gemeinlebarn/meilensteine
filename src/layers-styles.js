
import { Stroke, Fill, Style, Text, Icon, Circle as CircleStyle } from 'ol/style';

import * as watchtowerIcon from '../icons/watchtower.png';
import * as fortIcon from '../icons/fort.png';
import * as milestoneIcon from '../icons/milestone.png';
import * as cityIcon from '../icons/city.png';

const FundortPfahlloecherColors = {
    full: [240, 184, 110, 1],
    transparent: [240, 184, 110, 0.7],
    contrast: [0, 0, 0, 1]
};

const FundortMeilensteineColors = {
    full: [237, 123, 123, 1],
    transparent: [237, 123, 123, 0.7],
    contrast: [0, 0, 0, 1]
};

const FundortStrasseColors = {
    full: [135, 203, 185, 1],
    transparent: [135, 203, 185, 0.7],
    contrast: [0, 0, 0, 1]
};

const StrassenVerlaufColors = {
    full: [87, 125, 134, 1],
    transparent: [87, 125, 134, 0.7],
    contrast: [0, 0, 0, 1]
};

const SchotterentnahmenColors = {
    full: [235, 231, 108, 0.8],
    transparent: [235, 231, 108, 0.3],
    contrast: [0, 0, 0, 1]
};

const KastellColors = {
    full: [53, 21, 93, 1],
    transparent: [53, 21, 93, 0.7],
    contrast: [255, 255, 255, 1]
};

const WachtpostenColors = {
    full: [81, 43, 129, 1],
    transparent: [81, 43, 129, 0.7],
    contrast: [255, 255, 255, 1]
};

const MeilensteinOrteColors = {
    full: [68, 119, 206, 1],
    transparent: [68, 119, 206, 0.7],
    contrast: [255, 255, 255, 1]
};

const StaedteColors = {
    full: [140, 171, 255, 1],
    transparent: [140, 171, 255, 0.7],
    contrast: [0, 0, 0, 1]
};

const FundortMeilensteineStyle = (label, highlight) => PolygoneStyle(label, highlight, FundortMeilensteineColors);
const FundortPfahlloecherStyle = (label, highlight) => PolygoneStyle(label, highlight, FundortPfahlloecherColors);
const FundortStrasseStyle = (label, highlight) => LineStyle(label, highlight, FundortStrasseColors);
const SchotterentnahmenStyle = (label, highlight) => PolygoneStyle(label, highlight, SchotterentnahmenColors);
const StrassenVerlaufStyle = (label, highlight) => LineStyle(label, highlight, StrassenVerlaufColors);
const KastellStyle = (label, highlight) => ContextPointStyle(label, highlight, KastellColors, fortIcon);
const WachtpostenStyle = (label, highlight) => ContextPointStyle(label, highlight, WachtpostenColors, watchtowerIcon);
const MeilensteinOrteStyle = (label, highlight) => ContextPointStyle(label, highlight, MeilensteinOrteColors, milestoneIcon);
const StaedteStyle = (label, highlight) => ContextPointStyle(label, highlight, StaedteColors, cityIcon);

const ContextPointStyle = (label, highlight, colorScheme, icon) => [
    new Style({
        zIndex: 0,
        image: new CircleStyle({
            radius: highlight ? 18 : 12,
            fill: new Fill({
                color: highlight ? colorScheme.full : colorScheme.transparent,
            }),
            stroke: new Stroke({
                color: colorScheme.full,
                width: highlight ? 2 : 1,
            })
        }),
    }),
    new Style({
        zIndex: 10,
        text: new Text({
            textAlign: "center",
            textBaseline: "middle",
            font: highlight ? "bold 12px / 1 Verdana" : "normal 10px / 1 Verdana",
            text: label,
            fill: new Fill({ color: colorScheme.contrast }),
            stroke: new Stroke({ color: colorScheme.full, width: 8 }),
            offsetX: '0',
            offsetY: '-25'
        })
    }),
    new Style({
        zIndex: 5,
        image: new Icon({
            src: icon,
            width: highlight ? 28 : 18,
            height: highlight ? 28 : 18,
            offset: [0, 0],
            opacity: 1
        })
    })
];

const PolygoneStyle = (label, highlight, colorScheme) => [
    new Style({
        stroke: new Stroke({
            color: colorScheme.full,
            width: highlight ? 3 : 1
        }),
        fill: new Fill({
            color: highlight ? colorScheme.full : colorScheme.transparent
        })
    }),
    new Style({
        zIndex: 10,
        text: new Text({
            textAlign: "center",
            textBaseline: "middle",
            font: highlight ? "bold 12px / 1 Verdana" : "normal 10px / 1 Verdana",
            text: label,
            fill: new Fill({ color: colorScheme.contrast }),
            stroke: new Stroke({ color: colorScheme.full, width: 8 }),
            offsetX: '0',
            offsetY: '-25'
        })
    })
];

const LineStyle = (label, highlight, colorScheme) => [
    new Style({
        stroke: new Stroke({
            color: colorScheme.full,
            width: highlight ? 8 : 4,
            zIndex: 1
        })
    }),
    new Style({
        stroke: new Stroke({
            color: colorScheme.transparent,
            width: highlight ? 6 : 3,
            zIndex: 2
        })
    }),
    new Style({
        zIndex: 10,
        text: new Text({
            textAlign: "center",
            textBaseline: "middle",
            font: highlight ? "bold 12px / 1 Verdana" : "normal 10px / 1 Verdana",
            text: label,
            fill: new Fill({ color: colorScheme.contrast }),
            stroke: new Stroke({ color: colorScheme.full, width: 8 }),
            offsetX: '0',
            offsetY: '-25'
        })
    })
];

export {
    FundortPfahlloecherColors,
    FundortMeilensteineColors,
    FundortStrasseColors,
    StrassenVerlaufColors,
    SchotterentnahmenColors,
    KastellColors,
    WachtpostenColors,
    MeilensteinOrteColors,
    StaedteColors
};

export {
    KastellStyle,
    WachtpostenStyle,
    MeilensteinOrteStyle,
    StaedteStyle,
    SchotterentnahmenStyle,
    FundortMeilensteineStyle,
    FundortPfahlloecherStyle,
    FundortStrasseStyle,
    StrassenVerlaufStyle
};

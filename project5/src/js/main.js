import { loadJson } from './LoadFile.js';
import { PaintMap } from './PaintMap.js';
import { ConfirmedCaseByCountry } from './ConfirmedCaseByCountry.js';
import { Slider } from './Slider.js';



const covidFileName = "./data/owid-covid-data.json";
const geoFileName = "./data/countries.geojson";


async function main(){

    // make paintMap
    const geoFeature = await loadJson(geoFileName);
    const covidData = await loadJson(covidFileName);
    const confirmedCaseByCountry = new ConfirmedCaseByCountry(covidData);

    const paintMap = new PaintMap(geoFeature, confirmedCaseByCountry);

    // make slider
    const dateList = confirmedCaseByCountry.getDateList();
    const changeColor = (date) => {
        paintMap.changeColorLayer(date);
    }
    const slider = new Slider(dateList, changeColor);
}

main();


/* PaintMap.js: map을 그리고 색을 변경 */

export class PaintMap{
    constructor(geoFeature, confirmedCaseByCountry){
        this.map = L.map('mapid').setView([51.505, -0.09], 13);
        this.geoFeature = geoFeature;
        this.confirmedCaseByCountry = confirmedCaseByCountry;
        this.makeBackgroundMap();
        this.makeColorLayer();
        this.addEvent();
    }

    makeBackgroundMap(){
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 7,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            	'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/light-v9',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(this.map);
    }

    makeColorLayer(){
        this.layer = L.geoJson(this.geoFeature, {
            style : (feature) => {
                const countryCode = feature.properties.ISO_A3;
                const level = 0;
                return {
                    description: countryCode,
                    fillColor: `var( --step-${level} )`,
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
            };
        }}).addTo(this.map);
    }

    changeColorLayer(date){
        this.layer.eachLayer((layer) => {
            const countryCode = layer.feature.properties.ISO_A3;
            const level = this.confirmedCaseByCountry.getLevel(countryCode, date);
            layer.setStyle({
                fillColor: `var( --step-${level} )`,
            })
        })
    }

    
    
    makeLegend(){
        const legend = L.control({position: 'bottomright'});

        legend.onAdd = function(map) {
            var div = L.DomUtil.create('div', 'info legend'),
                grades = confirmedCaseByCountry.getLevel(),
                labels = [];

            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }
            return div;
        };

        legend.addTo(map);
    }


    addEvent(){
        this.layer.eachLayer((layer) => {
            layer.on('mouseover', this.highlightFeature);
            layer.on('mouseout', this.resetHighlight);
        })
    }

    highlightFeature(){
        this.setStyle({
            weight: 5,
            color: 'gray',
            dashArray: '',
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            this.bringToFront();
        }
    }

    resetHighlight() {
        this.setStyle({
            weight: 2,
            color: 'white',
            dashArray: '3',
        })
    }
}
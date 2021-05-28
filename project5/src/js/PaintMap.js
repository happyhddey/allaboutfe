/* PaintMap.js: map을 그리고 색을 변경 */

export class PaintMap{
    constructor(geoFeature, confirmedCaseByCountry){
        this.map = L.map('mapid').setView([35.5936, 129.352], 8);
        this.geoFeature = geoFeature;
        this.confirmedCaseByCountry = confirmedCaseByCountry;
        this.makeBackgroundMap();
        this.makeColorLayer();
        const latestDate = this.confirmedCaseByCountry.getLatestDate();
        this.changeColorLayer(latestDate);
        this.makeLegend();
        this.addEvent();
    }

    makeBackgroundMap(){
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 9,
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


        this.info = L.control();
        this.info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'date'); // create a div with a class "info"
            this.update();
            return this._div;
        };
        this.info.update = function (date) {
            this._div.innerHTML = "DATE: " + date;
        };
        this.info.addTo(this.map);
    }

    changeColorLayer(date){
        this.info.update(date);

        this.layer.eachLayer((layer) => {
            const countryCode = layer.feature.properties.ISO_A3;
            const level = this.confirmedCaseByCountry.getLevel(countryCode, date);
            layer.setStyle({
                fillColor: `var( --step-${level} )`,
            })

            const countryFullName = layer.feature.properties.ADMIN;
            const tooltipMsg = '<b>' + countryFullName + '</b><br />'
                + 'Confirmed: ' + this.confirmedCaseByCountry.getNumConfirmedCase(countryCode, date);
            layer.bindTooltip(tooltipMsg);
        })
    }

    
    makeLegend(){
        const legend = L.control({position: 'bottomright'});

        const that = this;
        legend.onAdd = function(map) {
            const $div = L.DomUtil.create('div', 'info legend'),
                grades = that.confirmedCaseByCountry.getLevelList(),
                labels = [];

            for (let i = 0; i < grades.length; i++) {
                const grade_i = grades[i] < 1000 ? grades[i] + "k" : grades[i] / 1000 + "m";
                const grade_i_1 = grades[i+1] < 1000 ? grades[i+1] + "k" : grades[i+1] / 1000 + "m";
                $div.innerHTML +=
                    '<i style="background:' + `var( --step-${i+1} )` + '"></i> ' +
                    (grades[i] ? grade_i : grades[i]) + (grades[i + 1] ? '&ndash;' + grade_i_1 + '<br>' : '+<br>');
            }
            return $div;
        };

        legend.addTo(this.map);
    }

    addEvent(){
        this.layer.eachLayer((layer) => {
            layer.on('mouseover', this.highlightFeature);
            layer.on('mouseout', this.resetHighlight);
            layer.on('mousemove', this.moveHighlight);
        })
    }

    highlightFeature(e){
        this.setStyle({
            weight: 5,
            color: 'gray',
            dashArray: '',
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            this.bringToFront();
        }
        this.openTooltip(e.latlng);
    }

    resetHighlight() {
        this.setStyle({
            weight: 2,
            color: 'white',
            dashArray: '3',
        })
    }

    moveHighlight(e){
        this.openTooltip(e.latlng);
    }
}
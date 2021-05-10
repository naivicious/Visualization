var lat = document.getElementById("mydiv").innerHTML;
var lng = document.getElementById("mydiv2").innerHTML;
var option = document.getElementById("mydiv3").innerHTML;
var foodty = document.getElementById("mydiv4").innerHTML;

$("#option").val(option);
$("#food").val(foodty);


var defaultIcon = L.icon({
    iconUrl: '{{ url_for('static', filename ='restaurant.svg') }}',
    iconSize: [30, 30],
    iconArchor: [15, 15],

})
var nearIcon = L.icon({
    iconUrl: '{{ url_for('static', filename ='near.svg') }}',
    iconSize: [30, 30],
    iconArchor: [15, 15],

})
var userIcon = L.icon({
    iconUrl: '{{ url_for('static', filename ='user.svg') }}',
    iconSize: [30, 30],
    iconArchor: [15, 15],

})
var deliveryicon = L.icon({
    iconUrl: '{{ url_for('static', filename ='delivery.svg') }}',
    iconSize: [32, 37],
    iconArchor: [16, 37]

})
var takeouticon = L.icon({
    iconUrl: '{{ url_for('static', filename ='takeout.svg') }}',
    iconSize: [32, 37],
    iconArchor: [16, 37]

})
var recommendicon = L.icon({
    iconUrl: '{{ url_for('static', filename ='recommend.svg') }}',
    iconSize: [32, 37],
    iconArchor: [16, 37]

})


var layers = [];
var restaurant = L.layerGroup();

var layers2 = [];
var delivery = L.layerGroup();

var layers3 = [];
var takeout = L.layerGroup();


get_m1_data();
get_m2_data();
get_m3_data();

var base = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
    maxZoom: 20, bounds: L.latLngBounds([39.3682, -75.9374], [42.0329, -71.7187]),
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});
var dark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});


var mymap = L.map('mapid', {
    center: [40.7636, -73.98653],
    zoom: 10,
    layers: [base, restaurant]
});

var baseLayers = {
    "Normal": base,
    "Dark": dark
}

var overlays = {
    "Restaurant": restaurant,
    "Delivery": delivery,
    "Takeout": takeout
}

var labelLayer = L.tileLayer('https://maps{s}.nyc.gov/xyz/1.0.0/carto/label/{z}/{x}/{y}.png8', {
    minNativeZoom: 8,
    maxNativeZoom: 19,
    subdomains: '1234',
    bounds: L.latLngBounds([40.0341, -74.2727], [41.2919, -71.9101])
});

mymap.addLayer(labelLayer);


var distribution_layer;

function dis() {
    $.getJSON("{{ url_for('static', filename ='newyork.json') }}", function (data) {
        distribution_layer = L.geoJson(data, {
            style: function (feature) {
                var borough = feature.properties.borough;
                var count = parseInt(feature.properties.count);
                var fillcolor;

                if (borough == 'Bronx') {
                    if (count == 0)
                        fillcolor = '#FFE4E1';
                    else if (count >= 10)
                        fillcolor = '#C71585';
                    else if (count >= 6 && count < 10)
                        fillcolor = '#FF1493';
                    else if (count >= 3 && count < 6)
                        fillcolor = '#FF69B4';
                    else if (count >= 2 && count < 3)
                        fillcolor = '#D87093';
                    else if (count == 1)
                        fillcolor = '#FFC0CB';
                } else if (borough == 'Queens') {
                    if (count == 0)
                        fillcolor = '#E6E6FA';
                    else if (count >= 10)
                        fillcolor = '#4B0082';
                    else if (count >= 6 && count < 10)
                        fillcolor = '#8B008B';
                    else if (count >= 3 && count < 6)
                        fillcolor = '#9400D3';
                    else if (count >= 2 && count < 3)
                        fillcolor = '#9370DB';
                    else if (count == 1)
                        fillcolor = '#DDA0DD';
                } else if (borough == 'Staten Island') {
                    if (count == 0)
                        fillcolor = '#ADD8E6';
                    else if (count >= 10)
                        fillcolor = '#000080';
                    else if (count >= 6 && count < 10)
                        fillcolor = '#483D8B';
                    else if (count >= 3 && count < 6)
                        fillcolor = '#4169E1';
                    else if (count >= 2 && count < 3)
                        fillcolor = '#6495ED';
                    else if (count == 1)
                        fillcolor = '#87CEFA';
                } else if (borough == 'Brooklyn') {
                    if (count == 0)
                        fillcolor = '#F0FFF0';
                    else if (count >= 10)
                        fillcolor = '#2F4F4F';
                    else if (count >= 6 && count < 10)
                        fillcolor = '#228B22';
                    else if (count >= 3 && count < 6)
                        fillcolor = '#32CD32';
                    else if (count >= 2 && count < 3)
                        fillcolor = '#00FF7F';
                    else if (count == 1)
                        fillcolor = '#98F898';
                } else if (borough == 'Manhattan') {
                    if (count == 0)
                        fillcolor = '#F5F5DC';
                    else if (count >= 10)
                        fillcolor = '#B8860B';
                    else if (count >= 6 && count < 10)
                        fillcolor = '#DAA520';
                    else if (count >= 3 && count < 6)
                        fillcolor = '#FFD700';
                    else if (count >= 2 && count < 3)
                        fillcolor = '#FFFF00';
                    else if (count == 1)
                        fillcolor = '#F0E68C';
                }

                return {color: "#999", weight: 1, fillColor: fillcolor, fillOpacity: .6};
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup("<strong>" + feature.properties.borough + "</strong><br/>" + feature.properties.neighborhood + "<br/>" + feature.properties.count + " hot restaurants")
            }


        }).addTo(mymap);


        var searchControl = new L.Control.Search({
            layer: distribution_layer,
            propertyName: 'neighborhood',
            marker: false,
            moveToLocation: function (latlng, title, map) {
                //map.fitBounds( latlng.layer.getBounds() );
                var zoom = mymap.getBoundsZoom(latlng.layer.getBounds());
                mymap.setView(latlng, zoom); // access the zoom
            }
        });

        searchControl.on('search:locationfound', function (e) {

            if (e.layer._popup)
                e.layer.openPopup();

        }).on('search:collapsed', function (e) {
            distribution_layer.eachLayer(function (layer) {	//restore feature color
                distribution_layer.resetStyle(layer);
            });
        });
        mymap.addControl(searchControl);

    });
}

dis();


L.easyButton('fa-globe', function (btn, map) {
    if (mymap.hasLayer(distribution_layer)) {
        mymap.removeLayer(distribution_layer);
    } else {
        distribution_layer.addTo(mymap)
    }

}).addTo(mymap);


var userlayer = [];
var usergroup = L.featureGroup(userlayer);

L.control.layers(baseLayers, overlays).addTo(mymap);

if (lat) {

    var userinput = L.marker([lat, lng], {icon: userIcon}).addTo(mymap);
    userinput.bindPopup("Your location!").openPopup();
    var options = {units: 'kilometers'};

    var from = turf.point([lat, lng]);
    var recommend = [];
    mymap.on('click', function (e) {

        layers.forEach(function (marker) {
                var to = turf.point([marker.getLatLng().lat, marker.getLatLng().lng]);
                var distance = turf.distance(from, to, options);

                if (distance < 2) {
                    if (foodty == 'Default')
                        recommend.push(marker);
                    else {
                        if (marker.food.indexOf(foodty) > 0) {
                            recommend.push(marker);
                        } else
                            mymap.removeLayer(marker);
                    }
                } else {
                    mymap.removeLayer(marker);
                }
            }
        )
        if (option == 'review') {
            recommend.sort(sortNum);
            recommend[0].setIcon(recommendicon);
            recommend[1].setIcon(recommendicon);
            recommend[2].setIcon(recommendicon);
            recommend[3].setIcon(recommendicon);
            recommend[4].setIcon(recommendicon);

            for (let i = 5; i < recommend.length; i++) {
                recommend[i].setOpacity(0);
            }


            mymap.setView(recommend[0].getLatLng(), 13);


        } else if (option == 'cost') {
            recommend.sort(sortCost);
            recommend[0].setIcon(recommendicon);
            recommend[1].setIcon(recommendicon);
            recommend[2].setIcon(recommendicon);
            recommend[3].setIcon(recommendicon);
            recommend[4].setIcon(recommendicon);

            for (let i = 5; i < recommend.length; i++) {
                recommend[i].setOpacity(0);
            }


            mymap.setView(recommend[0].getLatLng(), 13);
        } else if (option == 'rating') {
            recommend.sort(sortCost);
            recommend[0].setIcon(recommendicon);
            recommend[1].setIcon(recommendicon);
            recommend[2].setIcon(recommendicon);
            recommend[3].setIcon(recommendicon);
            recommend[4].setIcon(recommendicon);

            for (let i = 5; i < recommend.length; i++) {
                recommend[i].setOpacity(0);
            }


            mymap.setView(recommend[0].getLatLng(), 13);

        }

    })


}


var options = {units: 'kilometers'};
mymap.on('dblclick', function (e) {

    if (userlayer.length > 0) {
        userlayer.pop();
        mymap.removeLayer(usergroup);
    }

    var userlocation = L.marker([e.latlng.lat, e.latlng.lng], {icon: userIcon});
    userlayer.push(userlocation);
    usergroup = L.featureGroup(userlayer);
    usergroup.bindPopup("Your location!" + "</br>" +
        '<button onclick="clearMarker()">Clear Marker</button>').openPopup().addTo(mymap);

    var from = turf.point([e.latlng.lat, e.latlng.lng]);

    //
    layers.forEach(function (marker) {
        var to = turf.point([marker.getLatLng().lat, marker.getLatLng().lng]);
        var distance = turf.distance(from, to, options);

        if (distance < 1) {
            marker.setIcon(nearIcon);
        } else {
            marker.setIcon(defaultIcon);
        }

    })

    layers2.forEach(function (marker) {
        var to = turf.point([marker.getLatLng().lat, marker.getLatLng().lng]);
        var distance = turf.distance(from, to, options);

        if (distance < 1) {
            marker.setIcon(nearIcon);
        } else {
            marker.setIcon(deliveryicon);
        }

    })

    layers3.forEach(function (marker) {
        var to = turf.point([marker.getLatLng().lat, marker.getLatLng().lng]);
        var distance = turf.distance(from, to, options);

        if (distance < 1) {
            marker.setIcon(nearIcon);
        } else {
            marker.setIcon(takeouticon);
        }

    })

})

$('.checkbox').on('click', function () {
    if ($(this).hasClass('cb-default')) {
        $(this).removeClass('cb-default').addClass('cb-checked');
        get_m2_data();

    } else {
        $(this).removeClass('cb-checked').addClass('cb-default');
        layers.forEach(function (marker) {
            mymap.removeLayer(marker);
        })
        get_m1_data();

    }
});

function clearMarker() {
    userlayer.pop();
    mymap.removeLayer(usergroup);
    layers.forEach(function (marker) {
        marker.setIcon(defaultIcon);

    })
    layers2.forEach(function (marker) {
        marker.setIcon(deliveryicon);

    })
    layers3.forEach(function (marker) {
        marker.setIcon(takeouticon);

    })
}

function sortNum(a, b) {
    return b.nums * 1 - a.nums * 1
}

function sortCost(a, b) {
    if (a.costs * 1 == b.costs * 1)
        return b.nums * 1 - a.nums * 1
    else
        return a.costs * 1 - b.costs * 1

}

function sortRating(a, b) {
    if (a.points * 1 == b.points * 1)
        return b.nums * 1 - a.nums * 1
    else
        return b.points * 1 - a.points * 1
}

function process() {
    $.ajax({
        url: "/location",
        success: function (data) {


        },
        error: function (xhr, type, errorThrown) {

        }
    })
}



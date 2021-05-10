function get_m1_data() {
    $.ajax({
        url:"/m1",
        success: function(data) {

            for(i=0;i<data.shopname.length;i++){
                var img = data.img[i];


                var marker = L.marker([data.lat[i],data.lng[i]],{icon:defaultIcon,

                }).bindPopup(
                    "<img src = ' " + img + " '  height=\"100\" width=\"100\" style='vertical-align: middle;border-radius: 4px;' >" +
                    "<div style='vertical-align: top;display: table-cell;box-sizing: border-box;'>" +
                    "<div style='font-size: 14px;font-weight:bold;'>" + data.shopname[i] + "</div>" +
                    "<div style=''> " +  data.num[i] + '  ' +  data.star[i] + '  ' + data.cost[i] + "</div>" +
                    "<div>" +  data.food[i] +"</div>" +
                    "<div>" +  data.location[i] +"</div>" + data.service[i] +
                    "</div>" +
                    "<div>" +  data.time[i] +"</div>"

                ).addTo(restaurant);
                marker.nums = data.num[i];


                marker.points = data.star[i].split(" ")[0];

                if(data.cost[i] == 'Low')
                    marker.costs = 1;
                else if(data.cost[i] == 'Medium')
                    marker.costs = 2;
                else if(data.cost[i] == 'High')
                    marker.costs = 3;
                else if(data.cost[i] == 'Very High')
                    marker.costs = 4;
                else if(data.cost[i] == 'Unknown')
                    marker.costs = 5;

                marker.food = data.food[i];


                layers.push(marker);


     //

            }



		},
		error: function(xhr, type, errorThrown) {

		}
    })
}


function get_m2_data() {
    $.ajax({
        url:"/m2",
        success: function(data) {

            for(i=0;i<data.shopname.length;i++){
                var img = data.img[i];

                var marker = L.marker([data.lat[i],data.lng[i]],{icon:deliveryicon,


                }).bindPopup(
                    "<img src = ' " + img + " '  height=\"100\" width=\"100\" style='vertical-align: middle;border-radius: 4px;' >" +
                    "<div style='vertical-align: top;display: table-cell;box-sizing: border-box;'>" +
                    "<div style='font-size: 14px;font-weight:bold;'>" + data.shopname[i] + "</div>" +
                    "<div style=''> " +  data.num[i] +"</div>" +
                    "<div>" +  data.food[i] +"</div>" +
                    "<div>" + "location" +"</div>" +
                    "</div>"

                ).addTo(delivery);


                layers2.push(marker);


     //

            }



		},
		error: function(xhr, type, errorThrown) {

		}
    })
}


function get_m3_data() {
    $.ajax({
        url:"/m3",
        success: function(data) {

            for(i=0;i<data.shopname.length;i++){
                var img = data.img[i];

                var marker = L.marker([data.lat[i],data.lng[i]],{icon:takeouticon,


                }).bindPopup(
                    "<img src = ' " + img + " '  height=\"100\" width=\"100\" style='vertical-align: middle;border-radius: 4px;' >" +
                    "<div style='vertical-align: top;display: table-cell;box-sizing: border-box;'>" +
                    "<div style='font-size: 14px;font-weight:bold;'>" + data.shopname[i] + "</div>" +
                    "<div style=''> " +  data.num[i] +"</div>" +
                    "<div>" +  data.food[i] +"</div>" +
                    "<div>" + "location" +"</div>" +
                    "</div>"

                ).addTo(takeout);


                layers3.push(marker);


     //

            }



		},
		error: function(xhr, type, errorThrown) {

		}
    })
}


function get_t1_data() {
    $.ajax({
        url:"/t1",
        success: function(data) {
            t1_option.yAxis.data=data.name
            t1_option.series[0].data=data.value
            t1.setOption(t1_option)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
}

function get_t2_data() {
    $.ajax({
        url:"/t2",
        success: function(data) {
            t2_option.legend.data = data.name
            t2_option.series[0].data = data.raw
            t2_option.series[1].data = data.raw
            t2.setOption(t2_option,true)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
}

function get_t3_data() {
    $.ajax({
        url:"/t3",
        success: function(data) {
            t3_option.series[0].data = data.raw
            t3.setOption(t3_option,true)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
}

function get_t4_1_data() {
    $.ajax({
        url:"/t4_1",
        success: function(data) {
            t4_option.xAxis[0].data = data.name
            t4_option.series[5].data = data.value
            t4.setOption(t4_option,true)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
}

function get_t4_2_data() {
    $.ajax({
        url:"/t4_2",
        success: function(data) {
            t4_option.series[0].data = data.value
            t4.setOption(t4_option,true)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
}

function get_t4_3_data() {
    $.ajax({
        url:"/t4_3",
        success: function(data) {
            t4_option.series[1].data = data.value
            t4.setOption(t4_option,true)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
}

function get_t4_4_data() {
    $.ajax({
        url:"/t4_4",
        success: function(data) {
            t4_option.series[2].data = data.value
            t4.setOption(t4_option,true)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
}

function get_t4_5_data() {
    $.ajax({
        url:"/t4_5",
        success: function(data) {
            t4_option.series[3].data = data.value
            t4.setOption(t4_option,true)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
}

function get_t4_6_data() {
    $.ajax({
        url:"/t4_6",
        success: function(data) {
            t4_option.series[4].data = data.value
            t4.setOption(t4_option,true)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
}


function get_t5_data() {
    $.ajax({
        url:"/t5",
        success: function(data) {
            t5_option.legend.data = data.name
            t5_option.series[0].data = data.raw
            t5_option.series[1].data = data.raw
            t5.setOption(t5_option,true)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
}

function get_t6_1_data() {
    $.ajax({
        url:"/t6_1",
        success: function(data) {
            t6_option.series[0].data[0].value = data.value
            t6.setOption(t6_option,true)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
}

function get_t6_2_data() {
    $.ajax({
        url:"/t6_2",
        success: function(data) {
            t6_option.series[0].data[1].value = data.value
            t6.setOption(t6_option,true)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
}

function get_t6_3_data() {
    $.ajax({
        url:"/t6_3",
        success: function(data) {
            t6_option.series[0].data[2].value = data.value
            t6.setOption(t6_option,true)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
}

function get_t6_4_data() {
    $.ajax({
        url:"/t6_4",
        success: function(data) {
            t6_option.series[0].data[3].value = data.value
            t6.setOption(t6_option,true)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
}

function get_t6_5_data() {
    $.ajax({
        url:"/t6_5",
        success: function(data) {
            t6_option.series[0].data[4].value = data.value
            t6.setOption(t6_option,true)
		},
		error: function(xhr, type, errorThrown) {

		}
    })
}




 get_t1_data()
 get_t2_data()
get_t3_data()
get_t4_1_data()
get_t4_2_data()
get_t4_3_data()
get_t4_4_data()
get_t4_5_data()
get_t4_6_data()
get_t5_data()
get_t6_1_data()
get_t6_2_data()
get_t6_3_data()
get_t6_4_data()
get_t6_5_data()



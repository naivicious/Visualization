var t1 = echarts.init(document.getElementById('l1'), "dark");
var chartScreen = null;
t1_option = {
    title: {
	        text: 'Newyork hot restaurant',
	        textStyle: {
	        	 align: 'center',
	            color: '#fff',
	            fontSize: 20,
	        },
	        top: '3%',
	        left: '10%',
	    },
    backgroundColor: '#050d19',
    legend: {
        data: ["Review number"],
        top: "5%",
        right: '10',
        textStyle: {
            color: "rgba(250,250,250,0.6)",
            fontSize: 16
        }
    },
    barWidth: 15,
    xAxis: {
        type: 'value',
        splitLine: {
            lineStyle: {
                color: "rgba(255,255,255,0.2)"
            }
        },
        axisTick: {
            show: false
        },
        axisLine: { //  改变x轴颜色
            lineStyle: {
                color: '#26D9FF'
            }
        },
        axisLabel: { //  改变x轴字体颜色和大小
            textStyle: {
                color: "rgba(250,250,250,0.6)",
                fontSize: 16
            }
        }
    },
    yAxis: {
        type: 'category',
        inverse: true,
        data: [],
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLine: { //  改变y轴颜色
            lineStyle: {
                color: '#26D9FF'
            }
        },
        axisLabel: { //  改变y轴字体颜色和大小
            //formatter: '{value} m³ ', //  给y轴添加单位
            interval: 0,
            textStyle: {
                color: "rgba(250,250,250,0.6)",
                fontSize: 16
            }
        }
    },
    series: [{
            type: 'bar',
            name: "Review number",
            itemStyle: {
                normal: {
                    label: {
                        show: true, //开启显示
                        position: 'right', //在上方显示
                        textStyle: { //数值样式
                            color: "rgba(250,250,250,0.6)",
                            fontSize: 16,
                            fontWeight: 600
                        }
                    },
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: 'rgba(61,126,235,1)'
                    }, {
                        offset: 1,
                        color: 'rgba(61,126,235,0)'
                    }]),
                    borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: 'rgba(160,196,225,1)'
                    }, {
                        offset: 1,
                        color: 'rgba(61,126,235,1)'
                    }]),
                    borderWidth: 2
                }
            },
            data: []
        }
    ],

    toolbox: {// 工具栏
              itemSize:16,
              showTitle:false,
              right:24,
              feature: {
                  saveAsImage: {
                iconStyle: {
                    normal: {
                        color: '#FFFFFF'
                    }
                }
            },
                  myTool: {
                      show: true,
                      title: '全屏显示',
                      icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                      onclick: function (){
                          //生成全屏显示的图表
                         setFullScreenToolBox(t1_option);


                     }
                 }
             }
         },
};
t1.setOption(t1_option)

function setFullScreenToolBox(option) {
         if ($('#fullScreenMask').css('display') === 'block') {
             $('#fullScreenMask').hide();
             $('#fullScreen').hide();
             $('#m1').show();
             ChartScreen = null;
             return false;
         }

         $('#fullScreenMask').show();
         $('#fullScreen').show();
         $('#m1').hide();
         chartScreen = echarts.init(document.getElementById('fullScreen'));
         chartScreen.setOption(option);
         chartScreen.setOption({
             toolbox: {
                 feature: {
                     saveAsImage: {
                iconStyle: {
                    normal: {
                        color: '#FFFFFF'
                    }
                }
            },
                     myTool: {
                         title: '退出全屏',
                         icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891'
                     }
                 }
             }
         });

         return true;
    }

    window.onresize = function () {
         chartScreen.resize()
     }

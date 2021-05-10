var t6 = echarts.init(document.getElementById('r3'));
var chartScreen6 = null;
t6_option = {
    backgroundColor: '#050d19',//背景颜色
    color: ['#e43446', '#ebc017', '#43c798','#00FFFF' ,'#FF00FF' ],//数据蛛网线条的颜色，示例中为红黄绿
    title:{
        text:'Newyork hot restaurant star ratings',//统计图标题
        left:'center',
        top:'15',
        textStyle:{
            color:'#ccc'//统计图标题的文字颜色
        }
    },tooltip: {
	        show: true,
	        trigger: "item"
	    },
    legend: { //图例的设置
        show: true, //是否显示图例
        icon: 'circle',//图例形状，示例为原型
        bottom: 15,//图例离底部的距离
        itemWidth: 14, // 图例标记的图形宽度。
        itemHeight: 14, // 图例标记的图形高度。
        itemGap: 20, // 图例每项之间的间隔。
        textStyle: {//图例文字的样式设置
            fontSize: 14,
            color: '#ade3ff'
        },
        data: ['Manhattan','Brooklyn','Bronx','Queen','Staten Island'],//图例的名称数据
    },
    radar: [{//每个网格的指数名称，类似于X轴或Y轴上的数据的值大小
        indicator: [{
                text: '5 stars',
                max: 20
            },
            {
                text: '4.5 stars',
                max: 120
            },
            {
                text: '4 stars',
                max: 120
            },
            {
                text: '3.5 stars',
                max: 120
            },
            {
                text: '3 stars',
                max: 120
            },
            {
                text: '2.5 stars',
                max: 20
            }
        ],
        center: ['50%', '50%'],//统计图位置，示例是居中
        radius: '70%',//统计图大小
        startAngle: 90,//统计图起始的角度
        splitNumber: 3,//统计图蛛网的网格分段，示例分为三段
        // shape: 'circle',//蛛网是圆角还是尖角
        name: {
            formatter: '{value}',//蛛网轴尖的数据名称
            textStyle: {//蛛网轴尖的文字样式
                fontSize: 14, //外圈标签字体大小
                color: '#5b81cb' //外圈标签字体颜色
            }
        },
        splitArea: { // 蛛网在 grid 区域中的分隔区域，默认不显示。
            show: true,
            areaStyle: { // 分隔区域的样式设置。
                color: ['rgba(76, 140, 200, 0.05)', 'rgba(76, 140, 200, 0.1)'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
            }
        },
        axisLine: { //蛛网轴线上的颜色，由内向外发散的那条
            lineStyle: {
                color: '#153269'
            }
        },
        splitLine: {//蛛网环形的线条颜色
            lineStyle: {
                color: '#113865', // 分隔线颜色
                width: 1, // 分隔线线宽
            }
        }
    }, ],
    series: [{
        name: '',
        type: 'radar',//统计图专业名称为雷达图，这里叫做蛛网图
        itemStyle: {//数据样式设置
            emphasis: {//鼠标悬浮效果
                lineStyle: {
                    width: 4//线条粗细变成4
                }
            }
        },
        data: [{
            name: 'Manhattan',//数据名称
            value: [],
            areaStyle: {
                normal: { // 单项区域填充样式
                    color: {
                        x: 0, //右
                        y: 0, //下
                        x2: 1, //左
                        y2: 1, //上
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(228,52,70,0.5)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(0,0,0,0)'
                        }, {
                            offset: 1,
                            color: 'rgba(228,52,70,0.5)'
                        }],
                    },
                    opacity: 1 // 区域透明度
                }
            },
            symbolSize: 2.5, // 单个数据标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
            label: { // 单个拐点文本的样式设置
                normal: { // 单个拐点文本的样式设置。[ default: false ]
                    position: 'top', // 标签的位置。[ default: top ]
                    distance: 4, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。[ default: 5 ]
                    color: '#ccc', // 文字的颜色。如果设置为 'auto'，则为视觉映射得到的颜色，如系列色。[ default: "#fff" ]
                    fontSize: 14, // 文字的字体大小
                },
                emphasis: {
                    show: true,
                    formatter: '{c}'//显示分析的数字值，a为统计图名称，b为学生姓名,c为学生这项能力的值
                }
            },
            itemStyle: {
                normal: { //图形悬浮效果
                    borderColor: '#ccc',//单个数据标记描边的颜色
                    borderWidth: 2.5//单个数据标记描边的大小
                }
            },
        }, {
            name: 'Brooklyn',
            value: [],
            symbolSize: 2.5,
            itemStyle: {
                normal: {
                    borderColor: '#ccc',
                    borderWidth: 2.5,
                }
            },
            areaStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(235,192,23,0.5)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(0,0,0,0)'
                        }, {
                            offset: 1,
                            color: 'rgba(235,192,23,0.5)'
                        }],
                    },
                    opacity: 1
                }
            },
            label: {
                normal: {
                    position: 'top',
                    distance: 4,
                    color: '#ccc',
                    fontSize: 14,
                },
                emphasis: {
                    show: true,
                    formatter: '{c}'
                }
            },
        }, {
            name: 'Bronx',
            value: [],
            symbolSize: 2.5,
            itemStyle: {
                normal: {
                    borderColor: '#ccc',
                    borderWidth: 2.5,
                }
            },
            areaStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(67,199,152,0.5)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(0,0,0,0)'
                        }, {
                            offset: 1,
                            color: 'rgba(67,199,152,0.5)'
                        }],
                        globalCoord: false
                    },
                    opacity: 1
                }
            },
            label: {
                normal: {
                    position: 'top',
                    distance: 4,
                    color: '#ccc',
                    fontSize: 14,
                },
                emphasis: {
                    show: true,
                    formatter: '{c}'
                }
            },
        },{name: 'Queen',
            value: [],
            symbolSize: 2.5,
            itemStyle: {
                normal: {
                    borderColor: '#ccc',
                    borderWidth: 2.5,
                }
            },
            areaStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(67,99,52,0.5)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(0,0,0,0)'
                        }, {
                            offset: 1,
                            color: 'rgba(67,99,52,0.5)'
                        }],
                        globalCoord: false
                    },
                    opacity: 1
                }
            },
            label: {
                normal: {
                    position: 'top',
                    distance: 4,
                    color: '#ccc',
                    fontSize: 14,
                },
                emphasis: {
                    show: true,
                    formatter: '{c}'
                }
            },
        },{name: 'Staten Island',
            value: [],
            symbolSize: 2.5,
            itemStyle: {
                normal: {
                    borderColor: '#ccc',
                    borderWidth: 2.5,
                }
            },
            areaStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(67,199,152,0.5)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(0,0,0,0)'
                        }, {
                            offset: 1,
                            color: 'rgba(67,199,152,0.5)'
                        }],
                        globalCoord: false
                    },
                    opacity: 1
                }
            },
            label: {
                normal: {
                    position: 'top',
                    distance: 4,
                    color: '#ccc',
                    fontSize: 14,
                },
                emphasis: {
                    show: true,
                    formatter: '{c}'
                }
            },
        }



        ]
    }, ],
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
                         setFullScreenToolBox6(t6_option);


                     }
                 }
             }
         },
};
t6.setOption(t6_option)
function setFullScreenToolBox6(option) {
         if ($('#fullScreenMask').css('display') === 'block') {
             $('#fullScreenMask').hide();
             $('#fullScreen6').hide();
             $('#m1').show();
             chartScreen6 = null;
             return false;
         }

         $('#fullScreenMask').show();
         $('#fullScreen6').show();
         $('#m1').hide();
         chartScreen6 = echarts.init(document.getElementById('fullScreen6'));
         chartScreen6.setOption(option);
         chartScreen6.setOption({
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
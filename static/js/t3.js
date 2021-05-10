var t3 = echarts.init(document.getElementById('l3'));
var chartScreen3 = null;
t3_option = {
    backgroundColor: '#050d19',
    title: {
        text: 'New york restaurant review number and qulity',
        x: 'center',
        y: 0,
        textStyle:{
            color:'#fff',
            fontSize:16,
            fontWeight:'normal',
      }},
    visualMap: {
        min: 780,
        max: 12588,
        dimension: 1,
        left: 'right',
        top: 'top',
        text: ['HIGH', 'LOW'], // 文本，默认为数值文本
        calculable: true,
        itemWidth:18,
        itemHeight:160,
        textStyle: {
                color:'#3259B8',
                height: 56,
                fontSize:11,
                lineHeight:60,
            },
        inRange: {
            color: ['#3EACE5', '#F02FC2']
        },
        padding:[50, 20],
        orient:'horizontal',
    },
    grid: {
        left: '5%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    tooltip: {
        trigger: 'item',
        showDelay: 0,
        formatter: function(params) {
            if (params.value.length > 1) {
                return 'Quality: ' +
                    params.value[0] + ' star rating<br/> ' +'Review number: '+
                    params.value[1] ;
            } else {
                return params.seriesName + ' :<br/>' +
                    params.name + ' : ' +
                    params.value + ' CNY/㎡ ';
            }
        },
        axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
                type: 'dashed',
                width: 1
            }
        }
    },

xAxis: [{
        type: 'value',
        scale: true,
        axisLabel: {
            formatter: '{value} star rating'
        },
        nameTextStyle: {
            color: '#3259B8',
            fontSize: 14,
        },
        axisTick:{
            show:false,
        },
        axisLine: {
            lineStyle: {
                color: '#3259B8',
            }
        },
        splitLine: {
            show:false,
        }
    }],
    yAxis: [{
        type: 'value',
        scale: true,
        axisLabel: {
            formatter: '{value} '
        },
        nameTextStyle: {
            color: '#3259B8',
            fontSize: 14
        },
        axisTick:{
            show:false,
        },
        axisLine: {
            lineStyle: {
                color:'#3259B8',
            }
        },
        splitLine: {
            show:false,
        }
    }],
    series: [{
            name: 'price-area',
            type: 'scatter',
            data: [],
            symbolSize:8,


        },


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
                         setFullScreenToolBox3(t3_option);


                     }
                 }
             }
         },
};
t3.setOption(t3_option)
function setFullScreenToolBox3(option) {
         if ($('#fullScreenMask').css('display') === 'block') {
             $('#fullScreenMask').hide();
             $('#fullScreen3').hide();
             $('#m1').show();
             ChartScreen3 = null;
             return false;
         }

         $('#fullScreenMask').show();
         $('#fullScreen3').show();
         $('#m1').hide();
         chartScreen3 = echarts.init(document.getElementById('fullScreen3'));
         chartScreen3.setOption(option);
         chartScreen3.setOption({
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
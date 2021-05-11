var t5 = echarts.init(document.getElementById('r2'));
var chartScreen5 = null;
t5_option = {
    backgroundColor: '#050d19',
    title: {
        text: 'Newyork hot restaurant',
        subtext: 'top 500',
        x: 'center',
        y: 'center',
        textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#fff',
        }
    },
    tooltip: {
        show: true,
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'horizontal',
        bottom: '0%',
        data: []
    },
    series: [{
        type: 'pie',
        selectedMode: 'single',
        radius: ['25%', '58%'],
        color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],

        label: {
            normal: {
                position: 'inner',
                formatter: '{d}%',

                textStyle: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 14
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: []
    }, {
        type: 'pie',
        radius: ['58%', '83%'],
        itemStyle: {
            normal: {
                color: '#F2F2F2'
            },
            emphasis: {
                color: '#ADADAD'
            }
        },
        label: {
            normal: {
                position: 'inner',
                formatter: '{c}',
                textStyle: {
                    color: '#777777',
                    fontWeight: 'bold',
                    fontSize: 14
                }
            }
        },
        data: []
    }],
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
                         setFullScreenToolBox5(t5_option);


                     }
                 }
             }
         },
};
t5.setOption(t5_option)
function setFullScreenToolBox5(option) {
         if ($('#fullScreenMask').css('display') === 'block') {
             $('#fullScreenMask').hide();
             $('#fullScreen5').hide();
             $('#m1').show();
             chartScreen5 = null;
             return false;
         }

         $('#fullScreenMask').show();
         $('#fullScreen5').show();
         $('#m1').hide();
         chartScreen5 = echarts.init(document.getElementById('fullScreen5'));
         chartScreen5.setOption(option);
         chartScreen5.setOption({
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
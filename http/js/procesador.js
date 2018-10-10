function getCPU () {
	chartCPU = new Highcharts.StockChart({
    chart: {
        renderTo: 'cpu_usage', 
        defaultSeriesType: 'spline',
        events: {
            load: function() {
                // Cada vez que reciba un valor desde el socket, lo meto en la gráfica
                socket.on('cpuUsageUpdate', function (time, data) {
                    var series = chartCPU.series[0];
                    series.addPoint([time, data]);
                });
            }
        }
    },
    rangeSelector : {
        selected : 100
    },
    title: {
        text: 'CPU Load'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150,
        maxZoom: 20 * 1000
    },
    yAxis: {
        minPadding: 0.2,
        maxPadding: 0.2,
        title: {
            text: 'CPU Load (%)',
            margin: 10
        }
    },
    series: [{
        name: 'CPU Load',
        data: []
    }],
    credits: {
            enabled: false
    }
    });
}
function getTemp () {
	chart = new Highcharts.StockChart({
    chart: {
        renderTo: 'chart',
        defaultSeriesType: 'spline',
        events: {
            load: function() {
                // Cada vez que reciba un valor desde el socket, lo meto en la gráfica
                socket.on('temperatureUpdate', function (time, core1, core2) {
                        var series1 = chart.series[0];
                        series1.addPoint([time, core1]);
												var series2 = chart.series[1];
                        series2.addPoint([time, core2]);
                });
            }
        }
    },
    rangeSelector : {
        selected : 100
    },
    title: {
        text: 'CPU Temperature'
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
            text: 'Temperature ºC',
            margin: 10
        }
    },
    series: [{
        name: 'Core 1',
        data: []
    },
		{
				name: 'Core 2',
				data: []
		}],
    credits: {
            enabled: false
    }
    });
}

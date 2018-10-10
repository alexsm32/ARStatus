function getMem () {
	socket.on('memoryTotal', function (mem) {
        chartMem.setTitle({text:"Memory: " + mem + " KB"});
        memTotal = mem;
    });

	chartMem = new Highcharts.Chart({
        chart: {
            renderTo: 'chartMemory',
            type: 'bar',
            events: {
            load: function() {
                // Cada vez que reciba un valor desde el socket, lo meto en la gráfica
                socket.on('memoryUpdate', function (free, used, buffered, cached) {
                    chartMem.series[0].setData([{y: free, color: 'green'}, {y: used, color: 'red'}, {y: buffered, color: 'blue'}, {y: cached, color: 'orange'}]);
                  });
                }
              }
        },
        title: {
            text: 'Memory'
        },
        xAxis: {
            categories: ['Free', 'Used', 'Buffered', 'Cached'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: "Percentage",
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' %'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },            
        credits: {
            enabled: false
        },
        series: [{
            name: "Memory",
            data: [{y: 0, color: 'green'}, {y: 0, color: 'red'}, {y: 0, color: 'blue'}, {y: 0, color: 'orange'}]
        }]
    });
}
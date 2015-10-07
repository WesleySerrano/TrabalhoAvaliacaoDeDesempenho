/**
 * Created by Wesley on 01/10/2015.
 */
function onDistributionValueChanged()
{
    var distributionBox = document.getElementById("distrib");
    var distribution = distributionBox.options[distributionBox.selectedIndex].text;

    if(distribution === "Uniforme")
    {
        var valuesString = "";
        valuesString += "Min: <input id=\"uniformLow\" type=\"text\">";
        valuesString += " Max: <input id=\"uniformHigh\" type=\"text\">";
        document.getElementById("uniformValues").innerHTML = valuesString;
    }
    else
    {
        document.getElementById("uniformValues").innerHTML = "";
    }
}

function addResultTable(lambda, mu, personsOnQueue, meanServiceTime, meanPersonsOnSystem, meanWait, meanTimeOnSystem, utilisation)
{
  var result = "<table border='1'>";

    result+="<tr><td>&lambda;</td><td>"+lambda+"</td></tr>";
    result+="<tr><td>&mu;</td><td>"+mu+"</td></tr>";
    result+="<tr><td>Total de pessoas na fila</td><td>"+personsOnQueue+"</td></tr>";
    result+="<tr><td>Tempo m&eacutedio de servi&ccedilo</td><td>"+meanServiceTime+"</td></tr>";
    result+="<tr><td>M&eacutedia de pessoas na fila</td><td>"+meanPersonsOnSystem+"</td></tr>";
    result+="<tr><td>Tempo m&eacutedio de espera</td><td>"+meanWait+"</td></tr>";
    result+="<tr><td>Tempo m&eacutedio no sistema</td><td>"+meanTimeOnSystem+"</td></tr>";
    result+="<tr><td>Utiliza&ccedil&atildeo do sistema</td><td>"+(utilisation*100)+"%</td></tr>";

    result += "</table><br>";

    document.getElementById("results").innerHTML += result;
}

function chart(chartLabels, chartsData, xLabel)
{
    $('#container').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: '<b>Numero medio de pessoas na fila</b>'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            allowDecimals: false,
            categories: chartLabels,
            title: {
                text: '<b>'+xLabel+'</b>'
            },
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        yAxis: {
            title: {
                text: '<b>Media de pessoas na fila</b>'
            },
            labels: {
                formatter: function () {
                    return this.value ;
                }
            }
        },
        tooltip: {
            pointFormat: '<b>{series.name}: </b>{point.y}'
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Simulado',
            data: chartsData[0]
        }, {
            name: 'Analitico',
            data: chartsData[1]
        }]
    });
};

function addChart(chartLabels,chartsValues, xLabel)
{
    chart(chartLabels,chartsValues, xLabel);
}
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

function addResultTable(lambda, mu, personsServed, analyticMeanPersonsOnSystem, meanPersonsOnSystem, confidenceIntervalUpperLimit, confidenceIntervalLowerLimit, analyticUtilisation,personsOnSystemStandardDeviation)
{
  var result = "<table border='1'>";

    result+="<tr><td>&lambda;</td><td>"+lambda+"</td></tr>";
    result+="<tr><td>&mu;</td><td>"+mu+"</td></tr>";
    result+="<tr><td>Total de pessoas atendidas</td><td>"+personsServed+"</td></tr>";
    result+="<tr><td>M&eacutedia de pessoas na fila (Anal&iacute;tico)</td><td>"+analyticMeanPersonsOnSystem+"</td></tr>";
    result+="<tr><td>M&eacutedia de pessoas na fila (Simulado)</td><td>"+meanPersonsOnSystem+"</td></tr>";
    result+="<tr><td>Intervalo de Confian&ccedil;a (Limite Superior)</td><td>"+confidenceIntervalUpperLimit+"</td></tr>";
    result+="<tr><td>Intervalo de Confian&ccedil;a (Limite Inferior)</td><td>"+confidenceIntervalLowerLimit+"</td></tr>";
    result+="<tr><td>Desvio Padr&atildeo (Pessoas no sistema)</td><td>"+personsOnSystemStandardDeviation+"</td></tr>";
    result+="<tr><td>Utiliza&ccedil&atildeo do sistema (Anal&iacute;tico)</td><td>"+(analyticUtilisation*100)+"%</td></tr>";

    result += "</table><br>";

    document.getElementById("results").innerHTML += result;
}

function chart(chartLabels, chartsData, xLabel)
{
    $('#container').highcharts({
        title: {
            text: '<b>N\xFAmero m\xE9dio de pessoas na fila</b>'
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
                text: '<b>M\xE9dia de pessoas na fila</b>'
            },
            labels: {
                formatter: function () {
                    return this.value ;
                }
            }
        },
        tooltip: {
            pointFormat: '<b>{series.name}: </b>{point.y}<br>',
            crosshairs: true,
            shared: true
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
            },

        },
        series: [{
            name: 'Simulado',
            data: chartsData[0]
        }, {
            name: 'Anal\xEDtico',
            color: 'rgba(255, 0, 0, .5)',
            data: chartsData[1]
        }, {
            name: ' Inf Intervalo de confian\xE7a (95%)',
            dashStyle: 'shortdot',
            color: 'rgba(0, 0, 0, .5)',
            data: chartsData[2]
        }, {
            name: 'Sup Intervalo de confian\xE7a (95%)',
            dashStyle: 'shortdot',
            color: 'rgba(0, 0, 0, .5)',
            data: chartsData[3]
        }]
    });
}

function addChart(chartLabels,chartsValues, xLabel)
{
    chart(chartLabels,chartsValues, xLabel);
}
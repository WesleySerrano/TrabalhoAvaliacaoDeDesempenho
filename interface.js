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

function chart(chartLabels, chartsData)
{
    var lineChartData = {
        labels : chartLabels,
        datasets : [
            {
                label: "Número médio de clientes no sistema - Simulado",
                fillColor : "rgba(220,220,220,0.2)",
                strokeColor : "rgba(220,220,220,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(220,220,220,1)",
                data : chartsData[0]
            },
            {
                label: "Número médio de clientes no sistema -  Analítico",
                fillColor : "rgba(151,187,205,0.2)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(151,187,205,1)",
                data : chartsData[1]
            }
        ]

    }

    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx).Line(lineChartData, {
        responsive: true
    });
}

function addChart(chartLabels,chartsValues)
{
    var insertChartString = "<div style = \"width:30%\"> <div> <canvas id=\"canvas\" height=\"600\" width=\"800\"></canvas> </div> </div>";

    document.getElementById("chart").innerHTML = insertChartString;

    chart(chartLabels,chartsValues);
}
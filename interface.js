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

function chart()
{
    var lineChartData = {
        labels : ["January","February","March","April","May","June","July","August"],
        datasets : [
            {
                label: "My First dataset",
                fillColor : "rgba(220,220,220,0.2)",
                strokeColor : "rgba(220,220,220,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(220,220,220,1)",
                data : [1,2,3,4,5,6,7,8]
            },
            {
                label: "My Second dataset",
                fillColor : "rgba(151,187,205,0.2)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(151,187,205,1)",
                data : [8,7,6,5,4,3,2,1]
            }
        ]

    }

    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx).Line(lineChartData, {
        responsive: true
    });
}
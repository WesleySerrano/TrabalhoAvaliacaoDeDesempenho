/**
 * Created by Wesley on 04/10/2015.
 */

var chartLabels = [];
var chartsValues = [[],[]];

function queue()
{
    this.array = new Array();

    this.push = function(newElement)
    {
        this.array.push(newElement);
    }

    this.last = function()
    {
        return this.array[this.array.length-1];
    }

    this.numberOfPersonsOnQueue = function()
    {
        return this.array.length;
    }

    this.personsOnQueue = function()
    {
        return this.array;
    }
}

function queueArrival(_arrivalTime, _serviceStartTime, _serviceTimeLength)
{
    var arrival = {arrivalTime:0, serviceStartTime:0, serviceTimeLength:0, serviceEndTime: 0,  waitTime: 0};

    arrival.arrivalTime = _arrivalTime;
    arrival.serviceStartTime = _serviceStartTime;
    arrival.serviceTimeLength = _serviceTimeLength;
    arrival.serviceEndTime = _serviceStartTime + _serviceTimeLength;
    arrival.waitTime = _serviceStartTime - _arrivalTime;

    return arrival;
}

function littlesLaw(lambda, mu)
{
  var rho = lambda/mu;

    return rho/(1-rho);
}

function simulate()
{
    chartLabels = [];
    chartsValues = [[],[]];
    var parameters = document.forms[0];

    var lambda = Number(document.getElementById("lambda").value);
    var mu = Number(document.getElementById("mu").value);

    document.getElementById("results").innerHTML = "";

    if(parameters[0].checked)
    {
        for(;lambda <= 0.9; lambda += 0.05) runQueue(lambda,mu,true);
    }
    else if(parameters[1].checked)
    {
        for(;mu <= 10.0; mu += 0.5) runQueue(lambda,mu,false);
    }
}

function runQueue()
{
    var lambda, mu;
    var chartXLabel;

    if(arguments.length > 0)
    {
        lambda = arguments[0];
        mu = arguments[1];
        var varyingLambda = arguments[2];

        if(varyingLambda)
        {
            chartLabels.push(""+lambda);
            chartXLabel = "Lambda";
        }
        else
        {
            chartLabels.push(""+mu);
            chartXLabel = "u";
        }
    }

    var distributionBox = document.getElementById("distrib");
    var distribution = distributionBox.options[distributionBox.selectedIndex].text;
    var uniformLow,uniformHigh;
    if(distribution === "Uniforme")
    {
        uniformLow = Number(document.getElementById("uniformLow").value);
        uniformHigh = Number(document.getElementById("uniformHigh").value);
    }

    /*var p = Number(document.getElementById("p").value);
    * */
    var simulationTime = Number(document.getElementById("time").value);

    var randomNumbersGenerator = new Random();

    var currentTime = 0;

    var simulationQueue = new queue();
    var currentPersonsOnQueue = new Array();

    var arrivalTime = 0;
    var serviceStartTime = 0;
    var serviceTimeLength = 0;

    while(currentTime < simulationTime)
    {
        if (simulationQueue.numberOfPersonsOnQueue() === 0)
        {
            if(distribution === "Uniforme")
            {
                arrivalTime = randomNumbersGenerator.uniform(uniformLow,uniformHigh)
            }

            else if(distribution === "Exponencial")
            {
                arrivalTime = randomNumbersGenerator.exponential(lambda);
            }

            else if(distribution === "Determinístico")
            {
                arrivalTime = lambda;
            }

            serviceStartTime = arrivalTime;
            currentPersonsOnQueue.push(1);
        }
        else
        {
            if(distribution === "Uniforme")
            {
                arrivalTime += randomNumbersGenerator.uniform(uniformLow,uniformHigh)
            }

            else if(distribution === "Exponencial")
            {
                arrivalTime += randomNumbersGenerator.exponential(lambda);
            }

            else if(distribution === "Determinístico")
            {
                arrivalTime += lambda;
            }
            serviceStartTime=Math.max(arrivalTime,simulationQueue.last().serviceEndTime);

            var totalPersonsOnQueue = simulationQueue.personsOnQueue();
            var personsSoFar = 1;
            for(var i = 0; i < totalPersonsOnQueue.length; i++)
            {
                if(totalPersonsOnQueue[i].serviceEndTime > arrivalTime) personsSoFar++;
            }

            currentPersonsOnQueue.push(personsSoFar);
        }

        serviceTimeLength = randomNumbersGenerator.exponential(mu);

        simulationQueue.push(queueArrival(arrivalTime,serviceStartTime,serviceTimeLength));

        currentTime = arrivalTime;
    }

    var waitTimes = new Array();
    var serviceTimes = new Array();
    var timesOnSystem = new Array();

    var personsOnQueue = simulationQueue.personsOnQueue();

    for(var i = 0; i < personsOnQueue.length; i++)
    {
        waitTimes.push(personsOnQueue[i].waitTime);
        serviceTimes.push(personsOnQueue[i].serviceTimeLength);
        timesOnSystem.push(personsOnQueue[i].waitTime + personsOnQueue[i].serviceTimeLength);
    }

    var meanWait = 0;
    for(var i = 0; i < waitTimes.length; i++)
    {
        meanWait += (waitTimes[i]/waitTimes.length);
    }

    var meanTimeOnSystem = 0;
    for(var i = 0; i < timesOnSystem.length; i++)
    {
        meanTimeOnSystem += timesOnSystem[i]/timesOnSystem.length;
    }

    var meanServiceTime = 0;
    for(var i = 0; i < serviceTimes.length; i++)
    {
        meanServiceTime += serviceTimes[i]/serviceTimes.length;
    }

    var meanPersonsOnSystem = 0;
    for(var i = 0; i < currentPersonsOnQueue.length; i++)
    {
        meanPersonsOnSystem += currentPersonsOnQueue[i]/currentPersonsOnQueue.length;
    }

    var utilisation = lambda/mu;

    var result = "Total de pessoas na fila: "+ simulationQueue.numberOfPersonsOnQueue() + "<br>";
    result += "Tempo m&eacute;dio de na fila: "+ meanServiceTime + "<br>";
    result += "Numero m&eacutedio de pessoas na fila"+ meanPersonsOnSystem + "<br>";
    result += "Tempo m&eacute;dio de espera: "+ meanWait + "<br>";
    result += "Tempo m&eacute;dio no sistema: "+ meanTimeOnSystem + "<br>";
    result += "Utilisa&ccedil;&atilde;o : "+ utilisation + "<br>";

    chartsValues[0].push(meanPersonsOnSystem);
    if(distribution === "Uniforme")
    {
        chartsValues[1].push((uniformHigh+uniformLow)/2.0);
    }

    else if(distribution === "Exponencial")
    {
        chartsValues[1].push(littlesLaw(lambda,mu));
    }

    else if(distribution === "Determinístico")
    {
        chartsValues[1].push(lambda);
    }

    addResultTable(lambda,mu,simulationQueue.numberOfPersonsOnQueue(),meanServiceTime,meanPersonsOnSystem,meanWait,meanTimeOnSystem,utilisation);
    addChart(chartLabels,chartsValues,chartXLabel);
}

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

    this.pop = function()
    {
        var served = this.array[0];
        this.array.splice(0,1);
        return served;
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

    var lambda = Number(document.getElementById("lambda").value);
    var mu = Number(document.getElementById("mu").value);

    for(;lambda < 0.9; lambda += 0.05) runQueue(lambda,mu);
}

function runQueue()
{
    var lambda, mu;

    if(arguments.length > 0)
    {
        lambda = arguments[0];
        mu = arguments[1];
    }

    chartLabels.push(""+lambda);

    var p = Number(document.getElementById("p").value);
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
            arrivalTime = randomNumbersGenerator.exponential(lambda);
            serviceStartTime = arrivalTime;
            currentPersonsOnQueue.push(1);
        }
        else
        {
            arrivalTime+=randomNumbersGenerator.exponential(lambda);
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
        //document.getElementById("result").innerHTML = currentTime;
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

    var utilisation = (meanServiceTime*serviceTimes.length)/currentTime;

    var result = "Persons on Queue: "+ simulationQueue.numberOfPersonsOnQueue() + "<br>";
    result += "Mean service time: "+ meanServiceTime + "<br>";
    result += "Mean persons on system: "+ meanPersonsOnSystem + "<br>";
    result += "Mean wait time: "+ meanWait + "<br>";
    result += "Mean time on system: "+ meanTimeOnSystem + "<br>";
    result += "Utilisation : "+ utilisation + "<br>";

    chartsValues[0].push(meanPersonsOnSystem);
    chartsValues[1].push(littlesLaw(lambda,mu));

    document.getElementById("result").innerHTML = result;

    addChart(chartLabels,chartsValues);
}

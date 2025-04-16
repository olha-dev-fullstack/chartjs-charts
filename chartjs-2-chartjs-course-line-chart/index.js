var image = document.getElementById('source');
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      xAxisID: "un",
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August"],
        datasets: [{
            label: "My sales",
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderColor: 'blue',
            borderWidth: 2,
            borderDash: [10],
            borderDashOffset: 10,
            borderCapStyle: "square",
            borderJoinStyle: "bevel",
            //cubicInterpolationMode: "monotone",
            fill: 'start',
            //lineTension: 0.4,
            pointBackgroundColor: ["red","green","blue","yellow","pink","purple"],
            pointBorderColor: "pink",
            pointBorderWidth: 5,
            pointRadius: 0,
            //pointStyle: image,
            pointHitRadius: 20,
            pointHoverBackgroundColor: "purple",
            pointHoverBorderColor: "black",
            pointHoverBorderWidth: 5,
            pointHoverRadius: 10,
            showLine: true,
            spanGaps: true,
            steppedLine: false,
            data: [0, 20, 5, 2, 20, 30, 40, 20],
        },
        {
            label: "My Profits",
            backgroundColor: 'rgba(0, 99, 132, 1)',
            borderColor: 'blue',
            data: [0, 40, 5, 2, 20, 30, 40, 20],
        }]
    },

    // Configuration options go here
    options: {
        scales: {
            yAxes: [{
                stacked: true,
            }]
        }
    }
});
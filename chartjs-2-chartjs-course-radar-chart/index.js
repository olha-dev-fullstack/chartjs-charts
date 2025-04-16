var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'radar',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "Radar Chart Values",
            backgroundColor: 'rgb(0, 99, 132)',
            borderColor: 'rgb(0, 0, 132)',
            borderWidth: 10,
            //borderDash: [5, 15, 2, 15],
            borderDashOffset: 10,
            borderCapStyle: "square",
            borderJoinStyle: "round",
            lineTension: 0,
            pointBackgroundColor: ["green","blue","red","yellow","green","blue","red"],
            pointBorderColor: "white",
            pointBorderWidth: 2,
            pointRadius: 5,
            //pointStyle: "triangle",
            pointHitRadius: 10,
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: ["green","blue","red","yellow","green","blue","red"],
            pointHoverBorderWidth: 5,
            pointHoverRadius: 10,
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    },

    // Configuration options go here
    options: {}
});
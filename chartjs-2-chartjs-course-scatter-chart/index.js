var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'scatter',

    // The data for our dataset
    data: {
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [
                { x: 10, y: 20 }, 
                { x: 15, y: 10 },
                { x: -10, y: -10 },
                { x: 25, y: -5 },
            ]
        }]
    },

    // Configuration options go here
    options: {}
});
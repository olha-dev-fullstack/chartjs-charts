var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bubble',

    // The data for our dataset
    data: {
        datasets: [{
            label: "My First dataset",
            backgroundColor: ['rgb(255, 99, 132)', "green", "blue"],
            borderColor: "grey",
            borderWidth: 5,
            hoverBackgroundColor: "#98F",
            hoverBorderColor: "#0AF",
            hoverBorderWidth: 5,
            hoverRadius: 0,
            hitRadius: 10,
            //pointStyle: "line",
            radius: 50,
            data: [
                {x: 5, y: 10, r: 10 },
                {x: 15, y: 3, r: 15 },
                {x: 7, y: 15, r: 30 },
            ],
        }]
    },

    // Configuration options go here
    options: {}
});
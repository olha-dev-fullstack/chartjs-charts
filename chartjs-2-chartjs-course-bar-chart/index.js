var image = document.getElementById('source');
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'horizontalBar',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "Monthly Sales",
            backgroundColor: "red",
            borderColor: "black",
            borderWidth: 2,
            borderSkipped: "top",
            hoverBackgroundColor: "#000",
            //hoverBorderColor: ["red","yellow","green","blue","purple","orange","grey"], 
            hoverBorderWidth: 5,
            data: [20, 10, 5, 2, 20, 30, 45],
        },
        {
            label: "Monthly Profits",
            backgroundColor: "green",
            borderColor: "black",
            data: [20, 10, 5, 2, 20, 30, 45],
        }
        ]
    },

    // Configuration options go here
    options: {
        scales: {
            xAxes: [{
                //barPercentage: 1,
                //categoryPercentage: 1,
                barThickness: 40,
                maxBarThickness: 30,
                gridLines: {
                    offsetGridLines: false,
                },
                stacked: true,
            }],
            yAxes: [{
                stacked: true,
            }],
        }
    }
});
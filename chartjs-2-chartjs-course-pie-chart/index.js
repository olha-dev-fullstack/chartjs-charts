var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: ["blue", "red", "orange", "green", "yellow", "teal", "purple"],
            borderColor: "black",
            hoverBackgroundColor: "black",
            hoverBorderColor: ["blue", "red", "orange", "green", "yellow", "teal", "purple"],
            borderWidth: 0,
            hoverBorderWidth: 2,
            data: [10, 10, 5, 2, 20, 30, 45],
        }]
    },

    // Configuration options go here
    options: {
        cutoutPercentage: 80,
        rotation: 3.2,
        //circumference: 10,
        animation: {
            animateRotate: true,
            animateScale: true,
        }
    }
});
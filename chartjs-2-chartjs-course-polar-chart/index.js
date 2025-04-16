var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'polarArea',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: ["green","yellow","teal","tomato","red","purple","blue"],
            borderColor: "grey",
            borderWidth: 0,
            hoverBackgroundColor: "#0f0",
            hoverBorderColor: "red",
            hoverBorderWidth: 2,
            data: [20, 10, 5, 2, 20, 30, 45],
        }]
    },

    // Configuration options go here
    options: {
        startAngle: 1,
        animation: {
            animateRotate: false,
            animateScale: false,
        }
    }
});
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
            pointStyle: "line",
        },
        {
            label: "My Second dataset",
            backgroundColor: 'rgb(0, 99, 132)',
            borderColor: 'rgb(0, 99, 132)',
            data: [40, 10, 35, 32, 20, 30, 45],
            pointStyle: "rect",
        },
        {
            label: "My Third dataset",
            backgroundColor: 'rgb(0, 0, 132)',
            borderColor: 'rgb(0, 0, 132)',
            data: [29, 10, 25, 22, 20, 30, 45],
        }]
    },

    // Configuration options go here
    options: {
        legendCallback: function(chart) {
            // Return the HTML string here.
            var text = [];
            text.push('<ul class="list-inline">');
            for (var i = 0; i < chart.data.datasets.length; i++) {
                text.push('<li class="text-white list-inline-item btn" style="background: '+ chart.data.datasets[i].backgroundColor +' ">');
                text.push( chart.data.datasets[i].label );
                text.push('</li>');
            }
            text.push('</ul>');
            return text.join("");

        },
        legend: {
            display: false,
            position: "left",
            reverse: false,
            //onClick: changeFontColor,
            labels: {
                boxWidth: 5,
                fontSize: 15,
                fontStyle: "bold",
                fontColor: "#000",
                //fontFamily: "New Times Roman",
                padding: 20,
                usePointStyle: true,
            }
        }
    }
});

function changeFontColor() {
    chart.options.legend.labels.fontColor = 'red';
};

document.getElementById("chartjs-legend").innerHTML = chart.generateLegend();
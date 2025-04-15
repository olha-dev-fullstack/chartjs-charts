// data block
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
    },
  ],
};

// statusChecker plugin block
const statusChecker = {
  id: "statusChecker",
  beforeDatasetsDraw(chart, args, pluginsOptions) {
    const {
      ctx,
      chartArea: { top, bottom, left, right, width, height },
      scales: { x, y },
    } = chart;

    ctx.save();
    drawLines(12, "rgba(255, 99, 132, 1)");
    drawLines(4, "rgba(255, 206, 86, 1)");
    function drawLines(yValue, color) {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = color;
      ctx.moveTo(left, y.getPixelForValue(yValue));
      ctx.lineTo(right, y.getPixelForValue(yValue));
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
    tracker();
  },
};

// config block
const config = {
  type: "line",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: [statusChecker],
};

// init render block
const myChart = new Chart(document.getElementById("myChart"), config);

function tracker() {
  const datapoints = myChart.data.datasets[0].data;
  const datapointsLength = myChart.data.datasets[0].data.length - 1;
  const status = document.getElementById("status");
  if (datapoints[datapointsLength] > 12) {
    status.innerText = "Danger";
    status.style.color = "rgba(255, 99, 132, 1)";
  } else if (datapoints[datapointsLength] < 4) {
    status.innerText = "Please Reset System";
    status.style.color = "rgba(255, 206, 86, 1)";
  } else {
    status.innerText = "Success";
    status.style.color = "black";
  }
}

function addValue(element) {
  console.log(element.value);
  myChart.data.datasets[0].data.push(element.value);
  myChart.data.labels.push("New Value");
  myChart.update();
}

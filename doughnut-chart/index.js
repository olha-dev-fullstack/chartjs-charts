const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
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
      borderWidth: 1,
      cutout: "90%",
    },
  ],
};

// hoverLabels plugin block
const hoverLabels = {
  id: "hoverLabels",
  afterDatasetsDraw(chart, args, options) {
    const {
      ctx,
      chartArea: { top, bottom, left, right, width, height },
    } = chart;
    ctx.save();

    if (chart._active[0]) {
      const textLabel = chart.config.data.labels[chart._active[0].index];
      const dataLabel =
        chart.config.data.datasets[chart._active[0].datasetIndex].data[
          chart._active[0].index
        ];
      const color =
        chart.config.data.datasets[chart._active[0].datasetIndex].borderColor[
          chart._active[0].index
        ];

      ctx.font = "bolder 60px Arial";
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.fillText(`${textLabel}: $${dataLabel}`, width / 2, height / 2 + 25);
    }
    ctx.restore();
  },
};

// config block
const config = {
  type: "doughnut",
  data: data,
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
  },
  plugins: [hoverLabels],
};

// init render block
const myChart = new Chart(document.getElementById("myChart"), config);

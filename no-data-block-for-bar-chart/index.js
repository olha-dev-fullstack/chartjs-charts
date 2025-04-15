// data block
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, null, 3, null, 9, 3],
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
    },
  ],
};

// noData plugin block
const noData = {
  id: "noData",
  afterDatasetsDraw: (chart, args, plugins) => {
    const {
      ctx,
      data,
      chartArea: { top, bottom, left, right, width, height },
      scales: { x, y },
    } = chart;

    ctx.save();
    const difference = x.max - x.min + 1;
    const segment = width / difference;

    data.datasets[0].data.forEach((datapoint, index) => {
      const angle = Math.PI / 180;
      ctx.translate(0, 0);

      if (datapoint === null) {
        ctx.fillStyle = "rgba(102, 102, 102, 1)";
        ctx.fillRect(
          x.getPixelForValue(index) - segment / 2,
          top,
          segment,
          height
        );

        ctx.rotate(90 * angle);
        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText("No Data", height / 2, -x.getPixelForValue(index));

        ctx.rotate(-90 * angle);
        ctx.restore();
      }
    });
  },
};

// config block
const config = {
  type: "bar",
  data: data,
  options: {
    scales: {
      x: {
        min: 0,
        max: 4,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: [noData],
};

// init render block
const myChart = new Chart(document.getElementById("myChart"), config);

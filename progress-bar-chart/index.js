// data block
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderWidth: 0,
      barPercentage: 0.1,
      borderSkipped: false,
      borderRadius: 10,
      categoryPercentage: 0.8,
    },
  ],
};

// roundedProgressBar plugin block
const roundedProgressBar = {
  id: "roundedProgressBar",
  beforeDatasetsDraw(chart, args, pluginsOptions) {
    const {
      ctx,
      data,
      chartArea: { top, bottom, left, right, width, height },
      scales: { x, y },
    } = chart;

    ctx.save();

    const segmentHeight = height / data.labels.length;

    chart.getDatasetMeta(0).data.forEach((datapoint, index) => {
      datapoint.y = top + segmentHeight * (index + 0.9);

      // textlabel
      ctx.font = "12px sans-serif";
      ctx.fillStyle = "rgba(102, 102, 102, 1)";
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillText(data.labels[index], left, datapoint.y - 15);

      // text value
      ctx.font = "bold 15px sans-serif";
      ctx.fillStyle = datapoint.options.backgroundColor;
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";
      ctx.fillText(data.datasets[0].data[index], right, datapoint.y - 15);

      // background shadow
      ctx.beginPath();
      ctx.strokeStyle = datapoint.options.borderColor;
      ctx.fillStyle = datapoint.options.borderColor;
      ctx.lineJoin = "round";
      ctx.lineWidth = datapoint.height;
      ctx.strokeRect(
        left + datapoint.height / 2,
        datapoint.y,
        width - datapoint.height,
        1
      );

      ctx.restore();
    });
  },
};

// config block
const config = {
  type: "bar",
  data: data,
  options: {
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  },
  plugins: [roundedProgressBar],
};

// init render block
const myChart = new Chart(document.getElementById("myChart"), config);

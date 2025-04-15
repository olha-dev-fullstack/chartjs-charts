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
      barPercentage: 0.2,
      categoryPercentage: 0.2,
    },
  ],
};

// verticalBackground plugin block
const verticalBackground = {
  id: "verticalBackground",
  beforeDatasetsDraw(chart, args, plugins) {
    const {
      data,
      ctx,
      chartArea: { top, bottom, left, right, width, height },
      scales: { x, y },
    } = chart;
    const barPercentage = data.datasets[0].barPercentage || 0.9;
    const categoryPercentage = data.datasets[0].categoryPercentage || 0.8;

    const displayDataPoints = y.max - y.min + 1 || data.labels.length;

    const barWidth =
      (height / displayDataPoints) * barPercentage * categoryPercentage;
    ctx.save();
    ctx.fillStyle = plugins.barBackground || "lightgray";
    for (let i = y.min; i <= displayDataPoints; i++) {
      const yCoor = y.getPixelForValue(i);
      ctx.fillRect(left, yCoor - barWidth / 2, width, barWidth);
    }
  },
};

// config block
const config = {
  type: "bar",
  data: data,
  options: {
    indexAxis: "y",
    scales: {
      y: {
        min: 1,
        max: 2,
        beginAtZero: true,
      },
    },
    plugins: {
      verticalBackground: {},
    },
  },
  plugins: [verticalBackground],
};

// init render block
const myChart = new Chart(document.getElementById("myChart"), config);

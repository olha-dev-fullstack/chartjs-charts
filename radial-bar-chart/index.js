const data = {
  datasets: [
    {
      label: "Red",
      data: [15],
      backgroundColor: ["rgba(255, 99, 132, 1)"],
      borderColor: ["white"],
      borderWidth: 1,
      circumference: (ctx) => {
        const datapoints = ctx.chart.data.datasets.map((dataset, index) => {
          return dataset.data[0];
        });
        const maxValue = Math.max(...datapoints);
        return (ctx.dataset.data[0] / maxValue) * 270;
      },
    },
    {
      label: "Blue",
      data: [30],
      backgroundColor: ["rgba(54, 162, 235, 1)"],
      borderColor: ["white"],
      borderWidth: 1,
      circumference: (ctx) => {
        const datapoints = ctx.chart.data.datasets.map((dataset, index) => {
          return dataset.data[0];
        });
        const maxValue = Math.max(...datapoints);
        return (ctx.dataset.data[0] / maxValue) * 270;
      },
    },
    {
      label: "Yellow",
      data: [3],
      backgroundColor: ["rgba(255, 159, 64, 1)"],
      borderColor: ["white"],
      borderWidth: 1,
      circumference: (ctx) => {
        const datapoints = ctx.chart.data.datasets.map((dataset, index) => {
          return dataset.data[0];
        });
        const maxValue = Math.max(...datapoints);
        return (ctx.dataset.data[0] / maxValue) * 270;
      },
    },
  ],
};

// barLabels plugin block
const barLabels = {
  id: "barLabels",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    ctx.save();

    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    for (let i = 0; i < data.datasets.length; i++) {
      const xCoor = chart.getDatasetMeta(i).data[0].x;
      const yCoor = chart.getDatasetMeta(i).data[0].y;
      const innerRadius = chart.getDatasetMeta(i).data[0].innerRadius;
      const outerRadius = chart.getDatasetMeta(i).data[0].outerRadius;
      const thickness = outerRadius - innerRadius;
      ctx.fillStyle = data.datasets[i].backgroundColor;

      ctx.fillText(
        data.datasets[i].label,
        xCoor - 5,
        yCoor - innerRadius - thickness / 2
      );
    }
  },
};

// config block
const config = {
  type: "doughnut",
  data: data,
  options: {
    borderRadius: 10,
    cutout: "85%",
    plugins: {
      legend: {
        display: false,
      },
    },
  },
  plugins: [barLabels],
};

// init render block
const myChart = new Chart(document.getElementById("myChart"), config);

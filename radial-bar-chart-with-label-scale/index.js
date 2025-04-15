// data block
const val = 100;
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "Red",
      data: [val],
      backgroundColor: ["rgba(255, 99, 132, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)"],
      borderWidth: 1,
      circumference: (ctx) => {
        console.log(ctx);
        return (ctx.dataset.data[0] / val) * 270;
      },
    },
    {
      label: "Blue",
      data: [21],
      backgroundColor: ["rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      borderWidth: 1,
      circumference: (ctx) => {
        console.log(ctx);
        return (ctx.dataset.data[0] / val) * 270;
      },
    },
    {
      label: "Orange",
      data: [60],
      backgroundColor: ["rgba(255, 159, 64, 0.2)"],
      borderColor: ["rgba(255, 159, 64, 1)"],
      borderWidth: 1,
      circumference: (ctx) => {
        console.log(ctx);
        return (ctx.dataset.data[0] / val) * 270;
      },
    },
  ],
};

const labelsRadialBar = {
  id: "labelsRadialBar",
  afterDatasetsDraw(chart, args, plugins) {
    const { ctx, data } = chart;
    const xCenter = chart.getDatasetMeta(0).data[0].x;
    const yCenter = chart.getDatasetMeta(0).data[0].y;
    ctx.save();

    for (let i = 0; i < data.datasets.length; i++) {
      const outerRadius = chart.getDatasetMeta(i).data[0].outerRadius;
      const innerRadius = chart.getDatasetMeta(i).data[0].innerRadius;
      const between = (outerRadius - innerRadius) / 2;

      ctx.font = "bold 12px sans-serif";
      ctx.fillStyle = data.datasets[i].borderColor;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(
        data.datasets[i].label,
        xCenter - 6,
        yCenter - outerRadius + between
      );
    }
  },
};

const radialScale = {
  id: "radialScale",
  afterDatasetsDraw(chart, args, plugins) {
    const { ctx, data } = chart;
    const xCenter = chart.getDatasetMeta(0).data[0].x;
    const yCenter = chart.getDatasetMeta(0).data[0].y;
    const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius + 20;

    const dataPoints = data.datasets.map((dataset, index) => {
      return dataset.data[0];
    });
    const max = Math.max(...dataPoints);
    const increment = max / 6;
    const labelArray = Array.from(
      { length: 7 },
      (_, index) => increment * index
    );

    const startAngle = -90;
    const anglePosition = [-90, -45, 0, 45, 90, 135, 180];
    const labelPosition = anglePosition.map((angle) => {
      const angleRad = (angle * Math.PI) / 180;
      const x = xCenter + outerRadius * Math.cos(angleRad);
      const y = yCenter + outerRadius * Math.sin(angleRad);
      return { x, y };
    });

    ctx.save();

    labelArray.forEach((label, index) => {
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(
        label.toFixed(1),
        labelPosition[index].x,
        labelPosition[index].y
      );
    });
  },
};

const radialGrid = {
  id: "radialGrid",
  beforeDatasetsDraw(chart, args, plugins) {
    const { ctx, data } = chart;

    const datasetLength = data.datasets.length - 1;
    const angle = Math.PI / 180;
    const xCenter = chart.getDatasetMeta(0).data[0].x;
    const yCenter = chart.getDatasetMeta(0).data[0].y;
    const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
    const innerRadius = chart.getDatasetMeta(datasetLength).data[0].innerRadius;

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.moveTo(xCenter, yCenter - innerRadius + 3);
    ctx.lineTo(xCenter, yCenter - outerRadius - 3);

    ctx.arc(xCenter, yCenter, outerRadius + 3, angle * -90, angle * 180, false);
    ctx.lineTo(xCenter - innerRadius + 3, yCenter);
    ctx.arc(xCenter, yCenter, innerRadius - 3, angle * 180, angle * -90, true);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  },
};

// config block
const config = {
  type: "doughnut",
  data: data,
  options: {
    layout: {
      padding: 50,
    },
    borderRadius: 10,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  },
  plugins: [labelsRadialBar, radialScale, radialGrid],
};

// init render block
const myChart = new Chart(document.getElementById("myChart"), config);

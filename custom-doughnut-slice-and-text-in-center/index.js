const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 15, 3, 6, 9, 12],
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

// sliceThickness plugin block
const sliceThickness = {
  id: "sliceThickness",
  beforeDraw(chart, plugins) {
    const {
      ctx,
      data,
      chartArea: { top, bottom, left, right, width, height },
    } = chart;

    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(
      chart.getDatasetMeta(0).data[0].x,
      chart.getDatasetMeta(0).data[0].y,
      chart.getDatasetMeta(0).data[1].outerRadius,
      10
    );

    data.datasets[0].data.forEach((thickness, index) => {
      chart.getDatasetMeta(0).data[index].innerRadius = width / 3.5;
      chart.getDatasetMeta(0).data[index].outerRadius =
        width / 2.5 + thickness * 2;
    });
  },
};

// textLabel plugin block
const textLabel = {
  id: "textLabel",
  afterDatasetsDraw(chart, args, plugins) {
    const {
      ctx,
      data,
      chartArea: { top, bottom, left, right, width, height },
    } = chart;

    ctx.save();

    const xCenter = chart.getDatasetMeta(0).data[0].x;
    const yCenter = chart.getDatasetMeta(0).data[0].y;

    const fontSize = width / 15;
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillStyle = plugins.textColor || "gray";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(data.datasets[0].label, xCenter, yCenter);
  },
};

// config block
const config = {
  type: "doughnut",
  data: data,
  options: {
    plugins: {
      textLabel: {
        textColor: "blue",
      },
    },
  },
  plugins: [textLabel, sliceThickness],
};

// init render block
const myChart = new Chart(document.getElementById("myChart"), config);

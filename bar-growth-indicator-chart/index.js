// data block
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "Red Bar",
      data: [
        [0, 12],
        [0, 19],
        [0, 3],
        [0, 5],
        [0, 2],
        [0, 3],
      ],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
    {
      label: "Arrow Bar",
      data: [
        [12, 19],
        [19, 3],
        [3, 5],
        [5, 2],
        [2, 3],
        [0, 3],
      ],
      backgroundColor: "rgba(0, 0, 0, 1)",
      borderColor: "rgba(0, 0, 0, 1)",
      barPercentage: 0.05,
    },
  ],
};

const barGrowthIndicator = {
  id: "barGrowthIndicator",
  afterDatasetsDraw(chart, scales, options) {
    const {
      ctx,
      scales: { x, y },
    } = chart;
    const deltaPercentage = [];
    for (let i = 0; i < chart._metasets[0]._parsed.length - 1; i++) {
      let z = 1 + i;
      const basis = chart._metasets[0]._parsed[i].y;
      const delta = chart._metasets[0]._parsed[z].y;
      let percentage = (delta / basis) * 100;
      percentage = percentage - 100;
      deltaPercentage.push(percentage.toFixed(1));
    }

    if (chart._metasets[1].hidden !== true) {
        console.log(chart._metasets[1].hidden);
        
      for (let a = 0; a < deltaPercentage.length; a++) {
        const start = chart._metasets[1]._parsed[a]._custom.start;
        const end = chart._metasets[1]._parsed[a]._custom.end;

        if (end >= start) {
          ctx.beginPath();
          let p1 = chart.getDatasetMeta(1).data[a].x;
          let p2 = chart.getDatasetMeta(1).data[a].y;

          ctx.moveTo(p1, p2 - 2);
          ctx.lineTo(p1 - 5, p2 + 5);
          ctx.lineTo(p1 + 5, p2 + 5);
          ctx.fillStyle = "black";

          ctx.fill();
          ctx.restore();

          ctx.font = "10px Arial";
          ctx.fillStyle = "green";
          ctx.textAlign = "center";
          ctx.fillText(`+${deltaPercentage[a]}%`, p1 + 2.5, p2 - 10);
          ctx.restore();
        }
        if (end < start) {
          let yStart = a + 1;
          ctx.beginPath();
          let p3 = chart.getDatasetMeta(1).data[a].x;
          let p4 = chart.getDatasetMeta(0).data[yStart].y;
          console.log(p3, p4);

          ctx.moveTo(p3, p4 + 3);
          ctx.lineTo(p3 - 5, p4 - 5);
          ctx.lineTo(p3 + 5, p4 - 5);

          ctx.fillStyle = "black";

          ctx.fill();
          ctx.restore();

          ctx.font = "10px Arial";
          ctx.fillStyle = "red";
          ctx.textAlign = "center";
          ctx.fillText(`-${deltaPercentage[a]}%`, p3 + 2.5, p4 + 10);
          ctx.restore();
        }
      }
    }
  },
};

// config block
const config = {
  type: "bar",
  data: data,
  options: {
    plugins: {
      tooltip: {
        filter: (tooltipItem) => {
          return tooltipItem.datasetIndex === 0;
        },
      },
    },
    scales: {
      y: {
        grace: "5%",
        beginAtZero: true,
      },
    },
  },
  plugins: [barGrowthIndicator],
};

// init render block
const myChart = new Chart(document.getElementById("myChart"), config);

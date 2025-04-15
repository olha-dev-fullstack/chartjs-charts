const coordinates = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

const browserData = [
  {
    browser: "Chrome",
    color: "rgba(75, 192, 192, 1)",
    users: 150,
    marketshare: 70,
    versionData: [
      { version: "v5", users: 10 },
      { version: "v6", users: 20 },
      { version: "v7", users: 30 },
      { version: "v8", users: 60 },
      { version: "v9", users: 20 },
    ],
  },
  {
    browser: "FireFox",
    color: "rgba(255, 26, 104, 1)",
    users: 25,
    marketshare: 24,
    versionData: [
      { version: "V3.1", users: 10 },
      { version: "v3.2", users: 10 },
      { version: "v3.3", users: 5 },
    ],
  },
  {
    browser: "Safari",
    color: "rgba(54, 162, 235, 1)",
    users: 30,
    marketshare: 26,
    versionData: [
      { version: "Web 9", users: 10 },
      { version: "Web 10", users: 10 },
      { version: "Web 11", users: 10 },
    ],
  },
];

// data block
const data = {
  datasets: [
    {
      label: "Browser Data Market Share",
      data: browserData,
      backgroundColor: [
        browserData[0].color,
        browserData[1].color,
        browserData[2].color,
      ],
      borderColor: [
        browserData[0].color,
        browserData[1].color,
        browserData[2].color,
      ],
      borderWidth: 1,
    },
  ],
};

// resetButton block
const resetButton = {
  id: "resetButton",
  beforeDraw(chart, args, options) {
    if (chart.data.datasets[0].label !== "Browser Data Market Share") {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;
      ctx.save();

      const text = "Back";
      const thickBorder = 3;
      const textWidth = ctx.measureText(text).width;
      const padding = 10;
      const paddingright = padding / 2;

      // background
      ctx.fillStyle = "rgba(75, 192, 192, 0.2)";
      ctx.fillRect(
        right - (textWidth + 2 + padding),
        5,
        textWidth + padding,
        20
      );

      // text
      ctx.fillStyle = "#666";
      ctx.font = "12px Arial";
      ctx.fillText(text, right - (textWidth + 2 + paddingright), 15);

      // border button
      ctx.lineWidth = thickBorder;
      ctx.strokeStyle = "rgba(75, 192, 192, 1)";
      ctx.strokeRect(
        right - (textWidth + 2 + padding),
        5,
        textWidth + padding,
        20
      );

      coordinates.top = 5 - thickBorder;
      coordinates.bottom = 5 + 20 + thickBorder;
      coordinates.left = right - (textWidth + 2 + padding);
      coordinates.right = right;

      ctx.restore();
    }
  },
};

// config block
const config = {
  type: "bar",
  data: data,
  options: {
    onHover: (event, chartElement) => {
      if (
        myChart.config.data.datasets[0].label === "Browser Data Market Share"
      ) {
        event.native.target.style.cursor = chartElement[0]
          ? "pointer"
          : "default";
      } else {
        event.native.target.style.cursor = "default";
      }
    },
    parsing: {
      xAxisKey: "browser",
      yAxisKey: "marketshare",
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
  plugins: [resetButton],
};

// init render block
const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, config);

function changeChart(browser) {
  myChart.config.options.parsing.xAxisKey = "versionData.version";
  myChart.config.options.parsing.yAxisKey = "versionData.users";

  const vColor = [];
  const vUsers = [];
  const vLabel = browserData[browser].versionData.map((labels) => {
    vUsers.push(labels.users);
    vColor.push(browserData[browser].color);
    return labels.version;
  });

  myChart.config.data.labels = vLabel;
  myChart.config.data.datasets[0].label = browserData[browser].browser;
  myChart.config.data.datasets[0].data = vUsers;
  myChart.config.data.datasets[0].backgroundColor = vColor;
  myChart.config.data.datasets[0].borderColor = vColor;
  myChart.update();
}

function clickHandler(click) {
  if (myChart.config.data.datasets[0].label === "Browser Data Market Share") {
    const bar = myChart.getElementsAtEventForMode(
      click,
      "nearest",
      { intersect: true },
      true
    );
    if (bar[0]) {
      changeChart(bar[0].index);
    }
  }
}

ctx.onclick = clickHandler;

function resetChart() {
  myChart.config.options.parsing.xAxisKey = "browser";
  myChart.config.options.parsing.yAxisKey = "marketshare";

  const bColor = [];
  const bMarketshare = [];
  const bLabel = browserData.map((browser) => {
    bMarketshare.push(browser.marketshare);
    bColor.push(browser.color);
    return browser.browser;
  });

  myChart.config.data.labels = bLabel;
  myChart.config.data.datasets[0].label = "Browser Data Market Share";
  myChart.config.data.datasets[0].data = bMarketshare;
  myChart.config.data.datasets[0].backgroundColor = bColor;
  myChart.config.data.datasets[0].borderColor = bColor;
  myChart.update();
}

function mousemoveHandler(canvas, mousemove) {
  const x = mousemove.offsetX;
  const y = mousemove.offsetY;

  if (myChart.config.data.datasets[0].label !== "Browser Data Market Share") {
    if (
      x > coordinates.left &&
      x < coordinates.right &&
      y > coordinates.top &&
      y < coordinates.bottom
    ) {
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "default";
    }
  }
}

function clickButtonHandler(canvas, click) {
  const x = click.offsetX;
  const y = click.offsetY;

  if (myChart.config.data.datasets[0].label !== "Browser Data Market Share") {
    if (
      x > coordinates.left &&
      x < coordinates.right &&
      y > coordinates.top &&
      y < coordinates.bottom
    ) {
      resetChart();
    }
  }
}

ctx.addEventListener("mousemove", (e) => {
  myChart.resize();
  mousemoveHandler(ctx, e);
});

ctx.addEventListener("click", (e) => {
  myChart.resize();
  clickButtonHandler(ctx, e);
});

import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
interface Props {
  values: any[];
  labels: string[];
}
const ColumnChart: React.FC<Props> = ({ values, labels }) => {
  let chart: { options: ApexOptions; series: any } = {
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          columnWidth: "55%",
          dataLabels: {
            position: "top",
          },
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "solid",
        opacity: [0.5, 1],
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: labels,
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
    },
    series: [{ data: values }],
  };
  return (
    <div className="user-analytic-chart">
      <ReactApexChart
        type="bar"
        options={chart.options}
        series={chart.series}
        height={375}
      />
    </div>
  );
};

export default ColumnChart;

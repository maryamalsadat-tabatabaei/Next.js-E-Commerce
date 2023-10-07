"use client";

import { PolarArea, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  RadialLinearScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface DataProps {
  topUsersByQuantity: { email: string; totalQuantity: number }[];
  topUsersByPrice: { email: string; totalPrice: number }[];
}
const UserCharts = ({ data }: { data: DataProps }) => {
  const polarData = {
    labels: data?.topUsersByQuantity?.map((item) => item.email),
    datasets: [
      {
        label: "# of Quantities",
        data: data?.topUsersByQuantity?.map((item) => item.totalQuantity),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: data?.topUsersByPrice?.map((item) => item.email),
    datasets: [
      {
        data: data?.topUsersByPrice?.map((item) => item.totalPrice),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FFD700",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FFD700",
        ],
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "45%" }}>
          <h2 className="font-semibold text-base my-2">
            Top Users by Quantity
          </h2>
          <PolarArea data={polarData} />
        </div>
        <div style={{ width: "45%" }}>
          <h2 className="font-semibold text-base my-2">Top Users by Price</h2>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default UserCharts;

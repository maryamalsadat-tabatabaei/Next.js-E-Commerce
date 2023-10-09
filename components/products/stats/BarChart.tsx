"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 2,
      },
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface MonthyStatsProps {
  month: string;
  totalQuantity: number;
}
const BarChart = ({ monthlyStats }: { monthlyStats: MonthyStatsProps[] }) => {
  const labels = monthlyStats.map((item) => item.month);
  const data = monthlyStats.map((item) => item.totalQuantity);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Monthly Purchase",
        data,
        backgroundColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  return (
    <div className="relative mb-8 text-center">
      <div className="font-bold text-xl mb-4">Monthly Purchase</div>
      <div className="w-full max-w-lg mx-auto h-auto">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;

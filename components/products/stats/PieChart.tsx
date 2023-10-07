"use client";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({
  defaultStats,
}: {
  defaultStats: {
    category: string;
    totalQuantity: number;
  }[];
}) => {
  const labels = defaultStats?.map((item) => item.category);
  const data = defaultStats?.map((item) => item.totalQuantity);

  const chartData = {
    labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FFD700",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"pie">) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };
  return (
    <div className="relative">
      <div className="text-center font-bold text-xl mb-4">
        Category Distribution
      </div>
      <div className="w-64 h-64 mx-auto">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;

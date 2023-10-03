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
    [category: string]: number;
  };
}) => {
  const labels = Object.keys(defaultStats);
  const data = Object.values(defaultStats);

  const chartData = {
    labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          "rgba(255,99,132,1)",
          "rgba(54,162,235,1)",
          "rgba(255,206,86,1)",
          "rgba(75,192,192,1)",
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

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MonthyStatsProps {
  date: string;
  count: number;
}
const BarChartComponent = ({
  monthlyStats,
}: {
  monthlyStats: MonthyStatsProps[];
}) => {
  return (
    <div className="relative mb-8">
      <div className="text-center font-bold text-xl mb-4">Monthly Counts</div>
      <div className="flex justify-center mx-auto">
        <ResponsiveContainer width="70%" height={300}>
          <BarChart
            data={monthlyStats}
            margin={{
              top: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />

            <Bar dataKey="count" fill="#2cb1bc" barSize={75} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top" as const,
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         stepSize: 2,
//       },
//     },
//   },
// };

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );
// interface MonthyStatsProps {
//   date: string;
//   count: number;
// }
// const BarChartComponent = ({
//   monthlyStats,
// }: {
//   monthlyStats: MonthyStatsProps[];
// }) => {
//   const labels = monthlyStats.map((item) => item.date);
//   const data = monthlyStats.map((item) => item.count);

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: "Monthly Counts",
//         data,
//         backgroundColor: "rgba(75,192,192,1)",
//         borderWidth: 1,
//         barThickness: 30,
//       },
//     ],
//   };

//   return (
//     <div className="relative mb-8">
//       <div className="text-center font-bold text-xl mb-4">Monthly Counts</div>
//       <div className="w-[70%] mx-auto flex justify-center">
//         <Bar data={chartData} options={options} />
//       </div>
//     </div>
//   );
// };

// export default BarChartComponent;

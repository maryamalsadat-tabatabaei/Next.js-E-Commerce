"use client";
import Modal from "../layouts/Modal";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

interface OrdersStatsProps {
  month: number;
  totalQuantity: number;
}
const OrdersChartModal = ({
  ordersStats,
}: {
  ordersStats: OrdersStatsProps[];
}) => {
  const [showModal, setShowModal] = useState(false);

  const monthlyData = Array(12).fill(0);
  ordersStats.forEach((item) => {
    monthlyData[item.month - 1] = item.totalQuantity;
  });
  const chartDataConfig = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Quantity",
        data: monthlyData,
        fill: false,
        borderColor: "#ca3a12",
        backgroundColor: "transparent",
        pointBorderColor: "transparent",
        tension: 0.1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  const openModalHanlder = () => {
    setShowModal(true);
  };

  const closeModalHanlder = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-900 text-white rounded-lg"
        onClick={openModalHanlder}
        style={{ maxWidth: "100%" }}
      >
        Show Orders Stats Modal
      </button>
      <Modal
        isOpen={showModal}
        onDismiss={closeModalHanlder}
        title="Orders Stats"
      >
        <div className="my-4 w-full max-w-screen-lg mx-auto">
          <Line data={chartDataConfig} options={options} />
        </div>
      </Modal>
    </div>
  );
};

export default OrdersChartModal;

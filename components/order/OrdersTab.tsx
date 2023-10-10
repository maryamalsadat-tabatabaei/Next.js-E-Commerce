"use client";
import { Tab } from "@headlessui/react";
import OrderList from "./OrderList";
import OrdersChartModal from "./OrdersChartModal";
import { useState } from "react";
import Order from "@/interfaces/order";

interface OrdersProps {
  orders: Order[];
  numberPerPage: number;
  ordersCount: number;
}
interface OrdersStatsProps {
  month: number;
  totalQuantity: number;
}
const OrdersTab = ({
  orders,
  ordersStats,
}: {
  orders: OrdersProps;
  ordersStats: OrdersStatsProps[];
}) => {
  const [currentTab, setCurrentTab] = useState("orders");

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl gap-2 bg-blue-900/20 p-1">
          <Tab
            onClick={() => setCurrentTab("orders")}
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-lg font-semibold leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Orders
          </Tab>
          <Tab
            onClick={() => setCurrentTab("stats")}
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-lg font-semibold leading-5 text-blue-700",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                selected
                  ? "bg-white shadow"
                  : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
              )
            }
          >
            Stats
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            )}
          >
            {currentTab === "orders" ? <OrderList orders={orders} /> : null}
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            )}
          >
            {currentTab === "stats" ? (
              <div className="p-8 justify-center items-center text-center">
                <OrdersChartModal ordersStats={ordersStats} />
              </div>
            ) : null}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default OrdersTab;

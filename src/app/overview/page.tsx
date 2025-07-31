"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Users,
  Gift,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

// ฟังก์ชันช่วย format ตัวเลข
const formatNumber = (num: number | string) => {
  const numberValue = typeof num === "string" ? Number(num) : num;
  if (isNaN(numberValue)) return num;
  return new Intl.NumberFormat("en-US").format(numberValue);
};

const iconMap = {
  clock: <Clock className="w-6 h-6 text-blue-600" />,
  "check-circle": <CheckCircle2 className="w-6 h-6 text-green-600" />,
  "alert-triangle": <AlertTriangle className="w-6 h-6 text-yellow-600" />,
};

type KPI = {
  label: string;
  value: number;
  change: number;
};

type Activity = {
  icon: "clock" | "check-circle" | "alert-triangle";
  iconBg: string;
  title: string;
  subtitle: string;
  timeAgo: string;
};

type MonthlyData = {
  month: string;
  value: number;
};

type OverviewData = {
  kpis: KPI[];
  activities: Activity[];
  monthlyData: MonthlyData[];
  totalRevenue: number;
  revenueChangePercent: number;
};

export default function OverviewPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/overview")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Failed to load data</div>;

  const maxValue = Math.max(...data.monthlyData.map((d) => d.value));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.kpis.map((item) => {
          const isPositive = item.change >= 0;

          let iconElement = null;
          switch (item.label) {
            case "Total Sales":
              iconElement = (
                <BarChart className="w-6 h-6 text-blue-500 bg-blue-100 rounded-md p-1" />
              );
              break;
            case "Active Customers":
              iconElement = (
                <Users className="w-6 h-6 text-purple-500 bg-purple-100 rounded-md p-1" />
              );
              break;
            case "Inventory Status":
              iconElement = (
                <Gift className="w-6 h-6 text-green-500 bg-green-100 rounded-md p-1" />
              );
              break;
          }

          return (
            <div
              key={item.label}
              className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border"
            >
              <div>
                <h4 className="text-sm text-gray-500">{item.label}</h4>
                <p className="text-xl font-bold text-gray-800 inline-block mr-3">
                  {formatNumber(item.value)}
                </p>
                <span
                  className={`text-sm font-semibold inline-flex items-center ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isPositive ? (
                    <ArrowUp className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(item.change)}%
                </span>
              </div>
              <div>{iconElement}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity + Monthly Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity (ซ้าย) */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-black">
            Recent Activity
          </h3>
          <div className="flex flex-col gap-5">
            {data.activities.map((act, i) => (
              <div key={i} className="flex items-center gap-4">
                <div
                  className={`${act.iconBg} p-2 rounded-full flex items-center justify-center`}
                >
                  {iconMap[act.icon]}
                </div>
                <div className="flex flex-col">
                  <span className="text-black font-medium">{act.title}</span>
                  <span className="text-gray-700">{act.subtitle}</span>
                  <span className="text-gray-400 text-sm">{act.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Performance (ขวา) */}
        <div className="bg-white rounded-xl p-6 shadow-md flex flex-col justify-between">
          <h3 className="text-xl font-semibold mb-6 text-black">
            Monthly Performance
          </h3>

          {/* กราฟแท่งแบบ div bar */}
          <div className="flex items-end h-40 w-full justify-between">
            {data.monthlyData.map(({ month, value }) => {
              const barHeight = (value / maxValue) * 100;
              return (
                <div key={month} className="flex flex-col items-center">
                  <div
                    className="bg-blue-500 rounded-t-md transition-all"
                    style={{ height: `${barHeight}%`, width: "20px" }}
                  />
                  <span className="mt-2 text-sm text-gray-600">{month}</span>
                </div>
              );
            })}
          </div>

          {/* ข้อมูลล่าง */}
          <div className="flex justify-between items-center text-gray-700 font-semibold mt-6">
            <span>Total Revenue: ${formatNumber(data.totalRevenue)}</span>
            <span className="inline-flex items-center text-green-600">
              <ArrowUp className="w-5 h-5 mr-1" />
              {data.revenueChangePercent}% vs last period
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

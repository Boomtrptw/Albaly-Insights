"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

type Product = { name: string; value: number };
type DropOffItem = { week: string; rate: number };
type RegionalItem = { name: string; value: number };
type FunnelItem = { name: string; value: number };

type InsightData =
  | {
      title: "Top-Selling Product";
      description: string;
      items: Product[];
      trend: "increase" | "decrease";
      percent: number;
    }
  | {
      title: "Drop-Off Rate";
      description: string;
      items: DropOffItem[];
      trend: "increase" | "decrease";
      percent: number;
    }
  | {
      title: "Regional Performance";
      description: string;
      items: RegionalItem[];
      trend: "increase" | "decrease";
      percent: number;
    }
  | {
      title: "Conversion Funnel";
      description: string;
      items: FunnelItem[];
      trend: "increase" | "decrease";
      percent: number;
    };

export default function InsightsPage() {
  const [data, setData] = useState<InsightData[] | null>(null);

  useEffect(() => {
    fetch("/api/insights")
      .then((res) => res.json())
      .then((json: InsightData[]) => setData(json));
  }, []);

  if (!data) return <div>Loading...</div>;

  // Helper functions
  const findMaxValue = (items: { value: number }[]) =>
    Math.max(...items.map((i) => i.value));
  const findMinValue = (items: { value: number }[]) =>
    Math.min(...items.map((i) => i.value));

  // ดึงข้อมูลจาก data โดยการแคสต์ type ให้ถูกต้อง
  const topSelling = data.find(
    (d) => d.title === "Top-Selling Product"
  ) as Extract<InsightData, { title: "Top-Selling Product" }>;
  const dropOff = data.find((d) => d.title === "Drop-Off Rate") as Extract<
    InsightData,
    { title: "Drop-Off Rate" }
  >;
  const regional = data.find(
    (d) => d.title === "Regional Performance"
  ) as Extract<InsightData, { title: "Regional Performance" }>;
  const funnel = data.find((d) => d.title === "Conversion Funnel") as Extract<
    InsightData,
    { title: "Conversion Funnel" }
  >;

  const maxRegional = findMaxValue(regional.items);
  const maxFunnel = findMaxValue(funnel.items);
  const minFunnel = findMinValue(funnel.items);

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top-Selling Product (ซ้ายบน) */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-black">
            {topSelling.title}
          </h3>
          <div
            className={`inline-flex items-center font-semibold ${
              topSelling.trend === "increase"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {topSelling.trend === "increase" ? (
              <ArrowUp className="w-5 h-5 mr-1" />
            ) : (
              <ArrowDown className="w-5 h-5 mr-1" />
            )}
            {topSelling.percent}%
          </div>
        </div>
        <p className="mb-4 text-gray-700">{topSelling.description}</p>
        <div className="space-y-2">
          {(() => {
            // หา product ที่ value มากสุด
            const maxValue = Math.max(...topSelling.items.map((p) => p.value));
            return topSelling.items.map((product) => {
              const isHighlight = product.value === maxValue;
              const barWidth = (product.value / maxValue) * 100;

              return (
                <div
                  key={product.name}
                  className={`p-2 rounded ${isHighlight ? "bg-gray-100" : ""}`}
                >
                  {/* ชื่อ + value row เดียวกัน */}
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-500">
                      {product.name}
                    </span>
                    <span className="font-semibold text-gray-500">
                      ${product.value.toLocaleString()}
                    </span>
                  </div>

                  {/* แถบกราฟ */}
                  <div className="bg-gray-200 h-4 rounded overflow-hidden">
                    <div
                      className="bg-blue-500 h-4 rounded"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>

      {/* Drop-Off Rate (ขวาบน) */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-black">{dropOff.title}</h3>
          <div
            className={`inline-flex items-center font-semibold ${
              dropOff.trend === "increase" ? "text-red-600" : "text-green-600"
            }`}
          >
            {dropOff.trend === "increase" ? (
              <ArrowUp className="w-5 h-5 mr-1" />
            ) : (
              <ArrowDown className="w-5 h-5 mr-1" />
            )}
            {dropOff.percent}%
          </div>
        </div>
        <p className="mb-4 text-gray-700">{dropOff.description}</p>
        <ul className="space-y-2">
          {dropOff.items.map(({ week, rate }) => {
            const isHighlight = rate === dropOff.percent;

            return (
              <li key={week} className="flex items-center gap-2">
                <span
                  className={`w-4 h-4 rounded-full inline-block ${
                    isHighlight ? "bg-red-500" : "bg-blue-500"
                  }`}
                />
                <span className="font-medium text-gray-700">{week}:</span>
                <span className="text-gray-600">{rate}% churn rate</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Regional Performance (ซ้ายล่าง) */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-black">{regional.title}</h3>
          <div
            className={`inline-flex items-center font-semibold ${
              regional.trend === "increase" ? "text-green-600" : "text-red-600"
            }`}
          >
            {regional.trend === "increase" ? (
              <ArrowUp className="w-5 h-5 mr-1" />
            ) : (
              <ArrowDown className="w-5 h-5 mr-1" />
            )}
            {regional.percent}%
          </div>
        </div>
        <p className="mb-4 text-gray-700">{regional.description}</p>
        <div className="space-y-4">
          {regional.items.map(({ name, value }) => {
            const isMax = value === maxRegional;
            const barWidth = (value / maxRegional) * 100;

            return (
              <div key={name} className="flex flex-col">
                {/* name กับ value อยู่ในแถวเดียวกัน */}
                <div className="flex justify-between px-2">
                  <span className="font-medium text-gray-600">{name}</span>
                  <span className="font-semibold text-gray-700">
                    ${value.toLocaleString()}
                  </span>
                </div>

                {/* แถบสีแสดงค่า */}
                <div className="bg-gray-200 h-4 rounded overflow-hidden mt-1">
                  <div
                    className={`h-4 rounded ${
                      isMax ? "bg-green-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conversion Funnel (ขวาล่าง) */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-black">{funnel.title}</h3>
          <div
            className={`inline-flex items-center font-semibold ${
              funnel.trend === "increase" ? "text-green-600" : "text-orange-600"
            }`}
          >
            {funnel.trend === "increase" ? (
              <ArrowUp className="w-5 h-5 mr-1" />
            ) : (
              <ArrowDown className="w-5 h-5 mr-1" />
            )}
            {funnel.percent}%
          </div>
        </div>
        <p className="mb-6 text-gray-700">{funnel.description}</p>
        <div className="space-y-6">
          {funnel.items.map(({ name, value }) => {
            const barWidth = (value / maxFunnel) * 100;
            const isMin = value === minFunnel;

            const textColor = isMin ? "text-orange-700" : "text-blue-700";
            const bgColor = isMin ? "bg-orange-100" : "bg-blue-100";
            const barColor = isMin ? "bg-orange-100" : "bg-blue-500";

            return (
              <div key={name} className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`px-3 py-1 rounded-md font-semibold inline-block ${textColor} ${bgColor}`}
                  >
                    {name}
                  </div>
                  <span className={`font-semibold ${textColor}`}>
                    {value.toLocaleString()}
                  </span>
                </div>
                <div className="bg-gray-200 h-6 w-full rounded overflow-hidden relative">
                  <div
                    className={`h-6 rounded ${barColor}`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

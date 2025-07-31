import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    kpis: [
      {
        label: "Total Sales",
        value: 24500,
        change: 12,
      },
      {
        label: "Active Customers",
        value: 1245,
        change: 5,
      },
      {
        label: "Inventory Status",
        value: 320,
        change: -3,
      },
    ],
    activities: [
      {
        icon: "clock",
        iconBg: "bg-blue-100",
        title: "New customer sign-up",
        subtitle: "Enterprise client from Germany",
        timeAgo: "2 hours ago",
      },
      {
        icon: "check-circle",
        iconBg: "bg-green-100",
        title: "Order #38492 completed",
        subtitle: "$4,320.00 - 8 items",
        timeAgo: "5 hours ago",
      },
      {
        icon: "alert-triangle",
        iconBg: "bg-yellow-100",
        title: "Low inventory alert",
        subtitle: "Product SKU-8829 below threshold",
        timeAgo: "1 day ago",
      },
    ],
    monthlyData: [
      { month: "Jan", value: 8000 },
      { month: "Feb", value: 12000 },
      { month: "Mar", value: 10000 },
      { month: "Apr", value: 15000 },
      { month: "May", value: 13000 },
      { month: "Jun", value: 17000 },
      { month: "Jul", value: 14000 },
    ],
    totalRevenue: 128490,
    revenueChangePercent: 23,
  });
}

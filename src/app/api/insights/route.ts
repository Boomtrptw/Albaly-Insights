// src/app/api/insights/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      title: "Top-Selling Product",
      description: "Product A outperformed by 23%.",
      items: [
        { name: "Product A", value: 45230 },
        { name: "Product B", value: 32180 },
      ],
      trend: "increase",
      percent: 23,
    },
    {
      title: "Regional Performance",
      description: "APAC region showing strongest growth this quarter.",
      items: [
        { name: "North America", value: 245000 },
        { name: "Europe", value: 190000 },
        { name: "APAC", value: 340000 },
      ],
      trend: "increase",
      percent: 8,
    },
    {
      title: "Conversion Funnel",
      description: "Checkout to purchase conversion decreased by 5%.",
      items: [
        { name: "VISITORS", value: 12000 },
        { name: "PRODUCT VIEWS", value: 8400 },
        { name: "ADD TO CART", value: 3600 },
        { name: "PURCHASE", value: 1440 },
      ],
      trend: "decrease",
      percent: 5,
    },
    {
      title: "Drop-Off Rate",
      description: "Week 3 saw a 17% increase in user churn.",
      items: [
        { week: "Week 1", rate: 3 },
        { week: "Week 2", rate: 6 },
        { week: "Week 3", rate: 17 },
        { week: "Week 4", rate: 10 },
      ],
      trend: "increase",
      percent: 17,
    },
  ]);
}

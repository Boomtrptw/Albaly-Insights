"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PieChart, LogOut } from "lucide-react";

const navItems = [
  {
    name: "Overview",
    href: "/overview",
    icon: <Home className="w-5 h-5 mr-2" />,
  },
  {
    name: "Insights",
    href: "/insights",
    icon: <PieChart className="w-5 h-5 mr-2" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between h-full p-4 bg-gray-800 text-white w-64">
      <div>
        <h2 className="text-2xl font-bold mb-6">Albaly Insights</h2>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md ${
                pathname.startsWith(item.href)
                  ? "bg-gray-700 font-semibold"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div>
        <button className="mt-6 px-3 py-2 w-full bg-blue-500 hover:bg-blue-600 rounded-md text-white flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

"use client";

import { User } from "lucide-react";
import { useState } from "react";

export default function Topbar() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex justify-between items-center h-16 px-6 bg-white border-b border-gray-200">
      <h1 className="text-xl font-semibold text-gray-800">Albaly Insights</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">User</span>
        {!imgError ? (
          <img
            src="https://i.pravatar.cc/100"
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <User className="w-8 h-8 text-gray-400" />
        )}
      </div>
    </div>
  );
}

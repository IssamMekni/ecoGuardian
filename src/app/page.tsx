"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"; // أنماط Leaflet
import ChatComponent from "@/components/ChatComponent";

// تحميل مكون الخريطة بشكل ديناميكي لتجنب مشاكل SSR
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const MapPage = () => {
  const center: [number, number] = [36.8065, 10.1815]; // إحداثيات: تونس
  const zoom = 13;

  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <div className="h-screen w-full flex ">
        <div className="h-1/2 w-full p-2">
          <div className="w-full h-full">
            <Map center={center} zoom={zoom} />
          </div>
          <ChatComponent />
        </div>
      </div>
    </main>
  );
};

export default MapPage;

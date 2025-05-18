import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css'; // أنماط Leaflet

// تحميل مكون الخريطة بشكل ديناميكي لتجنب مشاكل SSR
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const MapPage = () => {
  const center: [number, number] = [36.8065, 10.1815]; // إحداثيات: تونس
  const zoom = 13;

  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <div className="h-full w-full">
        <Map center={center} zoom={zoom} />
      </div>
    </main>
  );
};

export default MapPage;

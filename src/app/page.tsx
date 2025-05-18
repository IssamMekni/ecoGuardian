"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css"; // أنماط Leaflet
import ChatComponent from "@/components/ChatComponent";
import QuizComponent from "@/components/QuizComponent";

import MyFoot from "@/app/foot/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// تحميل مكون الخريطة بشكل ديناميكي لتجنب مشاكل SSR
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const MapPage = () => {
  const center: [number, number] = [36.8065, 10.1815]; // إحداثيات: تونس
  const zoom = 13;

  return (
    <main className="flex items-center justify-center h-screen w-screen">
      <Tabs defaultValue="maps" className="h-screen w-screen flex flex-col">
        <TabsList className="flex w-full">
          <TabsTrigger value="maps">maps</TabsTrigger>
          <TabsTrigger value="foot">foot print</TabsTrigger>
        </TabsList>
        <TabsContent value="foot">
          <MyFoot />
        </TabsContent>
        <TabsContent value="maps" className="h-full grid grid-rows-2">
          <div className="">
            <Map center={center} zoom={zoom} />
          </div>
          <div className="">
            <Tabs defaultValue="chat" className="m-auto max-h-[400px]  w-full flex flex-col overflow-auto">
              <TabsList className="flex w-full absolute z-50">
                <TabsTrigger value="chat">chat</TabsTrigger>
                <TabsTrigger value="quiz">quiz</TabsTrigger>
              </TabsList>
              <TabsContent value="quiz" className="mt-12">
                <QuizComponent />
              </TabsContent>
              <TabsContent value="chat" className="mt-12">
                <ChatComponent />
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default MapPage;

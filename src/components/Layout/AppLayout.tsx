import { ReactNode, Suspense, lazy } from "react";
import MockStockTicker from "@/mocks/MockStockTicker";
import AccountOverview from "@/components/Account/AccountOverview";
import MockOrderBook from "@/mocks/MockOrderBook";
import TimeAndSales from "@/components/TimeAndSales/TimeAndSales";
import TradePanel from "@/components/TradePanel/TradePanel";
import Watchlist from "../Watchlist/Watchlist";
import NewsFeed from "../Newsfeed/Newsfeed";

// ApexCharts is ~70% of the bundle; load it in its own chunk so the rest of the UI renders first.
const CandlestickChart = lazy(() => import("@/components/Charts/CandlestickChart"));

export default function AppLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-zinc-700">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search Ticker"
            className="p-2 rounded-md"
          />
        </div>
        <MockStockTicker />
        <AccountOverview />
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-[250px] flex flex-col border-r border-zinc-700 overflow-y-auto">
          <Watchlist />
        </aside>

        {/* Center Panel */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Chart */}
          <div className="flex-1 overflow-hidden p-4">
            <Suspense fallback={<div className="h-[350px] rounded bg-zinc-900 animate-pulse" />}>
              <CandlestickChart />
            </Suspense>
            {children}
          </div>

          {/* Secondary Panel */}
          <div className="h-[300px] border-t border-zinc-700 overflow-hidden p-4">
            <div className="flex flex-row gap-4 h-full">
              <div className="flex-1 overflow-auto bg-zinc-900 p-2 rounded">
                {/* <h3>Order Book</h3> */}
                <MockOrderBook />
              </div>
              <div className="flex-1 overflow-auto bg-zinc-900 p-2 rounded">
                <TimeAndSales />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-[300px] flex flex-col border-l border-zinc-700 overflow-y-auto">
          {/* News Feed */}
          <div className="flex-1 overflow-auto p-4">
            <NewsFeed />
          </div>

          {/* Trade Panel */}
          <div className="border-t border-zinc-700 p-4">
            {/* Insert TradePanel here */}
            <div className="bg-zinc-900 rounded-lg p-4">
              <TradePanel />
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="p-4 border-t border-zinc-700 text-center text-sm">
        ⏱️ 09:30:05 | Latency: 20ms | Server: US-East | Terms

      </footer>
    </div>
  );
}

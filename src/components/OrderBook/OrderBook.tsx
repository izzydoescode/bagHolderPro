import { useState } from "react";
// import { OrderBook } from "@/types/marketData";
import { useFinnhubSocket } from "@/hooks/useFinnhubSocket";
import { Card } from "@/components/ui/Card";
import { CardContent } from "@/components/ui/CardContent";

interface Order {
  price: number;
  size: number;
  side: "bid" | "ask";
}

// TODO: wire with live level 2 data

export default function OrderBook() {
  const [orders, setOrders] = useState<Order[]>([]);

  useFinnhubSocket(["AAPL"], (data) => {
    if (data && data.length > 0) {
      const trade = data[0];

      const side: Order["side"] = Math.random() > 0.5 ? "bid" : "ask"; // Randomize side for demo

      setOrders((prevOrders) => {
        const updated = [...prevOrders, { price: trade.p, size: trade.v, side }];

        // Keep only the latest 20 orders
        return updated.slice(-20);
      });
    }
  });

  const bids = orders.filter(o => o.side === "bid").sort((a, b) => b.price - a.price);
  const asks = orders.filter(o => o.side === "ask").sort((a, b) => a.price - b.price);


  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold text-green-400 mb-2">Bids</h2>
          <div className="space-y-1">
            {bids.map((order, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span>${order.price.toFixed(2)}</span>
                <span>{order.size}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold text-red-400 mb-2">Asks</h2>
          <div className="space-y-1">
            {asks.map((order, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span>${order.price.toFixed(2)}</span>
                <span>{order.size}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

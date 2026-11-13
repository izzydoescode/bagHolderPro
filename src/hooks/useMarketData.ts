import { useEffect } from 'react';
import { useMarketStore } from "@/stores/useMarketStore";
import { MarketStoreState } from '../types/marketData';

export function useMarketData() {
    const updateTicker = useMarketStore((state: MarketStoreState) => state.updateTicker);
    const updateBook = useMarketStore((state: MarketStoreState) => state.updateBook);

    useEffect(() => {
        const interval = setInterval(() => {
            const price = +(100 + Math.random() * 2).toFixed(2);

            
            const mockTicker = {
                symbol: 'AAPL',
                price,
                volume: Math.floor(1000 + Math.random() * 500),
                bid: +(price - Math.random()).toFixed(2),
                ask: +(price + Math.random()).toFixed(2),
            };
            
            const mockBids = Array.from({ length: 5 }, () => ({
                price: +(price - Math.random() * 1.5).toFixed(2),
                size: Math.floor(5 + Math.random() * 10),
            }));
            
            const mockAsks = Array.from({ length: 5 }, () => ({
                price: +(price + Math.random() * 1.5).toFixed(2),
                size: Math.floor(5 + Math.random() * 10),
            }));
            
            updateTicker(mockTicker);
            updateBook(mockBids, mockAsks);
        }, 3000);

        return () => clearInterval(interval);
      }, [updateTicker, updateBook]);
    }

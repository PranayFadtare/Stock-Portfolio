import React from "react";
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';

function TradingViewChart() {
  return (
    <AdvancedRealTimeChart
      width="100%"
      height={600}
      symbol="NASDAQ:AAPL"
      interval="D"
      timezone="exchange"
      theme="light"
      style="1"
      locale="en"
      toolbar_bg="#f1f3f6"
      enable_publishing={false}
      allow_symbol_change={true}
      container_id="tradingview_chart"
    />
  );
}

export default TradingViewChart;

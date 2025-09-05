class ApiService {
  async getSampleData() {
    try {
      const [positions, activity, value, markets] = await Promise.all([
        fetch('./data/sample_positions.json').then(r => r.json()),
        fetch('./data/sample_activity.json').then(r => r.json()),
        fetch('./data/sample_value.json').then(r => r.json()),
        fetch('./data/sample_markets.json').then(r => r.json())
      ])

      return { positions, activity, value, markets }
    } catch (error) {
      console.error('Error loading sample data:', error)
      return this.getFallbackData()
    }
  }

  getFallbackData() {
    return {
      positions: {
        data: [
          {
            wallet: "0xDEMO",
            conditionId: "0xcondDEMO1",
            outcomeIndex: 1,
            size: 120,
            avgPrice: 0.32,
            currentValue: 150,
            cashPnl: 30,
            percentPnl: 0.25,
            endDate: "2025-09-19T21:07:56.854455Z",
            slug: "demo-market-1",
            title: "Will BTC close above $70k this month?",
            category: "Crypto",
            tags: ["btc", "price", "monthly"]
          }
        ]
      },
      activity: {
        data: [
          {
            type: "trade",
            side: "BUY",
            price: 0.32,
            size: 120,
            usdcSize: 38.4,
            outcomeIndex: 1,
            timestamp: "2025-08-26T21:07:56.855032Z",
            marketEndDate: "2025-09-19T21:07:56.855047Z",
            proxyWallet: "0xPROXYDEMO"
          }
        ]
      },
      value: { data: { total: 12456.78 } },
      markets: {
        data: [
          {
            conditionId: "0xMKT1",
            question: "Will BTC be above $80k by Oct 31?",
            slug: "btc-above-80k-oct-31",
            category: "Crypto",
            tags: ["btc", "price"],
            endDate: "2025-10-25T21:07:56.855919Z",
            bestBid: 0.27,
            bestAsk: 0.29,
            oneDayPriceChange: 0.02,
            volume24hr: 45231,
            liquidityNum: 75,
            enableOrderBook: true
          },
          {
            conditionId: "0xMKT2",
            question: "Will Apple announce a foldable iPhone in 2025?",
            slug: "apple-foldable-2025",
            category: "Tech",
            tags: ["apple", "hardware"],
            endDate: "2026-01-03T21:07:56.855931Z",
            bestBid: 0.14,
            bestAsk: 0.16,
            oneDayPriceChange: -0.01,
            volume24hr: 11200,
            liquidityNum: 40,
            enableOrderBook: true
          }
        ]
      }
    }
  }
}

export const apiService = new ApiService()
// Minimal WebSocket handler for Polymarket Market channel
// If it fails, we degrade gracefully.
export class MarketWSS {
  constructor({ onUpdate, onStatus }) {
    this.ws = null;
    this.onUpdate = onUpdate || (()=>{});
    this.onStatus = onStatus || (()=>{});
    this.subscribed = new Set();
    this.connected = false;
  }

  connect() {
    try {
      this.ws = new WebSocket('wss://ws-subscriptions-clob.polymarket.com/ws/market');
      this.ws.onopen = () => {
        this.connected = true;
        this.onStatus({ state: 'open' });
        // Resubscribe if any
        if (this.subscribed.size) {
          this._sendSubscribe([...this.subscribed]);
        }
      };
      this.ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          // Expect messages with market updates, format varies; we attempt generic handling
          if (msg.market || msg.conditionId || msg.event === 'book' || msg.event === 'price_change' || msg.last_trade_price) {
            this.onUpdate(msg);
          }
        } catch {}
      };
      this.ws.onclose = () => {
        this.connected = false;
        this.onStatus({ state: 'closed' });
      };
      this.ws.onerror = () => {
        this.onStatus({ state: 'error' });
      };
    } catch {
      this.onStatus({ state: 'error' });
    }
  }

  subscribe(conditionIds=[]) {
    for (const id of conditionIds) this.subscribed.add(id);
    if (this.connected) this._sendSubscribe(conditionIds);
  }

  _sendSubscribe(conditionIds) {
    // Best-effort generic subscription message.
    // Actual schema may differ; this keeps UI optional.
    try {
      const payload = {
        type: 'subscribe',
        channels: conditionIds.map(id => ({ name: 'market', market: id }))
      };
      this.ws?.send(JSON.stringify(payload));
    } catch {}
  }
}

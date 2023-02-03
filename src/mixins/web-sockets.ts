import {useStore} from "vuex";
import {key} from "@/store";
import {Order} from "@/interfaces/order.interface";
import {ORDERS_LIMIT} from "@/config";

export const webSockets = {
    method: {
        webSocket(currentSymbol: string): void {
            const $store = useStore(key);

            const currentWebSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${currentSymbol.toLowerCase()}usdt@depth`);
            currentWebSocket.onmessage = (event: { data: string }) => {
                const currentBinancePrices = JSON.parse(event.data);

                this.updateOrdersInMainStore(currentBinancePrices.a, $store.state.asks);
                this.updateOrdersInMainStore(currentBinancePrices.b, $store.state.bids);


                $store.commit('sortOrders');

                $store.state.asks = $store.state.asks.slice(0, ORDERS_LIMIT);
                $store.state.bids = $store.state.bids.slice(0, ORDERS_LIMIT);
            }

            $store.state.wsSubscription = currentWebSocket;
        },

        updateOrdersInMainStore(currentBinancePrices: string[][], orders: Order[]) {
            currentBinancePrices.forEach((el: string[]) => {
                const price = Number(el[0]);
                const quantity = Number(el[1]);

                if (quantity) {
                    let foundedOrder: Order | undefined = orders.find(element => element.price === price);
                    if (foundedOrder) {
                        const newQuantity = foundedOrder.quantity + quantity;
                        foundedOrder = {
                            price,
                            quantity: newQuantity,
                            total: (foundedOrder.price * newQuantity).toFixed(3)

                        }
                    } else {
                        orders.push({
                            price,
                            quantity,
                            total: (price * quantity).toFixed(3)
                        })
                    }
                }
            })
        },

        closeWS() {
            const $store = useStore(key);
            $store.state.wsSubscription && $store.state.wsSubscription.close();
        }
    }
}

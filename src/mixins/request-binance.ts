import axios from "axios";
import {useStore} from "vuex";
import {key} from "@/store";
import {Order} from "@/interfaces/order.interface";
import {API_URL, ORDERS_LIMIT} from "@/config";

export const requestBinance = {
    method: {
        getAllOrders(currentSymbol: string): void {
            const $store = useStore(key)

            axios.get(`${API_URL}/api/v3/depth?symbol=${currentSymbol}USDT&limit=${ORDERS_LIMIT}`)
                .then(e => {
                    $store.state.asks = this.handleNewOrders(e.data.asks);
                    $store.state.bids = this.handleNewOrders(e.data.bids);

                    $store.commit('sortOrders');
                })
        },

        getAllSymbols() {
            return axios.get(`${API_URL}/api/v3/exchangeInfo`);
        },

        handleNewOrders(orders: string[][]): Order[] {
            return orders.map((el: string[]) => {
                const price = Number(el[0]);
                const quantity = Number(el[1]);

                return {
                    price: price,
                    quantity: quantity,
                    total: (price * quantity).toFixed(3)
                }
            });
        }
    }
}



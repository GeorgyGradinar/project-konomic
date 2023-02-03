import {createStore, Store} from 'vuex'
import {Order} from "@/interfaces/order.interface";
import {InjectionKey} from "vue";
import {DEFAULT_SYMBOL} from "@/config";

export interface StoredData {
    asks: Order[],
    bids: Order[],
    currentSymbol: string,
    wsSubscription: WebSocket | null,
    currentCrypto: string,
}

export const store = createStore({
    state(): StoredData {
        return {
            asks: [],
            bids: [],
            currentSymbol: '',
            wsSubscription: null,
            currentCrypto: DEFAULT_SYMBOL
        }
    },

    mutations: {
        sortOrders (state: StoredData) {
            state.asks.sort((a: Order, b: Order) => a.price - b.price);
            state.bids.sort((a: Order, b: Order) => a.price - b.price);
        }
    }
})

export const key: InjectionKey<Store<StoredData>> = Symbol();

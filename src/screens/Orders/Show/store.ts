import { makeAutoObservable } from "mobx";
import { SingleOrder } from "~/screens/Orders/Show/types";
import { ORDER_QUERY } from "./queries";
import client from "~/api/gql";

export default class OrdersShowStore {
  order: SingleOrder | null = null;
  id: string | null = null;
  initialized = false;
  loading = false;

  constructor(id: string) {
    makeAutoObservable(this);
    this.id = id;
  }

  setInitialized(val: boolean) {
    this.initialized = val;
  }

  setOrder(order: SingleOrder): void {
    this.order = order;
  }

  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }

  async loadOrder() {
    this.loading = true;

    try {
      const response = await client
        .query(ORDER_QUERY, { number: this.id })
        .toPromise();
      const data = response.data.order;
      console.log(data);

      this.setOrder(data);
    } catch (err) {
      console.log("Error loading orders:", err);
    }

    this.loading = false;
  }

  initialize() {
    if (this.initialized) return;
    this.initialized = true;
    this.loadOrder();
  }
}

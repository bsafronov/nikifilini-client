import React from "react";
import OrdersShowStore from "./store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import styles from "./styles.m.styl";
import { useEffect } from "react";
import Item from "./components/Item";
import { map } from "lodash";
import { SingleOrderItem } from "./types";
import OrderStatus from "~/components/OrderStatus";
import DeliveryType from "~/components/DeliveryType";

type ShowParams = {
  id: string;
};

const OrdersShow = observer(
  (): JSX.Element => {
    const { id } = useParams<ShowParams>();
    const [state] = React.useState(new OrdersShowStore(id));

    useEffect(() => {
      if (state.initialized) return;
      state.initialize();
    });

    return (
      <div className={styles.screenWrapper}>
        {state.loading && <div>Loading...</div>}

        {!state.loading && (
          <div className={styles.screen}>
            <div className={styles.custom}>
              <h3>Здесь может быть детальное описание заказа {id}</h3>
              {state.order?.status && (
                <div className={styles.row}>
                  <span>Статус:</span>
                  <OrderStatus code={state.order?.status} />
                </div>
              )}
              {state.order?.delivery.code && (
                <div className={styles.row}>
                  <span>Доставка:</span>
                  <DeliveryType code={state.order?.delivery.code} />
                </div>
              )}
            </div>
            <h5>Список товаров:</h5>
            <div className={styles.items}>
              {map(state.order?.items, (item: SingleOrderItem, index) => (
                <Item key={index} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default OrdersShow;

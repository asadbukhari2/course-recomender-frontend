import { initStore } from "./store";

const configureCartStore = () => {
  const actions = {
    FETCH_CART: (currState, items) => {
      currState.cart.items = items;
      return currState;
    },

    INITIATING_CART: (currState, product) => {
      currState.cart.items.push(product);
      return currState;
    },

    ADD_CART: (currState, product) => {
      currState.cart.items.push(product);
      currState.cart.items.map((item) => {
        if (item.sku >= item.quantity && item.sku > 1) {
          item.sku -= item.quantity;
        }
      });
      return currState;
    },

    ADDITION_CART: (currState, product) => {
      currState.cart.items.map((item) => {
        if (item.id === product.id) {
          item.quantity += 1;
          item.total_price = item.quantity * item.price;
        }
      });
      return currState;
    },

    SUBTRACTION_CART: (currState, product) => {
      currState.cart.items.map((item) => {
        if (item.id === product.id) {
          if (item.quantity > 1) {
            item.quantity -= 1;
            item.total_price = item.quantity * item.price;
            item.sku += 1;
          }
        }
      });
      return currState;
    },

    DELETION_CART: (currState, product) => {
      currState.cart.items.map((item) => {
        if (item.id === product.id) {
          const index = currState.cart.items.indexOf(product);
          if (index !== -1) {
            currState.cart.items.splice(index, 1);
          }
        }
      });
      return currState;
    },

    EMPTY_CART: (currState) => {
      console.log("EMPTY_ART");
      currState.cart.items = [];
      localStorage.removeItem("cart");
      return currState;
    },
  };

  initStore(actions, {
    cart: {
      items: [],
      loading: false,
      purchased: false,
    },
  });
};

export default configureCartStore;

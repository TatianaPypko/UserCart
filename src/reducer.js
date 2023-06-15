const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };

    case "GET_TOTALS":
      const { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;

          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      const formattedTotal = parseFloat(total.toFixed(2));
      return { ...state, total: formattedTotal, amount };

    case "TOGGLE_AMOUNT":
      let tempCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload.id) {
            if (action.payload.type === "INCREASE") {
              return { ...cartItem, amount: cartItem.amount + 1 };
            }
            if (action.payload.type === "DECREASE") {
              return { ...cartItem, amount: cartItem.amount - 1 };
            }
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.amount !== 0);
      return { ...state, cart: tempCart };

    case "LOADING_COMPLETE":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;

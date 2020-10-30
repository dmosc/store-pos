export const createOrder = (summary, cart, client) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    db.collection('Ordenes')
      .add({
        cart,
        subtotal: summary.subtotal,
        total: summary.total,
        tax: summary.tax,
        discounts: summary.discounts,
        client,
      })
      .then(() => {
        dispatch({type: 'ORDER_CREATED', summary});
      })
      .catch((err) => {
        dispatch({type: 'ORDER_ERROR', err});
      });
  };
};

const moment = require('moment');

export const createOrder = (summary, cart, client) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const createdDate = moment(new Date()).valueOf();
    db.collection('Ordenes')
      .add({
        cart,
        subtotal: summary.subtotal,
        total: summary.total,
        // tax: summary.tax,
        discounts: summary.discounts,
        client: client.email ? client.email : 'General',
        companyID: 'prueba',
        createdDate,
      })
      .then(() => {
        dispatch({type: 'ORDER_CREATED', summary});
      })
      .catch((err) => {
        dispatch({type: 'ORDER_ERROR', err});
      });
  };
};

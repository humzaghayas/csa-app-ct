import {  actions } from '@commercetools-frontend/sdk';


const fetchResource = async (url, { method = 'GET', headers, body } = {},dispatch) => {

  try{
    const result = await dispatch(actions.forwardTo.get({
        uri: url,
        audiencePolicy: 'forward-url-origin',
        headers: {
          'ngrok-skip-browser-warning': 'bar',
        }
      }));

      console.log('Result FT',result);

      return result;
  }catch (error) {
    console.log('Error',error);
  }


}

const fetchResourcePost = async (url, { headers, body } = {},dispatch) => {
  try{
    const result =await dispatch( actions.forwardTo.post({
        uri: url,
        payload: body,
        headers: {
          'ngrok-skip-browser-warning': 'bar',
        }
      }));

      console.log('Result FT',result);

      return result;
  }catch (error) {
    console.log('Error',error);
  }
}

export const getById = async ({ url, payload },dispatch) => {
  return fetchResourcePost(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
  },dispatch);
};

export const login = async ({ url, payload }) => {
  return fetchResource(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning':true
    },
    body: payload,
  });
};

export const getCategories = async ({ url, query },dispatch) => {
  let queryString;
  if (query) {
    queryString = `?${Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&')}`;
  }
  return await fetchResource(`${url}${queryString || ''}`,{},dispatch);
};

export const getCategory = async ({ url, id }) => {
  return fetchResourcePost(`${url}/${id}`);
};

// export const deleteTicket = async ({ url, id }) => {
//   return fetchResource(`${url}/${id}`, { method: 'DELETE' });
// };

// export const createTicket = async ({ url, payload }) => {
//   return fetchResource(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: payload,
//   });
// };

// export const updateTicket = async ({ url, payload }) => {
//   return fetchResource(`${url}/${payload.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: cleanDefaultShippingAndBilling(payload),
//   });
// };

// export const setDefaultBillingAddress = async ({ url, id, addressId }) => {
//   return fetchResource(`${url}/${id}/setDefaultBillingAddress`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: { addressId },
//   });
// };

// export const setDefaultShippingAddress = async ({ url, id, addressId }) => {
//   return fetchResource(`${url}/${id}/setDefaultShippingAddress`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: { addressId },
//   });
// };

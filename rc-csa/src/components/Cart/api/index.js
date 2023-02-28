import { cleanDefaultShippingAndBilling } from './converter';

const fetchResource = async (url, { method = 'GET', headers, body } = {}) => {
  const response = await fetch(url, {
    method,
    ...(headers && { headers }),
    ...(body && { body: JSON.stringify(body) }),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw data;
};

export const getCompanies = async ({ url, query }) => {
  let queryString;
  if (query) {
    queryString = `?${Object.keys(query)
      .map(key => `${key}=${query[key]}`)
      .join('&')}`;
  }
  return await fetchResource(`${url}${queryString || ''}`);
};

export const getTicket = async ({ url, id }) => {
  return fetchResource(`${url}/${id}`);
};

export const deleteTicket = async ({ url, id }) => {
  return fetchResource(`${url}/${id}`, { method: 'DELETE' });
};

export const createTicket = async ({ url, payload }) => {
  return fetchResource(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
  });
};

export const updateTicket = async ({ url, payload }) => {
  return fetchResource(`${url}/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: cleanDefaultShippingAndBilling(payload),
  });
};

export const setDefaultBillingAddress = async ({ url, id, addressId }) => {
  return fetchResource(`${url}/${id}/setDefaultBillingAddress`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: { addressId },
  });
};

export const setDefaultShippingAddress = async ({ url, id, addressId }) => {
  return fetchResource(`${url}/${id}/setDefaultShippingAddress`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: { addressId },
  });
};

const fetchResourcePost = async (url, { headers, body } = {}, dispatch) => {
  try {
    const result = await dispatch(
      actions.forwardTo.post({
        uri: url,
        payload: body,
        headers: {
          'ngrok-skip-browser-warning': 'bar',
        },
      })
    );

    console.log('Result FT', result);

    return result;
  } catch (error) {
    console.log('Error', error);
  }
};
// export const sendOrderMail = async ({ url, payload } ) => {
//   return fetchResource(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: payload,

//   }
//   );
// };
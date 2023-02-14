import { actions } from '@commercetools-frontend/sdk';

const fetchResource = async (
  url,
  { method = 'GET', headers, body } = {},
  dispatch
) => {
  try {
    const result = await dispatch(
      actions.forwardTo.get({
        uri: url,
        audiencePolicy: 'forward-url-origin',
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

export const fetchLogin = async (
  url,
  { method = 'GET', headers, body } = {},
  dispatch
) => {
  try {
    const result = await dispatch(
      actions.forwardTo.get({
        uri: url,
        audiencePolicy: 'forward-url-origin',
        headers: {
        'ngrok-skip-browser-warning': 'bar',
        //   Cookie:
        //     'JSESSIONID=HptlRuoZaUG0NEpNSp6GPCIE3KvekwPpewFrCBmj.win10-ranjit-or',
         },
      })
    );

    console.log('Result FT', result);

    return result;
  } catch (error) {
    console.log('Error', error);
  }
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

const fetchOrderLoginId = async (url, { headers, body } = {}, dispatch) => {
  try {
    const result = await dispatch(
      actions.forwardTo.post({
        uri: url,
        payload: body,
        headers: {
          'ngrok-skip-browser-warning': 'bar',
          cookie:
            'JSESSIONID=HptlRuoZaUG0NEpNSp6GPCIE3KvekwPpewFrCBmj.win10-ranjit-or',
        },
      })
    );

    console.log('Result FT', result);

    return result;
  } catch (error) {
    console.log('Error', error);
  }
};

const fetchPost = async (url ,header, body,dispatch) => {
  try {
    const result = await dispatch(
      actions.forwardTo.post({
        uri: url,
        payload: body,
        audiencePolicy: 'forward-url-origin',
        includeUserPermissions: true,
        headers: {
          'ngrok-skip-browser-warning': 'bar',
          ...header
        },
      })
    );

    console.log('Result FT', result);

    return result;
  } catch (error) {
    console.log('Error', JSON.stringify (error));
    console.log('Error', error);
  }
};


export const getById = async ({ url, payload }, dispatch) => {
  return fetchResourcePost(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    },
    dispatch
  );
};

export const orderByLogin = async ({ url, payload }, dispatch) => {
  return fetchResourcePost(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    },
    dispatch
  );
};

export const orderLoginId = async ({ url, payload }, dispatch) => {
  return fetchOrderLoginId(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    },
    dispatch
  );
};

export const loginATG = async ( url,headers, payload ,dispatch) => {
  return fetchPost(url,headers,payload,dispatch);
};

export const getCustomer = async ({ url, query }, dispatch) => {
  let queryString;
  if (query) {
    queryString = `?${Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&')}`;
  }
  return await fetchLogin(`${url}${queryString || ''}`, {}, dispatch);
};

export const getCategories = async ({ url, query }, dispatch) => {
  let queryString;
  if (query) {
    queryString = `?${Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&')}`;
  }
  return await fetchResource(`${url}${queryString || ''}`, {}, dispatch);
};

export const getCategory = async ({ url, id }) => {
  return fetchResourcePost(`${url}/${id}`);
};


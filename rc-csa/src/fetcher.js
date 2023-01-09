import createHttpUserAgent from '@commercetools/http-user-agent';
import {
  buildApiUrl,
  executeHttpClientRequest,
} from '@commercetools-frontend/application-shell';


const userAgent = createHttpUserAgent({
    name: 'fetch-client',
    version: '1.0.0',
    libraryName: window.app.applicationName,
    contactEmail: 'support@my-company.com',
  });

export const fetcherForwardTo = async (targetUrl, config = {}) => {
  const data = await executeHttpClientRequest(
    async (options) => {
      const res = await fetch(buildApiUrl('/commerce-tools-b2b-services/us-central1/getTickets'), {method:"get"});
      const data = res.json();
      return {
        data,
        statusCode: res.status,
        getHeader: (key) => res.headers.get(key),
      };
    },
    {
      userAgent,
      headers: config.headers,
      forwardToConfig: {
        uri: targetUrl
      }
    }
  );
  return data;
};

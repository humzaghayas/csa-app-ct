import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { entryPointUriPath, PERMISSIONS } from '../../../../constants';
import { Pagination } from '@commercetools-uikit/pagination';
import {
  Link as RouterLink,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import DataTable from '@commercetools-uikit/data-table';
import ToggleInput from '@commercetools-uikit/toggle-input';

import Spacings from '@commercetools-uikit/spacings';
import { MailIcon, PlusBoldIcon } from '@commercetools-uikit/icons';

import { useCustomersCartsFetcher, useCustomersCreateCart, useCustomersOrdersFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';
import { showNotification } from '@commercetools-frontend/actions-global';
import { DOMAINS } from '@commercetools-frontend/constants';
import { CollapsiblePanel, SecondaryButton, SelectField } from '@commercetools-frontend/ui-kit';
import { getDefaultCountryToCurrency } from 'ct-tickets-helper-api'

const CustomerCart = (props) => {
  const intl = useIntl();
  const match = useRouteMatch();
  const { push } = useHistory();
  const params = useParams();

  const OrderId = params.id;

  const [isClosedCommentsPanel, setIsClosedCommentsPanel] = useState(true);
  const [cartCountry, setCartCountry] = useState(null);
  const [cartCurrency, setCartCurrency] = useState(null);
  const [currencyList, setCurrencyList] = useState(null);

  const { projectKey, countries, currencies } = useApplicationContext((context) => ({
    projectKey: context.project.key,
    countries: context.project.countries,
    currencies: context.project.currencies,
  }));

  let countriesToCurrency = {};

  for (const c of countries) {
    const curr = getDefaultCountryToCurrency(c);

    if (!countriesToCurrency[c]) {
      countriesToCurrency[c] = [];
    }
    if (currencies.includes(curr)) {
      countriesToCurrency[c].push({ label: curr, value: curr });
    }
  }

  const getCartCountries = countries.map(c => ({ label: c, value: c }));

  // const [query] = useState(QUERY);
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState('createdAt desc');
  const customerId = props.customer?.id;
  console.log("params", params);
  console.log("props", props);
  const { customersCartPaginatedResult, error, loading, refetch } = useCustomersCartsFetcher({
    page,
    perPage,
    tableSorting,
    customerId,
  });

  const columns = [
    { key: 'id', label: 'Cart Number' },
    { key: 'customerEmail', label: 'Email' },
    { key: 'totalPrice', label: 'Cart Total' },
    { key: 'lineItems', label: 'No of Order Items ' },
    { key: 'totalItems', label: 'Total Items' },
    { key: 'cartState', label: 'Status' },
    { key: 'createdAt', label: 'Date Created' },
  ];

  const itemRenderer = (item, column) => {
    switch (column.key) {
      case 'totalPrice':
        return amountCalculator(
          item?.totalPrice?.centAmount,
          item?.totalPrice?.fractionDigits
        );
      case 'customerEmail':
        return item?.customerEmail;
      case 'lineItems':
        return item?.lineItems?.length;
      case 'totalItems':
        return item?.lineItems.map(item => item.quantity).reduce((a, b) => a + b, 0)
      default:
        return item[column.key];
    }
  };
  function amountCalculator(centAmount, fractionDigits) {
    centAmount = centAmount / 100;
    centAmount = '$' + centAmount + '.00';
    return centAmount;
  }
  const { createCart } = useCustomersCreateCart()
  const createCartForCustomer = async () => {
    await createCart(customerId, cartCurrency, cartCountry);

    await refetch();

    showNotification({
      kind: 'success',
      domain: DOMAINS.SIDE,
      text: "Cart Created Successfully",
    });
  }

  return (
    <Spacings.Stack scale="xl">

      <Spacings.Stack scale="l">

        <CollapsiblePanel
          isClosed={isClosedCommentsPanel}
          onToggle={() => { setIsClosedCommentsPanel(!isClosedCommentsPanel); }}
          header={"Order On Behalf Of " + props?.customer?.firstName}  >
          <Spacings.Stack scale="l">
            <Spacings.Inline>
              <SelectField
                name="cCountry"
                title="Country"
                value={cartCountry}
                onChange={(e) => {
                  const v = e.target.value;

                  if (v) {
                    setCartCountry(v);
                    setCurrencyList(countriesToCurrency[v])
                  }
                }}
                options={getCartCountries}
                horizontalConstraint={13}
              />
              <SelectField
                name="cCurrency"
                title="Currency"
                value={cartCurrency}
                onChange={(e) => {
                  setCartCurrency(e.target.value)
                }}
                options={currencyList}
                horizontalConstraint={13}
                isDisabled={cartCountry === null}
              />
            </Spacings.Inline>
            <Spacings.Stack scale="m">
              <SecondaryButton
                label="Create Cart"
                data-track-event="click"
                onClick={createCartForCustomer}
                iconLeft={<PlusBoldIcon />}
                size="medium"
                isDisabled={cartCountry === null || cartCurrency === null}
              />
            </Spacings.Stack>
          </Spacings.Stack>
        </CollapsiblePanel>

      </Spacings.Stack>

      {customersCartPaginatedResult ? (
        <Spacings.Stack scale="l">
          <ToggleInput
            isDisabled={false}
            isChecked={true}
            onChange={(event) => alert(event.target.checked)}
            size="medium"
          />


          <DataTable
            isCondensed
            columns={columns}
            rows={customersCartPaginatedResult?.results}
            itemRenderer={(item, column) => itemRenderer(item, column)}
            maxHeight={600}

            onRowClick={(row) => push(`/${projectKey}/${entryPointUriPath}/cart-edit/${row.id}/cart-general`)}
          />
          <Pagination
            page={page.value}
            onPageChange={page.onChange}
            perPage={perPage.value}
            onPerPageChange={perPage.onChange}
            totalItems={customersCartPaginatedResult.total}
          />

        </Spacings.Stack>
      ) : "Loading..."}
    </Spacings.Stack>
  );
};
CustomerCart.displayName = 'CusotmerCartList';
CustomerCart.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};
export default CustomerCart;

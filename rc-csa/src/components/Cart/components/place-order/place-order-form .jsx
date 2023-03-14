import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import Constraints from '@commercetools-uikit/constraints';
import { useHistory, useParams } from 'react-router-dom';
//import { useEmployeeDetailsFetcher } from '../../../../hooks/use-employee-connector/use-employeee-graphql-connector';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import {
  CheckboxInput,
  DataTable,
  PlusBoldIcon,
  PrimaryButton,
  SecondaryButton,
  SecondaryIconButton,
} from '@commercetools-frontend/ui-kit';
import { useState } from 'react';
//  import EmployeeAddressDetail from '../employee-address-details';
//  import EmployeeAddAddress from '../employee-add-address';
//import ChannelDeletion from './place-order-popup';
import CustomPopup from './CustomPopup';
import { COUNTRY } from './constants';
import {
  useFetchCartById,
  usePlaceOrderFromCart,
} from '../../../../hooks/use-cart-connector/use-cart-connector';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

const columns = [
  { key: 'product', label: 'Product' },
  { key: 'unitPrice', label: 'Original Unit Price' },
  { key: 'unitPrice', label: 'Unit Price' },
  { key: 'quantity', label: 'Qty' },
  // { key: 'lineItemState', label: 'LineItemState' },
  { key: 'subTotalPrice', label: 'Sub Total' },
  { key: 'tax', label: 'Tax' },
  { key: 'totalPrice', label: 'Total' },
];

const itemRenderer = (item, column) => {
  switch (column.key) {
    case 'product':
      return (
        <div>
          <Spacings.Stack scale="s">
            <Spacings.Inline>
              <img src={item.product.image} height={65} width={65} />
              <Spacings.Stack scale="s">
                <div>{item.product.name}</div>
                <div>SKU: {item.product.sku}</div>
                <div>Key: {item.product.key}</div>
              </Spacings.Stack>
            </Spacings.Inline>
          </Spacings.Stack>
        </div>
      );
    default:
      return item[column.key];
  }
};

const PlaceOrderForm = (props) => {
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };
  const { projectKey } =useApplicationContext((context) => ({
    projectKey:context.project.key
  }));
  const intl = useIntl();
  const params = useParams();
  const match = useRouteMatch();
  const history = useHistory();
  const { push } = useHistory();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    //  isShown:props.isShown,
    validate,
    enableReinitialize: true,
  });
  const [visibility, setVisibility] = useState(props.isShown);
  console.log('intialvaluessssssss', props.initialValues);
  console.log(props.id);

  const formElements = (
    <Spacings.Stack scale="l">
      <Spacings.Stack scale="s">
        <Spacings.Stack scale="m">
          <CollapsiblePanel
            data-testid="quote-summary-panel"
            header={
              <CollapsiblePanel.Header>
                {/* {formatMessage(messages.panelTitle)} */}
                {'Line Items'}
              </CollapsiblePanel.Header>
            }
            scale="l"
          >
            <Spacings.Stack scale="s">
              <Constraints.Horizontal min={13}>
                <Spacings.Stack scale="m">
                  {formik?.values?.lineItems ? (
                    <DataTable
                      rows={formik.values.lineItems}
                      columns={columns}
                      itemRenderer={itemRenderer}
                    />
                  ) : null}
                </Spacings.Stack>
              </Constraints.Horizontal>
            </Spacings.Stack>
          </CollapsiblePanel>
        </Spacings.Stack>
      </Spacings.Stack>
      <Spacings.Stack scale="s">
        <CustomPopup
          onClose={popupCloseHandler}
          show={props.isShown}
          title="Order Created"
        >
          <br />
          <h5>ID: {props.id}</h5>
          <br />
          <SecondaryIconButton onClick={formik.handleReset} label="Cancel" />
          <Spacings.Stack>
            <Spacings.Inline>
              <PrimaryButton
                label="View order"
                onClick={() =>
                  push(
                    `/${projectKey}/csa-customer-tickets/order-edit/${props.id}/orders-general`
                  )
                }
                size="big"
              />
            </Spacings.Inline>
          </Spacings.Stack>

          {/* <h2>This is my lorem ipsum text here!</h2> */}
        </CustomPopup>
      </Spacings.Stack>
    </Spacings.Stack>
  );

  return props.children({
    formElements,
    values: formik.values,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: formik.handleSubmit,
    handleReset: formik.handleReset,
  });
};
PlaceOrderForm.displayName = 'PlaceOrderForm';
PlaceOrderForm.propTypes = {
  //onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  //isShown:PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default PlaceOrderForm;

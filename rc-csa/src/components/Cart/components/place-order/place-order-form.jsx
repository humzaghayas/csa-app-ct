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
import { useParams } from 'react-router-dom';
//import { useEmployeeDetailsFetcher } from '../../../../hooks/use-employee-connector/use-employeee-graphql-connector';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import {
  CheckboxInput,
  DataTable,
  PrimaryButton,
  SecondaryButton,
} from '@commercetools-frontend/ui-kit';
//  import EmployeeAddressDetail from '../employee-address-details';
//  import EmployeeAddAddress from '../employee-add-address';
import ChannelDeletion from './place-order-popup';
import CustomPopup from './CustomPopup';

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
  const intl = useIntl();
  //const params = useParams();
  const match = useRouteMatch();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    validate,
    enableReinitialize: true,
  });

  //const { employee } = useEmployeeDetailsFetcher(params.id);

  const formElements = (
    <Spacings.Stack scale="l">
      <Spacings.Stack scale="s">
        <Spacings.Inline>
          {/* <SecondaryButton onClick={formik.handleReset} label="Cancel" />
          <PrimaryButton onClick={formik.handleSubmit} label="Confirm" /> */}
        </Spacings.Inline>
      </Spacings.Stack>

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
              {/* <SecondaryButton iconLeft={<PlusBoldIcon />} label="Place Order" onClick={() => setValue(true)} /> */}

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
          {/* </Spacings.Inline> */}
        </CollapsiblePanel>
      </Spacings.Stack>
      <Spacings.Stack scale="s">
        <CustomPopup />
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
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default PlaceOrderForm;

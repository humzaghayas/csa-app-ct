import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import Spacings from '@commercetools-uikit/spacings';
import { lazy, useState, useEffect } from 'react';
// import validate from './validate';
// import messages from './messages';
import { docToFormValues } from './conversions';
// import { usePaginationState, useDataTableSortingState, } from '@commercetools-uikit/hooks';
import { useParams } from 'react-router-dom';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import DataTable from '@commercetools-uikit/data-table';
// import img from '../../../../assets/images/TicketLogo.png';
import FieldLabel from '@commercetools-uikit/field-label';
import Constraints from '@commercetools-uikit/constraints';
import { PlusBoldIcon  ,  ExportIcon} from '@commercetools-uikit/icons';
import { CHANNEL_ROLES } from './constants';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { getTicket } from '../../api';
import requiredApproval from '../required-approval';
import { useHistory } from 'react-router-dom';

const getRoleOptions = Object.keys(CHANNEL_ROLES).map((key) => ({
  label: CHANNEL_ROLES[key],
  value: CHANNEL_ROLES[key],
}));

const TicketRules = (props) => {
  const intl = useIntl();
  const params = useParams();
  // const match = useRouteMatch();
  const { push } = useHistory();
  // const [id] = useState(id);
  // const { page, perPage } = usePaginationState();
  // const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
  const [Ticket, setData] = useState();

  //const apiUrl ="http://localhost:4456";
  const apiUrl = 'https://ms-Ticket-f4b4o225iq-ue.a.run.app';
  // const id = params.id;
  const TicketId = params.id;
  //  const TicketId = '9e7e7700-3f38-11ed-920a-5ffc1af93431';
  useEffect(() => {
    getTicket({ url: apiUrl, id: TicketId }).then((res) => setData(res));
  }, [apiUrl, TicketId]);

  console.log('Ticket', Ticket);

  const { dataLocale, languages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    languages: context.project.languages,
  }));
  const formik = useFormik({
    // We assume that the form is empty. Therefore, we need to provide default values.
    initialValues: docToFormValues(props.data, languages),
    // validate,
    onSubmit: async (formikValues) => {
      alert(`name: ${formikValues.name}`);
      // Do something async
    },
  });
  const rows = [{ Role: Ticket?.budget[0].rol, Currency: Ticket?.budget[0].amount.currencyCode, Amount: Ticket?.budget[0].amount.centAmount }];

  const columns = [
    { key: 'Role', label: 'Role' },
    { key: 'Currency', label: 'Currency' },
    { key: 'Amount', label: 'Amount' },
  ];

  const rows1 = [{ Role: Ticket?.requiredApprovalRoles[0].rol, Currency: Ticket?.requiredApprovalRoles[0].amount.currencyCode, Amount: Ticket?.requiredApprovalRoles[0].amount.centAmount }];

  const columns1 = [
    { key: 'Role', label: 'Role' },
    { key: 'Currency', label: 'Currency' },
    { key: 'Amount', label: 'Amount' },
  ];
  const wwidth = "800 px"

  // const formElements = (
  return (
    <Spacings.Stack scale="l">
      <CollapsiblePanel
        data-testid="quote-summary-panel"
        header={
          <CollapsiblePanel.Header>
            {/* {formatMessage(messages.panelTitle)} */}
            {'Order approval Information'}
          </CollapsiblePanel.Header>
        }
      >
        <SelectField
          name="roles"
          title="Approver roles"
          value={formik.values.roles}
          errors={formik.errors.roles}
          touched={formik.touched.roles}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isMulti
          options={getRoleOptions}
          isReadOnly={props.isReadOnly}
          isRequired
          horizontalConstraint={13}
        />
      </CollapsiblePanel>
      {/* <Spacings.Stack scale="s"> */}
        <CollapsiblePanel
          data-testid="quote-summary-panel"
          header={
            <CollapsiblePanel.Header>
              {/* {formatMessage(messages.panelTitle)} */}
              {'Requires approval'}
            </CollapsiblePanel.Header>
          }
        >
          {/* <Spacings.Stack scale="s"> */}

          {/* <Spacings.Inline> */}
           <Constraints.Horizontal >
          <Spacings.Stack scale="s">
          <Spacings.Stack scale="xs">
          <SecondaryButton
            label="Add Required approval Rule"
            data-track-event="click"
            onClick={() => push(`required-approval`)}
            iconLeft={<PlusBoldIcon />}
            size="medium"
          />
          </Spacings.Stack>
          {/* </Spacings.Inline> */}
          {/* <Constraints.Horizontal min={13}> */}
          <Spacings.Stack scale="xs">
             <Constraints.Horizontal min={13}>
            <DataTable rows={rows1} columns={columns1} minWidth={wwidth} />

          </Constraints.Horizontal>
          </Spacings.Stack>
          <Spacings.Stack scale="xs">
          <SecondaryButton
            label="Add new Rule"
            data-track-event="click"
            onClick={() => push(`add-new-rule`)}
            iconLeft={<PlusBoldIcon />}
            size="medium"
          />
           </Spacings.Stack>
           </Spacings.Stack>
           </Constraints.Horizontal>
        </CollapsiblePanel>
      {/* </Spacings.Stack> */}
      <CollapsiblePanel
        data-testid="quote-summary-panel"
        header={
          <CollapsiblePanel.Header>
            {/* {formatMessage(messages.panelTitle)} */}
            {'Ticket Budgets'}
          </CollapsiblePanel.Header>
        }
      >
          <Constraints.Horizontal >
         <Spacings.Stack scale="m">
          <Spacings.Stack scale="s">
          <Spacings.Inline>
            <SecondaryButton
            label="Add Budget"
            data-track-event="click"
            onClick={() => push(`add-budget`)}
            iconLeft={<PlusBoldIcon />}
            size="medium"
          />
             <SecondaryButton
            label="Reset All Employees Budget"
            data-track-event="click"
            iconLeft={<ExportIcon />}
            size="medium"
          />
            </Spacings.Inline>
            </Spacings.Stack>
            <Spacings.Stack scale="s">
            <Constraints.Horizontal min={13}>
            <DataTable rows={rows} columns={columns} />
          </Constraints.Horizontal>
          </Spacings.Stack>
          </Spacings.Stack>
          </Constraints.Horizontal>
      </CollapsiblePanel>
    // </Spacings.Stack>
  );

  // return props.children({
  //   formElements,
  //   values: formik.values,
  //   isDirty: formik.dirty,
  //   isSubmitting: formik.isSubmitting,
  //   submitForm: formik.handleSubmit,
  //   handleReset: formik.handleReset,
  // });
};
TicketRules.displayName = 'TicketRules';
TicketRules.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default TicketRules;

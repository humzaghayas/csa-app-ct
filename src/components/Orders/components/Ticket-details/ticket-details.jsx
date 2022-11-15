import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import { TextField } from '@commercetools-frontend/ui-kit';
// import {
//   PageNotFound,
//   FormModalPage,
// } from '@commercetools-frontend/application-components';
// import { ContentNotification } from '@commercetools-uikit/notifications';
import Text from '@commercetools-uikit/text';
import Spacings from '@commercetools-uikit/spacings';
// import LoadingSpinner from '@commercetools-uikit/loading-spinner';
// import { useCallback } from 'react';
// import { formatLocalizedString } from '@commercetools-frontend/l10n';
// import { DOMAINS, NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import DataTable from '@commercetools-uikit/data-table';
import styles from './Ticket-details.module.css';
import FieldLabel from '@commercetools-uikit/field-label';
import Constraints from '@commercetools-uikit/constraints';
// import { PlusBoldIcon} from '@commercetools-uikit/icons';
import { PERMISSIONS } from '../../../../constants';
import { docToFormValues, formValuesToDoc } from './conversions';
// import TicketDetailsForm from './Ticket-details-form';
// import messages from './messages';
import { lazy, useState, useEffect } from 'react';
import { getTicket } from '../../api';
import { PlusBoldIcon,BinLinearIcon} from '@commercetools-uikit/icons';
import { IconButton } from '@commercetools-uikit/buttons';
import { Fragment } from 'react';
const TicketDetails = (props) => {
  const intl = useIntl();
  const params = useParams();
  // const match = useRouteMatch();
  // const { push } = useHistory();
  // const [id] = useState(id);
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
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
  // const { Ticket, error, loading } = getTicket(params.id);
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));

  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.Manage],
  });
  const showNotification = useShowNotification();
  const showApiErrorNotification = useShowApiErrorNotification();

  //Frontend code
  const formik = useFormik({
    // We assume that the form is empty. Therefore, we need to provide default values.
    // initialValues: docToFormValues(props.data, languages),
    initialValues: docToFormValues(props.data),
    // validate,
    onSubmit: async (formikValues) => {
      alert(`name: ${formikValues.name}`);
      // Do something async
    },
  });
  const rows = [
    {
      ContactName: Ticket?.addresses[0].firstName,
      Street: Ticket?.addresses[0].streetName,
      City: Ticket?.addresses[0].city,
      PostalCode: Ticket?.addresses[0].postalCode,
      State: Ticket?.addresses[0].state,
      Country: Ticket?.addresses[0].country,
      Email: Ticket?.addresses[0].email,
    },
  ];

  const columns = [
    { key: 'ContactName', label: 'Contact Name' },
    // { key: 'TicketName', label: 'Ticket Name' },
    { key: 'Street', label: 'Street' },
    { key: 'City', label: 'City' },
    { key: 'PostalCode', label: 'Postal Code' },
    { key: 'State', label: 'State' },
    { key: 'Country', label: 'Country' },
    { key: 'Email', label: 'Email' },
  ];

  return (
    <Spacings.Stack scale="l">
      <CollapsiblePanel
        data-testid="quote-summary-panel"
        header={
          <CollapsiblePanel.Header>
            {/* {formatMessage(messages.panelTitle)} */}
            {'General Information'}
          </CollapsiblePanel.Header>
        }
      >
        <div className={styles.TicketLogoName}>
          <div>
            <TextField
              name="name"
              title="Name"
              value={Ticket?.name}
              //errors={formik.errors.name}
              //      touched={formik.touched.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              horizontalConstraint={14}
              // placeholder = "Ticket C"
            />
          </div>
          <div className={styles.TicketLogo}>
        <FieldLabel
               name="logo"
               title="Logo"
               value={formik.values.logo}
               errors={formik.errors.logo}
               touched={formik.touched.logo}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               horizontalConstraint={13}
            />
            <div className={styles.TicketLogoBackground}>
         
         <Fragment>
          {/* <React.Fragment> */}
          <img src={Ticket?.logo} alt="logo" width={64} height={64} className={styles.LogoImage}/>
                            <div className={styles.controls}>
                              <div className={styles.deleteIcon}>
                              <IconButton
                                  icon={<BinLinearIcon/>}
                                  label="A label text"
                                   onClick={() => alert('Button clicked')}
                               />
                              </div>
                            </div>
                            </Fragment>
                          {/* </React.Fragment> */}
           </div>
          </div>
        
        </div>
      </CollapsiblePanel>

      <Spacings.Stack scale="l">
        <CollapsiblePanel
          data-testid="quote-summary-panel"
          header={
            <CollapsiblePanel.Header>
              {/* {formatMessage(messages.panelTitle)} */}
              {'Address'}
            </CollapsiblePanel.Header>
          }
          scale="l">
          <Constraints.Horizontal min={13}>
            <DataTable rows={rows} columns={columns} />
          </Constraints.Horizontal>
        </CollapsiblePanel>
      </Spacings.Stack>
    </Spacings.Stack>
  );
};
TicketDetails.displayName = 'TicketDetails';
TicketDetails.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default TicketDetails;

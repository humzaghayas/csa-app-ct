import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  PageNotFound,
  FormModalPage,
} from '@commercetools-frontend/application-components';
import { useCallback } from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  DOMAINS,
  GRAPHQL_TARGETS,
  NO_VALUE_FALLBACK,
} from '@commercetools-frontend/constants';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import {
  useShowNotification,
  useShowApiErrorNotification,
} from '@commercetools-frontend/actions-global';
import { PERMISSIONS } from '../../../../constants';
// import {
//   useCustomerDetailsCreator,
// } from '../../../../hooks/use-Customer-connector/use-Customere-graphql-connector';
import { docToFormValues, formValuesToDoc } from './conversions';
import DashboardDisplayForm from './dashboard-form';
import { transformErrors } from './transform-errors';
import messages from './messages';
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { gql } from '@apollo/client';
import { FETCH_TICKETS } from 'ct-tickets-helper-api/lib/graphql-queries';
import { CONSTANTS } from 'ct-tickets-helper-api/lib/constants';
import {
  useDataTableSortingState,
  usePaginationState,
} from '@commercetools-uikit/hooks';
import { useOrdersFetcher } from '../../../../hooks/use-orders-connector';
import { useCartsFetcher } from '../../../../hooks/use-cart-connector/use-cart-connector';
import { useCustomersFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';
import { useProductsFetcher } from '../../../../hooks/use-product-search-connector/use-product-search-connector';
import {
  useCreateEntry,
  useFetchTicketsList,
  useUserFetcher,
} from '../../../../hooks/use-register-user-connector';
import { getTicketRows } from 'ct-tickets-helper-api/lib/helper-methods';
import {
  useCreateOrUpdateFeedback,
  useFetchChatNotifyList,
  useFetchFeedbackList,
} from '../../../../hooks/use-register-user-connector/use-service-connector';
import { ToastContainer, toast } from 'react-toastify';
import Feedback from '../feedback/feedback';
import { getFeedbackRows } from '../feedback/function';
import { getOrderRows } from '../../../Orders/components/order-list/rows';
import { getChatRows } from '../chat/function';

let columns = [
  {
    key: 'orderNumber',
    label: 'Order Number',
    isSortable: true,
    mapping: 'orderNumber',
  },
  { key: 'customer', label: 'Customer' },
  { key: 'totalPrice', label: 'Order Total' },
  { key: 'noOforderItems', label: 'No.of order Items' },
  { key: 'totalItems', label: 'Total Items' },
  { key: 'orderState', label: 'Order Status', isSortable: true },
  { key: 'shipmentStatus', label: 'Shipment Status' },
  { key: 'paymentStatus', label: 'Payment Status' },
  { key: 'createdAt', label: 'Created', isSortable: true },
  { key: 'lastModifiedAt', label: 'Modified', isSortable: true },
  { key: 'duplicate', label: 'Duplicate', shouldIgnoreRowClick: true },
];

const DashboardDisplay = (props) => {
  const intl = useIntl();
  const params = useParams();
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));
  const canManage = useIsAuthorized({
    demandedPermissions: [PERMISSIONS.ManageCsaTickets],
  });
  const { page, perPage } = usePaginationState();
  const [rowsTick, setRows] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [chat, setChat] = useState(null);
  const [resData, setResData] = useState(null);
  const [feedbackRaw, setFeedRaw] = useState(null);
  const [chatRaw, setChatRaw] = useState(null);
  const [newChatCount, setNewChatCount] = useState(null);
  const [messageShown, setMessageShown] = useState(false);
  const { user } = useApplicationContext((context) => ({
    user: context.user ?? '',
  }));
  const { projectKey } = useApplicationContext((context) => ({
    projectKey: context.project.key,
  }));
  const { foundUser } = useUserFetcher(user.email);
  const { execute } = useCreateEntry(user.email);
  const { execute: fetchTickets } = useFetchTicketsList();
  const { execute: fetchFeedback } = useFetchFeedbackList();
  const { execute: createFeedback } = useCreateOrUpdateFeedback();
  const { execute: fetchChatList } = useFetchChatNotifyList();

  useEffect(async () => {
    if (canManage && foundUser == false) {
      await execute();
    }

    if (!rowsTick) {
      const data = await fetchTickets(projectKey, {
        limit: perPage.value,
        offset: (page.value - 1) * perPage.value,
        sort: { lastModifiedAt: -1 },
      });

      const r = await getTicketRows(data);
      setRows(r);
      setResData(data);
    }
  }, [foundUser]);

  useEffect(async () => {
    if (canManage && foundUser == false) {
      await execute();
    }

    if (!feedback) {
      const data = await fetchFeedback(projectKey, {
        limit: perPage.value,
        offset: (page.value - 1) * perPage.value,
        // sort: { lastModifiedAt: -1 },
      });

      const r = await getFeedbackRows(data);
      setFeedback(r);
      setFeedRaw(data);
    }
  }, [foundUser]);

  useEffect(async () => {
    if (canManage && foundUser == false) {
      await execute();
    }

    if (!chat) {
      const data = await fetchChatList(projectKey, {
        limit: perPage.value,
        offset: (page.value - 1) * perPage.value,
        // sort: { lastModifiedAt: -1 },
      });

      const r = await getChatRows(data);
      setChat(r);
      setChatRaw(data);
    }
  }, [foundUser, chat]);

  const [previousCount, setPreviousCount] = useState();

  useEffect(() => {
    if (chat) {
      setPreviousCount(chat?.count);
    }
  }, [chat]);

  useEffect(() => {
    const checkForNewChats = async () => {
      const data = await fetchChatList(projectKey, {
        limit: perPage.value,
        offset: (page.value - 1) * perPage.value,
        // sort: { lastModifiedAt: -1 },
      });
      // Fetch the updated chat data from props
      const updatedChatData = data;
      if (updatedChatData) {
        const newCount = updatedChatData?.count;
        if (newCount > previousCount) {
          const newChats = newCount - previousCount;
          // toast.info(`You've got ${newChats} new chat(s) waiting`, {
          //   autoClose: 5000, // Set the duration for how long the notification will be shown (in milliseconds)
          //   hideProgressBar: true, // Hide the progress bar
          // });

          setMessageShown(true);

          setNewChatCount(newChats);
          // setPreviousCount(newCount);
        }
      }
    };

    // Check for new chats every 2 minutes (120,000 milliseconds)
    const intervalId = setInterval(checkForNewChats, 30 * 1000);

    // Clear the interval when the component is unmounted to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [props.chat, previousCount]);

  const chatCount = chat?.count;
  console.log('chatCount: ', chatCount);

  // const tableSort = [{ key: 'id', order: 'asc' }];
  const tableSorting = useDataTableSortingState({ key: 'id', order: 'asc' });
  // const tableSort = tableSorting.value;
  const orderData = useOrdersFetcher({
    page,
    perPage,
    tableSorting,
  });

  const cartData = useCartsFetcher({
    page,
    perPage,
    tableSorting,
  });
  console.log('Cart check', orderData);
  const customerData = useCustomersFetcher({
    page,
    perPage,
    tableSorting,
  });

  const productData = useProductsFetcher({
    page,
    perPage,
    tableSorting,
  });

  const handleSubmit = useCallback();
  const handleSubmitFeedback = useCallback(
    async (formValues) => {
      let data = {};
      // formValues.createdBy = user.email;
      // formValues.id='a';
      // formValues.key='a';

      // if(!formValues.assignedTo){
      //   formValues.assignedTo = user.email;
      // }

      data = formValuesToDoc(formValues);

      console.log('data');
      console.log(data);
      let t = await createFeedback(
        projectKey,
        data,
        CONSTANTS.CREATE_OPERATION
      );

      console.log(t);
    },
    [createFeedback]
  );

  return (
    <DashboardDisplayForm
      initialValues={docToFormValues(
        orderData,
        cartData,
        rowsTick,
        customerData,
        productData,
        feedback,
        chat,
        chatCount,
        null,
        projectLanguages
      )}
      onSubmit={handleSubmit}
      ticket={rowsTick}
      order={orderData}
      cart={cartData}
      customer={customerData}
      product={productData}
      feedback={feedback}
      chat={chat}
      chatCount={chatCount}
      isReadOnly={!canManage}
      dataLocale={dataLocale}
      newChatCount={newChatCount}
    >
      {(formProps) => {
        return (
          <React.Fragment>{formProps.formElements}</React.Fragment>
          // <FormModalPage
          //   title={intl.formatMessage(messages.modalTitle)}
          //   isOpen
          //   onClose={props.onClose}
          //   isPrimaryButtonDisabled={
          //     formProps.isSubmitting || !formProps.isDirty || !canManage
          //   }
          //   isSecondaryButtonDisabled={!formProps.isDirty}
          //   onSecondaryButtonClick={formProps.handleReset}
          //   onPrimaryButtonClick={formProps.submitForm}
          //   labelPrimaryButton={FormModalPage.Intl.save}
          //   labelSecondaryButton={FormModalPage.Intl.revert}
          // >
          //   {formProps.formElements}
          // </FormModalPage>
        );
      }}
    </DashboardDisplayForm>

    // (
    //   <Feedback
    //     initialValues={docToFormValues(feedback, null, projectLanguages)}
    //     feedback={feedback}
    //     onSubmit={handleSubmitFeedback}
    //   >
    //     {(formProps) => {
    //       return <React.Fragment>{formProps.formElements}</React.Fragment>;
    //     }}
    //   </Feedback>
    // )
  );
};
DashboardDisplay.displayName = 'DashboardDisplay';

export default DashboardDisplay;

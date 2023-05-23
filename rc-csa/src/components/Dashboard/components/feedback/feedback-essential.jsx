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
import { useMcQuery } from '@commercetools-frontend/application-shell';
import { gql } from '@apollo/client';
import { CONSTANTS } from 'ct-tickets-helper-api/lib/constants';
import {
  useDataTableSortingState,
  usePaginationState,
} from '@commercetools-uikit/hooks';
import {
  useCreateEntry,
  useUserFetcher,
} from '../../../../hooks/use-register-user-connector';
import {
  useCreateOrUpdateFeedback,
  useFetchFeedbackList,
} from '../../../../hooks/use-register-user-connector/use-service-connector';
import Feedback from './feedback';
import { getFeedbackRows } from './function';

const FeedbackSetup = (props) => {
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
  const [feedback, setFeedback] = useState(null);
  const [feedbackRaw, setFeedRaw] = useState(null);
  const { user } = useApplicationContext((context) => ({
    user: context.user ?? '',
  }));
  const { projectKey } = useApplicationContext((context) => ({
    projectKey: context.project.key,
  }));
  const { foundUser } = useUserFetcher(user.email);
  const { execute } = useCreateEntry(user.email);
  const { execute: fetchFeedback } = useFetchFeedbackList();
  const { execute: createFeedback } = useCreateOrUpdateFeedback();

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
  // console.log('Feedback', feedback);
  // console.log('Decider', feedbackRaw);

  const handleSubmit = useCallback();

  const handleSubmitFeedback = useCallback(
    async (formValues) => {
      let data = {};

      // Dynamically create the rating and feedbackDes properties
      data = {
        // ...formValues,
        rating: !TextInput.isEmpty(formValues.rating)
          ? formValues.rating
          : '--',
        feedbackDes: !TextInput.isEmpty(formValues.feedbackDes)
          ? formValues.feedbackDes
          : '--',
      };

      console.log('data');
      console.log(data);

      let t = await createFeedback(
        projectKey,
        data,
        CONSTANTS.CREATE_OPERATION
      );

      console.log(t);
    },
    [createFeedback, projectKey]
  );

  return (
    <Feedback
      feedback={feedback}
      // onSubmit={handleSubmitFeedback}
    >
      {(formProps) => {
        return <React.Fragment>{formProps.formElements}</React.Fragment>;
      }}
    </Feedback>
  );
};
FeedbackSetup.displayName = 'DashboardDisplay';

export default FeedbackSetup;

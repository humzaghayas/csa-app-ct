import React, { useCallback, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import {
  useCreateEntry,
  useCreateOrUpdateFeedback,
} from '../../../../hooks/use-register-user-connector/use-service-connector';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import validate from './validate';
import { useFormik } from 'formik';
import {
  MultilineTextField,
  PrimaryButton,
  SecondaryButton,
  Spacings,
} from '@commercetools-frontend/ui-kit';
import { useHistory } from 'react-router-dom';
import { CONSTANTS } from 'ct-tickets-helper-api/lib/constants';
import { DOMAINS } from '@commercetools-frontend/constants';
import { showNotification } from '@commercetools-frontend/actions-global';
import { transformErrors } from '../../../Ticket/components/Ticket-history/transform-errors';

const Feedback = (props) => {
  const history = useHistory();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [feedbackDes, setFeedbackDes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // const submitted = props.onSubmit
  // console.log(props);
  const { dataLocale, entryPointUriPath, projectKey } = useApplicationContext(
    (context) => ({
      dataLocale: context.dataLocale ?? '',
      entryPointUriPath: context.environment.entryPointUriPath,
      projectKey: context.project.key,
    })
  );

  const { execute } = useCreateOrUpdateFeedback();

  const handleSubmit = useCallback(
    async (formValues) => {
      console.log('backtrack', formValues);
      try {
        const result = await execute(payload);
        console.log('shipping', result);
        showNotification({
          kind: 'success',
          domain: DOMAINS.SIDE,
        });

        // setFormOrder(result?.data?.updateOrder);
      } catch (graphQLErrors) {
        console.log(graphQLErrors.message);
        const transformedErrors = transformErrors(graphQLErrors);
        if (transformedErrors.unmappedErrors.length > 0) {
          showApiErrorNotification({
            errors: graphQLErrors.message,
          });
        }
      }
    },
    [execute]
  );

  const formik = useFormik({
    initialValues: { rating: '', feedbackDes: '' },
    enableReinitialize: true,
    onSubmit: useCallback(
      async (value, formik) => {
        console.log('Submit', value);
        // console.log(value.rating)
        const updateActionList = {
          projectKey: projectKey,
          data: {
            rating: value?.rating,
            feedbackDes: value?.feedbackDes,
          },
          operation: CONSTANTS.CREATE_OPERATION,
        };

        // execute(updateActionList);
        const result = await execute(updateActionList);
        console.log('Checking', result);
        // forceUpdate();
        formik.resetForm();
      },
      [execute]
    ),
  });

  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleFeedbackChange = (event) => {
    setFeedbackDes(event.target.value);
  };

  const saveFeedback = async (e) => {
    const data = {
      rating: rating,
      feedbackDes: feedbackDes,
    };
    formik.setValues(data);
    formik.handleSubmit(e);
    setSubmitted(data);
    // handleSubmit(e);
    // console.log('worked', formik.setValues(data));
  };

  return (
    <div>
      <h2>Rate your service</h2>
      <div style={{ display: 'flex' }}>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <div
              key={i}
              onClick={() => handleRatingClick(ratingValue)}
              onMouseEnter={() => setHover(null)}
              onMouseLeave={() => setHover(null)}
            >
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                size={30}
              />
            </div>
          );
        })}
      </div>
      <div>
        <MultilineTextField
          name="feedbackDes"
          title="Description"
          value={feedbackDes}
          placeholder="Write your review (optional)..."
          touched={formik.touched.feedbackDes}
          onChange={handleFeedbackChange}
        />
        <Spacings.Inline>
          <SecondaryButton
            label="Cancel"
            onClick={() => {
              formik.resetForm();
            }}
            // onClick={formik.handleReset}
          />
          <PrimaryButton
            type="submit"
            label="Submit"
            onClick={saveFeedback}
            isDisabled={!rating || !feedbackDes || formik.isSubmitting}
          />
        </Spacings.Inline>
      </div>
      {rating && feedbackDes && submitted && (
        <p>Thank you for valuable feedback!</p>
      )}
    </div>
  );
};

Feedback.displayName = 'Feedback';
export default Feedback;

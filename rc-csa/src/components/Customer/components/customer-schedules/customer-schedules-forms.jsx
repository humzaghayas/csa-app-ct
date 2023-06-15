import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import TextField from '@commercetools-uikit/text-field';
import Spacings from '@commercetools-uikit/spacings';
import ToggleInput from '@commercetools-uikit/toggle-input';
import SelectField from '@commercetools-uikit/select-field';
import Text from '@commercetools-uikit/text';

import { getCartOptions, getRepeatOptions, REPEAT_ENUM } from './conversion';
import { useIntl } from 'react-intl';
import { DateField } from '@commercetools-frontend/ui-kit';
import { useCustomersCartsFetcher } from '../../../../hooks/use-customers-connector/use-customers-connector';
import { useRouteMatch } from 'react-router-dom';
import { useDataTableSortingState } from '@commercetools-uikit/hooks';



const CustomerSchedulesForm = (props) => {
  const dataLocale = useApplicationContext((context) => context.dataLocale);
  const intl = useIntl();
  const tableSorting = useDataTableSortingState('createdAt desc');
  const match = useRouteMatch();
  const customerId = props?.customerId;
  const page = 0;
  const perPage = Number.MAX_VALUE;
  const { customersCartPaginatedResult, error, loading, refetch } = useCustomersCartsFetcher({
    page,
    perPage,
    tableSorting,
    customerId,
  });

  console.log("Props",props);
  console.log("Carts",getCartOptions(customersCartPaginatedResult?.results));
  console.log(match);
  console.log(customerId);

  const formik = useFormik({
    // Pass initial values from the parent component.
    initialValues: props.initialValues,
    // Handle form submission in the parent component.
    onSubmit: useCallback(()=>{
      props.onSubmit(formik?.values);
    }),
    // validate,
    enableReinitialize: true
  });

 
  console.log("Schedules form",formik?.values);


  const formElements = (
    <form onSubmit={formik?.handleSubmit}>
          <Spacings.Stack scale="xl">
            {props?.isUpdate?
              <Spacings.Inline>
                <TextField
                    title={"Schedule Id"}
                    value={formik?.values?.id ?? formik?.values?._id ?? '--'}
                    isDisabled={true}
                  />
                <TextField
                    title={"Customer Id"}
                    name='customerId'
                    value={formik?.values?.customerId}
                    isDisabled={true}
                  />
              </Spacings.Inline>
            :null}
            <SelectField
              title="Cart"
              name='cartId'
              errors={formik.errors?.cartId}
              touched={formik.touched?.cartId}
              value={formik?.values?.cartId}
              options={getCartOptions(customersCartPaginatedResult?.results)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              horizontalConstraint={9}
              isRequired={true}
              />
            <Spacings.Inline>
            <Text.Body>{"Status"}</Text.Body>
              <ToggleInput
                id='isActive'
                name='isActive'
                isDisabled={false}
                isChecked={formik?.values?.isActive}
                onChange={formik.handleChange}
              />
            </Spacings.Inline>
            <SelectField
              title="Frequency"
              name='repeat'
              errors={formik.errors?.repeat}
              touched={formik.touched?.repeat}
              value={formik?.values?.repeat}
              options={getRepeatOptions}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              horizontalConstraint={9}
              isRequired={true}
            />
            <DateField
              title="Schedule date"
              name='scheduleDate'
              errors={formik.errors?.scheduleDate}
              touched={formik.touched?.scheduleDate}
              value={formik?.values?.scheduleDate}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              horizontalConstraint={9}
              isRequired={true}
            />
          {props?.isUpdate ? 
                      <Spacings.Inline>
                      <TextField
                          title={"Created by"}
                          name='createdBy'
                          value={formik?.values?.createdBy}
                          isDisabled={true}
                          horizontalConstraint={9}
                        />
                      <TextField
                          title={"Created"}
                          name='createdAt'
                          value={formik?.values?.createdAt}
                          isDisabled={true}
                          horizontalConstraint={9}
                        />
                      <TextField
                          title={"Modified"}
                          name='lastModifiedAt'
                          value={formik?.values?.lastModifiedAt}
                          isDisabled={true}
                          horizontalConstraint={9}
                        />
                      </Spacings.Inline>
        
        :null}
          </Spacings.Stack>
    </form>
  );

  return props.children({
    formElements,
    isDirty: formik.dirty,
    isSubmitting: formik.isSubmitting,
    submitForm: formik.handleSubmit,
    handleCancel: formik.handleReset,
  });
}

export default CustomerSchedulesForm;
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import TextField from '@commercetools-uikit/text-field';
import SelectField from '@commercetools-uikit/select-field';
import DateInput from '@commercetools-uikit/date-input';
import Spacings from '@commercetools-uikit/spacings';
import validate from './validate';
import messages from './messages';
import Constraints from '@commercetools-uikit/constraints';
import { SearchSelectInput } from '@commercetools-uikit/inputs';
import { DataTable, IconButton } from '@commercetools-frontend/ui-kit';


const AddLineItemForm = (props) => {
  const intl = useIntl();
  const formik = useFormik({
    initialValues: props.initialValues,
    onSubmit: props.onSubmit,
    //validate,
    enableReinitialize: true,
  });

  const formElements = (
    <Spacings.Stack scale="l">
      <Spacings.Inline>
        <Constraints.Horizontal>
          <Spacings.Stack scale="m">
            <Spacings.Stack scale="s">
            <Constraints.Horizontal min={13}>
            <SearchSelectInput
             id="product"
             name="productSearch"
             horizontalConstraint={13}
             optionType="single-lined"
             isAutofocussed={false}
             backspaceRemovesValue={true}
             isClearable={true}
             isDisabled={false}
             isReadOnly={false}
             isMulti={true}
            //  noOptionsMessage="No exact match found"
            //  loadingMessage="loading exact matches"
            //  placeholder="Search By, Product Name, Sku"
              isOptionDisabled={true}
             loadOptions={(e) => {return e}}
             cacheOptions={false}
             onChange={
               () => {}
            }
            // onInputChange={(action)=>{console.log("On press",action)}}
            // defaultOptions
            className="select-input-search"
             />

          </Constraints.Horizontal>
            </Spacings.Stack>
            <Spacings.Stack scale='l'>
            
          </Spacings.Stack> 

          </Spacings.Stack>
        </Constraints.Horizontal>
        {/* </Spacings.Inline> */}
      </Spacings.Inline>
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
AddLineItemForm.displayName = 'AddLineItemForm';
AddLineItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string,
  }),
  isReadOnly: PropTypes.bool.isRequired,
  dataLocale: PropTypes.string.isRequired,
};

export default AddLineItemForm;

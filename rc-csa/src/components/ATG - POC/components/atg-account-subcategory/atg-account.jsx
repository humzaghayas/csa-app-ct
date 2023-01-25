import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useParams,
} from 'react-router-dom';
import {
  useModalState,
  TabHeader,
  TabularDetailPage,
} from '@commercetools-frontend/application-components';
import PropTypes from 'prop-types';

import Spacings from '@commercetools-uikit/spacings';
import Avatar from '@commercetools-uikit/avatar';
import AtgCategories from '../atg-categories/atg-categories';
import AtgCategory from '../atg-category/atg-category';
import { getCategory } from '../../api';
// import CustomerAddress from '../customer-address/customer-address';

const AtgSubcategory = (props) => {
  const match = useRouteMatch();
  const tabsModalState = useModalState(true);
  const history = useHistory();
  const params = useParams();
  const [data, setData] = useState();

  //const apiUrl ="http://localhost:4456";
  const apiUrl =
    'http://192.168.16.201:8080/rest/model/atg/commerce/catalog/ProductCatalogActor/getCategory';
  const catId = params.id;
  useEffect(() => {
    getCategory({ url: apiUrl, id: catId }).then((res) => setData(res));
  }, [apiUrl, catId]);

  console.log('data', data);
  return (
    <TabularDetailPage
      title=" "
      onPreviousPathClick={() =>
        history.push(`/csa_project/csa-customer-tickets`)
      }
      previousPathLabel="Back to Welcome page"
      tabControls={
        <>
          <Spacings.Stack scale="xxl">
            <Spacings.Inline>
              <Avatar
                gravatarHash="20c9c1b252b46ab49d6f7a4cee9c3e68"
                firstName="R"
                lastName="C"
                size="l"
              />

              <Spacings.Stack scale="xs">
                <Spacings.Stack scale="xl"></Spacings.Stack>
                <h1> ATG Motorprise</h1>
                <h4>Browse Motorprise Catalog</h4>
              </Spacings.Stack>

              {/* </div> */}
            </Spacings.Inline>
          </Spacings.Stack>
          <Spacings.Stack scale="xl">
            <Spacings.Inline>
              {/* <TabHeader to={`${match.url}/atg-login`} label="Login" /> */}
              <TabHeader
                to={`${match.url}/atg-category`}
                label="Sub-Categories"
              />
              {/* <TabHeader to={`${match.url}/atg-category`} label="Category" /> */}
              {/* <TabHeader
                to={`${match.url}/Customers-Address`}
                label="Addresses"
              />
              {/* <div className={styles.addEmployeeButton}>
              <SecondaryButton
              label="Add Employee"
              data-track-event="click"
              iconLeft={<PlusBoldIcon />}
              // onClick={() => push(`employee-create`)}
              size="medium"
              />
              </div> */}
            </Spacings.Inline>
          </Spacings.Stack>
        </>
      }
    >
      <Switch>
        <Route path={`${match.path}/atg-category`}>
          <AtgCategory data={data} />
        </Route>
        {/* <Route path={`${match.path}/Customers-password`}>
          <CustomerPassword />
        </Route> */}
      </Switch>
    </TabularDetailPage>
  );
};
AtgSubcategory.displayName = 'AtgSubcategory';
AtgSubcategory.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default AtgSubcategory;

import { Label, Spacings } from "@commercetools-frontend/ui-kit";

export const itemRenderer = (item, column) => {
    switch (column.key) {
      case 'amount':
        return <div>
                  <Spacings.Stack scale='s'>
                    <Spacings.Inline>
                      {"$"+item?.amount?.centAmount/100+".00"}
                    </Spacings.Inline>
                  </Spacings.Stack>
                </div>;
        case 'interactionId':
            return <div>
                    <Spacings.Stack scale='s'>
                        <Spacings.Inline>
                            {item?.interactionId?item?.interactionId:'--'}
                        </Spacings.Inline>
                    </Spacings.Stack>
            </div>
      default:
        return item[column.key];
    }
  }

  export const itemRendererPayments = (item, column) => {
    switch (column.key) {
      case 'amountPlanned':
        return <div>
                  <Spacings.Stack scale='s'>
                    <Spacings.Inline>
                      {"$"+item?.amountPlanned?.centAmount/100+".00"}
                    </Spacings.Inline>
                  </Spacings.Stack>
                </div>;
        case 'paymentMethodInfo':
            return <div>
                    <Spacings.Stack scale='s'>
                    <Spacings.Inline>
                      <Spacings.Stack scale='s'>
                        <div>Name:   {item?.paymentMethodInfo?.name}</div>
                        <div>Method: {item?.paymentMethodInfo?.method}</div>
                        <div>PSP:    {item?.paymentMethodInfo?.paymentInterface}</div>
                      </Spacings.Stack>
                    </Spacings.Inline>
                  </Spacings.Stack>
            </div>
      default:
        return item[column.key];
    }
  }
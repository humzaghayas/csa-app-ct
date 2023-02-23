import { Spacings } from "@commercetools-frontend/ui-kit";

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
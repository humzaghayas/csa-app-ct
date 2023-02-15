import { Spacings } from "@commercetools-frontend/ui-kit";

export const itemRenderer = (item, column) => {
    switch (column.key) {
      case 'item':
        return <div>
                  <Spacings.Stack scale='s'>
                    <Spacings.Inline>
                      <img src={item?.item?.image} height={65} width={65}/>
                      <Spacings.Stack scale='s'>
                        <div>{item?.item?.name}</div>
                        <div>SKU: {item?.item?.sku}</div>
                        <div>Key: {item?.item?.key}</div>
                      </Spacings.Stack>
                    </Spacings.Inline>
                  </Spacings.Stack>
                </div>;
      default:
        return item[column.key];
    }
  }
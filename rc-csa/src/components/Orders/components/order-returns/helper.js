import { CheckboxInput, MultilineTextField, NumberInput, Spacings } from "@commercetools-frontend/ui-kit";

export const itemRenderer = (item, column) => {
    switch (column.key) {
      case 'item':
        return <div>
                  <Spacings.Stack scale='s'>
                    <Spacings.Inline>
                      <img src={item?.lineItemDetails?.image?.url} height={65} width={65}/>
                      <Spacings.Stack scale='s'>
                        <div>{item?.lineItemDetails?.name}</div>
                        <div>SKU: {item?.lineItemDetails?.sku}</div>
                        <div>Key: {item?.lineItemDetails?.key}</div>
                      </Spacings.Stack>
                    </Spacings.Inline>
                  </Spacings.Stack>
                </div>;
      default:
        return item[column.key];
    }
  }

export const itemRendererNewOrderReturns = (item, column) => {
    switch (column.key) {
      case 'product':
        return <div>
                  <Spacings.Stack scale='s'>
                    <Spacings.Inline>
                      <img src={item?.product?.image} height={65} width={65}/>
                      <Spacings.Stack scale='s'>
                        <div>{item?.product?.name}</div>
                        <div>SKU: {item?.product?.sku}</div>
                        <div>Key: {item?.product?.key}</div>
                      </Spacings.Stack>
                    </Spacings.Inline>
                  </Spacings.Stack>
                </div>;
      case 'returnQuantity':
        return <div>
                  <Spacings.Stack scale="s">
                    <NumberInput
                      id="returnQuantity"
                      value={item?.returnQuantity}
                      onChange={(e)=>{item.returnQuantity=e?.target?.value}}
                      horizontalConstraint={3}
                      isRequired
                      isDisabled={!item?.checBox}
                    />
                  </Spacings.Stack>
              </div>
      case 'comment':
        return <div>
                  <Spacings.Stack scale="s">
                    <MultilineTextField
                      name="comment"
                      id="comment"
                      title=""
                      value=" "
                      onChange={(event) => alert(event.target.value)}
                      isDisabled={!item?.checBox}
                      horizontalConstraint={13}
                    />
                  </Spacings.Stack>
              </div>
      case 'checkBox':
        return <div>
                  <Spacings.Stack scale="s">
                    <CheckboxInput
                      value="is-row-value-checked"
                      onChange={()=>{item.checBox=!item.checBox}}
                      isChecked={item?.checBox}
                    />
                  </Spacings.Stack>
              </div>
      default:
        return item[column.key];
    }
}
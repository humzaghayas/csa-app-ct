const ATTRIBUTE_VALUE_TYPE={
    TEXT:"TEXT",
    BOOLEAN :"BOOLEAN",
    OBJECT:"OBJECT"
}


const PRODUCTS_ATTRIBUTES = {
    name : { type:ATTRIBUTE_VALUE_TYPE.TEXT},
    productDescriptions : { type:ATTRIBUTE_VALUE_TYPE.TEXT},
    productType : { type:ATTRIBUTE_VALUE_TYPE.TEXT}
}

const SUBSCRIPTION_PRODUCTS_ATTRIBUTES ={
    parent:PRODUCTS_ATTRIBUTES,
    SUBSCRIPTION_VARIANT : { type:ATTRIBUTE_VALUE_TYPE.BOOLEAN},
    subscriptionDetails:{type : ATTRIBUTE_VALUE_TYPE.OBJECT},
    parentVariant:{type : ATTRIBUTE_VALUE_TYPE.TEXT}
}

const COFFEE_PRODUCT_ATTRIBUTES ={
    subscriptionAttributes:SUBSCRIPTION_PRODUCTS_ATTRIBUTES,
    WEB_BAGSIZE : { type:ATTRIBUTE_VALUE_TYPE.TEXT},
    WEB_ESPRESSO:{type : ATTRIBUTE_VALUE_TYPE.TEXT},
    WEB_ROASTLEVEL:{type : ATTRIBUTE_VALUE_TYPE.TEXT},
    WEB_GRIND:{type : ATTRIBUTE_VALUE_TYPE.TEXT}
}

const HOUSE_HOLD_PRODUCT_ATTRIBUTES ={
    subscriptionAttributes:SUBSCRIPTION_PRODUCTS_ATTRIBUTES,
    brand : { type:ATTRIBUTE_VALUE_TYPE.TEXT},
    scent:{type : ATTRIBUTE_VALUE_TYPE.TEXT},
    "item-form":{type : ATTRIBUTE_VALUE_TYPE.TEXT},
    "user-for":{type : ATTRIBUTE_VALUE_TYPE.TEXT},
    "skin-type":{type : ATTRIBUTE_VALUE_TYPE.TEXT}
}

const CONSTANTS_VALUES={
    PRODUCT_TYPE:"productType",
    COFFEE_PRODUCT_TYPE:"coffee-beans-product-type",
    HOUSE_HOLD_PRODUCT_TYPE:"house-hold-product-type",
    SUBSCRIPTION_ATTRIBUTES:"subscriptionAttributes",
    PARENT:"parent"
}

const getAllAttributes =(attributesObj,attributesMap) =>{

    let productAttributes = {};

    Object.keys(attributesObj).forEach( (fieldName) => {
        if(fieldName !== CONSTANTS_VALUES.SUBSCRIPTION_ATTRIBUTES
            && attributesObj[fieldName].type === ATTRIBUTE_VALUE_TYPE.TEXT){
            productAttributes[fieldName] =attributesMap[fieldName];
        }
    });
    Object.keys(attributesObj.subscriptionAttributes).forEach( (fieldName) => {
        if(fieldName !== CONSTANTS_VALUES.PARENT
            && attributesObj.subscriptionAttributes[fieldName].type === ATTRIBUTE_VALUE_TYPE.TEXT){
            productAttributes[fieldName] =attributesMap [fieldName];
        }
    });
    Object.keys(attributesObj.subscriptionAttributes.parent).forEach( (fieldName) => {
        if(attributesObj.subscriptionAttributes.parent[fieldName].type === ATTRIBUTE_VALUE_TYPE.TEXT){
            productAttributes[fieldName] =attributesMap [fieldName];
        }
    });

    productAttributes.subscriptionAttributes=attributesMap.subscriptionDetails.obj.value;

    return productAttributes;
}

module.exports={
    PRODUCTS_ATTRIBUTES,
    COFFEE_PRODUCT_ATTRIBUTES,
    HOUSE_HOLD_PRODUCT_ATTRIBUTES,
    CONSTANTS_VALUES,
    ATTRIBUTE_VALUE_TYPE,
    getAllAttributes
}
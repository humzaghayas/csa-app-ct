import * as moment from 'moment';
import { getSLARate } from './sla-percentage';

// Excel export for Tickets
export function generateTicketExcel(ticketMdbData, startDate, endDate) {
  const filteredTicketData = ticketMdbData?.filter((obj) => {
    const createdAt = new Date(obj.Created);
    return createdAt >= startDate && createdAt <= endDate;
  });

  const Ticket = filteredTicketData?.map((obj) => {
    return {
      'Ticket Number': obj?.ticketNumber,
      Customer: obj?.Customer,
      Created: moment(obj?.Created).format('YYYY-MM-DD HH:mm:ss'),
      Modified: moment(obj?.Modified).format('YYYY-MM-DD HH:mm:ss'),
      Source: obj?.Source,
      Status: obj?.status,
      Priority: obj?.Priority,
      Category: obj?.Category,
      Subject: obj?.Subject,
      Assignee: obj?.assignedTo,
      'Created by': obj?.createdBy,
      Message: obj?.ticketData?.message ?? '--',
      Worklog: obj?.ticketData?.comments?.comment ?? '--',
    };
  });

  return Ticket;
}

// Excel export for Orders
export function generateOrderExcel(orderData, startDate, endDate) {
  const filtereOrderData = orderData?.ordersPaginatedResult?.results?.filter(
    (obj) => {
      const createdAt = new Date(obj.createdAt);

      return createdAt >= startDate && createdAt <= endDate;
    }
  );

  const Orders = filtereOrderData?.map((obj) => {
    return {
      'Order Number': obj?.id,
      Customer: fullName(
        obj?.customer?.firstName ?? '--',
        obj?.customer?.lastName
      ),
      'Order Total': amountCalculator(obj?.totalPrice?.centAmount),
      'No.of Order Items': obj?.lineItems?.length,
      'Total Items': obj?.lineItems
        .map((item) => item.quantity)
        .reduce((a, b) => a + b, 0),
      'Order Status': obj?.orderState ?? '--',
      'Shipment Status': obj?.shipmentState ?? '--',
      'Payment Status': obj?.paymentState ?? '--',
      'Created At': moment(obj?.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      'Last ModifiedAt': moment(obj?.lastModifiedAt).format(
        'YYYY-MM-DD HH:mm:ss'
      ),
      'Shipping ID': obj?.shippingAddress?.id ?? '--',
      'Shipped Quantity': obj?.lineItems
        .map((item) => item.quantity)
        .reduce((a, b) => a + b, 0),
      'Street Number': obj?.shippingAddress?.streetNumber ?? '--',
      'Street Name': obj?.shippingAddress?.streetName,
      Building: obj?.shippingAddress?.building ?? '--',
      City: obj?.shippingAddress?.city ?? '--',
      'Postal Code': obj?.shippingAddress?.postalCode ?? '--',
      State: obj?.shippingAddress?.state ?? '--',
      Country: obj?.shippingAddress?.country ?? '--',
      'Return Tracking ID': obj?.returninfo?.returnTrackingId ?? '--',
      'Return Date': obj?.returninfo?.returnDate ?? '--',
      'Payment ID': obj?.paymentInfo?.payments?.id ?? '--',
      'Interface ID': obj?.paymentInfo?.payments?.interfaceId ?? '--',
    };
  });

  function amountCalculator(centAmount) {
    centAmount = centAmount / 100;
    centAmount = '$' + centAmount + '.00';
    return centAmount;
  }
  function fullName(firstName, lastName) {
    const f1 = firstName ? firstName : '';
    const f2 = lastName ? lastName : '';
    return f1 + ' ' + f2;
  }
  return Orders;
}

// Excel export for Carts
export function generateCartExcel(cartData, startDate, endDate) {
  const filterCartData = cartData?.cartPaginatedResult?.results?.filter(
    (obj) => {
      const createdAt = new Date(obj.createdAt);

      return createdAt >= startDate && createdAt <= endDate;
    }
  );

  const Carts = filterCartData?.map((obj) => {
    return {
      'Cart Number': obj?.id,
      'Order Number': obj?.orderId,
      Customer: fullName(
        obj?.customer?.firstName ?? '--',
        obj?.customer?.lastName
      ),
      'Cart Total': amountCalculator(obj?.totalPrice?.centAmount),
      'No.of Order Items': obj?.lineItems?.length,
      'Total Items': obj?.lineItems
        .map((item) => item.quantity)
        .reduce((a, b) => a + b, 0),
      'Cart Status': obj?.cartState ?? '--',
      'Created At': moment(obj?.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      'Last ModifiedAt': moment(obj?.lastModifiedAt).format(
        'YYYY-MM-DD HH:mm:ss'
      ),
    };
  });
  function amountCalculator(centAmount) {
    centAmount = centAmount / 100;
    centAmount = '$' + centAmount + '.00';
    return centAmount;
  }
  function fullName(firstName, lastName) {
    const f1 = firstName ? firstName : '';
    const f2 = lastName ? lastName : '';
    return f1 + ' ' + f2;
  }
  return Carts;
}

// Excel export for Customers
export function generateCustomerExcel(customerData, startDate, endDate) {
  const filterCustomerData =
    customerData?.customersPaginatedResult?.results?.filter((obj) => {
      const createdAt = new Date(obj.createdAt);

      return createdAt >= startDate && createdAt <= endDate;
    });

  const Customers = filterCustomerData?.map((obj) => {
    return {
      'Customer number': obj?.customerNumber,
      'External Id': obj?.externalId,
      'First Name': obj?.firstName,
      'Last Name': obj?.lastName,
      Company: obj?.companyName,
      Email: obj?.email,
      'Date Created': obj?.createdAt,
      'Last Modified': obj?.lastModifiedAt,
    };
  });

  return Customers;
}

// Excel export for Products
export function generateProductExcel(productData, startDate, endDate) {
  const filterProductData = productData?.ProductListItems?.filter((obj) => {
    const createdAt = new Date(obj.createdAt);

    return createdAt >= startDate && createdAt <= endDate;
  });

  const Products = filterProductData?.map((obj) => {
    return {
      'Product Name': obj?.masterData?.current?.name,
      'Product Description': obj?.masterData?.current?.__typename,
      'Product Type': obj?.productType?.name,
      'Product Key': obj?.productType?.key,
      Price: amountCalculator(
        obj?.masterData?.current?.masterVariant?.prices[0]?.value?.centAmount
      ),
      SKU: obj?.masterData?.current?.masterVariant?.sku,
      Created: obj?.createdAt,
      Modified: obj?.lastModifiedAt,
    };
  });
  function amountCalculator(centAmount) {
    centAmount = centAmount / 100;
    centAmount = '$' + centAmount + '.00';
    return centAmount;
  }

  return Products;
}

// Excel export for SLA Metrics
export function generateSLAExcel(ticketMdbData, startDate, endDate) {
  const filterSlaData = ticketMdbData?.filter((obj) => {
    const createdAt = new Date(obj.Created);

    return createdAt >= startDate && createdAt <= endDate && obj.resolutionDate;
  });

  const SLA = filterSlaData?.map((obj) => {
    return {
      'Ticket Number': obj?.ticketNumber,
      'Customer Email': obj?.Customer,
      'Created Date': obj?.Created,
      Resolved: obj?.resolutionDate,
      Status: obj?.status,
      Priority: obj?.Priority,
      SLA: getSLARate(obj?.Created, obj?.resolutionDate),
    };
  });
  return SLA;
}

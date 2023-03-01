package com.rc.ct.mirakl.service.impl;

import com.rc.ct.config.AppConfig;
import com.rc.ct.mirakl.service.OrderDetailsSendGridEmailService;
import com.rc.ct.model.OrderEmailRequest;
import main.java.com.rc.ct.customizable.DynamicTemplateDataPersonalization;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sendgrid.Email;
import com.sendgrid.Mail;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;

import static com.rc.ct.constants.Constants.*;

/**
 * @author AhsanAli
 * @Date 7/12/2022
 * Send grid email service to send emails to customers
 */
@Service
public class OrderDetailsSendGridEmailServiceImpl implements OrderDetailsSendGridEmailService {
	
	private static final String CLASSNAME = OrderDetailsSendGridEmailServiceImpl.class.getName();
	private static final Logger LOGGER = LoggerFactory.getLogger(CLASSNAME);
	private final AppConfig appConfig;

	public OrderDetailsSendGridEmailServiceImpl(AppConfig appConfig) {
		this.appConfig = appConfig;
	}

	@Override
	public void sendOrderDetailsEmail(OrderEmailRequest orderEmailRequest) {
		if(appConfig.getSendGridApiKey()!=null && appConfig.getSendGridTemplateId()!=null){
			Email fromEmail = new Email(orderEmailRequest.getFromEmail());
			//Customer customer = customerService.findCustomerDetailsById(order.getCustomerId());
			Email toEmail = new Email(orderEmailRequest.getToEmail());
			Mail mail = new Mail();

			DynamicTemplateDataPersonalization personalization = new DynamicTemplateDataPersonalization();
			personalization.addTo(toEmail);

			mail.setFrom(fromEmail);
			mail.setSubject(orderEmailRequest.getSubject());

//		personalization.setDynamicTemplateData(SendGridEmailConstants.SUBJECT, orderEmailRequest.getSubject());
//		personalization.setDynamicTemplateData(SendGridEmailConstants.FIRST_NAME, customer.getFirstName());
			personalization.setDynamicTemplateData(SEND_GRID_EMAIL_ORDER_ID,orderEmailRequest.getOrderId());
			personalization.setDynamicTemplateData(SEND_GRID_CUSTOMER_ID, orderEmailRequest.getCustomerId());
//
//			//Order summary
			//personalization.addSubstitution(SEND_GIRD_IMAGE_URL, orderEmailRequest.getImageUrl());
			personalization.setDynamicTemplateData(SEND_GIRD_IMAGE_URL, orderEmailRequest.getImageUrl());

			personalization.setDynamicTemplateData(SEND_GRID_PRODUCT_NAME, orderEmailRequest.getProductName());
			//personalization.setDynamicTemplateData(SEND_GRID_QUANTITY, orderEmailRequest.getQuantity());
//			//personalization.setDynamicTemplateData(SENDGRID_SKU, orderEmailRequest.getSku());
			personalization.setDynamicTemplateData(SEND_GRID_PRICE, orderEmailRequest.getPrice());
//
			personalization.setDynamicTemplateData(SEND_GRID_SUB_TOTAL, orderEmailRequest.getTotalPrice());
//			personalization.setDynamicTemplateData(SEND_GRID_SHIPPING_CHARGES, orderEmailRequest.getShippingPrice());
			personalization.setDynamicTemplateData(SEND_GRID_TAXED_PRICE, orderEmailRequest.getTaxedPrice());
			personalization.setDynamicTemplateData(SEND_GIRD_TOTAL_PRICE, orderEmailRequest.getTotalPrice());
//
//			//Shipping Information
			personalization.setDynamicTemplateData(SEND_GIRD_SHIPPING_FIRST_NAME, orderEmailRequest.getShippingFirstName());
			personalization.setDynamicTemplateData(SEND_GRID_SHIPPING_LAST_NAME, orderEmailRequest.getShippingLastName());
			personalization.setDynamicTemplateData(SEND_GRID_SHIPPING_STREET_NUMBER, orderEmailRequest.getShippingStreetNumber());
			personalization.setDynamicTemplateData(SEND_GRID_SHIPPING_STREET_NAME, orderEmailRequest.getShippingStreetName());
			personalization.setDynamicTemplateData(SEND_GRID_SHIPPING_POSTAL_CODE, orderEmailRequest.getShippingPostalCode());
			personalization.setDynamicTemplateData(SEND_GRID_SHIPPING_CITY, orderEmailRequest.getShippingCity());
			personalization.setDynamicTemplateData(SEND_GRID_SHIPPING_COUNTRY, orderEmailRequest.getShippingCountry());
			personalization.setDynamicTemplateData(SEND_GRID_SHIPPING_STATE, orderEmailRequest.getShippingState());
//			personalization.setDynamicTemplateData(SEND_GRID_SHIPPING_PHONE_NUMBER, orderEmailRequest.getShippingPhoneNumber());
//
			//Billing Information
			personalization.setDynamicTemplateData(SEND_GIRD_BILLING_FIRST_NAME, orderEmailRequest.getBillingFirstName());
			personalization.setDynamicTemplateData(SEND_GRID_BILLING_LAST_NAME, orderEmailRequest.getBillingLastName());
			personalization.setDynamicTemplateData(SEND_GRID_BILLING_STREET_NUMBER, orderEmailRequest.getBillingStreetNumber());
			personalization.setDynamicTemplateData(SEND_GRID_BILLING_STREET_NAME, orderEmailRequest.getBillingStreetName());
			personalization.setDynamicTemplateData(SEND_GRID_BILLING_POSTAL_CODE, orderEmailRequest.getBillingPostalCode());
			personalization.setDynamicTemplateData(SEND_GRID_BILLING_CITY, orderEmailRequest.getBillingCity());
			personalization.setDynamicTemplateData(SEND_GRID_BILLING_STATE, orderEmailRequest.getBillingState());
//			personalization.setDynamicTemplateData(SEND_GRID_BILLING_PHONE_NUMBER, orderEmailRequest.getBillingPhoneNumber());
			personalization.setDynamicTemplateData(SEND_GRID_BILLING_COUNTRY, orderEmailRequest.getBillingCountry());
//
//			//Shipping method
//			personalization.setDynamicTemplateData(SEND_GRID_SHIPMENT_METHOD, orderEmailRequest.getShippingMethod());
//
//			//Payment
//			personalization.setDynamicTemplateData(SEND_GRID_PAYMENT_METHOD, orderEmailRequest.getPaymentMethod());

			mail.addPersonalization(personalization);
			mail.setTemplateId(appConfig.getOrderSendgridTemplateId());

			SendGrid sendGrid = new SendGrid(appConfig.getSendGridApiKey());
			Request request = new Request();

			try {
				request.setMethod(Method.POST);
				request.setEndpoint("mail/send");
				request.setBody(mail.build());

				Response response = sendGrid.api(request);
				LOGGER.info("Email sent");
				LOGGER.info(String.valueOf(response.getStatusCode()));

			} catch (Exception e) {
				LOGGER.error("Error while sending email");
				LOGGER.error(e.getMessage());
			}
		}else {
			LOGGER.error("Can not find Send Grid API Key and Template ID");
		}
	}
}

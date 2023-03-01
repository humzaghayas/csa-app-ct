package com.rc.ct.mirakl.service.impl;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.mirakl.client.mmp.domain.product.MiraklProductMedia;
import com.rc.ct.mirakl.service.NotificationService;
import com.rc.ct.model.OrderEmailRequest;
import com.rc.ct.model.Price;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.commercetools.api.client.ByProjectKeyRequestBuilder;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rc.ct.config.AppConfig;
import com.rc.ct.constants.Constants;
import com.rc.ct.mirakl.service.CTSubscrioptionService;

import static com.rc.ct.constants.Constants.*;

@Service
public class CTSubscrioptionServiceImpl implements CTSubscrioptionService {

	private static final Logger LOGGER = LoggerFactory.getLogger(CTSubscrioptionServiceImpl.class);
//	private final ByProjectKeyRequestBuilder requestBuilder;
	private final AppConfig appConfig;
	private final NotificationService notificationService;
	
	
	public CTSubscrioptionServiceImpl(@Qualifier(value = "ctAdminRequestBuilder") ByProjectKeyRequestBuilder requestBuilder,
									  AppConfig appConfig, NotificationService notificationService) {
//		this.requestBuilder = requestBuilder;
		this.appConfig = appConfig;
		this.notificationService = notificationService;
	}
	
	@Override
	public Map<Boolean,String> subscriptionHandler(String orderResponse) throws Exception {

		Map<Boolean,String> returnMap = new HashMap<>();
		ObjectMapper mapper = new ObjectMapper();
		JsonNode orderRespJsonNode=null;
		try {
			orderRespJsonNode = mapper.readTree(orderResponse);
		}catch (JsonProcessingException e) {
			e.printStackTrace();
			returnMap.put(Boolean.FALSE, "Order Message from has errors!");
			return returnMap ;
		}

		if(orderRespJsonNode == null || orderRespJsonNode.get(Constants.ORDER) == null) {
			returnMap.put(Boolean.FALSE, "Order node is missing from input JSON!");
			return returnMap;
		}

		SendOrderCreationEmail(orderRespJsonNode.get(Constants.ORDER));
		returnMap.put(Boolean.TRUE, "Email Sent");
		return returnMap;
  }

	private void SendOrderCreationEmail(JsonNode orderNode){
		if(orderNode.has(CUSTOMER_EMAIL)){
			String customerEmail = orderNode.get(CUSTOMER_EMAIL).asText();
			String id = orderNode.get(Constants.ID).asText();
			String customerId = orderNode.get(CUSTOMER_ID).asText();

			JsonNode lineItemArray = orderNode.get(LINE_ITEMS);
			final JsonNode lineItemNode = lineItemArray.get(0);

			//quantity
			// String quantity = lineItemNode.get(QUANTITY).asText();

			//name
			JsonNode nameNode = lineItemNode.get(NAME).get(EN);
			String name = nameNode.asText();

			JsonNode variantNode = lineItemNode.get(VARIANT);
			List<MiraklProductMedia> mediaList = new ArrayList<>();
			
			//images
			final JsonNode images = variantNode.get(IMAGES);
			images.forEach(image -> {
				MiraklProductMedia media = new MiraklProductMedia();
				media.setType(IMAGE);
				media.setMediaUrl(image.get(URL).asText());
				mediaList.add(media);
			});
			String s = mediaList.toString();
			JsonNode imageNode = images.get(0);
			String imageUrl = imageNode.get(URL).asText();

			//price
			final JsonNode priceNode = lineItemNode.get(PRICE);

			double variantPrice = priceNode.get(VALUE).get(CENT_AMOUNT).asDouble();
			int fractionDigits = priceNode.get(VALUE).get(FRACTION_DIGITS).asInt();

			Price price = new Price();
			price.setCurrency(CURRENCY);
			price.value(BigDecimal.valueOf(variantPrice / Integer.parseInt("1" + "0".repeat(Math.max(0, fractionDigits)))));

			String priceStr = price.getCurrency() + price.getValue().toString();

			//subTotal & totalPrice
			final JsonNode totalPriceNode = lineItemNode.get(TOTAL_PRICE);

			double totalVariantPrice = totalPriceNode.get(CENT_AMOUNT).asDouble();
			int totalFractionDigits = totalPriceNode.get(FRACTION_DIGITS).asInt();

			Price totalPrice = new Price();
			totalPrice.setCurrency(CURRENCY);
			totalPrice.value(BigDecimal.valueOf(totalVariantPrice / Integer.parseInt("1" + "0".repeat(Math.max(0, totalFractionDigits)))));

			final String totalPriceStr = price.getValue().toString();

			//taxedPrice
			JsonNode taxedPriceNode = lineItemNode.get(TAX_RATE);
			JsonNode taxRateNode = taxedPriceNode.get(AMOUNT);
			String taxRate = taxRateNode.asText();
//			JsonNode totalTaxNode = taxedPriceNode.get(TOTAL_TAX);
//
//			double taxVariantPrice = totalTaxNode.get(CENT_AMOUNT).asDouble();
//			int taxFractionDigits = totalTaxNode.get(FRACTION_DIGITS).asInt();
//
//			Price taxPrice = new Price();
//			taxPrice.setCurrency(CURRENCY);
//			taxPrice.value(BigDecimal.valueOf(taxVariantPrice / Integer.parseInt("1" + "0".repeat(Math.max(0, taxFractionDigits)))));
//
//			final String taxPriceStr = price.getValue().toString();

			JsonNode shippingAddressNode = orderNode.get(SHIPPING_ADDRESS);
			String shippingFirstName = shippingAddressNode.get(FIRST_NAME).asText();
			String shippingLastName = shippingAddressNode.get(LAST_NAME).asText();
			String shippingStreetNumber = shippingAddressNode.get(STREET_NUMBER).asText();
			String shippingStreetName = shippingAddressNode.get(STREET_NAME).asText();
			String shippingPostalCode = shippingAddressNode.get(POSTAL_CODE).asText();
			String shippingCity = shippingAddressNode.get(CITY).asText();
			String shippingState = shippingAddressNode.get(STATE).asText();
			String shippingCountry = shippingAddressNode.get(COUNTRY).asText();
//			String shippingPhoneNumber = orderNode.get(PHONE).asText();

			JsonNode billingAddressNode = orderNode.get(BILLING_ADDRESS);
			String billingFirstName = billingAddressNode.get(FIRST_NAME).asText();
			String billingLastName = billingAddressNode.get(LAST_NAME).asText();
			String billingStreetNumber = billingAddressNode.get(STREET_NUMBER).asText();
			String billingStreetName = billingAddressNode.get(STREET_NAME).asText();
			String billingPostalName = billingAddressNode.get(POSTAL_CODE).asText();
			String billingCity = billingAddressNode.get(CITY).asText();
			String billingState = billingAddressNode.get(STATE).asText();
			String billingCountry = billingAddressNode.get(COUNTRY).asText();
//			String billingPhoneNumber = orderNode.get(PHONE).asText();
//			String shippingMethod = orderNode.get(SHIPPING_METHOD).asText();

			OrderEmailRequest orderEmailRequest = new OrderEmailRequest();
			orderEmailRequest.setOrderId(id);
			orderEmailRequest.setToEmail(customerEmail);
			orderEmailRequest.setFromEmail(appConfig.getFromEmail());
			orderEmailRequest.setCustomerId(customerId);
//
			orderEmailRequest.setImageUrl(imageUrl);
			orderEmailRequest.setProductName(name);
//			orderEmailRequest.setQuantity(quantity);
			orderEmailRequest.setPrice(price.toString());
//
			orderEmailRequest.setSubTotal(totalPriceStr);
//			orderEmailRequest.setShippingPrice(shippingCharges);
			orderEmailRequest.setTaxedPrice(taxRate);
			orderEmailRequest.setTotalPrice(totalPriceStr);
//
			orderEmailRequest.setShippingFirstName(shippingFirstName);
			orderEmailRequest.setShippingLastName(shippingLastName);
			orderEmailRequest.setShippingStreetNumber(shippingStreetNumber);
			orderEmailRequest.setShippingStreetName(shippingStreetName);
			orderEmailRequest.setShippingPostalCode(shippingPostalCode);
			orderEmailRequest.setShippingCity(shippingCity);
			orderEmailRequest.setShippingState(shippingState);
			orderEmailRequest.setBillingCountry(shippingCountry);
//			orderEmailRequest.setShippingPhoneNumber(shippingPhoneNumber);

			orderEmailRequest.setBillingFirstName(billingFirstName);
			orderEmailRequest.setBillingLastName(billingLastName);
			orderEmailRequest.setBillingStreetNumber(billingStreetNumber);
			orderEmailRequest.setBillingStreetName(billingStreetName);
			orderEmailRequest.setBillingPostalCode(billingPostalName);
			orderEmailRequest.setBillingCity(billingCity);
			orderEmailRequest.setBillingState(billingState);
			orderEmailRequest.setBillingCountry(billingCountry);
//			orderEmailRequest.setBillingPhoneNumber(billingPhoneNumber);

			//orderEmailRequest.setShippingMethod(shippingMethod);

			LOGGER.info("Sending Email to: "+customerEmail);
			notificationService.sendEmail(orderEmailRequest);
		}else {
			LOGGER.info("Customer Email not Found");
		}
	}

	public Price getPrice(JsonNode variantNode) {
		final JsonNode priceNode = variantNode.get(PRICE);

		double variantPrice = priceNode.get(VALUE).get(CENT_AMOUNT).asDouble();
		int fractionDigits = priceNode.get(VALUE).get(FRACTION_DIGITS).asInt();

		Price price = new Price();
		price.setCurrency(CURRENCY);
		price.value(BigDecimal.valueOf(variantPrice / Integer.parseInt("1" + "0".repeat(Math.max(0, fractionDigits)))));

		return price;
	}

	public List<MiraklProductMedia> getMediaList(JsonNode variantNode) {
		List<MiraklProductMedia> mediaList = new ArrayList<>();
		final JsonNode images = variantNode.get(IMAGES);
		images.forEach(image -> {
			MiraklProductMedia media = new MiraklProductMedia();
			media.setType(IMAGE);
			media.setMediaUrl(image.get(URL).asText());
			mediaList.add(media);
		});
		return mediaList;
	}
}
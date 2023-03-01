package com.rc.ct.controller;


import java.util.Map;

import com.rc.ct.mirakl.service.OrderDetailsSendGridEmailService;
import com.rc.ct.model.OrderEmailRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.rc.ct.model.Body;

import com.rc.ct.mirakl.service.CTSubscrioptionService;

@RestController
public class SendGridCTOrderApi {

	@Autowired
	CTSubscrioptionService ctSubscriptionService;

	 @RequestMapping(value = "/sendgrid-order-confirmation", method = RequestMethod.POST)
	  public ResponseEntity receiveMessage(@RequestBody Body body)throws Exception {
	    // Get PubSub message from request body.
	    Body.Message message = body.getMessage();
	    if (message == null) {
	      String msg = "Bad Request: invalid Pub/Sub message format";
	      System.out.println(msg);
	      return new ResponseEntity(msg, HttpStatus.BAD_REQUEST);
	    }

	    String data = message.getData();
	    
	    if(StringUtils.isEmpty(data)) {
	    	System.out.println(" Data Missing!");
	    	return new ResponseEntity(" Data Missing!", HttpStatus.BAD_REQUEST);
	    }
	    String target = data;
	    String msg = "Hello " + target + "!";
	    System.out.println(msg);
	    
	    Map<Boolean,String> returnMap = ctSubscriptionService.subscriptionHandler(target);
	    
	    if(returnMap.containsKey(Boolean.FALSE)) {
	    	return new ResponseEntity(returnMap.get(Boolean.FALSE), HttpStatus.BAD_REQUEST);
	    }
	    
	    return new ResponseEntity(msg, HttpStatus.OK);
	  }

}

package com.rc.ct.mirakl.service.impl;

import com.commercetools.api.client.ByProjectKeyRequestBuilder;
import com.commercetools.api.models.customer.CustomerCreatePasswordResetTokenBuilder;
import com.commercetools.api.models.customer.CustomerToken;
import com.rc.ct.mirakl.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.rc.ct.model.CustomerPasswordResetEmailRequest;
import com.rc.ct.model.PasswordResetToken;
import com.rc.ct.mirakl.service.CustomerPasswordResetTokenSendGridEmailService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class CustomerServiceImpl implements CustomerService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    private final ByProjectKeyRequestBuilder requestBuilder;
    @Autowired
    CustomerPasswordResetTokenSendGridEmailService customerPasswordResetTokenSendGridEmailService;

    /**
     * Instantiates a new Customer service.
     *
     * @param requestBuilder the request builder
     */
    public CustomerServiceImpl(@Qualifier(value = "ctAdminRequestBuilder") ByProjectKeyRequestBuilder requestBuilder) {
        this.requestBuilder = requestBuilder;
    }
    @Override
    public CustomerToken createPasswordResetToken(String email) {
        CustomerToken token = null;
        String methodName = "getCustomerResetToken";

        try {
            logger.info("Entering :" + CustomerServiceImpl.class + "method name :" + methodName);
            token = requestBuilder.customers().passwordToken().post(
                    CustomerCreatePasswordResetTokenBuilder.of()
                            .email(email)
                            //.ttlMinutes(34560l)
                            .build()).executeBlocking().getBody();
            logger.info("Exiting :" + CustomerServiceImpl.class + "method name :" + methodName);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }
        return token;
    }

    @Override
    public CustomerToken createCustomerPasswordResetToken(PasswordResetToken passwordResetToken) {
        CustomerToken token = null;
        String methodName = "getCustomerResetToken";

        try {
            logger.info("Entering :" + CustomerServiceImpl.class + "method name :" + methodName);
            token = requestBuilder.customers().passwordToken().post(
                    CustomerCreatePasswordResetTokenBuilder.of()
                            .email(passwordResetToken.getEmail())
                            //.ttlMinutes(34560l)
                            .build()).executeBlocking().getBody();
            logger.info("Exiting :" + CustomerServiceImpl.class + "method name :" + methodName);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);

        }

        CustomerPasswordResetEmailRequest customerPasswordResetEmailRequest = new CustomerPasswordResetEmailRequest();
        customerPasswordResetEmailRequest.setFromEmail("yaseen.r@royalcyber.com");
        customerPasswordResetEmailRequest.setToEmail(passwordResetToken.getEmail());
        customerPasswordResetEmailRequest.setSubject("Request For Password Reset");
        customerPasswordResetEmailRequest.setExpiresAt(passwordResetToken.getEmail());

        customerPasswordResetTokenSendGridEmailService.sendCustomerPasswordResetEmail(customerPasswordResetEmailRequest);

        return token;
    }

}


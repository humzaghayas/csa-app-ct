package com.rc.ct.controller;

import com.commercetools.api.models.customer.CustomerToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.rc.ct.mirakl.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.rc.ct.model.PasswordResetToken;

import javax.validation.Valid;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    @Autowired
    private final CustomerService customerService;

    /**
     * Instantiates a new Customer controller.
     *
     * @param customerService the customer service
     */
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }
    @PostMapping(value = "/customer-password-reset-token")
    public ResponseEntity<CustomerToken> createCustomerResetToken(@Valid @RequestBody(required = true) PasswordResetToken passwordResetToken) {
        CustomerToken token = customerService.createCustomerPasswordResetToken(passwordResetToken);

        return ResponseEntity.ok(token);
    }
}


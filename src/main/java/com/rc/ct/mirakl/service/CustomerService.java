package com.rc.ct.mirakl.service;

import com.commercetools.api.models.customer.CustomerToken;
import com.rc.ct.model.PasswordResetToken;

public interface CustomerService {

    public CustomerToken createPasswordResetToken(String email);
    public CustomerToken createCustomerPasswordResetToken(PasswordResetToken passwordResetToken);
}


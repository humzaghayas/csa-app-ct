package com.rc.ct.mirakl.service;

import com.rc.ct.model.CustomerPasswordResetEmailRequest;

public interface CustomerPasswordResetTokenSendGridEmailService {
    public String sendCustomerPasswordResetEmail(final CustomerPasswordResetEmailRequest customerPasswordResetEmailRequest);
}

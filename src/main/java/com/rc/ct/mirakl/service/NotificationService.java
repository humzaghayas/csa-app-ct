package com.rc.ct.mirakl.service;

import com.rc.ct.model.OrderEmailRequest;

/**
 * @author AhsanAli
 * @Date 07/12/2022
 */
public interface NotificationService {
    public void sendEmail(OrderEmailRequest orderEmailRequest);
}

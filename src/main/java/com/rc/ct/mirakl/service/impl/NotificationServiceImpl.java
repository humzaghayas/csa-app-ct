package com.rc.ct.mirakl.service.impl;

import com.rc.ct.mirakl.service.NotificationService;
import com.rc.ct.mirakl.service.OrderDetailsSendGridEmailService;
import com.rc.ct.model.OrderEmailRequest;
import org.springframework.stereotype.Service;

/**
 * @author AhsanAli
 * @Date 07/12/2022
 */
@Service
public class NotificationServiceImpl implements NotificationService {

    private OrderDetailsSendGridEmailService orderDetailsSendGridEmailService;

    /**
     * Constructor
     * @param orderDetailsSendGridEmailService
     */
    public NotificationServiceImpl(OrderDetailsSendGridEmailService orderDetailsSendGridEmailService) {
        this.orderDetailsSendGridEmailService = orderDetailsSendGridEmailService;
    }

    /**
     * Send email method: to send emails to customer whether on time of creation order or sign in or sign up or reset password
     * @param orderEmailRequest
     */
    @Override
    public void sendEmail(OrderEmailRequest orderEmailRequest) {
        orderDetailsSendGridEmailService.sendOrderDetailsEmail(orderEmailRequest);
    }

}

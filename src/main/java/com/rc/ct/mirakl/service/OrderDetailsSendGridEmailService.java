package com.rc.ct.mirakl.service;


import com.rc.ct.model.OrderEmailRequest;

/**
 * @author AhsanAli
 * @Date 7/12/2022
 */
public interface OrderDetailsSendGridEmailService {
	
	public void sendOrderDetailsEmail(final OrderEmailRequest orderEmailRequest);

}

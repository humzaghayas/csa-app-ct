package com.rc.ct.mirakl.service.impl;

import com.commercetools.api.models.customer.CustomerToken;
import com.rc.ct.constants.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.sendgrid.Email;
import com.sendgrid.Mail;
import com.sendgrid.SendGrid;
import com.sendgrid.Request;
import com.sendgrid.Method;
import com.sendgrid.Response;
import main.java.com.rc.ct.customizable.DynamicTemplateDataPersonalization;

import com.rc.ct.mirakl.service.CustomerPasswordResetTokenSendGridEmailService;
import com.rc.ct.mirakl.service.CustomerService;
import com.rc.ct.model.PasswordResetToken;
import com.rc.ct.model.CustomerPasswordResetEmailRequest;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Service
public class CustomerPasswordResetTokenSendGridEmailServiceImpl implements CustomerPasswordResetTokenSendGridEmailService {

    private static final String CLASSNAME = CustomerPasswordResetTokenSendGridEmailServiceImpl.class.getName();
    private static final Logger logger = LoggerFactory.getLogger(CLASSNAME);

    @Value("${spring.sendgrid.apikey}")
    private String apiKey;

    @Value("${spring.password.reset.templateId}")
    private String templateId;

    @Autowired
    CustomerService customerService;

    @Override
    public String sendCustomerPasswordResetEmail(CustomerPasswordResetEmailRequest customerPasswordResetEmailRequest) {
        Email fromEmail = new Email(customerPasswordResetEmailRequest.getFromEmail());
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setEmail(customerPasswordResetEmailRequest.getToEmail());
        CustomerToken customerToken = customerService.createPasswordResetToken(customerPasswordResetEmailRequest.getToEmail());

        Email toEmail = new Email(passwordResetToken.getEmail());
        Mail mail = new Mail();

        DynamicTemplateDataPersonalization personalization = new DynamicTemplateDataPersonalization();
        personalization.addTo(toEmail);

        mail.setFrom(fromEmail);
        mail.setSubject(customerPasswordResetEmailRequest.getSubject());

        ZonedDateTime expiresAt = customerToken.getExpiresAt();
        DateTimeFormatter ambiguousFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy - hh:mm", Locale.ENGLISH);

        String format = expiresAt.format(ambiguousFormatter);

        personalization.setDynamicTemplateData(Constants.SUBJECT, customerPasswordResetEmailRequest.getSubject());
        personalization.setDynamicTemplateData(Constants.ACCESS_TOKEN, customerToken.getValue());
        personalization.setDynamicTemplateData(Constants.EXPIRES_AT, format);

        mail.addPersonalization(personalization);
        mail.setTemplateId(templateId);

        SendGrid sendGrid = new SendGrid(apiKey);
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sendGrid.api(request);
            logger.info(response.getBody());

        } catch (Exception e) {
            logger.error("error while sending email");
            logger.info(e.getMessage());
        }

        return "Email was sent successfully";
    }
}

package com.rc.ct.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import com.rc.ct.model.PasswordResetToken;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CustomerPasswordResetEmailRequest {

    private String fromEmail;

    private String toEmail;

    private PasswordResetToken passwordResetToken;

    private String subject;

    private String expiresAt;

}


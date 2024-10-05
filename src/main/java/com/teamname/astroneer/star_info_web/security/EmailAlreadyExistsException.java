package com.teamname.astroneer.star_info_web.security;

import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;

public class EmailAlreadyExistsException extends OAuth2AuthenticationException {
    public EmailAlreadyExistsException(String msg) {
        super(new OAuth2Error("email_exists", msg, null));
    }
}
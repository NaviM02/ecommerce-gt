package com.navi.ecommerceapi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DatabaseConfig {

    @Value("${DB_URL}")
    private String dbUrl;

    @Value("${DB_USER}")
    private String dbUser;

    @Value("${DB_PASSWORD}")
    private String dbPassword;

    public void printConfig() {
        System.out.println("URL: " + dbUrl);
        System.out.println("USER: " + dbUser);
    }
}

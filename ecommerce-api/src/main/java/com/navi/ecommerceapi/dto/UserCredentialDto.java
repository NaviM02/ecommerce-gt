package com.navi.ecommerceapi.dto;

import lombok.Data;

@Data
public class UserCredentialDto {
    private String username;
    private String password;
    private String fingerprint;
}

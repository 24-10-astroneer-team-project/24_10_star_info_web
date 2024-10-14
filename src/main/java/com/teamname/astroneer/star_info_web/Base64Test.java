package com.teamname.astroneer.star_info_web;

import java.util.Base64;

public class Base64Test {
    public static void main(String[] args) {
        String apiKey = "c6431858-a8d1-4421-bbbe-ed9a55a91a24";
        String apiSecret = "3603574ec7b2940d32759386780f06b1e95ee587d7fe600e848e202ce62075bcb9c7973d866b6008eae10808e720f70124c797a3bd400845fb1769c9875d7bd9f12860ce96f2d597703db2aa9cadfce62ff90a1f2ad2168abc2787adf75f7d74557a86837a4a245682df586657453a7b";

        String credentials = apiKey + ":" + apiSecret;
        String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());

        System.out.println("Base64 인코딩 값: " + encodedCredentials);

        // 디코딩해서 정상적으로 변환되는지 확인
        String decodedCredentials = new String(Base64.getDecoder().decode(encodedCredentials));
        System.out.println("디코딩 값: " + decodedCredentials);
        // push 테스트
    }
}
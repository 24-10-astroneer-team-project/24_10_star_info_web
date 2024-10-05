package com.teamname.astroneer.star_info_web;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StarInfoWebApplication {

    public static void main(String[] args) {
        // .env 파일 로드
        Dotenv dotenv = Dotenv.configure().ignoreIfMalformed().ignoreIfMissing().load();

        // .env 파일에서 환경 변수 설정
        System.setProperty("GOOGLE_CLIENT_ID", dotenv.get("GOOGLE_CLIENT_ID"));
        System.setProperty("GOOGLE_CLIENT_SECRET", dotenv.get("GOOGLE_CLIENT_SECRET"));

        System.out.println(Dotenv.configure().ignoreIfMissing().load());

        // Spring Boot 애플리케이션 실행
        SpringApplication.run(StarInfoWebApplication.class, args);
    }

}

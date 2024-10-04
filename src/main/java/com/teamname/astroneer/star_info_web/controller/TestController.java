package com.teamname.astroneer.star_info_web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

    @GetMapping("/test/hello")
    public String hello(Model model) {
        // 화면에 전달할 데이터를 모델에 추가
        model.addAttribute("message", "Hello, Astroneer!");
        // Thymeleaf 뷰 파일 이름을 반환 (resources/templates/hello.html)

        //깃 테스트 한영신
        System.out.println("한영신");
        return "hello";
    }
}
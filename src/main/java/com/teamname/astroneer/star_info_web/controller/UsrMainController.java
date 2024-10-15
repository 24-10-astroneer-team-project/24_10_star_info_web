package com.teamname.astroneer.star_info_web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/usr/home/")
public class UsrMainController {

    @GetMapping("main")
    public String main() {
        System.out.println("=======================home/main 접근=========================");
        return "main";
    }
}

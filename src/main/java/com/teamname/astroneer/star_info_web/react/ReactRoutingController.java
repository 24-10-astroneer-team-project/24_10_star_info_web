package com.teamname.astroneer.star_info_web.react;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactRoutingController {

    @RequestMapping("/{path:[^.]*}")
    public String forwardToReact() {
        return "forward:/index.html";
    }
}
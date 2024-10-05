package com.teamname.astroneer.star_info_web.controller;

import com.teamname.astroneer.star_info_web.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/usr/member/")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private AuthenticationManager authenticationManager;

//    @RequestMapping("join")
//    public String showJoin() {
//        return "usr/member/join";
//    }

//    @RequestMapping("doJoin")
//    @ResponseBody
//    public String doJoin(HttpServletRequest req, String loginPw,
//                         String name, String nickname, String email) {
//
//        if (Ut.isEmptyOrNull(email)) {
//            return Ut.jsHistoryBack("F-6", Ut.f("이메일을 입력해주세요."));
//        }
//
//        if (Ut.isEmptyOrNull(loginPw)) {
//            return Ut.jsHistoryBack("F-2", Ut.f("비밀번호를 입력해주세요."));
//        }
//
//        if (Ut.isEmptyOrNull(name)) {
//            return Ut.jsHistoryBack("F-3", Ut.f("이름을 입력해주세요."));
//        }
//
//        if (Ut.isEmptyOrNull(nickname)) {
//            return Ut.jsHistoryBack("F-4", Ut.f("닉네임을 입력해주세요."));
//        }
//
//        // 이메일 중복 체크
//        Member existingMember = memberService.getMemberByEmail(email);
//        if (existingMember != null) {
//            return Ut.jsHistoryBack("F-7", Ut.f("해당 이메일은 이미 사용 중입니다."));
//        }
//
//        // 자동 생성된 loginId (user-랜덤UUID 형식)
//        String loginId = "user-" + UUID.randomUUID().toString().substring(0, 8);
//
//        // 비밀번호 암호화
//        String encodedPassword = passwordEncoder.encode(loginPw);
//
//        ResultData<Member> doJoinRd = memberService.doJoin(loginId, encodedPassword, name, nickname, email);
//
//        if (doJoinRd.isFail()) {
//            return Ut.jsHistoryBack(doJoinRd.getResultCode(), doJoinRd.getMsg());
//        }
//
//        return Ut.jsReplace(doJoinRd.getResultCode(), doJoinRd.getMsg(), "usr/member/login");
//    }

//    // 로컬 로그인 처리
//    @PostMapping("/doLocalLogin")
//    @ResponseBody
//    public ResultData<Member> doLocalLogin(@RequestParam String email, @RequestParam String loginPw, HttpServletRequest req) {
//        try {
//            // 로그 출력: 로그인 컨트롤러 작동 시작
//            System.err.println("=============로그인 컨트롤러 작동.============");
//
//            // 이메일로 사용자를 조회
//            Member member = memberService.getMemberByEmail(email);
//
//            // 사용자가 존재하지 않는 경우 처리
//            if (member == null) {
//                return ResultData.from("F-1", "해당 이메일로 등록된 사용자가 없습니다.");
//            }
//
//            // 비밀번호가 일치하지 않는 경우 처리 (비밀번호는 암호화된 상태로 비교)
//            if (!passwordEncoder.matches(loginPw, member.getLoginPw())) {
//                return ResultData.from("F-2", "비밀번호가 일치하지 않습니다.");
//            }
//
//            // 인증 객체 생성
//            UsernamePasswordAuthenticationToken token =
//                    new UsernamePasswordAuthenticationToken(email, loginPw);
//
//            // 인증 요청 및 처리
//            Authentication authentication = authenticationManager.authenticate(token);
//
//            // 인증 성공 시, SecurityContext에 저장
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//            System.err.println("=============SecurityContext에 인증 정보 저장 완료============");
//
//            // 세션에 사용자 정보 저장
//            req.getSession().setAttribute("loginedMember", member);
//            System.err.println("=============세션 저장 성공=============");
//
//            // 로그인 성공 리턴
//            return ResultData.from("S-1", "로그인 성공", "member", member);
//
//        } catch (Exception e) {
//            // 예외 발생 시 스택 트레이스 및 오류 메시지 출력
//            e.printStackTrace();
//            System.err.println("로그인 실패: " + e.getMessage());
//
//            // 로그인 실패 결과 리턴
//            return ResultData.from("F-3", "로그인 실패: " + e.getMessage());
//        }
//    }

    // 로그인 페이지 렌더링
    @GetMapping("/login")
    public ModelAndView loginPage() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 소셜 로그인 여부 확인 (OAuth2)
        if (authentication != null && authentication.isAuthenticated()
                && !(authentication instanceof AnonymousAuthenticationToken)) {
            System.err.println("Authentication class: " + authentication.getClass().getName());
            if (authentication instanceof OAuth2AuthenticationToken) {
                OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
                String email = oAuth2User.getAttribute("email");
                System.err.println("소셜 로그인된 사용자 이메일: " + email);
                return new ModelAndView("redirect:/usr/home/main");
            } else {
                System.err.println("소셜 로그인 아님");
            }
        }

        return new ModelAndView("login");
    }

    // 로그아웃
    @PostMapping("/doLogout")
    public String logout(HttpServletRequest request) {
        System.err.println("================== 로그 아웃 ==================");
        // 세션 무효화
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "redirect:/usr/member/login?logout";  // 로그아웃 후 로그인 페이지로 이동
    }
}

package com.teamname.astroneer.star_info_web.security;

import com.teamname.astroneer.star_info_web.entity.Member;
import com.teamname.astroneer.star_info_web.repository.MemberRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    public CustomOAuth2UserService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // 기본적으로 OAuth2User 정보를 가져옴
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // OAuth 제공자가 Google인지 확인
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String email;
        String googleLoginId;
        String profileImageUrl;

        if ("google".equals(registrationId)) {
            email = oAuth2User.getAttribute("email");
            googleLoginId = oAuth2User.getAttribute("sub"); // Google ID
            profileImageUrl = oAuth2User.getAttribute("picture"); // Google 프로필 이미지 URL
            System.out.println("Google OAuth2로 가져온 사용자 이메일: " + email);
            System.out.println("Google OAuth2로 가져온 사용자 ID: " + googleLoginId);

            // 세션에 프로필 이미지 URL 저장
            storeProfileImageInSession(profileImageUrl);

            return processGoogleUser(oAuth2User, email, googleLoginId);
        } else {
            throw new OAuth2AuthenticationException("Unknown registrationId: " + registrationId);
        }
    }

    // 세션에 프로필 이미지 URL 저장하는 메서드
    private void storeProfileImageInSession(String profileImageUrl) {
        // 현재 세션을 가져옴
        HttpSession session = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest().getSession();

        // 세션에 프로필 이미지 URL을 저장
        session.setAttribute("profileImageUrl", profileImageUrl);
    }

    // Google 사용자 처리
    private OAuth2User processGoogleUser(OAuth2User oAuth2User, String email, String googleLoginId) {
        Optional<Member> localUser = memberRepository.findByGoogleLoginId(googleLoginId);

        // 이미 기존 Google ID로 로그인한 사용자가 있을 경우, 해당 사용자로 로그인 처리
        if (localUser.isPresent()) {
            return new CustomOAuth2User(localUser.get(), oAuth2User.getAttributes());
        }

        if (memberRepository.findByEmail(email).isPresent()) {
            // 중복된 이메일이 존재할 경우 예외 발생
            throw new EmailAlreadyExistsException("이미 사용 중인 이메일입니다.");
        }

        System.out.println("로컬 DB에 Google 사용자가 존재하지 않음, 새로운 사용자 등록 시작");

        String displayName = oAuth2User.getAttribute("name") != null ? oAuth2User.getAttribute("name") : "사용자";
        String nickname = email.split("@")[0];
        createGoogleUserInLocalDB(email, displayName, nickname, googleLoginId);

        Member newUser = memberRepository.findByGoogleLoginId(googleLoginId).orElseThrow();
        return new CustomOAuth2User(newUser, oAuth2User.getAttributes());
    }

    // 로컬 DB에 Google 사용자 생성
    private void createGoogleUserInLocalDB(String email, String uName, String nickname, String googleLoginId) {
        if (memberRepository.findByGoogleLoginId(googleLoginId).isPresent()) {
            System.out.println("이미 존재하는 Google 사용자: " + googleLoginId);
            return;
        }

        Member newUser = new Member();
        newUser.setEmail(email);
        newUser.setUName(uName != null ? uName : "사용자");
        newUser.setNickname(nickname);
        newUser.setGoogleLoginId(googleLoginId);

        memberRepository.save(newUser);
        System.out.println("로컬 DB에 Google 사용자 저장 완료: " + email);
    }
}

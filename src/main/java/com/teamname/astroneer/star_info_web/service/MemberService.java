package com.teamname.astroneer.star_info_web.service;

import com.teamname.astroneer.star_info_web.dto.MemberDetailDTO;
import com.teamname.astroneer.star_info_web.entity.Location;
import com.teamname.astroneer.star_info_web.entity.Member;
import com.teamname.astroneer.star_info_web.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private LocationService locationService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        DefaultOAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String googleId = oAuth2User.getAttribute("sub");
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        Optional<Member> memberOptional = memberRepository.findByGoogleLoginId(googleId);

        Member member;
        if (memberOptional.isPresent()) {
            member = memberOptional.get();
            member.setEmail(email);
            member.setUName(name);
        } else {
            member = new Member();
            member.setGoogleLoginId(googleId);
            member.setEmail(email);
            member.setUName(name);
        }
        memberRepository.save(member);

        return new DefaultOAuth2User(
                Collections.singletonList(() -> "ROLE_USER"),
                oAuth2User.getAttributes(),
                "name"
        );
    }

    // 이메일 중복 체크
    public Member getMemberByEmail(String email) {
        return memberRepository.findByEmail(email).orElse(null);
    }

    public MemberDetailDTO getMemberDetail(int userId) {
        Optional<Member> userOptional = memberRepository.findById(userId);
        if (userOptional.isPresent()) {
            Member member = userOptional.get();
            MemberDetailDTO memberDetailDTO = new MemberDetailDTO();
            memberDetailDTO.setUserId(member.getId());
            memberDetailDTO.setUserName(member.getUName());
            memberDetailDTO.setNickname(member.getNickname());
            memberDetailDTO.setEmail(member.getEmail());
            memberDetailDTO.setPreferredTime(member.getPreferredTime());
            memberDetailDTO.setAlertEnabled(member.isAlertEnabled());
            memberDetailDTO.setFavoriteLocationId((int) member.getFavoriteLocationId());

            // 필요한 경우 사용자가 저장한 위치 목록을 추가로 조회
            List<Location> locations = locationService.findLocationsByUserId(userId);
            memberDetailDTO.setLocations(locations);

            return memberDetailDTO;
        }
        return null;
    }

    public void updateFavoriteLocation(int userId, int locationId) {
    }
}
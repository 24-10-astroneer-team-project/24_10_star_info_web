package com.teamname.astroneer.star_info_web.service;

import com.teamname.astroneer.star_info_web.dto.LocationDTO;
import com.teamname.astroneer.star_info_web.dto.MemberDetailDTO;
import com.teamname.astroneer.star_info_web.entity.Location;
import com.teamname.astroneer.star_info_web.entity.Member;
import com.teamname.astroneer.star_info_web.mapper.LocationMapper;
import com.teamname.astroneer.star_info_web.mapper.MemberMapper;
import com.teamname.astroneer.star_info_web.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
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
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class MemberService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;
    private final LocationService locationService;
    private final LocationMapper locationMapper;
    private final MemberMapper memberMapper;

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
        } else {
            member = new Member();
            member.setGoogleLoginId(googleId);
        }
        member.setEmail(email);
        member.setUName(name);
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

    public MemberDetailDTO getMemberDetail(long userId) {
        Optional<Member> userOptional = memberRepository.findById(userId);

        if (userOptional.isPresent()) {
            Member member = userOptional.get();

            // 사용자가 저장한 위치 목록을 추가로 조회
            List<Location> locations = locationService.findLocationsByUserId(userId);
            member.setLocations(locations); // Member 객체에 위치 목록 설정

            // 매퍼를 사용하여 Member -> MemberDetailDTO로 변환
            MemberDetailDTO memberDetailDTO = memberMapper.toMemberDetailDTO(member);

            return memberDetailDTO;
        }
        return null;
    }

    // 즐겨찾기 위치 설정
    public void updateFavoriteLocation(long userId, long locationId) {
        Optional<Member> memberOptional = memberRepository.findById(userId);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setFavoriteLocationId(locationId);  // 즐겨찾기 위치 설정
            memberRepository.save(member);
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }

    // 위치 설명 업데이트
    public void updateLocationDescription(long locationId, String description) {
        locationService.updateLocationDescription(locationId, description);
    }

    public long getUserIdByLocationId(long locationId) {
        Location location = locationService.findById(locationId)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 위치 정보를 찾을 수 없습니다."));

        // Location을 LocationDTO로 변환하고 DTO에서 userId를 반환
        LocationDTO locationDTO = locationMapper.toLocationDTO(location);
        return locationDTO.getUserId();
    }

    public Optional<Member> findByEmail(Object sub) {
        return memberRepository.findByEmail(sub.toString());
    }

    public Optional<Member> findByGoogleLoginId(String googleLoginId) {
        return memberRepository.findByGoogleLoginId(googleLoginId);
    }
}
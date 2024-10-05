package com.teamname.astroneer.star_info_web.repository;


import com.teamname.astroneer.star_info_web.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    Optional<Member> findByEmail(String email); // 이메일로 회원 찾기

    Optional<Member> findByGoogleLoginId(String googleLoginId); // 구글 로그인 ID로 회원 찾기
}

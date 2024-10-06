package com.teamname.astroneer.star_info_web.repository;

import com.teamname.astroneer.star_info_web.entity.AstronomicalEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AstronomicalEventRepository extends JpaRepository<AstronomicalEvent, Integer> {
}

package com.teamname.astroneer.star_info_web.repository;

import com.teamname.astroneer.star_info_web.entity.ObservationLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ObservationLocationRepository extends JpaRepository<ObservationLocation, Integer> {
}

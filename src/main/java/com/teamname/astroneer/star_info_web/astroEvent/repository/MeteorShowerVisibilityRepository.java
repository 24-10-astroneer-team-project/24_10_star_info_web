package com.teamname.astroneer.star_info_web.astroEvent.repository;

import com.teamname.astroneer.star_info_web.astroEvent.entity.MeteorShowerVisibility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface MeteorShowerVisibilityRepository extends JpaRepository<MeteorShowerVisibility, Long> {

    @Query("""
        SELECT m FROM MeteorShowerVisibility m
        WHERE LOWER(m.meteorShowerName) = LOWER(:meteorShowerName)
        AND m.latitude = :latitude
        AND m.longitude = :longitude
        AND m.peakStart = :peakStart
       """)
    Optional<MeteorShowerVisibility> findByMeteorShowerNameLatitudeLongitudeAndPeakStart(
            @Param("meteorShowerName") String meteorShowerName,
            @Param("latitude") int latitude,
            @Param("longitude") int longitude,
            @Param("peakStart") LocalDate peakStart
    );
}

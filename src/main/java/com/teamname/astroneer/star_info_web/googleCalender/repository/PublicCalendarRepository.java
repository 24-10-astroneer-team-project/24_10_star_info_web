package com.teamname.astroneer.star_info_web.googleCalender.repository;


import com.teamname.astroneer.star_info_web.googleCalender.entity.PublicCalendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PublicCalendarRepository extends JpaRepository<PublicCalendar, Long> {

    Optional<PublicCalendar> findByGoogleEventId(String googleEventId);
}

package com.teamname.astroneer.star_info_web.astroEvent.data;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MeteorShowerData {

    // 유성우 데이터를 저장하는 정적 맵
    public static final Map<String, List<MeteorShowerInfo>> METEOR_SHOWERS = new HashMap<>();

    static {
        METEOR_SHOWERS.put("Halley", List.of(
                new MeteorShowerInfo("Eta Aquariid", "05-02", "05-06"),
                new MeteorShowerInfo("Orionid", "10-19", "10-23")
        ));
        METEOR_SHOWERS.put("Tuttle", List.of(
                new MeteorShowerInfo("Ursid", "12-21", "12-24")
        ));
        METEOR_SHOWERS.put("Swift-Tuttle", List.of(
                new MeteorShowerInfo("Perseid", "08-11", "08-14")
        ));
    }

    // 유성우 정보를 담는 내부 클래스
    @Getter
    @AllArgsConstructor
    public static class MeteorShowerInfo {
        // getter 메서드들
        private final String name;
        private final String peakStart;
        private final String peakEnd;
    }
}

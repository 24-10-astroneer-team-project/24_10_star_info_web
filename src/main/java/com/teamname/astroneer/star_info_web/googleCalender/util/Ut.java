package com.teamname.astroneer.star_info_web.googleCalender.util;


import com.google.api.client.util.DateTime;


public class Ut {
    public static DateTime toGoogleDateTime(String dateTimeStr) {
        return new DateTime(dateTimeStr);
    }
}

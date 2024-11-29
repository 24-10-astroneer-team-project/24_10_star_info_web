package com.teamname.astroneer.star_info_web.googleCalender.init;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;

import java.io.FileInputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import com.google.api.services.calendar.Calendar;

//  "src/main/resources/teamastroneerstarinfo-437713-78cb5a772263.json"

public class CalendarServiceInitializer {
    private static final String APPLICATION_NAME = "TeamAstroneerStarInfo";
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    private static final String CREDENTIALS_FILE_PATH = "src/main/resources/teamastroneerstarinfo-437713-78cb5a772263.json";

    public static Calendar initializeCalendarService() throws IOException, GeneralSecurityException {
        // Load service account credentials from the JSON key file
        GoogleCredentials credentials;
        try (FileInputStream credentialsStream = new FileInputStream(CREDENTIALS_FILE_PATH)) {
            credentials = GoogleCredentials.fromStream(credentialsStream)
                    .createScoped("https://www.googleapis.com/auth/calendar.readonly");
        }

        // Build the Calendar service
        return new Calendar.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                new HttpCredentialsAdapter(credentials)
        )
                .setApplicationName(APPLICATION_NAME)
                .build();
    }
}
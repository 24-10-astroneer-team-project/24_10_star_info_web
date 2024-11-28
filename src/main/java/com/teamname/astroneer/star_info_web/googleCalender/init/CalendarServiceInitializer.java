package com.teamname.astroneer.star_info_web.googleCalender.init;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.calendar.Calendar;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.GeneralSecurityException;
import java.util.Collections;

//  "src/main/resources/teamastroneerstarinfo-437713-78cb5a772263.json"

@Configuration
public class CalendarServiceInitializer {

    private static final String APPLICATION_NAME = "TeamAstroneerStarInfo";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
//    private static final String CREDENTIALS_FILE_PATH = "src/main/resources/teamastroneerstarinfo-437713-78cb5a772263.json";

    @Bean
    public Calendar getCalendarService() throws IOException, GeneralSecurityException {
        try (InputStream credentialsStream = new ClassPathResource("teamastroneerstarinfo-437713-78cb5a772263.json").getInputStream()) {
            GoogleCredentials credentials = GoogleCredentials.fromStream(credentialsStream)
                    .createScoped(Collections.singletonList("https://www.googleapis.com/auth/calendar"));

            return new Calendar.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    JSON_FACTORY,
                    new HttpCredentialsAdapter(credentials)
            )
                    .setApplicationName(APPLICATION_NAME)
                    .build();
        } catch (IOException | GeneralSecurityException e) {
            System.err.println("Google Calendar 서비스 초기화 실패: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}
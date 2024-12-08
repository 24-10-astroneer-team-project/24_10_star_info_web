//package com.teamname.astroneer.star_info_web.config;
//
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.firebase.FirebaseApp;
//import com.google.firebase.FirebaseOptions;
//import io.github.cdimascio.dotenv.Dotenv;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.io.FileInputStream;
//import java.io.IOException;
//
//@Configuration
//public class FirebaseConfig {
//
//    @Bean
//    public FirebaseApp initializeFirebase() throws IOException {
//        Dotenv dotenv = Dotenv.load(); // .env 파일 로드
//        // 환경변수에서 파일 경로와 데이터베이스 URL 불러오기
//        String serviceAccountPath = dotenv.get("FIREBASE_SERVICE_ACCOUNT_PATH");
//        String databaseUrl = dotenv.get("FIREBASE_DATABASE_URL");
//
//        if (serviceAccountPath == null || databaseUrl == null) {
//            throw new IllegalStateException("환경변수에서 Firebase 설정을 불러올 수 없습니다.");
//        }
//
//        if (FirebaseApp.getApps().isEmpty()) {
//            FileInputStream serviceAccount = new FileInputStream(serviceAccountPath);
//
//            FirebaseOptions options = new FirebaseOptions.Builder()
//                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                    .setDatabaseUrl(databaseUrl)  // 환경변수에서 불러온 URL 사용
//                    .build();
//
//            return FirebaseApp.initializeApp(options);
//        } else {
//            return FirebaseApp.getInstance();
//        }
//    }
//}

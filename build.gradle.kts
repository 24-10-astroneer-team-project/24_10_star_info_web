plugins {
    java
    id("org.springframework.boot") version "3.3.4"
    id("io.spring.dependency-management") version "1.1.6"
}

group = "com.teamname.astroneer"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.thymeleaf.extras:thymeleaf-extras-springsecurity6")
    compileOnly("org.projectlombok:lombok")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    annotationProcessor("org.projectlombok:lombok")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    implementation(kotlin("script-runtime"))
    //환경변수 관련
    implementation ("io.github.cdimascio:dotenv-java:2.2.0")
    //파이어베이스
    implementation("com.google.firebase:firebase-admin:8.1.0")
    //mysql
    implementation("mysql:mysql-connector-java:8.0.33")
    // OAuth2 클라이언트 의존성
    implementation ("org.springframework.boot:spring-boot-starter-oauth2-client")
    // OAuth2 리소스 서버 의존성 (선택사항, 필요시)
    implementation ("org.springframework.boot:spring-boot-starter-oauth2-resource-server")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

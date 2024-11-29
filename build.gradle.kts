plugins {
    java
    kotlin("jvm") version "1.8.0"  // 혹은 최신 버전으로 변경 가능
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
    google()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
//    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
//    implementation("org.thymeleaf.extras:thymeleaf-extras-springsecurity6")
    implementation("org.springframework.boot:spring-boot-starter-web")
    compileOnly("org.projectlombok:lombok")
//    developmentOnly("org.springframework.boot:spring-boot-devtools")
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
//    implementation ("org.springframework.boot:spring-boot-starter-oauth2-resource-server")
    implementation ("org.mapstruct:mapstruct:1.5.5.Final")
    annotationProcessor ("org.mapstruct:mapstruct-processor:1.5.5.Final")
    //Redis 설정
    implementation ("org.springframework.boot:spring-boot-starter-data-redis")
    implementation ("org.springframework.boot:spring-boot-starter-actuator")

    // spring Retry
    implementation ("org.springframework.retry:spring-retry:1.3.4")
    implementation ("org.springframework:spring-aspects:6.1.13")

    // Jackson, JAVA LocalDateTime module add
    implementation ("com.fasterxml.jackson.datatype:jackson-datatype-jsr310")

    // Google API Client > Google Oauth Client > Google Calender API
    implementation("com.google.api-client:google-api-client:2.2.0")
    implementation("com.google.apis:google-api-services-calendar:v3-rev20240517-2.0.0")
    implementation ("com.google.oauth-client:google-oauth-client:1.33.3")
    implementation ("com.google.auth:google-auth-library-oauth2-http:1.17.0")
}

tasks.withType<JavaCompile> {
    options.compilerArgs.add("-parameters")
}


tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.withType<Copy> {
    duplicatesStrategy = DuplicatesStrategy.INCLUDE
}

val frontendDir = "$projectDir/starinfo-app"

sourceSets {
    main {
        resources {
            srcDirs("src/main/resources")
        }
    }
}

tasks {
    val installReact by registering(Exec::class) {
        workingDir = file(frontendDir)
        group = BasePlugin.BUILD_GROUP
        commandLine = if (System.getProperty("os.name").toLowerCase().contains("windows")) {
            listOf("npm.cmd", "install")
        } else {
            listOf("npm", "install")
        }
    }

    val buildReact by registering(Exec::class) {
        dependsOn(installReact)
        workingDir = file(frontendDir)
        group = BasePlugin.BUILD_GROUP
        commandLine = if (System.getProperty("os.name").toLowerCase().contains("windows")) {
            listOf("npm.cmd", "run", "build")
        } else {
            listOf("npm", "run", "build")
        }
    }

    val copyReactBuildFiles by registering(Copy::class) {
        dependsOn(buildReact)
        from("$frontendDir/build")
        into("$buildDir/resources/main/static")
    }

    processResources {
        dependsOn(copyReactBuildFiles)
    }
}

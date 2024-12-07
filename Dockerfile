# Step 1: Node.js 기반 이미지에서 React 빌드
FROM node:20 AS react-build
WORKDIR /app/starinfo-app

# React 소스코드 복사
COPY starinfo-app/package*.json ./
RUN npm install

COPY starinfo-app ./
RUN npm run build

# Step 2: Gradle 빌드를 위한 이미지
FROM gradle:8.0-jdk17 AS gradle-build
WORKDIR /app

# Gradle 캐시 최적화: 필요한 파일들 먼저 복사 후 의존성 설치
COPY build.gradle.kts settings.gradle.kts gradlew ./
COPY gradle ./gradle
RUN ./gradlew build -x installReact -x buildReact --no-daemon || return 0

# 전체 소스 코드 복사
COPY . .

# React 빌드 결과물 복사
COPY --from=react-build /app/starinfo-app/build /app/src/main/resources/static

# Gradle 빌드 수행 (React 빌드 태스크 제외)
RUN ./gradlew build -x installReact -x buildReact --no-daemon --info --stacktrace

# Step 3: 경량 JDK 이미지를 사용하여 실행 파일 생성
FROM openjdk:17-jdk-slim AS runtime
WORKDIR /app

# .env 파일 복사
COPY .env /app/.env

# 빌드된 JAR 파일 복사
COPY --from=gradle-build /app/build/libs/*.jar app.jar

# JAR 파일 실행
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "/app/app.jar"]

# Team Astroneer Star Info Web

이 프로젝트는 팀 Astroneer에서 천체 관측 정보를 제공하는 웹 애플리케이션입니다.

---

## 프로젝트 시작 전

프로젝트를 시작하기 전에 **최신 코드를 동기화**하기 위해 다음 명령어를 실행하세요:

```bash
git pull origin develop
```

이 명령어로 `develop` 브랜치의 최신 변경 사항을 로컬에 적용한 후, 자신의 **feature 브랜치**에서 작업을 진행합니다. 현재 브랜치를 확인하려면 아래 명령어를 사용하세요:

```bash
git branch
```

작업 전 **현재 브랜치가 feature 브랜치인지 확인**한 후 진행하세요.

---

## 프로젝트 실행 방법

### 1. 요구 사항

- **Node.js**: `v16.x` 이상
- **npm**: `v8.x` 이상
- **Java**: `JDK 17 이상`
- **Firebase**: Firebase 서비스 계정 키 파일 필요
- **MySQL**: 데이터베이스 연결

---

### 2. 설치

다음 명령어를 실행해 필요한 패키지를 설치하세요:

```bash
npm install
```

---

### 3. Firebase 설정

1. **프로젝트 관리자에게 `teamastroneerstarinfo-firebase-adminsdk.json` 파일을 받습니다.**
2. 해당 파일을 **`src/main/resources/` 폴더에 저장**합니다.
3. **Git에는 포함되지 않도록 주의**하세요. 해당 파일은 `.gitignore`에 추가되어 있습니다.

---

### 4. 환경 변수 설정

`Firebase` 및 기타 서비스 연동을 위해 `.env` 파일을 설정해야 합니다:

1. **`.env.template` 파일을 `.env` 파일로 복사**합니다:

```bash
cp .env.template .env
```

2. 프로젝트 관리자에게 **Firebase API 키 정보**를 요청하여 `.env` 파일에 추가하세요.

#### `.env.template` 예시

```bash
# Firebase 관련 환경 변수
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
REACT_APP_BACKEND_URL=http://localhost:7777
```

**⚠️ 중요: 절대로 `.env` 파일을 Git에 업로드하지 마세요! `.gitignore`에 추가되어 있습니다.**

3. DB 연결 환경이 달라 어려움을 겪어서 DB 설정 `application-DB.properties` 로 따로 관리합니다.

`application.properties`에 해당 코드가 `application-DB.properties` import하는 코드입니다.
```
# DB
# application-DB.properties
spring.config.import=classpath:application-DB.properties
```
`application-DB.properties`에는 본인에게 맞게 설정해서 사용하시면 됩니다.

```
# application-DB.properties (DB ?? ??)

spring.datasource.url=jdbc:mysql://localhost:3306/2024_10_ASTRONEER_TEAMPROJECT
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```
웬만하면 해당 설정 따라서 해주시되 어려움을 겪으면 바꿔서 사용하세요. MySql 입니다. `2024_10_ASTRONEER_TEAMPROJECT` DB 테이블 명은 맞추세요.

---

### 5. 프로젝트 실행

#### 5.1 일반 서버 실행

Spring Boot 애플리케이션을 실행하려면 다음 명령어를 사용하세요:

```bash
npm start
```

또는, Spring Boot 서버를 직접 실행할 수 있습니다.

#### 5.2 Gradle 빌드 및 실행

Gradle로 프로젝트를 빌드하려면 다음 명령어를 사용하세요:

- **Mac/Linux**: 

```bash
./gradlew build
```

- **Windows**: 

```bash
gradlew.bat build
```

이후 빌드된 `.jar` 파일을 실행하려면:

```bash
java -jar build/libs/star_info_web-0.0.1-SNAPSHOT.jar
```

`.jar` 파일이 잘 실행된다면 Ctrl + C 로 서버 종료 후 IntliJ로 바로 실행 버튼을 눌러도 React 연동이 가능합니다.

---

### 6. 빌드 (웹팩 관련 설정 중지)

프로덕션 환경을 위한 빌드는 다음 명령어를 사용하세요:

```bash
npm run build
```

*Webpack 사용 중지됨: 현재 프로젝트에서는 Webpack을 사용하지 않으므로 관련 명령어는 생략합니다.*

---

## 주요 기술 스택

- **React.js**
- **Spring Boot**
- **Firebase**
- ~~Webpack~~ (사용 중지)
- **Node.js**

---

### 참고 사항

- **Firebase 계정 키 파일과 `.env` 파일**은 팀 내부에서 안전하게 공유하고 **절대 공개된 리포지토리에 업로드하지 마세요**.

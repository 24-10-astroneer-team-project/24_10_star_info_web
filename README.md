# Team Astroneer Star Info Web

이 프로젝트는 팀 Astroneer에서 진행하는 천체 관측 정보를 제공하는 웹 애플리케이션입니다.

## 프로젝트 실행 방법

### 1. 요구 사항

- **Node.js**: `v16.x` 이상
- **npm**: `v8.x` 이상
- **Java**: `JDK 17 이상`
- **Firebase**: Firebase 서비스 계정 키 파일 필요

### 2. 설치

다음 명령어를 실행해 필요한 패키지를 설치합니다:

```bash
npm install
```

### 3. Firebase 설정

프로젝트를 실행하기 위해서는 Firebase 서비스 계정 키 파일이 필요합니다. 이를 위해 다음 절차를 따라주세요:

1. **프로젝트 관리자에게 `teamastroneerstarinfo-firebase-adminsdk.json` 파일을 받습니다.**
2. 해당 파일을 **`src/main/resources/` 폴더에 저장**합니다.
3. **Git에는 포함되지 않도록 주의하세요.** 해당 파일은 이미 `.gitignore`에 추가되어 있습니다.

### 4. 환경 변수 설정

`Firebase` 및 기타 서비스 연동을 위해 `.env` 파일을 설정해야 합니다. 아래 단계를 참고하세요:

1. **`.env.template` 파일을 `.env` 파일로 복사**합니다:

```bash
cp .env.template .env
```

2. 프로젝트 관리자에게 **Firebase API 키 정보**를 받습니다.
3. 받은 정보를 `.env` 파일의 적절한 위치에 추가합니다.

---

#### `.env.template` 파일 예시

```bash
# .env.template

REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

**⚠️ 중요: 절대로 `.env` 파일을 Git에 업로드하지 마세요! `.gitignore`에 이미 추가되어 있습니다.**

**`.gitignore`에 이미 추가되어 있지만**

```bash
### STS ###
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache
.evn
/src/main/resources/teamastroneerstarinfo-firebase-adminsdk-l8qw1-62cdf88ebf.json
```

맨 아래 두줄 한번만 확인하고 push 하세요.

---

### 5. 프로젝트 실행

#### 5.1 Webpack 개발 서버 실행

개발 중에 Webpack 개발 서버를 실행하려면 다음 명령어를 사용하세요:

```bash
npx webpack serve
```

이후, 웹 브라우저에서 [http://localhost:9999](http://localhost:9999)로 접속할 수 있습니다.

#### 5.2 일반 서버 실행

Spring Boot 애플리케이션을 실행하려면 다음 명령어를 사용하세요:

```bash
npm start
```

or

그냥 서버 실행 시키셔도 됩니다.

---

### 6. 빌드

프로덕션 환경에서 사용하기 위해 프로젝트를 빌드하려면 다음 명령어를 실행하세요:

```bash
npm run build
```

---

## 주요 기술 스택

- **React.js**
- **Spring Boot**
- **Firebase**
- **Webpack**
- **Node.js**

---

### 참고 사항

- Firebase 계정 키 파일과 환경 변수 파일은 **팀 내부에서만 안전하게 공유**되어야 하며, 절대로 공개된 리포지토리에 업로드하지 마세요.

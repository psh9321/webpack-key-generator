# Key Generator
 https://psh9321.github.io/webpack-key-generator/

## 주요 기술 스택
 - Webpack
 - html5
 - css3
 - Typescript

## 프로젝트 구조 및 MVC 패턴
├── html/             # 페이지 HTML
├── css/              # CSS
├── font/             # 폰트
├── img/              # 이미지
├── modules/          # 기능별 모듈
│   ├── model/         # 해당 기능 로직 및 데이터
│   ├── Controller.ts  # Model과 View 제어
│   ├── View.ts        # 해당 기능 View
│   └── index.ts       # 모듈 진입점
├── util/             # 공통 유틸리티
└── app.ts            # 애플리케이션 진입점

## 주요 기능
 - RSA 비대칭키를 키길이에 따라 생성
 - AES 대칭키를 키길이 및 base64, hex(16진수)에 따라 생성(크롬 및 엣지 브라우저에서는 192bit 생성 불가)
 - 한국어, 영어 다국어 처리

## 기능 테스트
 - readme 제외 commit시 workflow 실행

### 실행 커멘드
 - 테스트 실행해 : pnpm test

### generator 주요 테스트 항목
 - rsa 키 생성이 키길이 3개 모두 올바르게 생성되는지?
 - aes키 base64, hex 로 생성이 되는지?
 - aes 키가 키길이 3개 모두 올바르게 생성되는지?(192bit 생성이 
 - 불가능한 크롬, 엣지 브라우저에서 alert 창을 띄우는지?)
 - 생성한 공개키가 textarea에 올바르게 들어가는지?
 - 생성한 키가 올바르게 복사가 되는지?

### language 주요 테스트 항목
 - 다국어 처리가 원활하게 되는지?

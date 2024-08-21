# 국어사전 검색 플랫폼

![표준국어대사전_로고](https://github.com/user-attachments/assets/117fade2-7eb2-4154-a89c-08f301cadefb)

이 프로젝트는 일상생활에서 모르는 단어를 검색하고 저장, 삭제할 수 있는 국어사전 검색 서비스를 만들었습니다.

어려운 기술적인 부분보다는 기초적인 부분에 충실하게 학습하여 구현을 해나가는 것을 목표로 삼았습니다.

## 주요 기능 설명

### 검색

예시로 "나무"를 검색하면 단어와 뜻이 화면에 출력됩니다.

![ezgif-3-4eb988f463](https://github.com/user-attachments/assets/9fe0f8b7-58b2-4aa0-b6df-14e2afbf803d)

### 단어 저장

목록에서 "단어 저장" 버튼을 클릭하면 우측 상단의 아이콘에서 개수가 표시됩니다.

![ezgif-5-2f4cbab744](https://github.com/user-attachments/assets/27270471-eb65-4473-830b-6858f5267b28)

### 단어 삭제

우측 상단의 아이콘을 클릭하면 저장된 단어가 나오고 "단어 삭제" 버튼을 클릭하면 삭제됩니다.

![ezgif-4-02cdf0eb35](https://github.com/user-attachments/assets/cea86ec7-18d7-41d1-8de7-33143bbafe10)

### 팝업 창

사용자의 주의를 끌고, 상대적으로 짧은 정보를 전달하였습니다.

![image](https://github.com/user-attachments/assets/292fd642-234e-4cf3-a92f-31cd509984e4)

### 서버 오류 예외 처리

https://stdict.korean.go.kr/main/main.do 이 사이트의 외부 데이터를 받아오는 과정에서 서버 오류가 과도하게 발생하여 팝업 창으로 예외 처리 다시 시도하기 버튼 클릭 시 해결되는 상황이 발생할 수 있습니다.

![ViteReact-Chrome2024-08-0114-10-27-Trim-ezgif com-resize](https://github.com/user-attachments/assets/b2fff62f-be47-4587-a5ff-3560ed14f773)

## 프로젝트 실행 방법

```
git clone https://github.com/wangkodok/korean-dictionary.git
```

```
npm install
```

```
npm run dev
```

## 기술 스택

![리드미_기술-스택](https://github.com/user-attachments/assets/b9679f96-4ab4-42a5-b911-fcd7e3101455)

## 기술적 도전

### FSD 아키텍처

프로젝트를 진행하면서 규모를 확장하고 싶었습니다. 이에 따라 폴더 구조와 파일 분리에 고민 후 명확한 기준이 필요하였습니다. 여러 자료를 찾았고, 결과적으로 FSD(Feature-Sliced Design) 아키텍처를 적용하게 되었습니다.

현재 프로젝트는 작은 규모인데 FSD 아키텍처는 기능 분할 설계로 나누는 만큼 큰 규모로 확장하기에 적합하다는 장점이 있어 채택하였습니다. 이 프로젝트의 전반적인 목표는 학습하며 포트폴리오로 제작하였기 때문에 적용해 보고 싶었습니다.

### Node에서 Express를 이용한 GET 방식

공공데이터포털 사이트에서 오픈 API 신청하고 제작하는 과정에서 CORS, 서버 오류가 발생하여 이를 해결하기 위해 Node 학습 후 자료를 찾아가며, 시도한 결과 데이터를 가져올 수 있었습니다.

### 디렉토리 구조

```
┌─ src
│  ├─ app
│  │  ├─ App.jsx
│  │  ├─ routers
│  │  │  └─ RouterApp.jsx
│  │  └─ store
│  │     └─ index.js
│  ├─ entities
│  │  ├─ WordList
│  │  │  └─ ui
│  │  │     └─ WordList.jsx
│  │  ├─ form
│  │  │  └─ Form.jsx
│  │  └─ index.jsx
│  ├─ features
│  │  ├─ index.jsx
│  │  └─ ui
│  │     └─ button
│  │        ├─ ReloadButton.jsx
│  │        ├─ WordDeleteButton.jsx
│  │        ├─ WordSaveButton.jsx
│  │        └─ WordSearchButton.jsx
│  ├─ pages
│  │  ├─ index.jsx
│  │  └─ search
│  │     └─ ui
│  │        └─ Search.jsx
│  ├─ shared
│  │  ├─ Desc.jsx
│  │  ├─ index.jsx
│  │  └─ ui
│  │     ├─ Spinner
│  │     │  └─ Spinner.jsx
│  │     ├─ button
│  │     │  ├─ Button.jsx
│  │     │  └─ index.js
│  │     └─ title
│  │        ├─ Title1.jsx
│  │        ├─ Title2.jsx
│  │        └─ Title3.jsx
│  └─ widgets
│     ├─ Content
│     │  └─ ContentMainVisual.jsx
│     ├─ Layout
│     │  ├─ LayoutContainer.jsx
│     │  ├─ LayoutHeader.jsx
│     │  └─ LayoutMainVisual.jsx
│     ├─ SearchForm
│     │  └─ Form.jsx
│     ├─ header
│     │  ├─ index.js
│     │  └─ ui
│     │     └─ Header.jsx
│     ├─ index.jsx
│     ├─ modal
│     │  └─ Modal.jsx
│     ├─ sidemenu
│     │  └─ SideMenu.jsx
│     └─ slider
│        └─ MainVisual.jsx
├─ tailwind.css
└─ main.jsx
```

## 회고

현재 작은 규모의 프로젝트 진행하고 있지만. 많은 것을 경험할 수 있었고 도전할 수 있었다. 어려운 기술보다는 기초적인 부분을 되짚고 살펴본 결과 기초가 중요하다는 것을 알 수 있었다. 이 계기로 기초를 탄탄하게 쌓아야 한다는 것을 깨달았다.

하면서 어려웠던 점은 리소스를 가져오도록 요청하는 과정에서 CORS, 서버 오류, 배포 후 오류 등 난관이 있었다. 오류를 해결하기 위해 검색한 결과 외부 서버 및 자료가 많지 않아서 제공기관에 문의 후 새로운 프로젝트로 제작해야 하나 고민하게 되었다.

FSD 아키텍처 도입하는 과정에서 각각의 폴더, 파일 등 이해하는 것이 어려웠지만, 예시로 된 폴더, 파일 보고 수정해 나가면서 분석한 결과 전반적인 내용을 이해할 수 있었다.

Tailwind CSS 적용한 첫 프로젝트이다. CSS 이해하고 있어서 빠르게 습득하여 도입할 수 있었다. 처음에는 공식 문서 확인하면서 진행하였지만, 점차 익숙해지면서 확인하지 않고 진행한 결과 익숙해졌고, 페이지에 적용할 수 있었다.

회고를 마치며, FSD 아키텍처 도입하여 기능 분할 설계, Tailwind CSS 이용하여 페이지 제작, 애자일 개발 프로세스 등 새로운 기술을 도입하여 도전한 프로젝트이었다.

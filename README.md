# 🐙길거리 음식점 공유 서비스웹 꾸르꽈

![꾸르꽈](https://github.com/solo-service/kkureukkwa/assets/96280450/6c05e11e-950e-47b6-bc7a-1361ed863c0b)

> 개발 기간 2024.06 ~ 2024.06

<br/>
<br/>
<br/>

# 서비스 주소

### https://kkureukkwa.vercel.app/

<br/>
<br/>
<br/>

# 프로젝트 소개

⭐ 집 주변에 있는 길거리 음식점들을 서로 공유할 수 있는 서비스 입니다.

⭐ 카카오맵에 마커를 사용자가 직접 등록 할 수 있습니다.

⭐ 집 주변이 꼭 아니여도 여러 지역의 음식점들도 확인 할 수 있습니다.

⭐ 카카오 로그인을 이용하기 때문에 간편 가입이 가능합니다.

⭐ 현재 위치를 가져와서 항상 근처에 어떤 음식점이 있는지 확인이 합니다.

<br/>
<br/>
<br/>

# 개발 환경

- Front : Next.js, useContext, tailwindcss, typescript, Next-auth
- Back : firebase
- 버전 및 이슈 관리 : Github, Github Issues
- 서비스 배포 환경 : vercel

<br/>
<br/>
<br/>

# 채택 기술 과 브랜치 전략

### Next.js

- PWA을 더욱 학습하기 위해서 기본 React 와 Next.js을 비교했을때 기본적으로 Next.js는 PWA을 지원하고 있고 파일 기반 라우팅이라 라우팅 설정이 간편해서 사용했습니다.
- 서버사이드 렌더링을 지원하기 때문에 SEO 와 초기 로드 성능이 빠릅니다.
- 초기 설정이 간편이 간단합니다.

### useContext

- Redux 혹은 Recoil 등 전역 관리 라이브러리를 사용할지 고민 했지만 프로젝트 사이즈가 많이 작고 전역관리가 필요한 부분이 작성 할때 말고는 필요하지 않아 useContext을 사용했습니다.

### firebase

- 유저 관리와 작성했던 장소들을 맵에 마커 형식으로 찍어주기 위해서는 데이터베이스가 필요했고 NoSQL인 firebase의 Database가 알맞다고 생각해서 채택하게 되었습니다.

### tailwindcss

- 큰 디자인이 들어가지 않아 Next-ui 와 tailwindcss을 이용해서 간단한 디자인 스타일을 적용 시킬 수 있었습니다.

### typescript

- 미리 에러를 방지하기 위해 사용했고 type 작성하면 코드 자동완성을 도와줘 작업 속도를 높이기 위해 사용했습니다.

### 브랜치 전략

- Git-flow 기반으로 main, develop 브랜치와 feature 브랜치로 관리했습니다.
  - main 브랜치는 배포용으로 사용 하였습니다.
  - develop은 master 역할을 하는 브랜치로 사용 하였습니다.
  - feature는 기능 단위로 독립적인 개발 환경을 위해 사용해 이슈별로 정리 하였습니다.

<br/>
<br/>
<br/>

# 페이지별 기능

### 초기화면

- 서비스 접속 초기화면입니다.
  - 카카오 로그인 과 기능제한이 있는 둘러보기를 할 수 있습니다.

<table>
  <tr>
    <th style="width: 300px; text-align : center;">초기화면</th>
  </tr>
  <tr style="border-bottom: 1px solid white;">
    <td style="text-align : center">
        <img src="https://github.com/solo-service/kkureukkwa/assets/96280450/254e8633-263f-42af-a74f-4f086a7e36c5">
    </td>
  </tr>
</table>

<br/>
<br/>
<br/>

### 메인화면

- 카카오 맵으로 등록된 상점이 마커로 화면에 출력 됩니다.
  - 꽈배기, 타코야끼, 호떡, 붕어빵 총 4개의 음식점을 마커로 확인 할 수 있습니다.

<table>
  <tr>
    <th style="width: 300px; text-align : center;">메인화면</th>
  </tr>
  <tr style="border-bottom: 1px solid white;">
    <td style="text-align : center">
        <img src="https://github.com/solo-service/kkureukkwa/assets/96280450/ac193c20-4d2c-4512-8300-a58c415ae32e">
    </td>
  </tr>
</table>

<br/>
<br/>
<br/>

### 등록화면

- 카카오 지도 기반으로 위치를 가져옵니다.
- 가져온 위치로 어떤 가게인지 가게 이름은 어떤것인지 작성합니다.
- 작성한 데이터 기반을 실시간으로 가져옵니다.

<table>
  <tr>
    <th style="width: 300px; text-align : center;">등록화면</th>
  </tr>
  <tr style="border-bottom: 1px solid white;">
    <td style="text-align : center">
        <img src="https://github.com/solo-service/kkureukkwa/assets/96280450/41718e9c-4cc6-4e2c-88a9-5c59d1446eb4">
    </td>
  </tr>
</table>

<br/>
<br/>
<br/>

### 닉네임 변경화면

- 환경설정을 누르면 닉네임 변경 과 로그아웃이 가능합니다.

<table>
  <tr>
    <th style="width: 300px; text-align : center;">닉네임 변경화면</th>
  </tr>
  <tr style="border-bottom: 1px solid white;">
    <td style="text-align : center">
        <img src="https://github.com/solo-service/kkureukkwa/assets/96280450/6e2e6e33-00f9-4c30-bb79-00a40f3b5ff9">
    </td>
  </tr>
</table>

<br/>
<br/>
<br/>

# 트러블 슈팅

### [카카오 로그인시 유저 저장](https://github.com/solo-service/kkureukkwa.wiki.git)

### [PWA 설치 유도 버튼](https://github.com/solo-service/kkureukkwa.wiki.git)

<br/>
<br/>
<br/>

# 팀원 구성

<table>
  <tr>
    <th style="width: 200px; text-align : center;">김지유</th>
  </tr>
  <tr style="border-bottom: 1px solid white;">
    <td style="text-align : center">
        <img src="https://github.com/gugumo-service/gugumo_frontend/assets/96280450/d6716133-cc01-451c-af07-0da997725785">
        <a herf="https://github.com/Banal972">@Banal972</a>
    </td>
  </tr>
  <tr style="border-bottom: 1px solid white; text-align : center;">
    <td>FE</td>
  </tr>
</table>

<br/>
<br/>
<br/>

# 프로젝트 구조

```
kkureukkwa
├─ .github
│  ├─ ISSUE_TEMPLATE
│  │  ├─ 기능-요청.md
│  │  ├─ 기타-리포트.md
│  │  └─ 버그-리포트.md
│  └─ PULL_REQUEST_TEMPLATE.md
├─ .gitignore
├─ .npmrc
├─ .vscode
│  └─ settings.json
├─ components
│  ├─ common
│  │  ├─ Gps
│  │  │  └─ Gps.tsx
│  │  └─ PushHome
│  │     └─ PushHome.tsx
│  ├─ Home
│  │  ├─ Navbar
│  │  │  └─ Navbar.tsx
│  │  ├─ Setting
│  │  │  └─ Setting.tsx
│  │  └─ View
│  │     └─ View.tsx
│  ├─ Marker
│  │  └─ Marker.tsx
│  ├─ primitives.ts
│  ├─ Router
│  │  └─ FirstCheck.tsx
│  └─ StoreType
│     └─ StoreType.tsx
├─ config
│  ├─ firebase.ts
│  ├─ font
│  │  └─ pretendard
│  │     ├─ pretendard-subset.css
│  │     ├─ woff-subset
│  │     │  ├─ Pretendard-Black.subset.woff
│  │     │  ├─ Pretendard-Bold.subset.woff
│  │     │  ├─ Pretendard-ExtraBold.subset.woff
│  │     │  ├─ Pretendard-ExtraLight.subset.woff
│  │     │  ├─ Pretendard-Light.subset.woff
│  │     │  ├─ Pretendard-Medium.subset.woff
│  │     │  ├─ Pretendard-Regular.subset.woff
│  │     │  ├─ Pretendard-SemiBold.subset.woff
│  │     │  └─ Pretendard-Thin.subset.woff
│  │     └─ woff2-subset
│  │        ├─ Pretendard-Black.subset.woff2
│  │        ├─ Pretendard-Bold.subset.woff2
│  │        ├─ Pretendard-ExtraBold.subset.woff2
│  │        ├─ Pretendard-ExtraLight.subset.woff2
│  │        ├─ Pretendard-Light.subset.woff2
│  │        ├─ Pretendard-Medium.subset.woff2
│  │        ├─ Pretendard-Regular.subset.woff2
│  │        ├─ Pretendard-SemiBold.subset.woff2
│  │        └─ Pretendard-Thin.subset.woff2
│  └─ site.ts
├─ hooks
│  ├─ useGeolocation.ts
│  └─ useGetMarkers.ts
├─ layouts
│  ├─ default.tsx
│  └─ head.tsx
├─ LICENSE
├─ next.config.js
├─ package.json
├─ pages
│  ├─ api
│  │  └─ auth
│  │     └─ [...nextauth].ts
│  ├─ change
│  │  └─ index.tsx
│  ├─ home
│  │  └─ index.tsx
│  ├─ index.tsx
│  ├─ report
│  │  ├─ index.tsx
│  │  └─ middle
│  │     └─ index.tsx
│  ├─ _app.tsx
│  └─ _document.tsx
├─ postcss.config.js
├─ provider
│  └─ AddressProvider.tsx
├─ public
│  ├─ favicon.ico
│  ├─ icon
│  │  ├─ icon-192x192.png
│  │  ├─ icon-256x256.png
│  │  ├─ icon-384x384.png
│  │  └─ icon-512x512.png
│  ├─ images
│  │  ├─ markers
│  │  │  ├─ hotteok.png
│  │  │  ├─ kkwabaegi.png
│  │  │  ├─ shaped.png
│  │  │  └─ takoyaki.png
│  │  └─ storetype
│  │     ├─ hotteok.png
│  │     ├─ kkwabaegi.png
│  │     ├─ shaped.png
│  │     └─ takoyaki.png
│  ├─ manifest.json
│  └─ splashscreens
│     ├─ ipadpro1_splash.png
│     ├─ ipadpro2_splash.png
│     ├─ ipadpro3_splash.png
│     ├─ ipad_splash.png
│     ├─ iphone5_splash.png
│     ├─ iphone6_splash.png
│     ├─ iphoneplus_splash.png
│     ├─ iphonexr_splash.png
│     ├─ iphonexsmax_splash.png
│     └─ iphonex_splash.png
├─ README.md
├─ styles
│  └─ globals.css
├─ tailwind.config.js
├─ tsconfig.json
└─ types
   ├─ global.d.ts
   ├─ index.ts
   ├─ marker.ts
   └─ next-auth.d.ts
```

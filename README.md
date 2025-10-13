# 전지창 포트폴리오

모던한 React 기반 포트폴리오 웹사이트

## 🚀 기술 스택

- **React 18** - UI 라이브러리
- **Vite** - 빠른 개발 환경
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Framer Motion** - 부드러운 애니메이션
- **React Scroll** - 섹션 네비게이션
- **Lucide React** - 아이콘

## 📦 설치 방법

### 1. 프로젝트 폴더 구조 생성

```
my-portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
└── README.md
```

### 2. package.json 생성

위에서 제공된 `package.json` 파일을 프로젝트 루트에 생성하세요.

### 3. 의존성 설치

```bash
npm install
```

### 4. PostCSS 설정 파일 생성

프로젝트 루트에 `postcss.config.js` 파일을 생성하세요:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 5. 모든 파일 생성

위에서 제공된 모든 파일들을 해당 위치에 생성하세요.

## 🎨 커스터마이징

### 1. 개인 정보 수정

다음 파일들에서 개인 정보를 수정하세요:

- `src/components/Hero.jsx` - 이름, 소개
- `src/components/Contact.jsx` - 이메일, GitHub, LinkedIn 링크
- `src/components/Experience.jsx` - 경력 사항
- `src/components/Projects.jsx` - 프로젝트 내용

### 2. 색상 변경

`tailwind.config.js`에서 색상을 수정할 수 있습니다.

### 3. 섹션 추가/제거

`src/App.jsx`에서 원하는 섹션을 추가하거나 제거할 수 있습니다.

## 💻 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## 🏗️ 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 🌐 배포

### GitHub Pages로 배포

1. `package.json`에 homepage 추가:
```json
"homepage": "https://yourusername.github.io/portfolio"
```

2. `vite.config.js`에서 base 수정:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})
```

3. GitHub Actions로 자동 배포 설정 (`.github/workflows/deploy.yml` 생성):

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Vercel로 배포 (추천)

1. GitHub에 프로젝트 푸시
2. [Vercel](https://vercel.com) 접속
3. "Import Project" 클릭
4. GitHub 저장소 연결
5. 자동 배포 완료!

### Netlify로 배포

1. GitHub에 프로젝트 푸시
2. [Netlify](https://netlify.com) 접속
3. "Add new site" → "Import an existing project"
4. GitHub 저장소 연결
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy!

## 📝 개선 제안

- [ ] 다국어 지원 (i18n)
- [ ] 다크/라이트 모드 토글
- [ ] 블로그 섹션 추가
- [ ] 프로젝트 상세 모달
- [ ] Contact 폼 기능 추가
- [ ] SEO 최적화
- [ ] 성능 최적화 (이미지 lazy loading 등)

## 📄 라이센스

MIT License

## 🙋‍♂️ 문의

문제가 있거나 질문이 있으시면 이슈를 등록해주세요!
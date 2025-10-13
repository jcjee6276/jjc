/** @type {import('tailwindcss').Config} */
export default {
    // Tailwind가 클래스를 찾을 파일 경로
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            // 커스텀 색상 정의
            colors: {
                dark: {
                    bg: '#0a0a0a',      // 메인 배경색 (거의 검정)
                    card: '#111111',    // 카드/패널 배경색
                    border: '#1f1f1f',  // 테두리 색상
                }
            },

            // 커스텀 애니메이션 정의
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.6s ease-out',
            },

            // 애니메이션 키프레임 정의
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },

    plugins: [],
}
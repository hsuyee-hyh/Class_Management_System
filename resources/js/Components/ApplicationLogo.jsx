export default function ApplicationLogo(props) {
    return (
        <svg
            width="150"
            height="150"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            <rect width="200" height="150" fill="" />
            <g>
                <polygon
                    points="100,30 30,70 100,110 170,70"
                    fill="#2D5A73"
                    stroke="#1E2E35"
                    stroke-width="4"
                />
                <rect
                    x="75"
                    y="90"
                    width="50"
                    height="35"
                    fill="#2D5A73"
                    stroke="#1E2E35"
                    stroke-width="4"
                />
                <path
                    d="M100 40 L130 70 L130 110"
                    stroke="#F5B933"
                    stroke-width="6"
                    fill="none"
                />
                <circle
                    cx="130"
                    cy="110"
                    r="7"
                    fill="#F5B933"
                    stroke="#1E2E35"
                    stroke-width="4"
                />
                <line
                    x1="130"
                    y1="117"
                    x2="130"
                    y2="140"
                    stroke="#F5B933"
                    stroke-width="8"
                    stroke-linecap="round"
                />
            </g>
        </svg>
    );
}

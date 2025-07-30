export default function ApplicationLogo(props) {
    return (
        <svg
            width="100"
            height="100"
            viewBox="30 30 140 120"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >           
            <g>
                <polygon
                    points="100,30 30,70 100,110 170,70"
                    fill="#2D5A73"
                    stroke="#1E2E35"
                    strokeWidth="4"
                />
                <rect
                    x="75"
                    y="90"
                    width="50"
                    height="35"
                    fill="#2D5A73"
                    stroke="#1E2E35"
                    strokeWidth="4"
                />
                <path
                    d="M100 40 L130 70 L130 110"
                    stroke="#F5B933"
                    strokeWidth="6"
                    fill="none"
                />
                <circle
                    cx="130"
                    cy="110"
                    r="7"
                    fill="#F5B933"
                    stroke="#1E2E35"
                    strokeWidth="4"
                />
                <line
                    x1="130"
                    y1="117"
                    x2="130"
                    y2="140"
                    stroke="#F5B933"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
}

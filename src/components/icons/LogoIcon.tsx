import * as React from "react";

export const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
    >
        <path d="M18.9,3.74c-2.83-1-6-1.18-8.81-0.53C5.1,4.43,2,7.6,2,12s3.1,7.57,8.09,8.79c2.81,0.65,6,0.51,8.81-0.53C21.72,19.14,24,15.82,24,12S21.72,4.86,18.9,3.74z" />
        <path d="M12,2c-0.5,4.5,1.5,6.5-0.01,20" stroke="#F5F5DC" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <text x="6" y="16" fontFamily="Lora, serif" fontSize="7" fontWeight="bold" fill="#F5F5DC">C</text>
        <text x="13.5" y="16" fontFamily="Lora, serif" fontSize="7" fontWeight="bold" fill="#F5F5DC">R</text>
    </svg>
);

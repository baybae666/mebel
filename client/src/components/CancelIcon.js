import React from 'react';

const CancelIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-label="Отмена оформления"
        role="img"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 18.364L5.636 5.636m12.728 0L5.636 18.364"
        />
        <circle
            cx="12"
            cy="12"
            r="10"
            strokeWidth={2}
            fill="none"
        />
    </svg>
);

export default CancelIcon;
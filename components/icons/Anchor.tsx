import React from 'react';

interface ArrowUpRightOProps {
    className?: string;
}

const AcnhorIcon: React.FC<ArrowUpRightOProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29">
        <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" fill="#FFFFFF" />
    </svg>
);

export default AcnhorIcon;

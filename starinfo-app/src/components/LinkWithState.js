// LinkWithState.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// 히스토리 백을 사용하기 위해서 만듦
const LinkWithState = ({ to, children }) => {
    const location = useLocation();
    return (
        <Link to={to} state={{ from: location.pathname }}>
            {children}
        </Link>
    );
};

export default LinkWithState;

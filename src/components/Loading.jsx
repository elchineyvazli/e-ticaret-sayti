// src/components/Loading.jsx
import React from 'react';
import '../styles/comp_styles/Loading.scss';

const Loading = () => {
    return (
        <div className="loading-overlay">
            <div className="bouncing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Loading;

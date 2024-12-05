import React from 'react';
import './css/HelpIcon.css';
import questionMarkIcon from '../layout/asset/question_mark_icon.png';

const HelpIcon = ({ onClick }) => {
    return (
        <div className="help-icon-container" onClick={onClick}
        title="페이지 도움말">
            <img
                src={questionMarkIcon}
                alt="Help Icon"
                className="help-icon-image"
            />
        </div>
    );
};

export default HelpIcon;

// MemberProfileButton.js

import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../services/AuthProvider";

function ProfileButton() {
    const navigate = useNavigate();
    const { user } = useAuth(); // 로그인된 사용자 정보 가져오기

    const goToProfile = () => {
        console.log("Profile button clicked");
        if (user && user.userId) {
            console.log(`Navigating to user profile with userId: ${user.userId}`);
            navigate(`/react/member/${user.userId}`); // 로그인된 사용자의 userId로 페이지 이동
        } else {
            console.error("User is not logged in or user ID is missing.");
        }
    };

    return (
        <a href="#" onClick={goToProfile} className="menu-item">
            내 프로필 보기
        </a>
    );
}

export default ProfileButton;
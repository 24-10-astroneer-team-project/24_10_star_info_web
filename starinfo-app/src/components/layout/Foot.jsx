import React from 'react';
import './Foot.css'
import git_60 from './asset/git_60_w.png';
import mail_60 from './asset/mail_60_w.png';
import kakao_60 from './asset/kakao_60_w.png';
import insta_60 from './asset/insta_60_w.png';
import twitter_60 from './asset/twitter_60_w.png';

function Foot() {
    return (
        <div className="footer">
            <div className="sb_footer section_padding">
                <div className="sb_footer-links">
                    <div className="sb_footer-links-div">
                        <h4>별자리소개</h4>
                        <p><a href="./main">테스트 항목</a></p>
                        <p><a href="./main">테스트 항목</a></p>
                    </div>
                    <div className="sb_footer-links-div">
                        <h4>이용안내</h4>
                        <p><a href="./main">테스트 항목</a></p>
                        <p><a href="./main">테스트 항목</a></p>
                    </div>
                    <div className="sb_footer-links-div">
                        <h4>사이트소개</h4>
                        <p><a href="./main">테스트 항목</a></p>
                        <p><a href="./main">테스트 항목</a></p>
                    </div>
                    <div className="sb_footer-links-div">
                        <h4>천체정보</h4>
                        <p><a href="./main">테스트 항목</a></p>
                        <p><a href="./main">테스트 항목</a></p>
                    </div>
                    <div className="sb_footer-links-div">
                        <h3>개발자 문의</h3>
                        <div className="sns">
                            <p><img src={git_60} alt=""/></p>
                            <p><img src={mail_60} alt=""/></p>
                            <p><img src={kakao_60} alt=""/></p>
                            <p><img src={insta_60} alt=""/></p>
                            <p><img src={twitter_60} alt=""/></p>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="sb_footer-below">
                    <div className="sb_footer-copyright">
                        <p>@{new Date().getFullYear()} CodeInn. All right reserved. </p>
                    </div>
                    <div className="sb_footer-below-links">
                        <a href="">
                            <div><p>사이트 약관사항</p></div>
                        </a>
                        <a href="">
                            <div><p>개인정보보호</p></div>
                        </a>
                        <a href="">
                            <div><p>보안</p></div>
                        </a>
                        <a href="">
                            <div><p>쿠키 관련</p></div>
                        </a>
                    </div>


                </div>


            </div>

        </div>


    );
}

export default Foot;

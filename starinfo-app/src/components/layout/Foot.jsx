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
                        <h4>SiteIntro</h4>
                        <p><a href="/react/main"></a></p>
                    </div>
                    <div className="sb_footer-links-div">
                        <h4>StarMap</h4>
                        <p><a href="/react/starmap">StarMapPage</a></p>
                    </div>
                    <div className="sb_footer-links-div">
                        <h4>Planet</h4>
                        <p><a href="/react/planet">PlanetPage</a></p>
                    </div>
                    <div className="sb_footer-links-div">
                        <h4>Meteor</h4>
                        <p><a href="/react/meteor">MeteorShowerPage</a></p>
                    </div>
                    <div className="sb_footer-links-div">
                        <h3>Developer</h3>
                        <div className="sns">
                            <p><img src={git_60} alt=""/></p>
                            <p><img src={mail_60} alt=""/></p>
                            <p><img src={kakao_60} alt=""/></p>
                            <p><img src={insta_60} alt=""/></p>
                            <p><img src={twitter_60} alt=""/></p>
                        </div>
                    </div>
                </div>
                <hr className="foot_hr"></hr>
                <div className="sb_footer-below">
                    <div className="sb_footer-copyright">
                        <p>@{new Date().getFullYear()} CodeInn. All right reserved. </p>
                    </div>
                    <div className="sb_footer-below-links">
                            <div><p>사이트 약관사항</p></div>
                            <div><p>개인정보보호</p></div>
                            <div><p>보안</p></div>
                            <div><p>쿠키 관련</p></div>
                    </div>


                </div>


            </div>

        </div>


    );
}

export default Foot;

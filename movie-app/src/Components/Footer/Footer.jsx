import React from "react";
import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-12">
            <div className="footer__content">
              <h4>{t("about_homecine")}</h4>
              <p>{t("homecine_description")}</p>
              <br />
              <ul>
                <li>
                  <a href="#facebook">
                    <i className="fab fa-facebook-square" />
                  </a>
                </li>
                <li>
                  <a href="#google">
                    <i className="fab fa-google-plus-g" />
                  </a>
                </li>
                <li>
                  <a href="#twitter">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-12">
            <div className="footer__content footer__working">
              <h4>{t("opening_hours")}</h4>
              <div className="textbox">
                <p className="alignleft">{t("monday")}</p>
                <p className="alignright">9:30-22:30</p>
              </div>
              <div style={{ clear: "both" }} />
              <div className="textbox">
                <p className="alignleft">{t("tuesday")}</p>
                <p className="alignright">9:30-22:30</p>
              </div>
              <div style={{ clear: "both" }} />
              <div className="textbox">
                <p className="alignleft">{t("wednesday")}</p>
                <p className="alignright">9:30-22:30</p>
              </div>
              <div style={{ clear: "both" }} />
              <div className="textbox">
                <p className="alignleft">{t("thursday")}</p>
                <p className="alignright">9:30-22:30</p>
              </div>
              <div style={{ clear: "both" }} />
              <div className="textbox">
                <p className="alignleft">{t("friday")}</p>
                <p className="alignright">9:30-22:30</p>
              </div>
              <div style={{ clear: "both" }} />
              <div className="textbox">
                <p className="alignleft">{t("saturday")}</p>
                <p className="alignright">8:30-23:30</p>
              </div>
              <div style={{ clear: "both" }} />
              <div className="textbox">
                <p className="alignleft">{t("sunday")}</p>
                <p className="alignright">8:30-23:30</p>
              </div>
              <div style={{ clear: "both" }} />
            </div>
          </div>
          <div className="col-lg-4 col-12">
            <div className="footer__content">
              <h4>{t("subscribe")}</h4>
              <br />
              <input type="email" placeholder="abc@example.com" />
              <br />
              <button type="button" className="btn btn-custom">
                {t("dang_ky")}
              </button>
              <p>{t("homecine_description_2")}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__author">
        <p>© 2021 HomeCine.</p>
      </div>
    </footer>
  );
};

export default Footer;

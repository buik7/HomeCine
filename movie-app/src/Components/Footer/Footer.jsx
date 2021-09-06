import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-12">
            <div className="footer__content">
              <h4>Về HomeCine</h4>
              <p>
                HomeCine là một trong những công ty tư nhân đầu tiên về điện ảnh
                được thành lập từ năm 2003, đã khẳng định thương hiệu là 1 trong
                10 địa điểm vui chơi giải trí được yêu thích nhất.
              </p>
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
              <h4>Giờ mở cửa</h4>
              <div className="textbox">
                <p className="alignleft">Thứ hai</p>
                <p className="alignright">9:30-22:30</p>
              </div>
              <div style={{ clear: "both" }} />
              <div className="textbox">
                <p className="alignleft">Thứ ba</p>
                <p className="alignright">9:30-22:30</p>
              </div>
              <div style={{ clear: "both" }} />
              <div className="textbox">
                <p className="alignleft">Thứ tư</p>
                <p className="alignright">9:30-22:30</p>
              </div>
              <div style={{ clear: "both" }} />
              <div className="textbox">
                <p className="alignleft">Thứ năm</p>
                <p className="alignright">9:30-22:30</p>
              </div>
              <div style={{ clear: "both" }} />
              <div className="textbox">
                <p className="alignleft">Thứ sáu</p>
                <p className="alignright">9:30-22:30</p>
              </div>
              <div style={{ clear: "both" }} />
              <div className="textbox">
                <p className="alignleft">Thứ bảy</p>
                <p className="alignright">8:30-23:30</p>
              </div>
              <div style={{ clear: "both" }} />
              <div className="textbox">
                <p className="alignleft">Chủ nhật</p>
                <p className="alignright">8:30-23:30</p>
              </div>
              <div style={{ clear: "both" }} />
            </div>
          </div>
          <div className="col-lg-4 col-12">
            <div className="footer__content">
              <h4>Đăng ký ưu đãi</h4>
              <br />
              <input type="email" placeholder="abc@example.com" />
              <br />
              <button type="button" className="btn btn-custom">
                Đăng ký
              </button>
              <p>
                Hiện nay, HomeCine đang ngày càng phát triển hơn nữa với các
                chương trình đặc sắc, các khuyến mãi hấp dẫn, đem đến cho khán
                giả những bộ phim bom tấn của thế giới và Việt Nam nhanh chóng
                và sớm nhất
              </p>
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

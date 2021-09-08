import React from "react";

const Contact = () => {
  return (
    <div>
      <h3 className="text-center mt-5">TRUNG TÂM TRỢ GIÚP</h3>
      <form className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-xl-4">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-12 col-xl-4">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Địa chỉ email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-12 col-xl-4">
              <div className="form-group">
                <input placeholder="Số điện thoại" className="form-control" />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Nhập nội dung"
                  rows="10"
                ></textarea>
              </div>
            </div>
            <div className="col-9"></div>
            <div className="col-3">
              <button className="w-100 btn" id="btnXemThem">
                GỬI
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;

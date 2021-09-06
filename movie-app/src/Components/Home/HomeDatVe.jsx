import React from "react";

const HomeDatVe = () => {
  return (
    <div>
      <section id="buy__tickets">
        <h3 className="text-center">MUA VÉ NHANH</h3>
        <form className="container">
          <div className="form-group">
            <select className="form-control">
              <option value={-1}>Chọn phim</option>
            </select>
          </div>
          <div className="form-group">
            <select className="form-control">
              <option value={-1}>Chọn ngày</option>
            </select>
          </div>
          <div className="form-group">
            <select className="form-control">
              <option value={-1}>Chọn rạp</option>
            </select>
          </div>
          <div className="form-group">
            <select className="form-control">
              <option value={-1}>Chọn suất</option>
            </select>
          </div>
        </form>
        <div className="text-center buy__tickets__btn">
          <button className="btn">MUA VÉ</button>
        </div>
      </section>
    </div>
  );
};

export default HomeDatVe;

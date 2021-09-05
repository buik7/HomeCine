import React, { useEffect } from "react";
import { Card, Button } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { sagaTypes } from "../../Redux/constants/sagaTypes";
import { NavLink } from "react-router-dom";

const { Meta } = Card;
const Cinema = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_CINEMA_SYSTEM_LIST_SAGA,
    });
  }, [dispatch]);

  const cinemaSystemList = useSelector(
    (state) => state.cinemaReducer.cinemaSystemList
  );

  return (
    <div>
      <h4>Quản lý Rạp</h4>

      <div className="row">
        {cinemaSystemList.map((cinemaSystem) => {
          return (
            <div className="col-12 col-md-6 col-xl-2 mb-3" key={cinemaSystem.maHeThongRap}>
              <Card
                hoverable
                // className="p-1"
                style={{ width: "100%" }}
                cover={<img alt="example" src={cinemaSystem.logo} />}
              >
                <div className="text-center">
                  <p>
                    <b>{cinemaSystem.tenHeThongRap}</b>
                  </p>
                  <NavLink to={`/cinema-detail/${cinemaSystem.maHeThongRap}`} className="d-block mb-2">
                    <Button type="primary" className="text-center">
                      Xem thông tin
                    </Button>
                  </NavLink>
                  {/* <NavLink to={`/cinema-schedule/${cinemaSystem.maHeThongRap}`}>
                    <Button type="ghost">
                      Thông tin lịch chiếu
                    </Button>
                  </NavLink> */}

                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cinema;

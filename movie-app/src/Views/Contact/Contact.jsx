import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { openNotification } from "./../../Util/Notification/Notification";

const Contact = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    content: "",
  });

  const { t } = useTranslation();

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openNotification(
      "success",
      "Your message has been sent",
      "We will review it and reply to you as soon as possible"
    );
    setInput({
      name: "",
      email: "",
      phone: "",
      content: "",
    });
  };

  return (
    <div>
      <h3 className="text-center mt-5">{t("contact_help_center")}</h3>
      <form className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-12 col-xl-4">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder={t("contact_name")}
                  className="form-control"
                  onChange={handleChange}
                  value={input.name}
                />
              </div>
            </div>
            <div className="col-12 col-xl-4">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder={t("contact_email")}
                  className="form-control"
                  onChange={handleChange}
                  value={input.email}
                />
              </div>
            </div>
            <div className="col-12 col-xl-4">
              <div className="form-group">
                <input
                  name="phone"
                  placeholder={t("contact_phone")}
                  className="form-control"
                  onChange={handleChange}
                  value={input.phone}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <textarea
                  name="content"
                  className="form-control"
                  placeholder={t("contact_content")}
                  rows="10"
                  onChange={handleChange}
                  value={input.content}
                ></textarea>
              </div>
            </div>
            <div className="col-9"></div>
            <div className="col-3">
              <button
                className="w-100 btn"
                id="btnXemThem"
                type="submit"
                onClick={handleSubmit}
              >
                {t("contact_send")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;

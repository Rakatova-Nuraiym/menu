import React from "react";
import scss from "./Modal.module.scss";

const Modal = ({ modal, CloseModal, children }) => {
  if (!modal) {
    return null;
  }
  return (
    <div  className={scss.mainModal}>
      <div  onClick={CloseModal} className={scss.modal}>{children}</div>
    </div>
  );
};

export default Modal;

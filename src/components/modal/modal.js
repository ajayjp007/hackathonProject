import React from 'react';
import './modal.css';

const Modal = ({ modalHeading, modalBody, modalFooter, ...props }) => {
  return (
    <div className="modal-main-center">
      <div className="modal-container">
        <div className="border-b-[0.5px] border-[#0505051A] font-[500] text-[16px] text-[#464F60]">
          {modalHeading}
        </div>
        <div className="modal-body border-b-[0.5px] border-[#0505051A]">
          {modalBody}
        </div>
        <div className="modal-footer">{modalFooter}</div>
      </div>
    </div>
  );
};

export default Modal;

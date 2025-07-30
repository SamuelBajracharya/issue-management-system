import React from 'react'
import {CloseOutlined, WarningOutlined} from "@ant-design/icons";
import {useConfirmationOverlay} from "../store/overlayStore.js";

const ConfirmActionOverlay = ({title, areYouSure, ConfirmText, confirmAction}) => {
  const closeConfirmationOverlay = useConfirmationOverlay(state =>
    state.closeConfirmationOverlay);
  return (
    <div className="popup-overlay">
      <div className="confirm-action-overlay">
        <div className="confirm-action-header">
          <div className="left-header">
            <div className="alert-icon">
              <WarningOutlined/>
            </div>
            <h1>{title}</h1>
          </div>
          <button className="cancel-button" onClick={closeConfirmationOverlay}><CloseOutlined/></button>
        </div>
        <div className="confirm-action-body">
          <h2>{areYouSure}</h2>
          <p>This action cannot be undone. All data associated with this issue will be permanently removed.</p>
          <div className="confirm-action-buttons">
            <button className="cancel-button" onClick={closeConfirmationOverlay}>Cancel</button>
            <button className="confirm-button" onClick={confirmAction}>{ConfirmText}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ConfirmActionOverlay

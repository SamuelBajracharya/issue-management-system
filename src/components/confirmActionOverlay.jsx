import React, {useState} from 'react';
import {CloseOutlined, WarningOutlined} from "@ant-design/icons";
import {useConfirmationOverlay} from "../store/overlayStore.js";
import ToastMessage from "../components/toastMessage.jsx";

const ConfirmActionOverlay = ({title, areYouSure, ConfirmText, confirmAction}) => {
  const closeConfirmationOverlay = useConfirmationOverlay(state => state.closeConfirmationOverlay);
  const [toast, setToast] = useState(null);

  const handleConfirm = async () => {
    try {
      await confirmAction();
      setToast({
        alertMessage: "Action Successful",
        alertDescription: `${title} has been completed successfully.`,
        alertType: "success",
      });
      setTimeout(() => {
        closeConfirmationOverlay();
      }, 1000);
    } catch (err) {
      setToast({
        alertMessage: "Action Failed",
        alertDescription: err?.response?.data?.message || "Something went wrong. Please try again.",
        alertType: "error",
      });
    }
  };

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
          <button className="cancel-button" onClick={closeConfirmationOverlay}>
            <CloseOutlined/>
          </button>
        </div>
        <div className="confirm-action-body">
          <h2>{areYouSure}</h2>
          <p>This action cannot be undone. All data associated with this issue will be permanently removed.</p>
          <div className="confirm-action-buttons">
            <button className="cancel-button" onClick={closeConfirmationOverlay}>
              Cancel
            </button>
            <button className="confirm-button" onClick={handleConfirm}>
              {ConfirmText}
            </button>
          </div>
        </div>

        {toast && (
          <ToastMessage
            alertMessage={toast.alertMessage}
            alertDescription={toast.alertDescription}
            alertType={toast.alertType}
          />
        )}
      </div>
    </div>
  );
};

export default ConfirmActionOverlay;

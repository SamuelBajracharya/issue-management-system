import React, {useEffect, useState} from 'react';
import {Alert} from 'antd';

const ToastMessage = ({alertMessage, alertDescription, alertType}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (alertMessage || alertDescription) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage, alertDescription]);

  if (!visible) return null;

  return (
    <div className="toast-message">
      <Alert
        message={alertMessage}
        description={alertDescription}
        type={alertType}
        showIcon
        
      />
    </div>
  );
};

export default ToastMessage;

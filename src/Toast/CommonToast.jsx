import React, { useEffect } from 'react';
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaTimesCircle, 
  FaTimes 
} from 'react-icons/fa';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-green-50',
    error: 'bg-red-50',
    warning: 'bg-yellow-50',
    info: 'bg-blue-50'
  };

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800'
  };

  const icon = {
    success: <FaCheckCircle className="h-5 w-5 text-green-400" />,
    error: <FaTimesCircle className="h-5 w-5 text-red-400" />,
    warning: <FaExclamationCircle className="h-5 w-5 text-yellow-400" />,
    info: <FaExclamationCircle className="h-5 w-5 text-blue-400" />
  };

  return (
    <div className={`fixed top-4 right-4 rounded-md p-4 ${bgColor[type]} shadow-lg z-50`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {icon[type]}
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textColor[type]}`}>
            {message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 ${textColor[type]}`}
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CommonToast({ toasts, removeToast }) {
  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
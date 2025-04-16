// Modal.jsx
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <div
            className={`fixed top-0 left-0 w-full h-full flex justify-center mt-6 items-center bg-black bg-opacity-50 transition duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                className="bg-white rounded-lg p-6 shadow-lg w-[98%] md:w-[70%] relative"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-800 hover:text-black focus:outline-none text-xl"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
import React from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, user }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose(); // close modal kalau klik luar
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={handleOutsideClick}>
      <div
        className="bg-white p-6 rounded-2xl shadow-lg w-[400px] text-center"
        onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-red-500">{user?.username}</span>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            type="button"
            onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
            type="button"
            onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

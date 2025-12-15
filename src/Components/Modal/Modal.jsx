import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

const Modal = ({ onClose, entryFee, contestId }) => {
    const dialogRef = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal(); // Open the dialog when mounted
        }
    }, []);

    return (
        <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-green-600 text-center">Complete Payment</h3>
                <p className="py-4 mt-5  bg-blue-100 text-center rounded-2xl text-green-500">
                    Pay to participate in this contest.
                    <strong className="text-pink-600 ml-5">${entryFee}</strong>
                </p>
                <div className="modal-action ">
                    <button
                        className="btn btn-error"
                        onClick={() => {
                            dialogRef.current.close();
                            onClose();
                        }}
                    >
                        Close
                    </button>
                    <button
                        className="btn bg-accent"
                        onClick={() => {
                            navigate("/checkout-payment", {state: {contestId, entryFee}});
                        }}
                    >
                        Go To Payment
                    </button>
                </div>
            </div>
            <div
                className="modal-backdrop"
                onClick={() => {
                    dialogRef.current.close();
                    onClose();
                }}
            ></div>
        </dialog>
    );
};

export default Modal;

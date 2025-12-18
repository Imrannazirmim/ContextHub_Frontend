import { useState } from "react";
import toast from "react-hot-toast"; // Don't import Toaster here
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SubmitTaskModal = ({ contestId, onClose, onSuccess }) => {
    const [task, setTask] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async () => {
        if (!task.trim()) {
            toast.error("Please provide your submission links/details");
            return;
        }

        setSubmitting(true);
        try {
            await axiosSecure.post("/submissions", {
                contestId,
                submittedTask: task.trim(),
            });
            toast.success("Task submitted successfully!");
            onSuccess(); 
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit task. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <dialog className="modal modal-open">
            <div className="modal-box max-w-2xl">
                <h3 className="font-bold text-2xl text-center mb-6">Submit Your Task</h3>

                <textarea
                    className="textarea textarea-bordered w-full h-64 resize-none text-base"
                    placeholder="Paste your links here (GitHub, Google Drive, Figma, Live Demo, etc.)"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    disabled={submitting}
                />

                <div className="modal-action mt-8 flex justify-end gap-4">
                    <button className="btn btn-outline btn-lg" onClick={onClose} disabled={submitting}>
                        Cancel
                    </button>
                    <button className="btn btn-primary btn-lg px-10" onClick={handleSubmit} disabled={submitting}>
                        {submitting ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Submitting...
                            </>
                        ) : (
                            "Submit Task"
                        )}
                    </button>
                </div>
            </div>

            {/* This enables click outside to close */}
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose} disabled={submitting}>
                    close
                </button>
            </form>
        </dialog>
    );
};

export default SubmitTaskModal;

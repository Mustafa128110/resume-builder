import { useState } from "react";
import { Modal } from "./Modal";
import { CreateResumeForm } from "./CreateResumeForm";
import { createPortal } from "react-dom";
import { setUrlUsernameParam } from "../utils";

export const EditResumeActionBtn = () => {
  const [showEditResumeForm, setEditCreateResumeForm] = useState(false);

  const onEditYourOwnResume = () => {
    setEditCreateResumeForm(true);
  };

  return (
    <>
      <button
        style={{ color: "white", fontSize: "1.3rem", fontWeight: "bold" }}
        onClick={onEditYourOwnResume}
        className="btn btn-primary color-bg btn-round fixed-bottom-right edit"
      >
        <i className="bi bi-pen" />
      </button>

      {showEditResumeForm &&
        createPortal(
          <Modal
            onClose={() => setEditCreateResumeForm(false)}
            title="Create Resume"
          >
            <CreateResumeForm
              isEdit={true}
              closeModal={(userId) => {
                setEditCreateResumeForm(false);
                setUrlUsernameParam(userId);
              }}
            />
          </Modal>,
          document.getElementById("modal-root")!
        )}
    </>
  );
};

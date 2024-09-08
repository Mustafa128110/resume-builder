import { useContext, useState } from "react";
import { Modal } from "./Modal";
import { CreateResumeForm } from "./CreateResumeForm";
import { createPortal } from "react-dom";
import { StoreCtx } from "../context/store";

export const EditResumeActionBtn = () => {
  const [showEditResumeForm, setEditCreateResumeForm] = useState(false);
  const { userId } = useContext(StoreCtx);

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
              closeModal={() => {
                setEditCreateResumeForm(false);
                const url = new URL(window.location.href);
                url.searchParams.set("username", userId);
                window.history.pushState({}, "", url);
              }}
            />
          </Modal>,
          document.getElementById("modal-root")!
        )}
    </>
  );
};

import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "./Modal";
import { CreateResumeForm } from "./CreateResumeForm";
import { StoreCtx } from "../context/store";

export const CreateResumeActionBtn = () => {
  const { userId } = useContext(StoreCtx);
  const [showCreateResumeForm, setShowCreateResumeForm] = useState(false);

  const onCreateYourOwnResume = () => {
    setShowCreateResumeForm(true);
  };

  return (
    <>
      <button
        style={{ color: "white", fontSize: "2rem", fontWeight: "bold" }}
        onClick={onCreateYourOwnResume}
        className="btn btn-primary color-bg btn-round fixed-bottom-right add"
      >
        <i className="bi bi-plus" />
      </button>

      {showCreateResumeForm &&
        createPortal(
          <Modal
            onClose={() => setShowCreateResumeForm(false)}
            title="Create Resume"
          >
            <CreateResumeForm
              closeModal={() => {
                setShowCreateResumeForm(false);
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

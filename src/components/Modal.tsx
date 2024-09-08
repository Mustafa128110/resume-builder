interface ModalProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

export const Modal = ({ title, children, onClose }: ModalProps) => {
  return (
    <div
      style={{
        display: "block",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(7px)",
      }}
      className="modal fade show"
      tabIndex={-1}
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              onClick={onClose}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

import { useContext } from "react";
import { StoreCtx } from "../context/store";

interface DownloadActionBtnProps {
  toPDF: () => void;
}

export const DownloadActionBtn = ({ toPDF }: DownloadActionBtnProps) => {
  const store = useContext(StoreCtx);

  const download = () => {
    if (!store.userId) {
      alert("Please create your resume first!");
      return;
    }

    toPDF();
  };

  return (
    <button
      style={{ color: "white", fontSize: "1.3rem", fontWeight: "bold" }}
      onClick={download}
      className="btn btn-primary color-bg btn-round fixed-bottom-right download"
    >
      <i className="bi bi-download" />
    </button>
  );
};

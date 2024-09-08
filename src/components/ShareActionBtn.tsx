import { useContext } from "react";
import { StoreCtx } from "../context/store";

export const ShareActionBtn = () => {
  const store = useContext(StoreCtx);

  const share = async () => {
    if (!store.userId) {
      alert("Please create your resume first!");
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Resume - ${store.resumeData.about.firstName} ${store.resumeData.about.lastName}`,
          text: store.resumeData.about.intro,
          url: window.location.href,
        });
        console.log("Page shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API not supported in this browser.");
    }
  };

  return (
    <button
      style={{ color: "white", fontSize: "1.3rem", fontWeight: "bold" }}
      onClick={share}
      className="btn btn-primary color-bg btn-round fixed-bottom-right share"
    >
      <i className="bi bi-share" />
    </button>
  );
};

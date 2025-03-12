import React from "react";

const isSmallScreen = window.matchMedia("(max-width: 700px)").matches ? true : false;

function Modal({ children, onClose, isSmallScreen, showCloseButton, noTopPadding }) {

  return (
    <div style={styles.overlay}>
      <div style={{ paddingTop: noTopPadding ? "0px" : "10%", width: "100%" }}>
        <div style={styles.modal}>
          {children}
          {showCloseButton && <button style={styles.closeButton} onClick={onClose}>
            Cancel
          </button>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    zIndex: 99999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: "0px",
    borderRadius: "0px",
    position: "relative",
    width: isSmallScreen ? "100%" : "50%",
    height: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
    // maxWidth: "300px",
  },
  closeButton: {
    position: "absolute",
    top: "5px",
    right: "10px",
    background: "transparent",
    fontSize: "14px",
    fontWeight: "900",
    cursor: "pointer",
    color: "#fd5c63"
  }
};

export default Modal;

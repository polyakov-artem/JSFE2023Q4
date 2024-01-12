export const classes = {
  modalBlock: "modal-block",
  modalBlockActive: "modal-block_active",
  modalWindow: "modal-block__window",
  backdrop: "backdrop",
  backdropActive: "backdrop_active",
};

export const selectors = {
  openBtn: `[data-action="open-modal"]`,
  closeBtn: `[data-action="close-modal"]`,
};

export const events = {
  closeWindow: "closeModalWindow",
  openWindow: "openModalWindow",
};

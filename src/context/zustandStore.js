import { create } from "zustand";

const pageStore = create((set) => ({
  zusHeader: "",
  zusContent: "",
  zusFooter: "",
  setZusHeader: (updatedHeader) => {
    return set(() => ({ zusHeader: updatedHeader }));
  },
  setZusContent: (updatedContent) => {
    return set(() => ({ zusContent: updatedContent }));
  },
}));

export const setZusFooter = (updatedFooter) => {
  return pageStore.setState({ zusFooter: updatedFooter });
};

export default pageStore;

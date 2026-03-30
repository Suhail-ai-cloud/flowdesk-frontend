let setLoadingGlobal;

export const setLoader = (setter) => {
  setLoadingGlobal = setter;
};

export const showLoader = () => {
  if (setLoadingGlobal) setLoadingGlobal(true);
};

export const hideLoader = () => {
  if (setLoadingGlobal) setLoadingGlobal(false);
};
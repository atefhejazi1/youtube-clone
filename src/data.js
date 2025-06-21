// export const API_KEY = "AIzaSyBT5HciJZKDboTuA55H4FlwetF9YF7mriA";
export const API_KEY = "AIzaSyBajZYethhird6gmjoDukAHEJ_lsrcBhIg";

export const value_converter = (value) => {
  if (value >= 1000000) {
    return Math.floor(value / 1000000) + "M";
  }
  if (value >= 1000) {
    return Math.floor(value / 1000) + "K";
  }
  return value;
};

import { useState } from "react";
import { toast } from "react-toastify";

// let filter = [];
function useCustomState() {
  const [filters, setFilter] = useState({});
  // console.log("filter : ", filter);
  // filter = filters;
  // console.log("useCustomState Categoty", filter);
  return [filters, setFilter];
}

function useCustomSorts() {
  const [sort, setSort] = useState({});

  return [sort, setSort];
}
// let keyWordMain = "";
// function useCustomkeyWord(state) {
//   const [keyWord, setkeyWord] = useState(state);
//   keyWordMain = keyWord;
//   toast.success(keyWord);
//   return [keyWord, setkeyWord];
// }  useCustomkeyWord, keyWordMain
// console.log("keyWordMain", keyWordMain);
//filter
export { useCustomState, useCustomSorts };

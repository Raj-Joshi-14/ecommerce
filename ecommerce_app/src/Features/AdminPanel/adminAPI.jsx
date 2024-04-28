import { toast } from "react-toastify";

export function addNewFlex(item) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch("/highlight/", {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      toast.success("Uploded SuccessFully");
      resolve({ data });
    } catch (error) {
      console.error("Error uploading flex:", error);
      // Handle error, show an error toast, etc.
    }
  });
}

export function fetchHighlights() {
  return new Promise(async (resolve) => {
    const response = await fetch("/highlight/");
    const data = await response.json();
    // console.log("Fetched highlights:", data); // Add this line
    resolve({ data });
  });
}

export function fetchTopProduts(query) {
  return new Promise(async (resolve) => {
    // console.log(query);
    const response = await fetch("/highlight/" + query);
    const data = await response.json();
    // console.log("Fetched Top Produts:", data); // Add this line
    resolve({ data });
  });
}

export function fetchTopSearch() {
  return new Promise(async (resolve) => {
    // console.log();
    const response = await fetch("/highlight/top");
    const data = await response.json();
    // console.log("Fetched Top Produts:", data); // Add this line
    resolve({ data });
  });
}

export function updateTopSearch(query) {
  // console.log(query);
  let id = "64db962d7557b1e9c340a896";
  return new Promise(async (resolve) => {
    try {
      const response = await fetch("/highlight/top/" + id, {
        method: "PATCH",
        body: JSON.stringify(query),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      // console.log("Response from server:", data); // Add this line to log the response
      resolve({ data });
    } catch (error) {
      console.error(error);
      toast.error("Update Fail ");
    }
  });
}

export function updateFlex(imgsrc, id) {
  // console.log(imgsrc);
  // console.log(id);
  return new Promise(async (resolve) => {
    try {
      const response = await fetch("/highlight/" + id, {
        method: "PATCH",
        body: JSON.stringify(imgsrc),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      // console.log("Response from server:", data); // Add this line to log the response
      resolve({ data });
    } catch (error) {
      console.error(error);
      toast.error("Update Fail ");
    }
  });
}

export function deleteFlex(itemId) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch("/highlight/" + itemId, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data: { id: itemId } });
    } catch (error) {
      toast.error("Delete Fail", error);
      console.error("Delete Fail");
      // Handle error, show an error toast, etc.
    }
  });
}

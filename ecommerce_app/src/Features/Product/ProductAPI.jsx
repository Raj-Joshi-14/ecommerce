export const fetchByProductsFilters = (
  filter,
  keyword,
  sort,
  pagination,
  admin
) => {
  // console.log("pagination From API ", pagination);
  // console.log("keyword From API ", keyword);
  // console.log("Filter From API ", filter);
  // console.log("sort From API ", sort);
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  for (let key in sort) {
    if (sort) {
      queryString += `${key}=${sort[key]}&`;
    }
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += `admin=true`;
  }
  if (keyword) {
    queryString += `keyword=${keyword}&`;
    // console.log(title);
  }
  // console.log("From Product API Pagination", pagination);
  // console.log(admin);
  // console.log(queryString);
  return new Promise(async (resolve) => {
    // Todo Task
    const response = await fetch(" /products?" + queryString + "isAdmin=true");
    const data = await response.json();
    const totalItems = response.headers.get("X-Total-Count");
    // console.log("data", data);
    // console.log("totalItems", totalItems);
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
};
export const fetchKeyWord = (keyword) => {
  // console.log("keyword From API ", keyword);
  if (keyword) {
    let queryString = "";
    if (keyword) {
      queryString += `characters=${keyword}&`;
      // console.log(title);
    }
    return new Promise(async (resolve) => {
      // Todo Task
      const response = await fetch("/products/key?" + queryString);
      const data = await response.json();

      // console.log("data", data);
      // console.log("totalItems", totalItems);
      resolve({ data });
    });
  }
};
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch("/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

//////////////////////// For Admin
//After Creating a server the user will not see the deleted product by admin
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

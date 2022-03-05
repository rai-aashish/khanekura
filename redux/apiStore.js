import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://uat.ordering-boafresh.ekbana.net/api/v4/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        typeof window !== "undefined"
          ? localStorage.getItem("access_token") ?? ""
          : ""
      );
      headers.set("Api-key", process.env.NEXT_PUBLIC_API_KEY);
      headers.set("Warehouse-Id", process.env.NEXT_PUBLIC_WAREHOUSE_ID);

      return headers;
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => `todos`,
      providesTags: [{ type: "Cart", id: "LIST" }],
    }),
    getCart: builder.query({
      query() {
        return {
          url: "cart",
          method: "GET",
        };
      },
      providesTags: [{ type: "Cart", id: "LIST" }],
    }),
    addCartProduct: builder.mutation({
      query(productData) {
        return {
          url: `cart-product`,
          method: "POST",

          body: productData,
        };
      },
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    updateCartProduct: builder.mutation({
      query(productData) {
        return {
          url: `cart-product/${productData.productId}`,
          method: "PATCH",

          body: productData,
        };
      },
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    deleteCartProduct: builder.mutation({
      query(id) {
        return {
          url: `cart-product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
  }),
});

//resources api
export const resourcesApi = createApi({
  reducerPath: "resourcesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://uat.ordering-boafresh.ekbana.net/api/v4/",
    prepareHeaders: (headers) => {
      headers.set("Api-key", process.env.NEXT_PUBLIC_API_KEY);
      headers.set("Warehouse-Id", process.env.NEXT_PUBLIC_WAREHOUSE_ID);

      return headers;
    },
  }),
  tagTypes: ["Resources"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `category`,
      providesTags: [{ type: "Resources", id: "CATEGORIES" }],
    }),
    searchProduct: builder.query({
      query: (queryText) => `product?query=${queryText}`,
    }),
  }),
});

//product?query=momo&categoryId=pizza-sub-1

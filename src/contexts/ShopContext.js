"use client";

import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import axios from "axios";
import Loading from "@/components/Loading";

const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // funciones productos

  const handleAddToCart = () => {
    let productToAdd = {};
    const findProduct = cart.find(
      (productInCart) => productInCart._id === product._id
    );

    if (findProduct) {
      productToAdd = { ...findProduct, qty: findProduct.qty + product.qty };
    } else {
      productToAdd = product;
    }
    const filteredCart = cart.filter(
      (productInCart) => productInCart._id !== product._id
    );
    setCart([...cart, productToAdd]);
    //setcart
  };

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/products");
      console.log("products", res.data);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getOneProduct = useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:4000/products/${id}`); //llega por parámetro
      console.log("product", res.data.product);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductBycategory = useCallback(async (slug) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:4000/products/category${slug}`
      );
      setCategoryProducts(res.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const cartQty = () => cart.length

  return (
    <ShopContext.Provider
      value={{
        products,
        product,
        cart,
        cartQty,
        handleAddToCart,
        loading,
        getProducts,
        getOneProduct,
        getProductBycategory,
        categoryProducts,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShopContext must be use within a ShopContextProvider");
  }
  return context;
};

"use client";

import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import axios from "axios";

const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const handleAddToCart = (product) => {
    
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
    setCart([...filteredCart, productToAdd]);
  };

  const handleRemoveFromCart = (productToRemove) => {
    const updatedCart = cart.filter(
      (productInCart) => productInCart._id !== productToRemove._id
    );
    setCart(updatedCart);
  };

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
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
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
      );
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategories = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`
      );
      setCategories(res.data.categories || []);
    } catch (error) {
      console.log("Error al cargar categorías:", error);
    }
  }, []);

  const getProductBycategory = useCallback(async (slug) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}`
      );
      setCategoryProducts(res.data.products || []);
    } catch (error) {
      console.log(error);
      setCategoryProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts();
    getCategories();
  }, [getProducts, getCategories]);

  const cartQty = () => cart.length;

  const cartTotal = () =>
    cart.reduce((acc, product) => acc + product.qty * product.price, 0);

  const totalCartItems = () =>
    cart.reduce((acc, product) => acc + product.qty, 0);

  const addOrder = async (userValues) => {
    const reducedCart = cart.map((product) => {
      const prod = {
        name: product.name,
        _id: product._id,
        qty: product.qty,
      };

      return prod;
    });

    const orderValues = {
      user: userValues,
      products: reducedCart,
      total: cartTotal(),
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        orderValues
      );

      return true;
    } catch (error) {
      console.log("error", error);

      return false;
    }
  };

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
        categories,
        addOrder,
        cartTotal,
        totalCartItems,
        handleRemoveFromCart,
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

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

  const handleAddToCart = (product) => {
    let productToAdd = {}; //se inicializa en vacío y despues se llena
    const findProduct = cart.find(
      (productInCart) => productInCart._id === product._id
    );

    if (findProduct) {
      productToAdd = { ...findProduct, qty: findProduct.qty + product.qty }; //sobreescribe qty
    } else {
      productToAdd = product;
    }
    const filteredCart = cart.filter(
      (productInCart) => productInCart._id !== product._id
    );
    setCart([...filteredCart, productToAdd]);
    //obtengo lo que ya tenia y le agrego algo nuevo
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
      ); //llega por parámetro
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
        `${process.env.NEXT_PUBLIC_API_URL}/products/category${slug}`
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
  }, []);

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
    console.log("mi orden es:", orderValues);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        orderValues
      );

      return true;

      console.log("data", response);
    } catch (error) {
      console.log("error", error);

      return false;
    }
  };

  //POST a API
  //
  //
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
        addOrder,
        cartTotal,
        totalCartItems,
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

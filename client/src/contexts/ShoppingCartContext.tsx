import Axios, { AxiosResponse } from 'axios'
import React, { createContext, PropsWithChildren, ReactNode, useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import { CartItem, CheckOutItems } from '../interfaces/UserInterface'
import {ItemContext} from './ItemContext'
import { Row, Col, Button } from 'react-bootstrap'
import { formatCurrency } from '../utility/formatCurrency'


type ShoppingCartContext = {
  cartItems: Array<CartItem>
  increaseCartQuantity: (itemId: string) => void
  decreaseCartQuantity: (itemId: string) => void
  getItemQuantity: (id: string) => number
  getCartQuantity: () => number
  checkOutItems: Array<CheckOutItems>
  removeFromCart: (itemId: string) => void
  getCheckOutTotal: () => number
  checkOut: () => void
  checkOutHistory: Array<CheckOutItems>
  clearCheckOutHistory: () => void
}


export const ShoppingCartContext = createContext({} as ShoppingCartContext)
export default function ShoppingCartProvider(props: PropsWithChildren<any>) {
  const userContext = useContext(UserContext);
  const itemContext = useContext(ItemContext);
  const [cartItems, setCartItems] = useState<Array<CartItem>>([]);
  const [checkOutItems, setCheckOutItems] = useState<Array<CheckOutItems>>([]);
  const [checkOutHistory, setCheckOutHistory] = useState<Array<CheckOutItems>>([]);
  useEffect(() => {
    if (userContext.user) {
      setCartItems(userContext.user.items);
    }
  }, [userContext.user])

  useEffect(() => {
    if (userContext.user) {
      /* update user cart to db */
      updateCart();
      /* update cart quantity */
      getCartQuantity();
      /* get items ready for check out */
      getCheckOutItems();
      getCheckOutTotal();
      getCheckOutHistory();
    }
  }, [cartItems, checkOutHistory])


  /* update cart */
  const updateCart = () => {
    try {
      Axios.patch(`${import.meta.env.VITE_API_URL}/user/update/${userContext.user!.id}`, {
        cartItems
      }, { withCredentials: true }).then((res: AxiosResponse) => {
       
      })
    } catch (err) {
      console.log(err);
    }
  }

  /* get cart quantity */
  const getCartQuantity = () => {
    let total =  0;
    cartItems.forEach(item => {
      total += item.quantity;
    })

    return total;
  }

  /* get item quantity */
  const getItemQuantity = (id: string) => {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  /* increase cart quantity by 1 */
  const increaseCartQuantity = (itemId: string) => {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === itemId) == null) {
        return [...currItems, { id: itemId, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  /* decrease cart quantity by 1*/
  const decreaseCartQuantity = (itemId: string) => {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === itemId)?.quantity === 1) {
        return currItems.filter(item => item.id !== itemId)
      } else {
        return currItems.map(item => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  /* get items ready for checkout  */
  const getCheckOutItems = () => {
    let currCheckOutItems: CheckOutItems[] = [];
    cartItems.forEach(cartItem => {
      let currItem = itemContext.items.find(item => item._id === cartItem.id)
      currCheckOutItems.push({
        id: currItem!._id,
        name: currItem!.name,
        price: currItem!.price,
        imageUrl: currItem!.imageUrl,
        quantity:  cartItem.quantity,
      })
    })

    setCheckOutItems(currCheckOutItems);
  }

  /* get user checkout history */
  const getCheckOutHistory = () => {

    try {
      Axios.get(`${import.meta.env.VITE_API_URL}/user/checkouthistory/${userContext.user!.id}`)
      .then((res: AxiosResponse) => {
        setCheckOutHistory(res.data);
      })
    } catch (err) {
      console.log(err);
    }
  }

  /* get checkout total */
  const getCheckOutTotal = () => {
    let total = 0;
    checkOutItems.forEach(item => {
      total += (item.price * item.quantity);
    })

    return total;
  }

  /* remove items from cart */
  const removeFromCart = (itemId: string) => {
    setCheckOutItems(checkOutItems.filter(item => item.id !== itemId));
    setCartItems(cartItems.filter(item => item.id !== itemId));
  }

  const clearCart  = () => {
    setCheckOutItems([]);
    setCartItems([]);
  }

  /* checkOut items */
  const checkOut = async () => {
    try {
      await Axios.patch(`${import.meta.env.VITE_API_URL}/user/checkout/${userContext.user?.id}`, {
        checkOutItems
      }, { withCredentials: true }).then((res: AxiosResponse) => {
        if (res.data === "success!") {
          cartItems.forEach(item => {
            itemContext.reduceStock(item.id, item.quantity);
          })
          clearCart();
        }
      })
    } catch (err) {
      console.log(err);
    }

    
  }

  const clearCheckOutHistory = async () => {
    if (userContext.user && checkOutHistory.length !== 0) {
      try {
      await Axios.patch(`${import.meta.env.VITE_API_URL}/user/clearcheckouthistory/${userContext.user?.id}`)
      .then((res: AxiosResponse) => {
        console.log(res);
      })
    } catch (err) {
      console.log(err);
    }
    setCheckOutHistory([]);
    }
  }

  

  return (
    <ShoppingCartContext.Provider value={{
      cartItems,
      increaseCartQuantity,
      decreaseCartQuantity,
      getItemQuantity,
      getCartQuantity,
      checkOutItems,
      removeFromCart,
      getCheckOutTotal,
      checkOut,
      checkOutHistory,
      clearCheckOutHistory,
    }}>
      {props.children}
    </ShoppingCartContext.Provider>
  )
}
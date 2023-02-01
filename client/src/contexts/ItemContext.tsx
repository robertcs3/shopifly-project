import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import Axios, { AxiosResponse } from 'axios'
import { ItemInterface } from '../interfaces/ItemInterface'


type ItemContext = {
  createItem: (
    name: string,
    price: number,
    stock: number,
    imageUrl: string,
  ) => Promise<any>
  items: Array<ItemInterface>
  reduceStock: (itemId: string, quantity: number) => void
  editItem: (
    id: string,
    name: string,
    price: number,
    stock: number,
    imageUrl: string
  ) => Promise<any>
  deleteItem: (itemId: string) => void
}

export const ItemContext = createContext({} as ItemContext)

export default function ItemProvider(props: PropsWithChildren<any>) {
  const [items, setItems] = useState<Array<ItemInterface>>([]);

  /* Get items from inventory */
  useEffect(() => {
    getItems();
  }, [setItems])

  /* Get items from inventory */
  const getItems = async () => {
    try {
      await Axios.get(`${import.meta.env.VITE_API_URL}/item`)
        .then((res: AxiosResponse) => setItems(res.data));
    } catch (err) {
      console.log(err);
    }
  }

  /* create  an item */
  const createItem = async (
    name: string,
    price: number,
    stock: number,
    imageUrl: string
  ) => {
    return await Axios.post(`${import.meta.env.VITE_API_URL}/item/create`, {
      name,
      price,
      stock,
      imageUrl
    }).then(
      (res: AxiosResponse) => res.data)
  }

  const editItem = async (
    id: string,
    name: string,
    price: number,
    stock: number,
    imageUrl: string
  ) => {
    let response = await Axios.put(`${import.meta.env.VITE_API_URL}/item/${id}`, {
      name,
      price,
      stock,
      imageUrl
    }).then(
      (res: AxiosResponse) => res.data)
        if (response !== "duplicate") {
          setItems(currItems => {
            return currItems.map(item => {
              if (item._id === id) {
                return {
                  ...item,
                  name: name,
                  price: price,
                  stock: stock,
                  imageUrl: imageUrl
                }
              } else {
                return item
              }
            })
          })
        }
         
    return response;
  }

  /* delete an item */
  const deleteItem = (itemId: string) => {
    Axios.delete(`${import.meta.env.VITE_API_URL}/item/${itemId}`)
    .then((res: AxiosResponse) => res.data);

    setItems(items.filter(item => item._id !== itemId))
  }

  const reduceStock = (itemId: string, quantity: number) => {
    setItems(currItems => {
      return currItems.map(item => {
        if (item._id === itemId) {
          return { ...item, stock: item.stock - quantity }
        } else {
          return item
        }
      })
    })
  }
  return (
    <ItemContext.Provider value={{
      createItem,
      items,
      reduceStock,
      editItem,
      deleteItem,
    }}>{props.children}</ItemContext.Provider>
  )
}
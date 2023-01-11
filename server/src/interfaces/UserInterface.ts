export type CartItem = {
  id: string
  quantity: number
}

export type CheckOutItems = {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

export interface UserInterface {
    username: string;
    isAdmin: boolean;
    id: string;
    items: Array<CartItem>;
    checkOutHistory: Array<CheckOutItems>;
  }
  
  export interface DatabaseUserInterface {
    username: string;
    password: string;
    isAdmin: boolean;
    _id: string;
    items: Array<CartItem>;
    checkOutHistory: Array<CheckOutItems>;
  }
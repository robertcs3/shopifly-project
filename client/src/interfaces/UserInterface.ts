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
      id: string;
      username: string;
      isAdmin: boolean;
      items: Array<CartItem>;
      checkOutHistory: Array<CheckOutItems>;
}
  
   
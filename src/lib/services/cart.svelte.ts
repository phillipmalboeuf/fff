import { browser } from '$app/environment'

export type Item = { 
  id: string,
  name: string,
  price: number,
  quantity?: number,
}

let items = $state.frozen<Item[]>((browser && localStorage.getItem('items')) ? JSON.parse(localStorage.getItem('items')) : [])
let totalQuantity = $derived.by(() => items.reduce((total, item) => total + item.quantity, 0))
let subTotal = $derived.by(() => items.reduce((total, item) => total + (item.price * item.quantity), 0))

$effect.root(() => {
  $effect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  })
})

export const addItem = (item: Item, quantity: number) => {
  if (items.find(i => i.id === item.id)) {
    updateItemQuantity(item.id, items.find(i => i.id === item.id).quantity + quantity)
  } else {
    items = [...items, { ...item, quantity }]
  }
  return items
}

export const removeItem = (id: Item['id']) => {
  items = items.filter(item => item.id !== id)
  return items
}

export const updateItemQuantity = (id: Item['id'], quantity: number) => {
  if (quantity === 0) {
    removeItem(id)
  } else {
    items = items.map(item => item.id === id ? { ...item, quantity } : item)
  }
  
  return items
}

export const useCart = () => {
  return {
    get items() { return items },
    get totalQuantity() { return totalQuantity },
    get subTotal() { return subTotal },
  }
}
export type UserSessionIdEntity = string

export interface CardItemEntity {
  productId: string
  quantity: number
  name: string
  price: number
}

export interface ProductItemEntity {
  id: string
  name: string
  price: number
  originalPrice: number
  rating: number
  image: string
  discount?: string
}

export interface Product {
  id: string
  name: string
  description?: string | null
  imageUrl: string
  price: number | null
  formattedPrice: string
  defaultPriceId?: string
}

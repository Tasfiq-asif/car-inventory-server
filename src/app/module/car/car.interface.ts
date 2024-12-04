// Interface for input data (not extending Document)
export interface ICarInput {
  brand: string
  model: string
  year: number
  price: number
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible'
  description?: string | null
  quantity: number
  inStock: boolean
}

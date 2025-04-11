// Interface for input data (not extending Document)
export interface ICarInput {
  brand: string
  model: string
  title: string
  subtitle: string
  image: string
  year: number
  price: number
  mileage: number
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid'
  transmission: 'Automatic' | 'Manual'
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible'
  location: string
  color: string
  features: string[]
  description?: string | null
  quantity: number
  inStock: boolean
}

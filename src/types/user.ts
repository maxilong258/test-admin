export interface User {
  id?: number
  username: string
  password?: string
  roles: any
  profile?: {
    gender: number
    photo: string
    address: string
  }
  token?: string
}
import { User } from '@/types/user'
import { http } from './use-http'

const localStorageKey = '__auth_provider_token__'

export const getToken = () => localStorage.getItem(localStorageKey)

export const handleUserResponse = (user: User) => {

  localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = async (data: { username: string; password: string }) => {
  const res = await http('auth/signin', {
    method: 'POST',
    data
  })
  return handleUserResponse(res)
}

export const register = async (data: {
  username: string
  password: string
}) => {
  const res = await http('auth/signup', {
    method: 'POST',
    data
  })
  return handleUserResponse(res)
}

export const logout = async () => localStorage.removeItem(localStorageKey)

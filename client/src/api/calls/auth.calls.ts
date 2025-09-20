import api from '../index'

import type { LoginType } from '../../types/validation/login.types'
import type { RegisterType } from '../../types/validation/register.types'

export async function loginCall(data: LoginType) {
  const response = await api.post('/login', data)
  return response.data
}

export async function registrationCall(data: RegisterType) {
  const response = await api.post('/register', data)
  return response.data
}

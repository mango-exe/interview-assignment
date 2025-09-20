import './Login.css'
import React from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { LoginSchema } from '../../../types/validation/login.types'
import type { LoginType } from '../../../types/validation/login.types'

import { actions as authActions } from '../../../store/slices/auth-slice'
import { actions as errorActions } from '../../../store/slices/error-slice'

import { loginCall } from '../../../api/calls/auth.calls'


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  })


  const loginMutation = useMutation({
    mutationFn: loginCall,
    onSuccess: (response) => {
      dispatch(authActions.loginSuccess(response.data))
      navigate('/home')
    },
    onError: (error) => {
      dispatch(errorActions.addError(error.message))
    }
  })

  const onSubmit = (data: LoginType) => {
    loginMutation.mutate(data)
  }

  return (
    <div>
      <div className="text-xl font-semibold mb-6 text-gray-700">Login</div>
      <div className="flex flex-col mb-4">
        <label htmlFor="email" className="mb-1 text-sm text-gray-600">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register('email')}
          className="pl-3 pr-3 rounded-2xl bg-gray-200 h-[2.2em] w-full text-sm text-gray-600 placeholder-gray-400 focus:outline-none"
        />
        {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
      </div>
      <div className="flex flex-col mb-6">
        <label htmlFor="password" className="mb-1 text-sm text-gray-600">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          {...register('password')}
          className="pl-3 pr-3 rounded-2xl bg-gray-200 h-[2.2em] w-full text-sm text-gray-600 placeholder-gray-400 focus:outline-none"
        />
        {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>}
      </div>
      <button
        id="login-button"
        onClick={handleSubmit(onSubmit)}
        className="w-full h-[2.2em] rounded-2xl bg-[var(--light-purple)] text-white text-sm hover:bg-[var(--darker-purple)] transition"
      >
        Login
      </button>
    </div>
  )
}

export default Login

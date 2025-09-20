import './Register.css'
import React from 'react'

import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { zodResolver } from '@hookform/resolvers/zod'

import { RegisterSchema, type RegisterType } from '../../../types/validation/register.types'

import { actions as errorActions } from '../../../store/slices/error-slice'

import { registrationCall } from '../../../api/calls/auth.calls'

export const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  })

  const registerMutation = useMutation({
    mutationFn: registrationCall,
    onSuccess: () => {
      navigate('/login')
    },
    onError: (error) => {
      dispatch(errorActions.addError(error.message))
    }
  })

  const onSubmit = (data: RegisterType) => {
    registerMutation.mutate(data)
  }

  return (
    <div>
      <div className="text-xl font-semibold mb-6 text-gray-700">Registration</div>

      <div className="flex flex-col mb-4">
        <label htmlFor="name" className="mb-1 text-sm text-gray-600">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          {...register('name')}
          className="pl-3 pr-3 rounded-2xl bg-gray-200 h-[2.2em] w-full text-sm text-gray-600 placeholder-gray-400 focus:outline-none"
        />
        {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
      </div>

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

      <div className="flex flex-col mb-4">
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

      <div className="flex flex-col mb-6">
        <label htmlFor="password_confirmation" className="mb-1 text-sm text-gray-600">Confirm Password</label>
        <input
          type="password"
          id="password_confirmation"
          placeholder="Confirm your password"
          {...register('password_confirmation')}
          className="pl-3 pr-3 rounded-2xl bg-gray-200 h-[2.2em] w-full text-sm text-gray-600 placeholder-gray-400 focus:outline-none"
        />
        {errors.password_confirmation && (
          <span className="text-red-500 text-sm mt-1">{errors.password_confirmation.message}</span>
        )}
      </div>

      <button
        onClick={handleSubmit(onSubmit)}
        className="w-full h-[2.2em] rounded-2xl bg-[var(--light-purple)] text-white text-sm hover:bg-[var(--darker-purple)] transition"
      >
        Register
      </button>
    </div>
  )
}

export default Register

'use client'
import styles from './login.module.css'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { parseCookies, setCookie } from 'nookies' // Import nookies functions

import type { ChangeEvent } from 'react'

import type { handleSubmitProps } from '@/types/Event'

type LoginProps = { email: string; password: string } | null
type Status = 'submitting' | 'editing'

// Login form component
const LoginForm = () => {
  // const [data, setData] = useState({ email: '', password: '' })
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('editing')
  const router = useRouter()
  const BACK_URL = process.env.BACK_URL
  const [csrfToken, setCsrfToken] = useState('')
  useEffect(() => {
    // Fetch CSRF token from cookies
    const { csrfToken: fetchedCsrfToken } = parseCookies()
    setCsrfToken(fetchedCsrfToken)
    console.log(csrfToken, 'setCsrfToken setCsrfToken')
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('in good')
        console.log(data.token)
        // Store JWT token in local storage
        localStorage.setItem('token', data.token);
        router.push('/')
       // Redirect to dashboard or desired page
      } else {
        console.error('Login failed:', data.message);
        // Handle login failure (show error message, etc.)
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle network or server errors
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setStatus('submitting');
  //   try {
  //     console.log(BACK_URL)
  //     const { token } = parseCookies();
  //     const response = await fetch(`http://localhost:3001/signIn`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'csrf-token': token,
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     console.log(response)
  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error(result.message || 'Login failed');
  //     }
  //     console.log(process.env.NODE_ENV, "dddd")
  //     // Set JWT token received in response to a cookie
  //     setCookie(null, 'token', result.token, {
  //       maxAge: 60 * 60 * 24 * 7, // 1 week expiration
  //       path: '/', // Root path for the cookie
  //       sameSite: 'strict',
  //       secure: process.env.NODE_ENV === 'production', // Set to true in production
  //     });
  //     router.push('/'); // Redirect to homepage on successful login
  //   } catch (error) {
  //     console.error('Error while login:', error);
  //   } finally {
  //     setStatus('editing');
  //   }
  // };

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="relative flex w-full flex-[0_0_auto] shrink flex-col items-center"
      data-testid="form"
    >
      <div className="mb-6 w-full  text-sm">
        <input
          className={styles.input}
          value={formData?.email ?? ''}
          name="email"
          type="email"
          id="email-input"
          placeholder="Email"
          autoFocus={true}
          autoComplete={'email'}
          required
          onChange={handleChange}
          data-testid={'email-input'}
        />
      </div>

      <div className="mb-6 w-full  text-sm">
        <input
          id="password-input"
          name="password"
          type="password"
          placeholder="Password"
          required
          value={formData?.password ?? ''}
          className={styles.input}
          onChange={handleChange}
          data-testid="password-input"
        />
        <span className="flex">
          <Link
            href="#"
            className={styles.link}
            style={{ marginLeft: 'auto', marginTop: '12px' }}
          >
            Forget the Password ?
          </Link>
        </span>
      </div>
      <button
        data-testid="submit-button"
        className={styles.button}
        type="submit"
        name="login"
        disabled={
          status === 'submitting' || formData.email === '' || formData.password === ''
        }
      >
        {status !== 'submitting' ? 'Login' : <Submitting />}
      </button>
    </form>
  )
}

const Submitting = () => {
  return (
    <>
      <svg
        className="-ml-1 mr-3 size-5 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>{' '}
      Processing ...
    </>
  )
}

export default LoginForm

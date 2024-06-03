import LoginForm from './LoginForm'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'

import '@testing-library/jest-dom'

beforeEach(() => {
  // Reset all calls for the mocks
  jest.clearAllMocks()
})

describe('Inputs Fields (Email and Password)', () => {
  test('should be exist and visibile', () => {
    const { getByTestId } = render(<LoginForm />)

    const emailInput = getByTestId('email-input')
    const passwordInput = getByTestId('password-input')

    // Ensure that the inputs and the button are in the Document
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()

    // Ensure that the inputs and the button are visible
    expect(emailInput).toBeVisible()
    expect(passwordInput).toBeVisible()
  })
  test('shoud be with the correct name and type attributes', () => {
    const { getByTestId } = render(<LoginForm />)

    const emailInput = getByTestId('email-input')
    const passwordInput = getByTestId('password-input')

    // Clear inputs fields
    fireEvent.change(emailInput, { target: { value: '' } })
    fireEvent.change(passwordInput, { target: { value: '' } })

    // Ensure the type of the inputs are correct
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(passwordInput).toHaveAttribute('type', 'password')

    // Ensure the name of the inputs are correct
    expect(emailInput).toHaveAttribute('name', 'email')
    expect(passwordInput).toHaveAttribute('name', 'password')
  })

  test('should be required and enabled', () => {
    const { getByTestId } = render(<LoginForm />)

    const emailInput = getByTestId('email-input')
    const passwordInput = getByTestId('password-input')

    // Clear inputs fields
    fireEvent.change(emailInput, { target: { value: '' } })
    fireEvent.change(passwordInput, { target: { value: '' } })

    // Ensure that the inputs are enabled
    expect(emailInput).toBeEnabled()
    expect(passwordInput).toBeEnabled()

    // Ensure that the inputs are required
    expect(emailInput).toBeRequired()
    expect(passwordInput).toBeRequired()
  })
})

describe('Button Login', () => {
  test('should be exist and visible', () => {
    const { getByTestId } = render(<LoginForm />)
    const submitButton = getByTestId('submit-button')

    // Ensure that the button is visible and exist in the document
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toBeVisible()
  })
  test('should be with type sumbit', () => {
    const { getByTestId } = render(<LoginForm />)
    const submitButton = getByTestId('submit-button')

    // Ensure that the button is a submit button
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  test('should be disabled when fields are empty', () => {
    const { getByTestId } = render(<LoginForm />)

    const submitButton = getByTestId('submit-button')
    const passwordInput = getByTestId('password-input')
    const emailInput = getByTestId('email-input')

    // Clear inputs fields
    fireEvent.change(emailInput, { target: { value: '' } })
    fireEvent.change(passwordInput, { target: { value: '' } })

    expect(submitButton).toBeDisabled()
  })

  test('should be enabled when field are filled', () => {
    const { getByTestId } = render(<LoginForm />)

    const submitButton = getByTestId('submit-button')
    const passwordInput = getByTestId('password-input')
    const emailInput = getByTestId('email-input')

    // Clear inputs fields
    fireEvent.change(emailInput, { target: { value: 'mehdi@test.com' } })
    fireEvent.change(passwordInput, {
      target: { value: 'this_is_a_secure_pasword' },
    })

    expect(submitButton).toBeEnabled()
  })
})

describe('Form', () => {
  test('should be with the correct attributes', () => {
    const { getByTestId } = render(<LoginForm />)
    const form = getByTestId('form')

    // Ensure that inputs value aren't visible in the url
    expect(form).toHaveAttribute('method', 'post')
  })
})

describe('Login Events', () => {
  test('should be logged in with success and redirect to wizard page', async () => {
    const router = useRouter()

    // Mock the fetch function
    global.fetch = jest.fn(() => Promise.resolve({ ok: true })) as jest.Mock

    // Render the login form and simulate successful login
    render(<LoginForm />)

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginButton = screen.getByText('Login')

    // insert data to the form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })

    // Click Login button
    fireEvent.click(loginButton)

    // Ensure that the user will be redirect to the homepage
    await waitFor(() => {
      expect(router.push).toHaveBeenCalled()
    })
  })

  test("shouldn't be logged in", async () => {
    const router = useRouter()

    // Mock the fetch function
    const originalFetch = global.fetch
    const mockFetch = jest.fn(() => Promise.resolve({ ok: false })) as jest.Mock
    global.fetch = mockFetch

    // render the component
    const { getByPlaceholderText, getByText } = render(<LoginForm />)

    // get HTMLElement for the form inputs
    const emailInput = getByPlaceholderText('Email')
    const passwordInput = getByPlaceholderText('Password')
    const loginButton = getByText('Login')

    // Insert data to the input
    fireEvent.change(emailInput, {
      target: { value: 'invalid@example.com' },
    })
    fireEvent.change(passwordInput, {
      target: { value: 'invalidPassword' },
    })

    // Click login button
    fireEvent.click(loginButton)

    await waitFor(() => {
      // expect(consoleErrorSpy).toHaveBeenCalled()
      expect(router.push).not.toHaveBeenCalled()
    })

    global.fetch = originalFetch
  })
})

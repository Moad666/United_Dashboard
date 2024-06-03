export class AuthError extends Error {
  type: string
  constructor(type: string) {
    super(type)
    this.type = type
  }
}

const NextAuth = () => ({
  auth: jest.fn(),
  handlers: {
    GET: jest.fn(),
    POST: jest.fn(),
  },
})

export default NextAuth

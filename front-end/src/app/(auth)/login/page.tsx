import LoginForm from './LoginForm/LoginForm'

import GoogleSigninButton from '@/app/(auth)/login/ProvidersButtons/GoogleSigninButton'

const page = () => {
  return (
      <div>
        <LoginForm />
        <div className="flex w-full flex-col justify-center gap-4">
          <div className="mt-4 flex flex-row items-center">
            <hr className="w-full" />
            <span className="mx-4 text-gray-500">Or</span>
            <hr className="w-full" />
          </div>
          <GoogleSigninButton />
        </div>
      </div>
  )
}

export default page

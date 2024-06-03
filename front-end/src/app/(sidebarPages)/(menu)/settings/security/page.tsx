'use client'
import { Card, CardSection } from '../Card'
import FormHeader from '../FormHeader'

import { LabeledInput } from '@/components/Form/inputs/LabeledInput'
import { useState } from 'react'
import Swal from 'sweetalert2'

function page() {
  // Reset Password
  const handleChangePassword = async () => {
    const { value: formValues, dismiss: dismissReason } = await Swal.fire({
      title: 'Change Password',
      html:
        '<input id="old-password" class="swal2-input" type="password" placeholder="Old Password" autocomplete="off">' +
        '<input id="new-password" class="swal2-input" type="password" placeholder="New Password" autocomplete="off">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Change Password',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const oldPasswordInput = document.getElementById(
          'old-password'
        ) as HTMLInputElement
        const newPasswordInput = document.getElementById(
          'new-password'
        ) as HTMLInputElement
        const oldPassword = oldPasswordInput.value
        const newPassword = newPasswordInput.value
        try {
          const response = await fetch('http://localhost:3001/resetPassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldPassword, newPassword }),
          })
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`)
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })

    // Show success or error message based on API response
    if (formValues) {
      if (!formValues.error) {
        Swal.fire({
          title: 'Password Changed',
          text: 'Your password has been successfully changed.',
          icon: 'success',
        })
      } else {
        Swal.fire({
          title: 'Error',
          text: formValues.error,
          icon: 'error',
        })
      }
    }
  }

  // Verify account
  const [isVerified, setIsVerified] = useState(false)

  // Function to handle button click
  const handleButtonClick = () => {
    setIsVerified(!isVerified); 

    Swal.fire({
      icon: 'success',
      title: 'Verified',
      text: `Your account is now Verified`,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  };

  return (
    <>
      <div className="flex flex-row items-center border-b px-8 pb-6">
        <FormHeader
          description="Update your photo & personal details here..."
          title="Security & Privacy"
        />
      </div>
      <div className="flex flex-row gap-4 px-8">
        <div className="grow">
          <div className="flex max-w-[600px] flex-col gap-8 ">
            <Card title="Account Details">
              <CardSection
                title="Verify Email Address"
                description="Verify Your email address to confirm the credentials"
              >
                <button
                  onClick={handleButtonClick}
                  className={`inline-flex w-[132px] justify-center rounded-md ${
                    isVerified ? 'bg-green-500' : 'bg-red-500'
                  } px-3 py-2 text-xs font-semibold text-white`}
                >
                  {isVerified ? 'Verified' : 'Unverified'}
                </button>

              </CardSection>
              <CardSection
                title="Update Password"
                description="Change your password to update & protect your Account"
              >
                <button
                  onClick={handleChangePassword}
                  className="inline-flex w-[132px] justify-center rounded-md border bg-white px-2.5 py-2 text-xs font-semibold text-black"
                >
                  Change Password
                </button>
              </CardSection>
            </Card>
            <Card title="Recovery Settings">
              <div>
                <CardSection
                  title="Recovery Email Address"
                  description="Setup Recovery Email to Secure your Account"
                >
                  <button className="inline-flex w-full  justify-center rounded-md bg-black px-3 py-2 text-xs font-semibold text-white">
                    Save
                  </button>
                </CardSection>
                <div className="pt-3">
                  <LabeledInput
                    label="Another Email Address"
                    id="email-recovery-input"
                    name="email"
                    placeholder="Enter the email here..."
                    value="data"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="w-72"></div>
      </div>
    </>
  )
}

export default page

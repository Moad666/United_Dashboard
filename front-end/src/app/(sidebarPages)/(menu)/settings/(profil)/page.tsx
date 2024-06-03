'use client'
import { useState } from 'react'
import { ImageProfileForm } from './components/ImageProfileForm'
import { ProfileForm } from './components/ProfileForm'


import FormHeader from '../FormHeader'

function page() {
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSave = async (userData) => {
    try {
      const response = await fetch(`/update/${userData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setSaveStatus('success');
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setSaveStatus('error');
    }
  };
  
  return (
    <>
      <div className="flex flex-row items-center border-b px-8 pb-6">
        <FormHeader
          description="Update your photo & personal details here..."
          title="Profile"
        />
      </div>
      <div className="flex flex-row gap-4 px-8">
        <div className="grow">
          <div className="max-w-[600px]">
            <ProfileForm/>
          </div>
        </div>
        <div className="w-80">
          <ImageProfileForm />
        </div>
      </div>
    </>
  )
}

export default page

'use client'
import { LabeledInput } from '@/components/Form/inputs/LabeledInput'
import TextareaInput from '@/components/Form/inputs/TextareaInput'
import { useState } from 'react'


export function ProfileForm({onSave}) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [job, setJob] = useState('');
  const [address, setAddress] = useState('');
  return (
    <div className="grid grid-cols-1 gap-6 rounded-lg border bg-white p-4 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <LabeledInput
          label="Full Name"
          id="full-name-input"
          name="Full Name"
          placeholder="Enter your name here"
          value={fullName}
          onInputChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div className="sm:col-span-3">
        <LabeledInput
          label="Phone"
          id="phone-input"
          name="Phone"
          placeholder="Enter phone here"
          required
          value={phone}
          onInputChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="col-span-full">
        <LabeledInput
          label="Job"
          id="job-input"
          name="Job"
          placeholder="Enter your job here"
          value={job}
          onInputChange={(e) => setJob(e.target.value)}
        />
      </div>
      <div className="col-span-full">
        <TextareaInput
          onChangeInput={null}
          label="Address"
          id="address-input"
          name="address"
          placeholder="Enter your address here"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
    </div>
  )
}

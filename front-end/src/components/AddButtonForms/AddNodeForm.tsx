import { Section } from '@/components/Form/Section'
import { LabeledInput } from '@/components/Form/inputs/LabeledInput'
import UrlInput from '@/components/Form/inputs/URLInput'
import Modal from '@/components/Modal/Modal'

import { useState } from 'react'

import type { UrlInputProps } from '@/components/Form/inputs/URLInput'
import type { NodeProps } from '@/types/external/Node'
import type { EnviromentEnum } from '@/types/external/QueueManager'
import type { FormEventHandler } from 'react'

const urlItems: Array<UrlInputProps> = [
  {
    title: 'WebUI',
    id: 'web-ui-input',
    name: 'WebUI',
  },
]

export default function AddApplicationForm() {
  const [data, setData] = useState<NodeProps>({
    Environment: null,
    'ACE Version': null,
    Name: null,
    Port: null,
    'Upgraded Date': null,
    'IS Name(s)': null,
    WebUi: null,
  })

  const handleOptionChange: (value: EnviromentEnum) => void = (value) => {
    setData((prev) => ({
      ...prev,
      Environment: value,
    }))
  }

  const handleDataChange = (
    key: keyof NodeProps | string,
    value: string | number | Array<object>
  ) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      // validationSchema.parse(data)

      console.log('Form Submitted')

      //  Send request to save the applicaition
      const response = await fetch('/api/nodes', {
        method: 'POST',
        body: JSON.stringify(data),
      })

      // ? if request failed :
      if (!response.ok) {
        console.log("the Applciation doesn't success")
      }

      // ? if request successed :
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal method="POST" onSubmit={handleSubmit} title="Add Node">
      <div className="space-y-12 ">
        <Section
          title="Node Information"
          description="Add information about the Node"
        >
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <LabeledInput
                label="Node Name"
                id="name-input"
                name="Node Name"
                placeholder="Enter the node name here"
                onInputChange={(e) => handleDataChange('Name', e.target.value)}
                value={data.Name}
                required
              />
            </div>
            <div className="sm:col-span-3">
              <LabeledInput
                label="Application Name"
                id="application-name-input"
                name="Application Name"
                placeholder="Enter Application Name here"
                onInputChange={(e) =>
                  handleDataChange('Application Name', e.target.value)
                }
                value={data['Application Name']}
              />
            </div>
          </div>
          <div className="col-span-full">
            {urlItems.map((url) => {
              return (
                <UrlInput
                  key={url.title}
                  {...url}
                  onUrlChange={(e) =>
                    handleDataChange(url.name, {
                      ...data[url.name],
                      url: e.currentTarget.value,
                    })
                  }
                  onTextChange={(e) =>
                    handleDataChange(url.name, {
                      ...data[url.name],
                      alt: e.currentTarget.value,
                    })
                  }
                />
              )
            })}
          </div>
        </Section>
      </div>
    </Modal>
  )
}

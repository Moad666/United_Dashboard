import TierlevelDatalist from '@/components/Form/DataList/TierlevelDatalist'
import { Label } from '@/components/Form/Label'
import { Section } from '@/components/Form/Section'
import { LabeledToogle } from '@/components/Form/Toogle/LabeledToogle'
import { LabeledInput } from '@/components/Form/inputs/LabeledInput'
import TextareaInput from '@/components/Form/inputs/TextareaInput'
import UrlInput from '@/components/Form/inputs/URLInput'
import Modal from '@/components/Modal/Modal'
import TagInput from '@/components/TagInput/TagInput'

import { useState } from 'react'

import type { UrlInputProps } from '@/components/Form/inputs/URLInput'
import type {
  AppProps,
  BooleanEnum,
  TierLevelEnum,
} from '@/types/external/Application'
import type { FormEventHandler } from 'react'

import type { ExtractKeysOfType } from '@/types/ExtractKeys'

type ToogleProps = {
  id: string
  name: ExtractKeysOfType<AppProps, BooleanEnum>
  label: string
  description: string
}

const toogleItems: Array<ToogleProps> = [
  {
    id: '1',
    name: 'PII Data',
    label: 'PII Data',
    description: 'Does the application use PII data?',
  },
  {
    id: '2',
    name: 'PCI',
    label: 'PCI Data',
    description: 'Does the application use PCI data?',
  },
  {
    id: '3',
    name: 'EQA Test Cases',
    label: 'EQA Test Data',
    description:
      'Does this application require international EQA test cases to be run?',
  },
]

const urlItems: Array<UrlInputProps> = [
  {
    title: 'Architecture Diagram',
    id: 'architecture-diagram-input',
    name: 'architectureDiagram',
  },
  {
    title: 'Technical Document',
    id: 'technical-document-input',
    name: 'tehchnicalDocument',
  },
  {
    title: 'Crosswalk/ Data Mapping',
    id: 'crosswalk-input',
    name: 'crosswalk',
  },
  {
    title: 'Code Reviewer',
    id: 'code-reviewer-input',
    name: 'codeReviewer',
  },
  {
    title: 'Schemas',
    id: 'schemas-input',
    name: 'schemas',
  },
  {
    title: 'Link to API',
    id: 'link-to-api-input',
    name: 'linkApi',
  },
]

export default function AddApplicationForm() {
  const [data, setData] = useState<AppProps>({
    'App Ref': null,
    'Application Name': null,
    SME: [],
    'Tier Level': '4 - Not Critical',
    'App Key': null,
    'PII Data': 'FALSE',
    PCI: 'FALSE',
    'EQA Test Cases': 'FALSE',
  })

  const handleOptionChange: (value: TierLevelEnum) => void = (value) => {
    setData((prev) => ({
      ...prev,
      'Tier Level': value,
    }))
  }

  const handleDataChange = (
    key: keyof AppProps | string,
    value: string | BooleanEnum | number | Array<object>
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
      const response = await fetch('/api/apps', {
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
    <Modal method="POST" onSubmit={handleSubmit} title="Add Application">
      <div className="space-y-12 ">
        <Section
          title="Application Information"
          description="Use a permanent address where you can receive mail."
        >
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <LabeledInput
                label="App Key"
                id="app-key-input"
                name="App Key"
                placeholder="Enter App Key here"
                onInputChange={(e) =>
                  handleDataChange('App Key', e.target.value)
                }
                value={data['App Key']}
                required
              />
            </div>
            <div className="sm:col-span-3">
              <Label title={'Tier Level'} required>
                <TierlevelDatalist
                  selected={data['Tier Level']}
                  handleOptionChange={handleOptionChange}
                />
              </Label>
            </div>
            <div className="col-span-full">
              <Label title={'SME'} description="Subject Matter Expert" required>
                <TagInput
                  tags={data.SME}
                  onSelect={(users) => handleDataChange('SME', users)}
                />
              </Label>
            </div>
            <div className="col-span-full">
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

            <div className="col-span-full">
              <TextareaInput
                label="Notes"
                name="Notes"
                rows={4}
                onChangeInput={(e) => handleDataChange('Notes', e.target.value)}
                value={data.Notes}
              />
            </div>
            <div className="sm:col-span-3">
              <LabeledInput
                label="Who Are My Dependencies?"
                id="who-are-my-dependencies-input"
                name="Who Are My Dependencies?"
                placeholder="NONE"
                onInputChange={(e) =>
                  handleDataChange('Who are my dependencies?', e.target.value)
                }
                value={data['Who are my dependencies?']}
              />
            </div>
            <div className="sm:col-span-3">
              <LabeledInput
                label="Who Call Me?"
                id="who-calls-me-input"
                name="Who Calls Me?"
                placeholder="NONE"
                onInputChange={(e) =>
                  handleDataChange('Who Calls Me?', e.target.value)
                }
                value={data['Who Calls Me?']}
              />
            </div>
          </div>
        </Section>
        <Section
          title="Data Handling and Testing Preferences"
          description={
            'Specify the data handling and testing preferences for your application. '
          }
        >
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {toogleItems.map((toogle) => {
              const name = toogle.name
              const isOn = data[name] === 'TRUE'
              return (
                <div key={toogle.id} className=" col-span-full">
                  <LabeledToogle
                    {...toogle}
                    isOn={isOn}
                    onChange={(e) =>
                      handleDataChange(name, isOn ? 'FALSE' : 'TRUE')
                    }
                  />
                </div>
              )
            })}
          </div>
        </Section>
        <Section
          title={'Links'}
          description={
            'Provide essential links and references for your application.'
          }
        >
          <div className="mt-10 space-y-10">
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

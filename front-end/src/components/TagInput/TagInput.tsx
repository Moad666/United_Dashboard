'use client'

import { getAvatarImage } from './utils/image'

import { Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import type { SuggestionProps, TagInputProps, TagProps, User } from '.'
import type {
  ChangeEvent,
  FocusEventHandler,
  KeyboardEvent,
  MouseEventHandler,
} from 'react'

const Tag = ({ tags: user, onRemove }: TagProps) => (
  <div className="flex items-center rounded-full border bg-gray-50 px-2 py-1 text-black">
    <Image
      width={20}
      height={20}
      src={user.avatar || getAvatarImage(user.name)}
      alt={user.name}
      className="mr-2 size-5 rounded-full"
    />
    <div>
      <div className="text-xs font-medium">{user.name}</div>
    </div>
    <button
      type="button"
      className="ml-2 font-bold text-white focus:outline-0 focus:ring-0"
      onClick={onRemove}
    >
      <XMarkIcon className="size-5 text-gray-500" />
    </button>
  </div>
)

const Suggestion = ({ user, onClick }: SuggestionProps) => (
  <li
    className="flex cursor-pointer items-center rounded p-2 hover:bg-gray-100"
    onClick={onClick}
  >
    <Image
      width={36}
      height={36}
      src={user.avatar || getAvatarImage(user.name)}
      alt={user.name}
      className="mr-2 size-9 rounded-full"
    />
    <div>
      <div className="font-semibold">{user.name}</div>
      <div className="text-xs text-gray-500">{user.email}</div>
    </div>
  </li>
)

const TagInput = ({ placeholder, tags, onSelect: setTags }: TagInputProps) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null) // Ref for the input element
  const [suggestions, setSuggestions] = useState<User[]>([])

  useEffect(() => {
    const getSMEs = async () => {
      const response = await fetch('/api/smes/all', { method: 'GET' })
      const users = await response.json()
      setSuggestions(users)
    }

    getSMEs()
  }, [])

  // ******************  input handlers   ***************************** \\
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    setShowSuggestions(true)
  }

  // ******************  Dropdown handlers   ***************************** \\
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault()
      addUser(inputValue.trim())
      setInputValue('')
      setShowSuggestions(false)
    }
  }

  // ******************  input container handlers   ***************************** \\
  const handleFocus: FocusEventHandler<HTMLDivElement> = () => {
    setShowSuggestions(true)
    if (inputRef.current) {
      inputRef.current.focus() // Focus on the input element
    }
  }
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    setShowSuggestions(true)
    if (inputRef.current) {
      inputRef.current.focus() // Focus on the input element
    }
  }

  const handleBlur: FocusEventHandler<HTMLDivElement> = () => {
    setShowSuggestions(false)
  }

  // ******************  users manipulation handlers   ***************************** \\

  const addUser = (query: string) => {
    const user = suggestions.find(
      (u) =>
        u.name.toLowerCase() === query.toLowerCase() ||
        u.email.toLowerCase() === query.toLowerCase()
    )

    if (user && !tags.some((tag) => tag.id === user.id)) {
      setTags([...tags, user])
    }
  }

  const handleRemoveUser = (userId: number) => {
    setTags(tags.filter((user) => user.id !== userId))
  }

  const handleSuggestionClick = (user: User) => {
    addUser(user.name)
    setInputValue('')
    setShowSuggestions(false)
  }

  const filteredSuggestions = suggestions.filter(
    (user) =>
      !tags.some((tag) => tag.id === user.id) &&
      (user.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.email.toLowerCase().includes(inputValue.toLowerCase()))
  )

  return (
    <div className="relative sm:text-sm sm:leading-6">
      <div
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="flex w-full flex-wrap items-center gap-2 rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500"
      >
        {tags?.map((user) => (
          <Tag
            key={user.id}
            tags={user}
            onRemove={() => handleRemoveUser(user.id)}
          />
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="h-8 grow border-none bg-inherit p-0 placeholder:text-gray-400 focus:border-0 focus:outline-none focus:ring-0 focus:ring-inset sm:text-sm sm:leading-6"
          placeholder={placeholder ?? 'Type Here...'}
        />
      </div>
      <Transition
        show={showSuggestions}
        enter="transition-opacity ease-in duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded border border-gray-300 bg-white shadow">
          <ul className="list-none p-2">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((user) => (
                <Suggestion
                  key={user.id}
                  user={user}
                  onClick={() => handleSuggestionClick(user)}
                />
              ))
            ) : (
              <li className="flex cursor-pointer items-center rounded p-1 ">
                Nothing Found
              </li>
            )}
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default TagInput

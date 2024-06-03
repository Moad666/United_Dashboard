export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

export interface SuggestionProps {
  user: User
  onClick: () => void
}

export interface TagProps {
  tags: User
  onRemove: () => void
}

export interface TagInputProps {
  placeholder?: string
  tags: User[]
  onSelect: (users: object[]) => void
}

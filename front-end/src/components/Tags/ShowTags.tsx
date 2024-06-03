import Tag from './Tag'

import type { MouseEventHandler } from 'react'

export function ShowTags({
  tags,
  onClick = null,
}: {
  tags: Array<string>
  onClick?: MouseEventHandler<HTMLDivElement>
}) {
  return (
    <>
      {tags.map((tech) => (
        <Tag value={tech} key={tech} showAppWithTech={onClick} />
      ))}
    </>
  )
}

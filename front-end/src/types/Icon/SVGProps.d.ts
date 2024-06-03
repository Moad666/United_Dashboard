import type React from 'react'
import type { SVGProps } from 'react'

/**
 * Define a type alias `SVGElementProps` for `SVGProps<SVGSVGElement>`.
 */
type SVGElementProps = SVGProps<SVGSVGElement>

/**
 * Define a custom type for Heroicons icons in React.
 *
 */
export type HeroiconType = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string
    titleId?: string
  } & React.RefAttributes<SVGSVGElement>
>

export default SVGElementProps

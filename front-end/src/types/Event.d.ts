import type { FormEvent } from 'react'

/**
 *   Define a type for the event object associated with form submissions.
 * `handleSubmitProps` represents the type for the `FormEvent` specific to HTML form elements.
 *  This type can be used to annotate or enforce the correct event object structure
 *  when handling form submission events in TypeScript.
 */
export type handleSubmitProps = FormEvent<HTMLFormElement>

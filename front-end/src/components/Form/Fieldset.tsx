// Reusable fieldset component
export const Fieldset = ({ legend, children }) => {
  return (
    <fieldset>
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        {legend}
      </legend>
      <div className="mt-6 space-y-6">{children}</div>
    </fieldset>
  )
}

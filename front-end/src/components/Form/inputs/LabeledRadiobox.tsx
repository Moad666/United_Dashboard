// Reusable radio button option component
export const RadioButtonOption = ({ id, name, label, description }) => {
  return (
    <div className="flex items-center gap-x-3">
      <input
        id={id}
        name={name}
        type="radio"
        className="size-4 border-gray-300 text-blue-600 focus:ring-blue-600"
      />
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      {description && (
        <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
      )}
    </div>
  )
}

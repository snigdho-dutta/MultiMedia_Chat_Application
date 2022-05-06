import React, { ClassAttributes } from 'react'

const Icon: React.FC<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element
  text?: string
  className?: string
  containerclassName?: string
  onClick?: () => {} | void
}> = ({ icon, text, className, containerclassName, onClick }) => {
  return (
    <span
      className={`flex-col-center group relative ${containerclassName}`}
      onClick={onClick}
    >
      {React.createElement(icon, {
        className: `w-10 h-10 group-hover:box-shadow h-10 w-10 rounded-full bg-red-500 bg-opacity-50 group-hover:bg-opacity-100 transition-all group-hover:scale-105 p-2 {bg} ${className}`,
      })}
      {text && (
        <p
          className={`group-hover:box-shadow absolute top-[110%] hidden whitespace-nowrap rounded p-1 text-sm font-semibold transition group-hover:block group-hover:bg-emerald-500 group-hover:text-white `}
        >
          {text}
        </p>
      )}
    </span>
  )
}

export default Icon

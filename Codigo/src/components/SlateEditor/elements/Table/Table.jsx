import React from 'react'

export default function Table({ attributes, children, element }) {
  return (
    <table className='border-collapse border border-slate-500 w-[100%]'>
        <tbody {...attributes}>
            {children}
        </tbody>
  </table>
  )
}

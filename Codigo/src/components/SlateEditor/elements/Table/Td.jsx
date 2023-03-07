import React from 'react'

export default function Td({ attributes, children, element }) {
  return (
    <td {...attributes} className='border border-slate-700 '>
        {children}
    </td>
  )
}

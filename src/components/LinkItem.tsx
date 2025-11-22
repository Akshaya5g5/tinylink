// 'use client'

// import { useState } from 'react'

// // Define the same local Link type for consistency
// type Link = {
//   id: string
//   code: string
//   originalUrl: string
//   clicks: number
//   lastClicked?: string | null
//   createdAt?: string
//   updatedAt?: string
// }

// interface LinkItemProps {
//   link: Link
//   onDelete: (code: string) => void
// }

// export default function LinkItem({ link, onDelete }: LinkItemProps) {
//   const [copied, setCopied] = useState(false)

//   // Defensive check: If link is invalid, render nothing to prevent crashes.
//   if (!link || !link.id || !link.code) {
//     return null;
//   }
  
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
//   const shortUrl = `${baseUrl}/${link.code}`
  
//   const handleCopy = () => {
//     navigator.clipboard.writeText(shortUrl)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }
  
//   const formatDate = (date: string | null | undefined) => {
//     if (!date) return 'Never'
//     return new Date(date).toLocaleString()
//   }
  
//   const truncateUrl = (url: string, maxLength = 50) => {
//     if (url.length <= maxLength) return url
//     return url.substring(0, maxLength) + '...'
//   }
  
//   return (
//     <tr>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="text-sm font-medium text-gray-900">{link.code}</div>
//         <div className="text-sm text-gray-500">
//           <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 truncate block max-w-xs" title={shortUrl}>
//             {shortUrl}
//           </a>
//         </div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="text-sm text-gray-900" title={link.originalUrl}>
//           {truncateUrl(link.originalUrl)}
//         </div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="text-sm text-gray-900">{link.clicks}</div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <div className="text-sm text-gray-900">{formatDate(link.lastClicked)}</div>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//         <a href={`/code/${link.code}`} className="text-blue-600 hover:text-blue-900 mr-4">Stats</a>
//         <button onClick={handleCopy} className="text-green-600 hover:text-green-900 mr-4">
//           {copied ? 'Copied!' : 'Copy'}
//         </button>
//         <button onClick={() => onDelete(link.code)} className="text-red-600 hover:text-red-900">
//           Delete
//         </button>
//       </td>
//     </tr>
//   )
// }

'use client'

import { useState } from 'react'

// Define the same local Link type for consistency
type Link = {
  id: string
  code: string
  originalUrl: string
  clicks: number
  lastClicked?: string | null
  createdAt?: string
  updatedAt?: string
}

interface LinkItemProps {
  link: Link
  onDelete: (code: string) => void
}

export default function LinkItem({ link, onDelete }: LinkItemProps) {
  const [copied, setCopied] = useState(false)

  // Defensive check: If link is invalid, render nothing to prevent crashes.
  if (!link || !link.id || !link.code) {
    return null;
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
  const shortUrl = `${baseUrl}/${link.code}`
  
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const formatDate = (date: string | null | undefined) => {
    if (!date) return 'Never'
    return new Date(date).toLocaleString()
  }
  
  const truncateUrl = (url: string, maxLength = 50) => {
    if (url.length <= maxLength) return url
    return url.substring(0, maxLength) + '...'
  }
  
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100">
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-indigo-100 rounded-lg">
            <span className="text-indigo-600 font-bold text-sm">{link.code.substring(0, 2).toUpperCase()}</span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{link.code}</div>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 text-xs flex items-center mt-1" title={shortUrl}>
              {shortUrl}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900" title={link.originalUrl}>
          {truncateUrl(link.originalUrl)}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-blue-100 rounded-full p-1 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900">{link.clicks}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-gray-100 rounded-full p-1 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-sm text-gray-900">{formatDate(link.lastClicked)}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end space-x-2">
          <a 
            href={`/code/${link.code}`} 
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Stats
          </a>
          <button 
            onClick={handleCopy} 
            className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md transition-all duration-150 ${
              copied 
                ? 'text-green-700 bg-green-100' 
                : 'text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button 
            onClick={() => onDelete(link.code)} 
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}
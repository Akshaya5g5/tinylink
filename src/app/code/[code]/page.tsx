// 'use client'

// import { useState, useEffect, useCallback } from 'react'
// import { useParams } from 'next/navigation'
// import NextLink from 'next/link'

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

// export default function StatsPage() {
//   const params = useParams()
//   const code = params.code as string
  
//   const [link, setLink] = useState<Link | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
  
//   // Wrap fetchLink in useCallback to fix the dependency warning
//   const fetchLink = useCallback(async () => {
//     try {
//       setLoading(true)
//       const response = await fetch(`/api/links/${code}`)
//       const data = await response.json()
      
//       if (response.ok) {
//         setLink(data)
//       } else {
//         setError(data.error || 'Link not found')
//       }
//     } catch  {
//       setError('Failed to fetch link details')
//     } finally {
//       setLoading(false)
//     }
//   }, [code])

//   useEffect(() => {
//     fetchLink()
//   }, [fetchLink])
  
//   const formatDate = (date: string | null | undefined) => {
//     if (!date) return 'Never'
//     return new Date(date).toLocaleString()
//   }
  
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
//   const shortUrl = `${baseUrl}/${code}`
  
//   if (loading) {
//     return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p>Loading...</p></div>
//   }
  
//   if (error || !link) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-900">404</h1>
//           <p className="mt-2 text-xl text-gray-600">{error || 'Link Not Found'}</p>
//           <NextLink href="/" className="mt-4 inline-block text-blue-600 hover:text-blue-800">← Back to Dashboard</NextLink>
//         </div>
//       </div>
//     )
//   }
  
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-6">
//          <NextLink href="/" className="text-blue-600 hover:text-blue-800">← Back to Dashboard</NextLink>
//         </div>
        
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Link Statistics</h1>
        
//         <div className="bg-white shadow rounded-lg p-6 mb-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Link Details</h2>
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">Short Code</h3>
//               <p className="mt-1 text-lg text-gray-900">{link.code}</p>
//               <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600">{shortUrl}</a>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">Original URL</h3>
//               <p className="mt-1 text-lg text-gray-900 break-all">{link.originalUrl}</p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Total Clicks</h3>
//                 <p className="mt-1 text-2xl font-bold text-blue-600">{link.clicks}</p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Last Clicked</h3>
//                 <p className="mt-1 text-lg text-gray-900">{formatDate(link.lastClicked)}</p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-white shadow rounded-lg p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">QR Code</h2>
//           <div className="flex justify-center">
//             <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shortUrl)}`} alt="QR Code" className="h-48 w-48 border border-gray-200" />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



// 'use client'

// import { useState, useEffect, useCallback } from 'react'
// import { useParams } from 'next/navigation'
// import NextLink from 'next/link'

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

// export default function StatsPage() {
//   const params = useParams()
//   const code = params.code as string
  
//   const [link, setLink] = useState<Link | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
  
//   // Wrap fetchLink in useCallback to fix the dependency warning
//   const fetchLink = useCallback(async () => {
//     try {
//       setLoading(true)
//       const response = await fetch(`/api/links/${code}`)
//       const data = await response.json()
      
//       if (response.ok) {
//         setLink(data)
//       } else {
//         setError(data.error || 'Link not found')
//       }
//     } catch  {
//       setError('Failed to fetch link details')
//     } finally {
//       setLoading(false)
//     }
//   }, [code])

//   useEffect(() => {
//     fetchLink()
//   }, [fetchLink])
  
//   const formatDate = (date: string | null | undefined) => {
//     if (!date) return 'Never'
//     return new Date(date).toLocaleString()
//   }
  
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
//   const shortUrl = `${baseUrl}/${code}`
  
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-indigo-100 rounded-full">
//             <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//           </div>
//           <p className="text-lg font-medium text-gray-900">Loading link statistics...</p>
//         </div>
//       </div>
//     )
//   }
  
//   if (error || !link) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
//           <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-red-100 rounded-full">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">404</h1>
//           <p className="text-xl text-gray-600 mb-6">{error || 'Link Not Found'}</p>
//           <NextLink href="/" className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//             </svg>
//             Back to Dashboard
//           </NextLink>
//         </div>
//       </div>
//     )
//   }
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {/* Header */}
//         <div className="mb-6">
//           <NextLink href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//             </svg>
//             Back to Dashboard
//           </NextLink>
//         </div>
        
//         <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8">Link Statistics</h1>
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Link Details Card */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//               <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
//                 <h2 className="text-xl font-semibold text-white flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
//                   </svg>
//                   Link Details
//                 </h2>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500 mb-2">Short Code</h3>
//                     <div className="flex items-center">
//                       <p className="text-lg text-gray-900 font-medium">{link.code}</p>
//                       <button
//                         onClick={() => navigator.clipboard.writeText(shortUrl)}
//                         className="ml-2 p-1 text-gray-400 hover:text-indigo-600 transition-colors duration-200"
//                         title="Copy to clipboard"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                         </svg>
//                       </button>
//                     </div>
//                     <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200">{shortUrl}</a>
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-500 mb-2">Original URL</h3>
//                     <div className="flex items-start">
//                       <p className="text-lg text-gray-900 break-all flex-1">{link.originalUrl}</p>
//                       <button
//                         onClick={() => navigator.clipboard.writeText(link.originalUrl)}
//                         className="ml-2 p-1 text-gray-400 hover:text-indigo-600 transition-colors duration-200"
//                         title="Copy to clipboard"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="bg-indigo-50 rounded-xl p-4">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                           </svg>
//                         </div>
//                         <div className="ml-4">
//                           <h3 className="text-sm font-medium text-gray-500">Total Clicks</h3>
//                           <p className="text-2xl font-bold text-indigo-600">{link.clicks}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="bg-purple-50 rounded-xl p-4">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                         </div>
//                         <div className="ml-4">
//                           <h3 className="text-sm font-medium text-gray-500">Last Clicked</h3>
//                           <p className="text-lg font-bold text-purple-600">{formatDate(link.lastClicked)}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* QR Code Card */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//               <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
//                 <h2 className="text-xl font-semibold text-white flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
//                   </svg>
//                   QR Code
//                 </h2>
//               </div>
//               <div className="p-6">
//                 <div className="flex flex-col items-center">
//                   <div className="bg-white p-4 rounded-lg shadow-md mb-4">
//                     <img 
//                       src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shortUrl)}`} 
//                       alt="QR Code" 
//                       className="h-48 w-48" 
//                     />
//                   </div>
//                   <button
//                     onClick={() => {
//                       const link = document.createElement('a');
//                       link.href = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shortUrl)}`;
//                       link.download = `${code}-qrcode.png`;
//                       document.body.appendChild(link);
//                       link.click();
//                       document.body.removeChild(link);
//                     }}
//                     className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 font-medium flex items-center justify-center"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                     </svg>
//                     Download QR Code
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import NextLink from 'next/link'

type Link = {
  id: string
  code: string
  originalUrl: string
  clicks: number
  lastClicked?: string | null
  createdAt?: string
  updatedAt?: string
}

export default function StatsPage() {
  const params = useParams()
  const code = params.code as string
  
  const [link, setLink] = useState<Link | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const fetchLink = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/links/${code}`)
      const data = await response.json()
      
      if (response.ok) {
        setLink(data)
      } else {
        setError(data.error || 'Link not found')
      }
    } catch {
      setError('Failed to fetch link details')
    } finally {
      setLoading(false)
    }
  }, [code])

  useEffect(() => {
    fetchLink()
  }, [fetchLink])
  
  const formatDate = (date: string | null | undefined) => {
    if (!date) return 'Never'
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
  const shortUrl = `${baseUrl}/${code}`
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-indigo-100 rounded-full">
            <svg className="animate-spin h-7 w-7 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-800">Loading statistics...</p>
          <p className="text-gray-500 mt-1">Fetching data for <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">{code}</span></p>
        </div>
      </div>
    )
  }
  
  if (error || !link) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md w-full border border-gray-200">
          <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-red-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Link Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested short link does not exist.'}</p>
          <NextLink 
            href="/" 
            className="inline-flex items-center px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </NextLink>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button */}
        <div className="mb-8">
          <NextLink 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-indigo-700 font-medium text-sm transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </NextLink>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Link Analytics</h1>
        <p className="text-gray-500 mb-8">Detailed stats for your short link</p>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Link Details
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {/* Short Code */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Short Code</h3>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <span className="font-mono text-gray-900 font-medium">{link.code}</span>
                <div className="flex items-center gap-2">
                  <a 
                    href={shortUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Visit
                  </a>
                  <button
                    onClick={() => navigator.clipboard.writeText(shortUrl)}
                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                    title="Copy short URL"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1 truncate">{shortUrl}</p>
            </div>

            {/* Original URL */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Original URL</h3>
              <div className="flex items-start justify-between bg-gray-50 rounded-lg p-3">
                <span className="font-mono text-sm text-gray-900 break-all flex-1">{link.originalUrl}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(link.originalUrl)}
                  className="ml-2 text-gray-400 hover:text-indigo-600 flex-shrink-0"
                  title="Copy original URL"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-indigo-700 font-medium uppercase tracking-wider">Total Clicks</p>
                    <p className="text-xl font-bold text-indigo-800">{link.clicks}</p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-purple-700 font-medium uppercase tracking-wider">Last Clicked</p>
                    <p className="text-sm font-semibold text-purple-800">{formatDate(link.lastClicked)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
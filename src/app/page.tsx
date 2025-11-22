// 'use client'

// import { useState, useEffect } from 'react'
// import LinkItem from '@/components/LinkItem'

// // Local type definition to ensure consistency across components
// type Link = {
//   id: string
//   code: string
//   originalUrl: string
//   clicks: number
//   lastClicked?: string | null
//   createdAt?: string
//   updatedAt?: string
// }

// export default function Dashboard() {
//   const [links, setLinks] = useState<Link[]>([])
//   const [url, setUrl] = useState('')
//   const [customCode, setCustomCode] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')
//   const [searchTerm, setSearchTerm] = useState('')

//   useEffect(() => {
//     fetchLinks()
//   }, [])

//   const fetchLinks = async () => {
//     try {
//       const response = await fetch('/api/links')
//       if (response.ok) {
//         const data = await response.json()
//         console.log('Fetched links from API:', data) // Debug log

//         // Defensive check: Ensure data is an array and filter out any invalid items
//         if (Array.isArray(data)) {
//           setLinks(data.filter(link => link && link.id && link.code))
//         } else {
//           console.error('API did not return a valid array:', data)
//           setLinks([]) // Fallback to empty array
//         }
//       }
//     } catch (error) {
//       console.error('Failed to fetch links:', error)
//       setLinks([]) // Fallback to empty array on error
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError('')
//     setSuccess('')

//     try {
//       const response = await fetch('/api/links', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ url, customCode }),
//       })

//       const data = await response.json();
//       console.log('Created new link from API:', data) // Debug log

//       if (response.ok) {
//         // Defensive check: Ensure data is a valid Link object before adding it
//         if (data && data.id && data.code) {
//           setLinks(prevLinks => [data, ...prevLinks])
//           setUrl('')
//           setCustomCode('')
//           setSuccess('Link created successfully!')
//         } else {
//           setError('Received invalid data from server.')
//         }
//       } else {
//         setError(data.error || 'Failed to create link')
//       }
//     } catch {
//       setError('Failed to create link')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleDelete = async (code: string) => {
//     if (!confirm('Are you sure you want to delete this link?')) return;

//     try {
//       const response = await fetch(`/api/links/${code}`, {
//         method: 'DELETE',
//       })

//       if (response.ok) {
//         setLinks(links.filter(link => link.code !== code))
//         setSuccess('Link deleted successfully!')
//       } else {
//         const data = await response.json();
//         setError(data.error || 'Failed to delete link')
//       }
//     } catch {
//       setError('Failed to delete link')
//     }
//   }

//   const filteredLinks = links.filter(link =>
//     link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">TinyLink Dashboard</h1>
        
//         {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}
//         {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">{success}</div>}

//         <div className="bg-white shadow rounded-lg p-6 mb-8">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Create a new short link</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="url" className="block text-sm font-medium text-gray-700">Original URL</label>
//               <input
//                 type="url"
//                 id="url"
//                 value={url}
//                 onChange={(e) => setUrl(e.target.value)}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="https://example.com/very-long-url"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="customCode" className="block text-sm font-medium text-gray-700">Custom Code (optional)</label>
//               <input
//                 type="text"
//                 id="customCode"
//                 value={customCode}
//                 onChange={(e) => setCustomCode(e.target.value)}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="my-link"
//                 pattern="[A-Za-z0-9]{6,8}"
//                 title="6-8 alphanumeric characters"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
//             >
//               {isLoading ? 'Creating...' : 'Create Link'}
//             </button>
//           </form>
//         </div>

//         <div className="bg-white shadow rounded-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">Your Links</h2>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Search links..."
//             />
//           </div>
          
//           {filteredLinks.length === 0 ? (
//             <p className="text-gray-500 text-center py-8">No links found. Create your first link above!</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short Code</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target URL</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Clicked</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredLinks.map((link) => (
//                     <LinkItem key={link.id} link={link} onDelete={handleDelete} />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }




// 'use client'

// import { useState, useEffect } from 'react'
// import LinkItem from '@/components/LinkItem'

// // Local type definition to ensure consistency across components
// type Link = {
//   id: string
//   code: string
//   originalUrl: string
//   clicks: number
//   lastClicked?: string | null
//   createdAt?: string
//   updatedAt?: string
// }

// export default function Dashboard() {
//   const [links, setLinks] = useState<Link[]>([])
//   const [url, setUrl] = useState('')
//   const [customCode, setCustomCode] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')
//   const [searchTerm, setSearchTerm] = useState('')

//   useEffect(() => {
//     fetchLinks()
//   }, [])

//   const fetchLinks = async () => {
//     try {
//       const response = await fetch('/api/links')
//       if (response.ok) {
//         const data = await response.json()
//         console.log('Fetched links from API:', data) // Debug log

//         // Defensive check: Ensure data is an array and filter out any invalid items
//         if (Array.isArray(data)) {
//           setLinks(data.filter(link => link && link.id && link.code))
//         } else {
//           console.error('API did not return a valid array:', data)
//           setLinks([]) // Fallback to empty array
//         }
//       }
//     } catch (error) {
//       console.error('Failed to fetch links:', error)
//       setLinks([]) // Fallback to empty array on error
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError('')
//     setSuccess('')

//     try {
//       const response = await fetch('/api/links', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ url, customCode }),
//       })

//       const data = await response.json();
//       console.log('Created new link from API:', data) // Debug log

//       if (response.ok) {
//         // Defensive check: Ensure data is a valid Link object before adding it
//         if (data && data.id && data.code) {
//           setLinks(prevLinks => [data, ...prevLinks])
//           setUrl('')
//           setCustomCode('')
//           setSuccess('Link created successfully!')
//         } else {
//           setError('Received invalid data from server.')
//         }
//       } else {
//         setError(data.error || 'Failed to create link')
//       }
//     } catch {
//       setError('Failed to create link')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleDelete = async (code: string) => {
//     if (!confirm('Are you sure you want to delete this link?')) return;

//     try {
//       const response = await fetch(`/api/links/${code}`, {
//         method: 'DELETE',
//       })

//       if (response.ok) {
//         setLinks(links.filter(link => link.code !== code))
//         setSuccess('Link deleted successfully!')
//       } else {
//         const data = await response.json();
//         setError(data.error || 'Failed to delete link')
//       }
//     } catch {
//       setError('Failed to delete link')
//     }
//   }

//   const filteredLinks = links.filter(link =>
//     link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {/* Header */}
//         <div className="mb-10 text-center">
//           <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">TinyLink Dashboard</h1>
//           <p className="text-gray-600">Create and manage your short links with ease</p>
//         </div>
        
//         {/* Alerts */}
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md shadow-sm">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {success && (
//           <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md shadow-sm">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-green-700">{success}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Create Link Card */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10 border border-gray-100">
//           <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
//             <h2 className="text-xl font-semibold text-white flex items-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
//               </svg>
//               Create a new short link
//             </h2>
//           </div>
//           <div className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">Original URL</label>
//                 <div className="relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <input
//                     type="url"
//                     id="url"
//                     value={url}
//                     onChange={(e) => setUrl(e.target.value)}
//                     className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3 px-4 border text-gray-900"
//                     placeholder="https://example.com/very-long-url"
//                     required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="customCode" className="block text-sm font-medium text-gray-700 mb-2">Custom Code (optional)</label>
//                 <div className="relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="text"
//                     id="customCode"
//                     value={customCode}
//                     onChange={(e) => setCustomCode(e.target.value)}
//                     className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3 px-4 border text-gray-900"
//                     placeholder="my-link"
//                     pattern="[A-Za-z0-9]{6,8}"
//                     title="6-8 alphanumeric characters"
//                   />
//                 </div>
//                 <p className="mt-2 text-sm text-gray-500">Use 6-8 alphanumeric characters for your custom code</p>
//               </div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Creating...
//                   </>
//                 ) : (
//                   <>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
//                     </svg>
//                     Create Link
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Links Table Card */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//           <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold text-white flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                 </svg>
//                 Your Links
//               </h2>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 bg-white/20 backdrop-blur border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
//                   placeholder="Search links..."
//                 />
//               </div>
//             </div>
//           </div>
          
//           {filteredLinks.length === 0 ? (
//             <div className="p-12 text-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//               </svg>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No links found</h3>
//               <p className="text-gray-500">Create your first link above to get started!</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short Code</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target URL</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Clicked</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredLinks.map((link) => (
//                     <LinkItem key={link.id} link={link} onDelete={handleDelete} />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import LinkItem from '@/components/LinkItem'

type Link = {
  id: string
  code: string
  originalUrl: string
  clicks: number
  lastClicked?: string | null
  createdAt?: string
  updatedAt?: string
}

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>([])
  const [url, setUrl] = useState('')
  const [customCode, setCustomCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    try {
      const response = await fetch('/api/links')
      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data)) {
          setLinks(data.filter(link => link && link.id && link.code))
        } else {
          console.error('API did not return a valid array:', data)
          setLinks([])
        }
      }
    } catch (error) {
      console.error('Failed to fetch links:', error)
      setLinks([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, customCode }),
      })

      const data = await response.json()

      if (response.ok) {
        if (data && data.id && data.code) {
          setLinks(prev => [data, ...prev])
          setUrl('')
          setCustomCode('')
          setSuccess('Link created successfully!')
        } else {
          setError('Received invalid data from server.')
        }
      } else {
        setError(data.error || 'Failed to create link')
      }
    } catch {
      setError('Failed to create link')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (code: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return

    try {
      const response = await fetch(`/api/links/${code}`, { method: 'DELETE' })

      if (response.ok) {
        setLinks(links.filter(link => link.code !== code))
        setSuccess('Link deleted successfully!')
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to delete link')
      }
    } catch {
      setError('Failed to delete link')
    }
  }

  const filteredLinks = links.filter(link =>
    link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
            TinyLink Dashboard
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Create, manage, and track your short links in real time
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 max-w-2xl mx-auto">
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg border border-red-200 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 max-w-2xl mx-auto">
            <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg border border-green-200 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          </div>
        )}

        {/* Create Link Card */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Create a New Short Link
              </h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1.5">Original URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="url"
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-900"
                      placeholder="https://example.com/very-long-url"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="customCode" className="block text-sm font-medium text-gray-700 mb-1.5">Custom Code (optional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="customCode"
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-900"
                      placeholder="my-link"
                      pattern="[A-Za-z0-9]{6,8}"
                      title="6–8 alphanumeric characters"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">Use 6–8 alphanumeric characters</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-opacity duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Create Link
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Links Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Your Links
              </h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-800 placeholder-gray-500 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm w-full sm:w-64"
                  placeholder="Search links..."
                />
              </div>
            </div>
          </div>

          {filteredLinks.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No links yet</h3>
              <p className="text-gray-500">Create your first short link above to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Short Code</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Target URL</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Clicks</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Clicked</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredLinks.map((link) => (
                    <LinkItem key={link.id} link={link} onDelete={handleDelete} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
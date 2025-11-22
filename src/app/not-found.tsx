// import Link from 'next/link'

// export default function NotFound() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
//         <h1 className="text-6xl font-bold text-gray-900">404</h1>
//         <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Page Not Found</h2>
//         <p className="mt-2 text-lg text-gray-600">Sorry, the page you are looking for doesn t exist.</p>
//         <div className="mt-6">
//           <Link
//             href="/"
//             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Go back home
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <span className="text-3xl font-bold text-white">404</span>
          </div>
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Oops!</h1>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Page Not Found</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
            Sorry, the page you are looking for doesnt exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Go back home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a2 2 0 012 2v2a1 1 0 11-2 0v-2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Go back
          </button>
        </div>
        
        <div className="mt-12">
          <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
            <div className="h-2 bg-indigo-200 rounded-full animate-pulse"></div>
            <div className="h-2 bg-purple-200 rounded-full animate-pulse delay-75"></div>
            <div className="h-2 bg-indigo-200 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>If you believe this is an error, please contact our support team.</p>
      </div>
    </div>
  )
}
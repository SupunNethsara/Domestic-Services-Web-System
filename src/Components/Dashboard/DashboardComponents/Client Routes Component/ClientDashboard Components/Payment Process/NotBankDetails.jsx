import React from 'react'

function NotBankDetails() {
  return (
    <div>
        <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <div className="flex justify-center mb-4">
                                <svg
                                    width="160"
                                    height="120"
                                    viewBox="0 0 160 120"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-gray-300"
                                >
                                    <path
                                        d="M140 40H20C17.7909 40 16 41.7909 16 44V100C16 102.209 17.7909 104 20 104H140C142.209 104 144 102.209 144 100V44C144 41.7909 142.209 40 140 40Z"
                                        fill="currentColor"
                                        fillOpacity="0.1"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                    <rect
                                        x="24"
                                        y="52"
                                        width="112"
                                        height="8"
                                        rx="4"
                                        fill="currentColor"
                                        fillOpacity="0.3"
                                    />
                                    <rect
                                        x="24"
                                        y="68"
                                        width="80"
                                        height="8"
                                        rx="4"
                                        fill="currentColor"
                                        fillOpacity="0.3"
                                    />
                                    <rect
                                        x="24"
                                        y="84"
                                        width="60"
                                        height="8"
                                        rx="4"
                                        fill="currentColor"
                                        fillOpacity="0.3"
                                    />
                                    <path
                                        d="M80 24L88 32H72L80 24Z"
                                        fill="currentColor"
                                        fillOpacity="0.3"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M80 24V40"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M40 24H120C122.209 24 124 25.7909 124 28V32C124 34.2091 122.209 36 120 36H40C37.7909 36 36 34.2091 36 32V28C36 25.7909 37.7909 24 40 24Z"
                                        fill="currentColor"
                                        fillOpacity="0.1"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-2">No Bank Details Added</h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                You haven't added any bank account information yet. Add your details to enable direct deposits and faster withdrawals.
                            </p>
                            <div className="space-y-3 max-w-xs mx-auto">
                                <div className="flex items-start">
                                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-sm text-gray-600">Secure encrypted storage</span>
                                </div>
                                <div className="flex items-start">
                                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-sm text-gray-600">Faster payment processing</span>
                                </div>
                                <div className="flex items-start">
                                    <svg className="h-5 w-5 text-indigo-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-sm text-gray-600">Easy account management</span>
                                </div>
                            </div>
        
                        </div>
    </div>
  )
}

export default NotBankDetails
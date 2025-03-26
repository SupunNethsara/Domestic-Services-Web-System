import React from 'react'

export default function ClientRequestPosts() {
    return (
        <div class="w-full bg-white rounded-lg overflow-hidden shadow-md mt-5">

            <div class="p-4 flex items-center justify-between border-b">
                <div class="flex items-center space-x-2">
                    <div class="w-10 h-10 rounded-full bg-gray-300"></div>
                    <div>
                        <p class="font-semibold text-sm">Epic Cricket Comments</p>
                        <p class="text-gray-500 text-xs">8h · Follow</p>
                    </div>
                </div>
            </div>


            <div class="p-4">
                <div class="mb-4">
                    <p class="font-semibold text-sm">Deepak Chahar sister Malti Chahar's Instagram Story</p>
                </div>


                <div class="relative w-full h-96 bg-gray-100 mb-4 flex items-center justify-center">

                    <p class="text-gray-500">Story content appears here</p>
                </div>



            </div>


            <div class="p-4 border-t">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-4">
                        <button class="text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        <button class="text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </button>
                        <button class="text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>
                    </div>
                    <button class="text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button>
                </div>

              
                <div class="flex items-center mt-3 space-x-2">
                    <input type="text" placeholder="Add a comment..." class="flex-1 border-none focus:ring-0 text-sm" />
                    <button class="text-blue-500 font-semibold text-sm">Post</button>
                </div>
            </div>
        </div>
    )
}

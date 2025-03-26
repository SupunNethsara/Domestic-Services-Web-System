import React from 'react'
import MindDetailsModal from '../Mind_details_model'
import { useOutletContext } from 'react-router';
import Searchbar from '../Searchbar';
import ClientRequestPosts from './WorkerDashboard Components/ClientRequestPosts';


export default function WorkerHome() {
  const { isModalOpen, handleOpenModal, handleCloseModal } = useOutletContext();
  return (
    <div>

      <div>
        <div className="relative w-full rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 ">
          <Searchbar onInputClick={handleOpenModal} />
        </div>

        {isModalOpen && <MindDetailsModal onClose={handleCloseModal} />}

        <ClientRequestPosts/>
      </div>
   
    </div>
  )
}

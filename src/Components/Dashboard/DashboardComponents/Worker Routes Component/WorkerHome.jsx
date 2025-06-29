import React from 'react'
import MindDetailsModal from '../Mind_details_model'
import { useOutletContext } from 'react-router';
import Searchbar from '../Searchbar';
import ClientRequestPosts from './WorkerDashboard Components/ClientRequestPosts';


export default function WorkerHome() {
  const { isModalOpen, handleOpenModal, handleCloseModal, profile } = useOutletContext();
  return (
    <div>

      <div>
        <div className="mr-3">
          <Searchbar profile={profile} onInputClick={handleOpenModal} />
        </div>

        {isModalOpen && <MindDetailsModal onClose={handleCloseModal} />}

        <ClientRequestPosts />
      </div>

    </div>
  )
}

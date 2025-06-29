import React from 'react'
import Searchbar from '../Searchbar'
import MindDetailsModal from '../Mind_details_model'
import { useOutletContext } from 'react-router';
import WorkerRequestPosts from './ClientDashboard Components/WorkerRequestPosts';



export default function ClientHome() {
    const { isModalOpen, handleOpenModal, handleCloseModal, profile } = useOutletContext();
    return (
        <div>
            <div className="mr-3">
                <Searchbar profile={profile} onInputClick={handleOpenModal} />
            </div>
            {isModalOpen && <MindDetailsModal onClose={handleCloseModal} />}
            <WorkerRequestPosts />
        </div>
    )
}

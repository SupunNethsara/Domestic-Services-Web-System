import React from 'react'
import TableStructure from './TableStructure'

function UserTable() {
    return (
        <div>
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
            </div>
            <TableStructure />
        </div>

    )
}

export default UserTable
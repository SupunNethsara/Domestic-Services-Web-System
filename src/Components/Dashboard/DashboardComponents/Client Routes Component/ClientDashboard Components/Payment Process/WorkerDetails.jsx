import { GiSkills } from 'react-icons/gi';
import { FaMapMarkerAlt, FaMoneyBillWave, FaPhone } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
const WorkerDetails = ({ worker }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center">
        <GiSkills className="text-gray-500 mr-2" />
        <span className="text-gray-700">
          <strong>Skills:</strong> {worker.skills.join(', ')}
        </span>
      </div>
      <div className="flex items-center">
        <FaMapMarkerAlt className="text-gray-500 mr-2" />
        <span className="text-gray-700">
          <strong>Location:</strong> {worker.location}
        </span>
      </div>
      <div className="flex items-center">
        <FaMoneyBillWave className="text-gray-500 mr-2" />
        <span className="text-gray-700">
          <strong>Rate:</strong> {worker.rate}
        </span>
      </div>
      <div className="flex items-center">
        <IoMdTime className="text-gray-500 mr-2" />
        <span className="text-gray-700">
          <strong>Availability:</strong> {worker.availability}
        </span>
      </div>
      <div className="flex items-center">
        <FaPhone className="text-gray-500 mr-2" />
        <span className="text-gray-700">
          <strong>Contact:</strong> {worker.contact}
        </span>
      </div>
      
      <div className="mt-4">
        <h4 className="font-medium text-gray-800 mb-2">About</h4>
        <p className="text-gray-600">{worker.bio}</p>
      </div>
    </div>
  );
};

export default WorkerDetails;
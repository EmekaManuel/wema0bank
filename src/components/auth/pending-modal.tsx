import Image from "next/image";
import PendingIcon from "../../../public/images/Icon-pending.png";
interface PendingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PendingModal: React.FC<PendingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto my-4">
          <Image
            src={PendingIcon}
            width={44}
            height={44}
            alt="logo"
            className=""
          />
        </div>
        <h2 className="text-2xl font-bold text-amber-400 mb-4">Pending</h2>
        <p className="text-gray-700 mb-8">
          Your registration is awaiting approval from our partnership team
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition duration-200"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default PendingModal;

import React from 'react';

interface ItemCardProps {
    title: string; // Card title
    body: string;  // Card body content
    onEdit: () => void; // Function to trigger editing
    onDelete: () => void; // Function to trigger deletion
}

const ItemCard: React.FC<ItemCardProps> = ({ title, body, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600 mb-4 flex-grow">{body}</p>

            {/* Action buttons */}
            <div className="flex space-x-2 mt-auto">
                <button
                    onClick={onEdit}
                    className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition-colors duration-200"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ItemCard;

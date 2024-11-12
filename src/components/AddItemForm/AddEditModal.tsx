import React, { useState, useEffect } from 'react';

interface AddEditModalProps {
    isOpen: boolean;
    initialTitle?: string;
    initialBody?: string;
    onClose: () => void;
    onSave: (title: string, body: string) => void;
}

const AddEditModal: React.FC<AddEditModalProps> = ({ isOpen, initialTitle = '', initialBody = '', onClose, onSave }) => {
    // State for the title and body
    const [title, setTitle] = useState(initialTitle);
    const [body, setBody] = useState(initialBody);

    // Sync state with props when modal is opened or the initialTitle/initialBody change
    useEffect(() => {
        setTitle(initialTitle);
        setBody(initialBody);
    }, [initialTitle, initialBody, isOpen]);

    // Handle saving the data
    const handleSave = () => {
        onSave(title, body);
        setTitle(''); // Clear inputs after save
        setBody('');
        onClose(); // Close the modal
    };

    if (!isOpen) return null; // Don't render the modal if it's closed

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">{initialTitle ? 'Edit Item' : 'Add New Item'}</h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />

                <textarea
                    placeholder="Description"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />

                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white py-1 px-4 rounded mr-2 hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEditModal;

import React, { useEffect, useState } from 'react';
import { fetchItems, deleteItem, addItem, updateItem } from '../../services/apiService';
import AddEditModal from '../AddItemForm/AddEditModal';
import ItemCard from '../ItemCard/ItemCard';
import Toast from '../Shared/Toast';

interface Item {
  id: number;
  title: string;
  body: string;
}

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('id'); // "id" or "title"
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term for filtering
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Fetch items when the component mounts
  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    getItems();
  }, []);

  // Add new item
  const handleAddItem = async (title: string, body: string) => {
    try {
      const newItem = await addItem({ title, body });
      setItems((prevItems) => [newItem, ...prevItems]); // Add item to the front of the list
      setToast({ message: 'Item added successfully!', type: 'success' });
    } catch (error) {
      console.error('Error adding item:', error);
      setToast({ message: 'Error adding item.', type: 'error' });
    }
  };

  // Delete an item
  const handleDeleteItem = async (id: number) => {
    try {
      await deleteItem(id);
      setItems(items.filter((item) => item.id !== id)); // Remove item from the state
      setToast({ message: 'Item deleted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error deleting item:', error);
      setToast({ message: 'Error deleting item.', type: 'error' });
    }
  };

  // Edit an item
  const handleEditItem = async (id: number, title: string, body: string) => {
    try {
      const updatedItem = await updateItem(id, { title, body });
      setItems(items.map((item) => (item.id === id ? updatedItem : item))); // Update item in state
      setCurrentItem(null); // Reset current item after editing
      setToast({ message: 'Item updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating item:', error);
      setToast({ message: 'Error updating item.', type: 'error' });
    }
  };

  // Filter and sort items based on searchTerm and sortOrder
  const filteredItems = items
    .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'title') {
        return a.title.localeCompare(b.title);
      }
      return a.id - b.id;
    });

  // Limit the filtered items to only 12
  const limitedItems = filteredItems.slice(0, 12);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">IO Tech Task</h1>

      {/* Show Toast if exists */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="border border-gray-300 p-2 rounded w-full xl:w-[69%]"
        />

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)} // Update sort order
            className="border border-gray-300 p-2 rounded w-full sm:w-auto"
          >
            <option value="id">Sort by ID</option>
            <option value="title">Sort by Title</option>
          </select>

          <button
            onClick={() => {
              setCurrentItem(null);
              setIsModalOpen(true); // Open modal to add new item
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            Add Item
          </button>
        </div>
      </div>

      <AddEditModal
        isOpen={isModalOpen}
        initialTitle={currentItem?.title || ''}
        initialBody={currentItem?.body || ''}
        onClose={() => setIsModalOpen(false)} // Close modal
        onSave={(title, body) => {
          currentItem ? handleEditItem(currentItem.id, title, body) : handleAddItem(title, body);
          setIsModalOpen(false); // Close modal after save
        }}
      />

      {/* Display filtered and sorted items */}
      {limitedItems.length === 0 ? (
        <div className="text-center text-gray-500">
          {searchTerm ? 'No items found matching your search criteria.' : 'Loading items...'}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {limitedItems.map((item) => (
            <ItemCard
              key={item.id}
              title={item.title}
              body={item.body}
              onEdit={() => {
                setCurrentItem(item);
                setIsModalOpen(true); // Open modal for editing
              }}
              onDelete={() => handleDeleteItem(item.id)} // Delete item
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;

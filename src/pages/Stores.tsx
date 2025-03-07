import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaGripVertical } from "react-icons/fa"; // Import the drag icon
import {
  addStore,
  deleteStore,
  updateStore,
  reorderStores,
} from "./../store/storesSlice";
import { RootState } from "../store/store";

const Stores: React.FC = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores.stores);
  const [newStore, setNewStore] = useState({ name: "", city: "", state: "" });
  const [editStoreId, setEditStoreId] = useState<number | null>(null);
  const [editStoreData, setEditStoreData] = useState({
    name: "",
    city: "",
    state: "",
  });

  const handleAddStore = () => {
    const store = { ...newStore, id: Date.now() };
    dispatch(addStore(store));
    setNewStore({ name: "", city: "", state: "" });
  };

  const handleDeleteStore = (id: number) => {
    dispatch(deleteStore(id));
  };

  const handleEditStore = (store: {
    id: number;
    name: string;
    city: string;
    state: string;
  }) => {
    setEditStoreId(store.id);
    setEditStoreData({
      name: store.name,
      city: store.city,
      state: store.state,
    });
  };

  const handleUpdateStore = () => {
    if (editStoreId !== null) {
      dispatch(updateStore({ id: editStoreId, ...editStoreData }));
      setEditStoreId(null);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedStores = Array.from(stores);
    const [movedStore] = reorderedStores.splice(result.source.index, 1);
    reorderedStores.splice(result.destination.index, 0, movedStore);

    dispatch(reorderStores(reorderedStores));
  };

  return (
    <div className="p-0 pt-16">
      <div className="h-[calc(100vh-150px)] overflow-y-auto">
        {" "}
        {/* Scrollable table container */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="stores">
            {(provided) => (
              <table
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-w-full bg-white border border-gray-300"
              >
                <thead>
                  <tr>
                    <th className="py-2 px-2 text-start border-b w-40">
                      Action
                    </th>{" "}
                    {/* Reduced width */}
                    <th className="py-2 px-2 text-start border-b">S.No</th>
                    <th className="py-2 px-2 text-start border-b">Store</th>
                    <th className="py-2 px-2 text-start border-b">City</th>
                    <th className="py-2 px-2 text-start border-b">State</th>
                  </tr>
                </thead>
                <tbody>
                  {stores.map((store, index) => (
                    <Draggable
                      key={store.id}
                      draggableId={store.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          {/* Action Column */}
                          <td className="py-2 px-2 w-40">
                            {" "}
                            {/* Reduced width */}
                            <div className="flex space-x-2">
                              {" "}
                              {/* Flex container for buttons */}
                              {editStoreId === store.id ? (
                                <button
                                  onClick={handleUpdateStore}
                                  className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 text-sm"
                                >
                                  Save
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleEditStore(store)}
                                  className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 text-sm"
                                >
                                  Edit
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteStore(store.id)}
                                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                          {/* S.No Column with Drag Icon */}
                          <td
                            className="py-2 px-1 flex items-center"
                            {...provided.dragHandleProps}
                          >
                            <FaGripVertical className="mr-2 cursor-grab" />{" "}
                            {/* Drag icon */}
                            {index + 1} {/* Serial number */}
                          </td>
                          <td className="py-2 px-1">
                            {editStoreId === store.id ? (
                              <input
                                type="text"
                                value={editStoreData.name}
                                onChange={(e) =>
                                  setEditStoreData({
                                    ...editStoreData,
                                    name: e.target.value,
                                  })
                                }
                                className="p-1 border border-gray-300 rounded"
                              />
                            ) : (
                              store.name
                            )}
                          </td>
                          <td className="py-2 px-1">
                            {editStoreId === store.id ? (
                              <input
                                type="text"
                                value={editStoreData.city}
                                onChange={(e) =>
                                  setEditStoreData({
                                    ...editStoreData,
                                    city: e.target.value,
                                  })
                                }
                                className="p-1 border border-gray-300 rounded"
                              />
                            ) : (
                              store.city
                            )}
                          </td>
                          <td className="py-2 px-1">
                            {editStoreId === store.id ? (
                              <input
                                type="text"
                                value={editStoreData.state}
                                onChange={(e) =>
                                  setEditStoreData({
                                    ...editStoreData,
                                    state: e.target.value,
                                  })
                                }
                                className="p-1 border border-gray-300 rounded"
                              />
                            ) : (
                              store.state
                            )}
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Fixed Bottom Section */}
      <div className="fixed bottom-0 left-40 right-0 bg-gray-300 p-1 shadow-md">
        <div className="flex space-x-1 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Store Name"
            value={newStore.name}
            onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
            className="flex-1 p-1 border-b-cyan-100 outline-0 bg-gray-50"
          />
          <input
            type="text"
            placeholder="City"
            value={newStore.city}
            onChange={(e) => setNewStore({ ...newStore, city: e.target.value })}
            className="flex-1 p-1 border-b-cyan-100 outline-0 bg-gray-50"
          />
          <input
            type="text"
            placeholder="State"
            value={newStore.state}
            onChange={(e) =>
              setNewStore({ ...newStore, state: e.target.value })
            }
            className="flex-1 p-1 border-b-cyan-100 outline-0 bg-gray-50"
          />
          <button
            onClick={handleAddStore}
            className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600"
          >
            Add Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stores;

import React, { useState } from "react";
import { useGetCollectionsQuery } from "../feature/collection/collectionApi";
import { useGetSavedItemsByCollectionQuery } from "../feature/saved-items/savedItemApi";
import CollectionCard from "../components/CollectionCard";
import SavedItemCard from "./SavedItem";
import { useNavigate } from "react-router-dom";

const CollectionPages = () => {
  const { data: collections = [], isLoading } = useGetCollectionsQuery();
  const [activeCollection, setActiveCollection] = useState(null);
  const navigate = useNavigate()

  const { data: savedItems = [], isLoading: itemsLoading } =
    useGetSavedItemsByCollectionQuery(activeCollection, {
      skip: !activeCollection,
    });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-gray-500 text-lg">Loading your collections…</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen px-6 py-10">
      <div className="flex items-center gap-4 mb-8">
  <button
    onClick={() => navigate("/user-dashboard")}
    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
  >
    <span className="text-lg">←</span>
    <span className="font-medium">Back to Dashboard</span>
  </button>
</div>


      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Your Collections
        </h1>
        <p className="text-gray-500 mt-1">
          Organize your saved inspiration
        </p>
      </div>

      {/* COLLECTION LIST */}
      {collections.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">📁</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No collections yet
          </h2>
          <p className="text-gray-500 max-w-md">
            Save photos, videos, or GIFs to create your first collection.
          </p>
        </div>
      ) : (
        <div className="flex gap-5 flex-wrap mb-14">
          {collections.map((collection) => (
            <div
              key={collection.id}
              onClick={() => setActiveCollection(collection.id)}
              className={`cursor-pointer transition transform hover:scale-[1.02] ${
                activeCollection === collection.id
                  ? "ring-2 ring-[#e60023] rounded-xl"
                  : ""
              }`}
            >
              <CollectionCard
                item={collection}
                active={activeCollection === collection.id}
              />
            </div>
          ))}
        </div>
      )}

      {/* SAVED ITEMS SECTION */}
      {activeCollection && (
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Saved Items
          </h2>

          {itemsLoading ? (
            <p className="text-gray-500">Loading items…</p>
          ) : savedItems.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <div className="text-5xl mb-3">🖼️</div>
              <p className="text-gray-500 text-lg">
                This collection is empty
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-6">
              {savedItems.map((item) => (
                <SavedItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CollectionPages;

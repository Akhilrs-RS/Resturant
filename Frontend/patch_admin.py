import re

with open('/Users/akhilrs/Desktop/Galletrix/Resturant/Frontend/src/components/Admin.jsx', 'r') as f:
    content = f.read()

# 1. Add Sidebar button
sidebar_btn = """
            <button
              onClick={() => setActiveTab('diningmenu')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 mt-2 ${
                activeTab === 'diningmenu' 
                  ? 'bg-black text-white' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              }`}
            >
              <Utensils className="w-4 h-4" /> Manage Dining Menu
            </button>
"""
content = content.replace("              <Wine className=\"w-4 h-4\" /> Manage Bar Menu\n            </button>", "              <Wine className=\"w-4 h-4\" /> Manage Bar Menu\n            </button>" + sidebar_btn)

# 2. Add Dining Menu block before activities
# We can just copy the barmenu block and adapt it
dining_block = """
              {/* 9. MANAGE DINING MENU */}
              {activeTab === 'diningmenu' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {catalogPrices.filter(item => item.category && item.category.startsWith('Menu_')).map((room) => {
                    const isEditingThis = editingKey === room.itemKey;
                    return (
                      <div key={room.id} className="bg-white border border-gray-200 rounded-3xl p-6 flex flex-col justify-between space-y-6">
                        
                        <div className="relative h-48 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                          {(isEditingThis ? (editPriceImage || room.imageUrl) : room.imageUrl) ? (
                            <img 
                              src={isEditingThis ? (editPriceImage || room.imageUrl) : room.imageUrl} 
                              alt={room.displayName} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-gray-400 text-xs text-center flex flex-col items-center gap-2">
                              <Utensils className="w-8 h-8 text-gray-300" />
                              No custom image uploaded.
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="text-[10px] text-gray-500 block font-semibold uppercase tracking-wider mb-2">Item Title</label>
                            {isEditingThis ? (
                              <input 
                                type="text"
                                value={editRoomTitle}
                                onChange={(e) => setEditRoomTitle(e.target.value)}
                                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                              />
                            ) : (
                              <h3 className="font-times text-lg font-light text-black">{room.displayName}</h3>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] text-gray-500 block font-semibold uppercase tracking-wider mb-2">Price (INR)</label>
                              {isEditingThis ? (
                                <input 
                                  type="number"
                                  value={editPriceValue}
                                  onChange={(e) => setEditPriceValue(e.target.value)}
                                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                                />
                              ) : (
                                <span className="font-mono text-black font-bold text-sm">₹{room.price.toLocaleString()}</span>
                              )}
                            </div>
                            <div>
                              <label className="text-[10px] text-gray-500 block font-semibold uppercase tracking-wider mb-2">Category Key</label>
                              <span className="font-mono text-xs text-gray-400 block py-2">{room.itemKey}</span>
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] text-gray-500 block font-semibold uppercase tracking-wider mb-2">Description</label>
                            {isEditingThis ? (
                              <textarea
                                rows={2}
                                value={editRoomDesc}
                                onChange={(e) => setEditRoomDesc(e.target.value)}
                                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black resize-none"
                              />
                            ) : (
                              <p className="text-gray-500 text-xs font-light leading-relaxed">{room.description || 'No description configured.'}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-[10px] text-gray-500 block font-semibold uppercase tracking-wider mb-2">Dietary Type</label>
                            {isEditingThis ? (
                              <select
                                value={editDietaryType}
                                onChange={(e) => setEditDietaryType(e.target.value)}
                                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                              >
                                <option value="">Select...</option>
                                <option value="Veg">Veg</option>
                                <option value="Non-Veg">Non-Veg</option>
                              </select>
                            ) : (
                              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${room.dietaryType === 'Veg' ? 'bg-green-100 text-green-700' : room.dietaryType === 'Non-Veg' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>
                                {room.dietaryType || 'N/A'}
                              </span>
                            )}
                          </div>

                          {isEditingThis && (
                            <div>
                              <label className="text-[10px] text-gray-500 block font-semibold uppercase tracking-wider mb-2">Upload Custom Image</label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setEditPriceImage(reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200 cursor-pointer w-full"
                              />
                            </div>
                          )}
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                          {isEditingThis ? (
                            <>
                              <button 
                                onClick={() => handleSaveRoomDetails(room.itemKey)}
                                className="bg-black hover:bg-zinc-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                              >
                                Save Changes
                              </button>
                              <button 
                                onClick={() => {
                                  setEditingKey(null);
                                  setEditPriceImage('');
                                }}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs transition-colors"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button 
                              onClick={() => {
                                setEditingKey(room.itemKey);
                                setEditPriceValue(room.price);
                                setEditRoomTitle(room.displayName);
                                setEditRoomDesc(room.description || '');
                                setEditDietaryType(room.dietaryType || '');
                                setEditPriceImage(room.imageUrl || '');
                              }}
                              className="bg-black hover:bg-zinc-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors"
                            >
                              Edit Item Details
                            </button>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
"""

content = content.replace("{activeTab === 'activities' && (", dining_block + "\n              {activeTab === 'activities' && (")

with open('/Users/akhilrs/Desktop/Galletrix/Resturant/Frontend/src/components/Admin.jsx', 'w') as f:
    f.write(content)

import React, { useState, useEffect } from 'react';
const API_BASE_URL = `http://${window.location.hostname}:5210/api`;
import { ArrowRight, Plus } from 'lucide-react';
import MD from '../assets/MD.png';
import nd from '../assets/nd.png';
import Footer from './Footer';

const Menu = ({ setCurrentPage }) => {
  const [catalogPrices, setCatalogPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/catalog/prices`);
        if (response.ok) {
          const data = await response.json();
          setCatalogPrices(data);
        }
      } catch (error) {
        console.error('Error fetching catalog prices:', error);
      }
    };
    fetchPrices();
  }, []);

  const getMenuData = (category) => {
    const items = catalogPrices.filter(item => item.category === category);
    return items.map((item, index) => ({
      id: item.id,
      title: item.displayName,
      price: item.price.toString(),
      desc: item.description,
      type: item.dietaryType || 'Veg',
      img: item.imageUrl
    }));
  };

  const chefSpecials = getMenuData('Menu_Chef');
  const indianCuisine = getMenuData('Menu_Indian');
  const chineseCuisine = getMenuData('Menu_Chinese');
  const arabicCuisine = getMenuData('Menu_Arabic');

  return (
    <div className="min-h-screen bg-[#F6F4EE] text-stone-900 font-sans selection:bg-resort-gold/30">
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={MD} 
            alt="Bar & Lounge Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 mt-20">
          <span className="text-resort-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">BAR & LOUNGE</span>
          <h1 className="text-5xl md:text-7xl font-serif font-light text-white mb-6">A Taste of Everything.</h1>
          <p className="text-white/80 text-sm md:text-base tracking-wide max-w-2xl mb-8 leading-relaxed font-light uppercase">
            Explore chef-crafted dishes, fresh coastal flavors, traditional favorites, global cuisine, desserts, beverages, and special dining experiences served across our resort restaurants.
          </p>
          <button 
            onClick={() => setCurrentPage('dining')}
            className="bg-[#C5A267] hover:bg-[#B39155] text-white px-8 py-3 font-medium tracking-wider transition-colors text-sm"
          >
            Reserve A table
          </button>
        </div>
      </section>

      {/* Chef Specials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-4xl font-serif font-light text-stone-900">Chef Specials</h2>
            <button className="text-[#A78A52] text-sm hover:text-stone-900 transition-colors flex items-center gap-2">
              View all specials <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chefSpecials.map((item) => (
              <div key={item.id} className="bg-[#242321] rounded-xl overflow-hidden flex flex-col cursor-pointer group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-serif text-[17px] text-white mb-2">{item.title}</h3>
                  <p className="text-white/50 text-[11px] leading-relaxed mb-4 flex-1">
                    {item.desc}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4 text-xs font-medium">
                    <span className="text-[#D3B47D]">₹ {item.price}</span>
                    <div className="flex items-center gap-1.5 text-white/50">
                      <div className={`w-2 h-2 rounded-full ${item.type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                      {item.type}
                    </div>
                  </div>
                  
                  <button className="text-xs text-white/70 hover:text-[#D3B47D] transition-colors flex items-center gap-1">
                    Add to Order <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Indian Cuisine Section */}
      <section className="py-10 mb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-10 border-b border-stone-300/60 pb-4">
            <h2 className="text-4xl font-serif font-light text-stone-900">Indian Cuisine</h2>
            <button className="text-[#A78A52] text-sm hover:text-stone-900 transition-colors flex items-center gap-2">
              View all specials <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {indianCuisine.map((item) => (
              <div key={item.id} className="bg-white/50 border border-stone-200/60 rounded-xl overflow-hidden flex flex-col cursor-pointer group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-serif text-[19px] text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-stone-500 text-[13px] leading-relaxed mb-6 flex-1">
                    {item.desc}
                  </p>
                  
                  <div className="flex items-center justify-between mb-5 text-sm font-medium">
                    <span className="text-stone-900">₹ {item.price}</span>
                    <div className="flex items-center gap-1.5 text-stone-500">
                      <div className={`w-2 h-2 rounded-full ${item.type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                      {item.type}
                    </div>
                  </div>
                  
                  <button className="w-full py-3 text-xs text-[#A78A52] font-medium border-t border-[#A78A52]/20 hover:bg-[#A78A52]/5 transition-colors flex items-center justify-between">
                    Add to Order <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chinese Cuisine Section */}
      <section className="py-10 mb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-10 border-b border-stone-300/60 pb-4">
            <h2 className="text-4xl font-serif font-light text-stone-900">Chinese Cuisine</h2>
            <button className="text-[#A78A52] text-sm hover:text-stone-900 transition-colors flex items-center gap-2">
              View all specials <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chineseCuisine.map((item) => (
              <div key={item.id} className="bg-white/50 border border-stone-200/60 rounded-xl overflow-hidden flex flex-col cursor-pointer group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-serif text-[19px] text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-stone-500 text-[13px] leading-relaxed mb-6 flex-1">{item.desc}</p>
                  
                  <div className="flex items-center justify-between mb-5 text-sm font-medium">
                    <span className="text-stone-900">₹ {item.price}</span>
                    <div className="flex items-center gap-1.5 text-stone-500">
                      <div className={`w-2 h-2 rounded-full ${item.type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                      {item.type}
                    </div>
                  </div>
                  
                  <button className="w-full py-3 text-xs text-[#A78A52] font-medium border-t border-[#A78A52]/20 hover:bg-[#A78A52]/5 transition-colors flex items-center justify-between">
                    Add to Order <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Arabic Cuisine Section */}
      <section className="py-10 mb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-10 border-b border-stone-300/60 pb-4">
            <h2 className="text-4xl font-serif font-light text-stone-900">Arabic Cuisine</h2>
            <button className="text-[#A78A52] text-sm hover:text-stone-900 transition-colors flex items-center gap-2">
              View all specials <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {arabicCuisine.map((item) => (
              <div key={item.id} className="bg-white/50 border border-stone-200/60 rounded-xl overflow-hidden flex flex-col cursor-pointer group">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-serif text-[19px] text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-stone-500 text-[13px] leading-relaxed mb-6 flex-1">{item.desc}</p>
                  
                  <div className="flex items-center justify-between mb-5 text-sm font-medium">
                    <span className="text-stone-900">₹ {item.price}</span>
                    <div className="flex items-center gap-1.5 text-stone-500">
                      <div className={`w-2 h-2 rounded-full ${item.type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                      {item.type}
                    </div>
                  </div>
                  
                  <button className="w-full py-3 text-xs text-[#A78A52] font-medium border-t border-[#A78A52]/20 hover:bg-[#A78A52]/5 transition-colors flex items-center justify-between">
                    Add to Order <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={nd} 
              alt="Reserve your table" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          <div className="relative z-10 p-12 md:p-16 flex flex-col items-start justify-center">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-4 max-w-xl">
              Reserve Your Table for a Memorable Dining Experience
            </h2>
            <p className="text-white/70 text-sm max-w-lg mb-8 font-light leading-relaxed">
              Every flavor flatters, elegant ambiance, and uncrafted moments made for every occasion.
            </p>
            <button 
              onClick={() => setCurrentPage('dining')}
              className="bg-[#C5A267] hover:bg-[#B39155] text-white px-8 py-3 font-medium tracking-wider transition-colors text-sm"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      </section>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Menu;

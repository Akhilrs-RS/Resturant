import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Wine, GlassWater, Coffee, Citrus, ChefHat } from 'lucide-react';
import b from '../assets/b.png';

const BarMenu = ({ setCurrentPage, backendUrl }) => {
  const [activeCategory, setActiveCategory] = useState('Signature Cocktails');
  const [menuItems, setMenuItems] = useState([]);

  // Fetch catalog prices for Bar
  useEffect(() => {
    const fetchBarItems = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/catalog/prices`);
        if (response.ok) {
          const data = await response.json();
          // Filter to just bar category items
          const barData = data.filter(item => item.category === 'Bar');
          setMenuItems(barData);
        }
      } catch (error) {
        console.error('Error fetching bar menu:', error);
      }
    };
    fetchBarItems();
  }, [backendUrl]);

  const categories = [
    { id: 'Signature Cocktails', label: 'Signature Cocktails' },
    { id: 'Premium Mocktails', label: 'Premium Mocktails' },
    { id: 'Wine Selection', label: 'Wine Selection' },
    { id: 'Spirits', label: 'Spirits' },
    { id: 'Beer', label: 'Beer' },
    { id: 'Fresh Juices', label: 'Fresh Juices' },
    { id: 'Bar Snacks', label: 'Bar Snacks' },
    { id: 'Chef Special Bites', label: 'Chef Special Bites' },
  ];

  // Map category to itemKey prefix if possible, or just mock it.
  const getItemsForCategory = () => {
    let filtered = [];
    if (activeCategory === 'Signature Cocktails') {
      filtered = menuItems.filter(item => item.itemKey.includes('cocktail'));
    } else if (activeCategory === 'Premium Mocktails') {
      filtered = menuItems.filter(item => item.itemKey.includes('mocktail'));
    } else if (activeCategory === 'Wine Selection') {
      filtered = menuItems.filter(item => item.itemKey.includes('wine'));
    } else if (activeCategory === 'Spirits') {
      filtered = menuItems.filter(item => item.itemKey.includes('spirits'));
    }
    // If no items found, just show first 4 items as placeholder for other categories
    if (filtered.length === 0 && menuItems.length > 0) {
      filtered = menuItems.slice(0, 4);
    }
    return filtered;
  };

  const displayItems = getItemsForCategory();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-resort-gold/30">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={b} 
            alt="Bar Lounge" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <h1 className="text-4xl md:text-6xl font-serif font-light mb-6">Evenings Crafted with Elegance</h1>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-sm md:text-base font-light">
            Experience our curated selection of premium spirits, handcrafted cocktails, and fine wines in an atmosphere of refined luxury.
          </p>
          <button 
            onClick={() => setCurrentPage('lounge')}
            className="bg-resort-gold hover:bg-resort-gold/90 text-stone-950 px-8 py-3 rounded-none font-medium tracking-wider transition-colors uppercase text-sm"
          >
            Reserve a Table
          </button>
        </div>
      </section>

      {/* Categories Nav */}
      <section className="bg-[#111] border-y border-white/5 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex overflow-x-auto hide-scrollbar py-4 space-x-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap text-sm tracking-widest uppercase transition-colors px-2 py-1 ${
                  activeCategory === cat.id 
                    ? 'text-resort-gold border-b border-resort-gold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-4">
            <h2 className="text-3xl font-serif font-light text-white">{activeCategory}</h2>
            <button className="text-resort-gold text-sm tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2">
              View All {activeCategory.split(' ')[0]} <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden bg-[#111] mb-4 relative">
                  <img 
                    src={item.imageUrl || b} 
                    alt={item.displayName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-lg text-white group-hover:text-resort-gold transition-colors">{item.displayName}</h3>
                  <span className="text-resort-gold font-mono text-sm ml-4">₹{item.price}</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-4 min-h-[3rem]">
                  {item.description || 'Premium bar selection crafted by expert mixologists.'}
                </p>
                <button className="text-xs uppercase tracking-widest text-slate-300 hover:text-resort-gold transition-colors flex items-center gap-2">
                  Add to Order <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          
          {displayItems.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              No items available in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-20 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="relative rounded-2xl overflow-hidden h-[400px] flex items-center">
            <img src={b} alt="Happy Hour" className="absolute inset-0 w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
            
            <div className="relative z-10 p-12 max-w-2xl">
              <span className="text-resort-gold text-xs font-bold tracking-widest uppercase mb-4 block">Special Offer</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Sunset Happy Hour</h2>
              <p className="text-slate-300 text-lg font-light mb-8">
                Enjoy special offers on selected cocktails and complimentary bar snacks every evening from 5 PM to 7 PM.
              </p>
              <button 
                onClick={() => setCurrentPage('lounge')}
                className="bg-transparent border border-resort-gold text-resort-gold hover:bg-resort-gold hover:text-stone-950 px-8 py-3 rounded-none font-medium tracking-wider transition-colors uppercase text-sm inline-flex items-center gap-3"
              >
                Explore Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-24 bg-[#0a0a0a] border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-light mb-12">Reserve Your Evening at the Lounge</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 text-resort-gold">
                <Wine className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-widest text-slate-300">Expert Mixology</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 text-resort-gold">
                <GlassWater className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-widest text-slate-300">Premium Ambience</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 text-resort-gold">
                <Citrus className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-widest text-slate-300">Perfect For Occasions</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 text-resort-gold">
                <ChefHat className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-widest text-slate-300">Finest Selection</span>
            </div>
          </div>

          <button 
            onClick={() => setCurrentPage('lounge')}
            className="bg-resort-gold hover:bg-resort-gold/90 text-stone-950 px-10 py-4 rounded-none font-medium tracking-widest transition-colors uppercase text-sm"
          >
            Reserve Lounge Table
          </button>
        </div>
      </section>

    </div>
  );
};

export default BarMenu;

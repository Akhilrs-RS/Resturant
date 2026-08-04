import re

with open('/Users/akhilrs/Desktop/Galletrix/Resturant/Frontend/src/components/Menu.jsx', 'r') as f:
    content = f.read()

# 1. Add imports
content = content.replace("import React from 'react';", "import React, { useState, useEffect } from 'react';\nimport { API_BASE_URL } from '../config';")

# 2. Add state and fetch logic
fetch_logic = """
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

  const getMenuData = (category, count) => {
    const items = catalogPrices.filter(item => item.category === category);
    return items.slice(0, count).map(item => ({
      title: item.displayName,
      price: `₹${item.price.toLocaleString()}`,
      desc: item.description,
      veg: item.dietaryType === 'Veg',
      img: item.imageUrl
    }));
  };

  // Fallbacks using hardcoded if API is slow or fails
"""

content = content.replace("const Menu = ({ setCurrentPage }) => {", "const Menu = ({ setCurrentPage }) => {" + fetch_logic)

# Replace the arrays. Since the arrays might be large and complex, I will just rewrite them to merge with `getMenuData`.
# For example, `chefSpecials = getMenuData('Menu_Chef', 4).length > 0 ? getMenuData('Menu_Chef', 4) : [ ...hardcoded ]`

# I'll use regex to wrap the existing array declarations.
import re

content = re.sub(r'const chefSpecials = (\[.*?\]);', r'const hardcodedChefSpecials = \1;\n  const chefSpecials = getMenuData(\'Menu_Chef\', 4).length > 0 ? getMenuData(\'Menu_Chef\', 4) : hardcodedChefSpecials;', content, flags=re.DOTALL)
content = re.sub(r'const indianCuisine = (\[.*?\]);', r'const hardcodedIndianCuisine = \1;\n  const indianCuisine = getMenuData(\'Menu_Indian\', 6).length > 0 ? getMenuData(\'Menu_Indian\', 6) : hardcodedIndianCuisine;', content, flags=re.DOTALL)
content = re.sub(r'const chineseCuisine = (\[.*?\]);', r'const hardcodedChineseCuisine = \1;\n  const chineseCuisine = getMenuData(\'Menu_Chinese\', 6).length > 0 ? getMenuData(\'Menu_Chinese\', 6) : hardcodedChineseCuisine;', content, flags=re.DOTALL)
content = re.sub(r'const arabicCuisine = (\[.*?\]);', r'const hardcodedArabicCuisine = \1;\n  const arabicCuisine = getMenuData(\'Menu_Arabic\', 6).length > 0 ? getMenuData(\'Menu_Arabic\', 6) : hardcodedArabicCuisine;', content, flags=re.DOTALL)

# Let's fix the image logic. The hardcoded arrays had `img` properties. The API will return `imageUrl` which might be null. If it's null, we should fallback to the hardcoded image.
# We can do this in the `getMenuData` function by passing the hardcoded array to it.

fetch_logic_improved = """
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

  const getMenuData = (category, hardcodedData) => {
    const items = catalogPrices.filter(item => item.category === category);
    if (items.length === 0) return hardcodedData;
    
    return items.map((item, index) => ({
      title: item.displayName,
      price: `₹${item.price.toLocaleString()}`,
      desc: item.description,
      veg: item.dietaryType === 'Veg',
      img: item.imageUrl || (hardcodedData[index] ? hardcodedData[index].img : null)
    }));
  };
"""

content = content.replace(fetch_logic, fetch_logic_improved)

content = content.replace("const chefSpecials = getMenuData('Menu_Chef', 4).length > 0 ? getMenuData('Menu_Chef', 4) : hardcodedChefSpecials;", "const chefSpecials = getMenuData('Menu_Chef', hardcodedChefSpecials);")
content = content.replace("const indianCuisine = getMenuData('Menu_Indian', 6).length > 0 ? getMenuData('Menu_Indian', 6) : hardcodedIndianCuisine;", "const indianCuisine = getMenuData('Menu_Indian', hardcodedIndianCuisine);")
content = content.replace("const chineseCuisine = getMenuData('Menu_Chinese', 6).length > 0 ? getMenuData('Menu_Chinese', 6) : hardcodedChineseCuisine;", "const chineseCuisine = getMenuData('Menu_Chinese', hardcodedChineseCuisine);")
content = content.replace("const arabicCuisine = getMenuData('Menu_Arabic', 6).length > 0 ? getMenuData('Menu_Arabic', 6) : hardcodedArabicCuisine;", "const arabicCuisine = getMenuData('Menu_Arabic', hardcodedArabicCuisine);")

with open('/Users/akhilrs/Desktop/Galletrix/Resturant/Frontend/src/components/Menu.jsx', 'w') as f:
    f.write(content)

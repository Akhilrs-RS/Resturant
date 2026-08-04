import re

with open('/Users/akhilrs/Desktop/Galletrix/Resturant/Frontend/src/components/Menu.jsx', 'r') as f:
    content = f.read()

# 1. Remove imports
imports_to_remove = [
    "import i103 from '../assets/103.jpg';\n",
    "import i104 from '../assets/104.jpg';\n",
    "import i105 from '../assets/105.jpg';\n",
    "import i106 from '../assets/106.jpg';\n",
    "import m1 from '../assets/m1.jpg';\n",
    "import m6 from '../assets/m6.jpg';\n",
    "import m7 from '../assets/m7.jpg';\n"
]
for imp in imports_to_remove:
    content = content.replace(imp, "")

# 2. Replace everything between 'const getMenuData' and 'return ('
new_logic = """  const getMenuData = (category) => {
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

  """

content = re.sub(r'  const getMenuData = .*?  return \(', new_logic + 'return (', content, flags=re.DOTALL)

with open('/Users/akhilrs/Desktop/Galletrix/Resturant/Frontend/src/components/Menu.jsx', 'w') as f:
    f.write(content)

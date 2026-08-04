import requests
import base64
import mimetypes
import os
import time

API_BASE_URL = 'http://localhost:5210/api'
ASSETS_DIR = '/Users/akhilrs/Desktop/Galletrix/Resturant/Frontend/src/assets'

uploads = [
    ('one.png', 'menu_chef_1'),
    ('two.png', 'menu_chef_2'),
    ('3.png', 'menu_chef_3'),
    ('4.png', 'menu_chef_4'),
    ('5.png', 'menu_indian_1'),
    ('6.png', 'menu_indian_2'),
    ('7.jpg', 'menu_indian_3'),
    ('8.png', 'menu_indian_4'),
    ('9.jpg', 'menu_indian_5'),
    ('10.jpg', 'menu_indian_6'),
    ('11.jpg', 'menu_chinese_1'),
    ('12.jpg', 'menu_chinese_2'),
    ('13.jpg', 'menu_chinese_3'),
    ('14.jpg', 'menu_chinese_4'),
    ('15.jpg', 'menu_chinese_5'),
    ('16.jpg', 'menu_chinese_6'),
    ('17.jpg', 'menu_arabic_1'),
    ('18.jpg', 'menu_arabic_2'),
    ('19.jpg', 'menu_arabic_3'),
    ('20.jpg', 'menu_arabic_4'),
    ('19.jpg', 'menu_arabic_5'),
    ('20.jpg', 'menu_arabic_6')
]

for filename, item_key in uploads:
    filepath = os.path.join(ASSETS_DIR, filename)
    if not os.path.exists(filepath):
        print(f"Error: {filepath} not found")
        continue
    
    with open(filepath, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    
    mime_type, _ = mimetypes.guess_type(filepath)
    if not mime_type:
        mime_type = 'image/jpeg'
        
    data_url = f"data:{mime_type};base64,{encoded_string}"
    
    payload = {
        "imageUrl": data_url
    }
    
    print(f"Uploading {filename} for {item_key}...")
    try:
        response = requests.put(f"{API_BASE_URL}/catalog/prices/{item_key}", json=payload)
        if response.status_code == 200:
            print(f"Success: {item_key}")
        else:
            print(f"Failed: {item_key} - {response.status_code}")
    except Exception as e:
        print(f"Exception: {e}")
        
    time.sleep(0.5)

print("Done.")

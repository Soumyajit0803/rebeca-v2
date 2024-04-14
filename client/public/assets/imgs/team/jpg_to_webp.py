from PIL import Image
import os

"""
REQUIREMENTS: python compiler, Pillow package
INSTRUCTIONS TO USE:
Whenever you include new images in this 'teams' directory,
run this program. Its task is to convert all jpg images here
into webp formats. 
Currently size reduction is disabled(line 20 commented out)
"""


output_dir = './public/assets/imgs/team/'
os.makedirs(output_dir, exist_ok=True)

# Function to resize and convert image to WEBP format
def resize_and_convert(input_path, output_path, target_size_percent):
    img = Image.open(input_path)
    img.thumbnail((700, 700))
    quality = 80
    img.save(output_path, 'WEBP', quality=quality, save_all=True, append_images=[img])

count = 0
for filename in os.listdir('./public/assets/imgs/team/'):
    if filename.lower().endswith('.jpg'):
        count += 1
        input_path = './public/assets/imgs/team/'+filename
        output_path = os.path.join(output_dir, os.path.splitext(filename)[0] + '.webp')
        resize_and_convert(input_path, output_path, target_size_percent=90)

print("CONVERSION COMPLETE")
print("Converted", count, "files.")

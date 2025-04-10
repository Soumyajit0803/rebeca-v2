from PIL import Image
import os

"""
REQUIREMENTS: python compiler, Pillow package
INSTRUCTIONS TO USE:
Whenever you include new images in this 'teams' directory,
run this program. Its task is to convert all jpg images here
into webp formats. 
Currently size reduction is disabled(line 20 commented out)

directory to start: "./public/assets/..../"
"""
output_dir = './client/public/assets/imgs/sponsorship/sponsorsImages/'
os.makedirs(output_dir, exist_ok=True)


# Function to resize and convert image to WEBP format
def resize_and_convert(input_path, output_path):
    img = Image.open(input_path)
    img.thumbnail((700, 700))
    quality = 80
    img.save(output_path, 'WEBP', quality=quality, save_all=True, append_images=[img])

count = 0
allFiles = os.listdir('./client/public/assets/imgs/sponsorship/sponsorsImages/')

newchanges = []

for filename in allFiles:
    if filename.lower().endswith('.png'):
        input_path = './client/public/assets/imgs/sponsorship/sponsorsImages/'+filename
        if filename.split('.')[0] + '.webp' in allFiles:
            print("File already in webp for ", filename)
            continue
        count += 1
        newchanges.append(filename)
        output_path = os.path.join(output_dir, os.path.splitext(filename)[0] + '.webp')
        resize_and_convert(input_path, output_path)

print("CONVERSION COMPLETE")
print("Converted", count, "files:")
for i in newchanges:
    print(i)

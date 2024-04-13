from PIL import Image
import os

# Create a directory to store the converted images
output_dir = '.'
os.makedirs(output_dir, exist_ok=True)

# Function to resize and convert image to WEBP format
def resize_and_convert(input_path, output_path, target_size_percent):
    img = Image.open(input_path)
    # Resize the image while preserving aspect ratio
    img.thumbnail((500, 500))
    
    # Initial quality value
    quality = 80
    # Save the image in WEBP format with the specified quality
    img.save(output_path, 'WEBP', quality=quality, save_all=True, append_images=[img])
    
    # Check and adjust image size to target size
    # while os.path.getsize(output_path) > target_size_bytes:
    #     # Decrease the quality and save again
    #     quality -= 5
    #     img.save(output_path, 'WEBP', quality=quality, save_all=True, append_images=[img])

# Loop through each image file in the current directory
for filename in os.listdir('.'):
    if filename.lower().endswith('.jpg'):
        input_path = filename
        output_path = os.path.join(output_dir, os.path.splitext(filename)[0] + '.webp')
        resize_and_convert(input_path, output_path, target_size_percent=90)

print("Conversion complete. Converted images are saved in 'converted_images' directory.")

# Portfolio Assets Directory

This directory contains all media assets for your portfolio website.

## Directory Structure

### `/images`
- **profile.jpg** - Your professional profile photo for the hero section
- Place your main profile image here (recommended size: 500x500px or larger, square aspect ratio)

### `/images/projects`
- **project1.jpg, project2.jpg, etc.** - Project screenshots or images
- Add images for each of your projects
- Recommended size: 800x600px or larger
- Supported formats: JPG, PNG, WebP

### `/videos`
- **project1.mp4, project2.mp4, etc.** - Project demo videos
- Add video demonstrations of your projects
- Recommended format: MP4 (H.264 codec)
- Keep file sizes reasonable (under 20MB if possible)

### `/certificates`
- **cert1.jpg, cert2.jpg, etc.** - Certificate images
- Add scanned or digital copies of your certificates
- Recommended size: 1200x900px or original certificate size
- Supported formats: JPG, PNG, PDF (convert to image)

## How to Add Your Assets

1. **Profile Photo**: 
   - Add your photo as `assets/images/profile.jpg`
   - Make sure it's a professional, high-quality image

2. **Project Images**:
   - Add images to `assets/images/projects/`
   - Name them descriptively (e.g., `ai-chatbot.jpg`, `image-classifier.jpg`)
   - Update the `src` attribute in `index.html` to match your filenames

3. **Project Videos**:
   - Add videos to `assets/videos/`
   - Name them to match your projects
   - Update the HTML to use `<video>` tags instead of `<img>` tags where needed

4. **Certificates**:
   - Add certificate images to `assets/certificates/`
   - Name them descriptively (e.g., `google-ai-cert.jpg`, `coursera-ml.jpg`)
   - Update the `src` attribute in `index.html` to match your filenames

## Image Optimization Tips

- Compress images before uploading to improve page load speed
- Use tools like TinyPNG, ImageOptim, or Squoosh
- Consider using WebP format for better compression
- Maintain aspect ratios to prevent distortion

## TODO: Add Your Assets

- [ ] Add profile photo (assets/images/profile.jpg)
- [ ] Add project images (assets/images/projects/)
- [ ] Add project videos if available (assets/videos/)
- [ ] Add certificate images (assets/certificates/)

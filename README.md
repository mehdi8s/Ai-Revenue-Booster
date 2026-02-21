# Professional AI Portfolio Website

A modern, bilingual (Turkish/English) portfolio website designed for AI and Computer Engineering professionals.

## 🌟 Features

- **Bilingual Support**: Seamless switching between Turkish and English
- **Modern Design**: Dark theme with purple/blue gradients and glassmorphism effects
- **Responsive**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Scroll animations, hover effects, and transitions
- **Project Gallery**: Showcase your projects with images and videos
- **Certificates Section**: Display your achievements and certifications
- **Skills Visualization**: Animated progress bars for your technical skills
- **Contact Form**: Integrated contact form with validation
- **Theme Toggle**: Switch between dark and light modes
- **SEO Optimized**: Proper meta tags and semantic HTML

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and design system
├── script.js           # JavaScript functionality
├── assets/             # Media assets directory
│   ├── images/         # Images folder
│   │   ├── profile.jpg # Your profile photo
│   │   └── projects/   # Project screenshots
│   ├── videos/         # Project demo videos
│   └── certificates/   # Certificate images
└── README.md           # This file
```

## 🚀 Getting Started

### 1. Add Your Content

The HTML file contains clear `<!-- TODO: ... -->` markers for all content you need to add:

#### Profile Information
- Add your name in the hero section
- Add your professional photo (`assets/images/profile.jpg`)
- Update the "About Me" section with your description

#### Projects
- Duplicate the project card template for each project
- Add project images/videos to `assets/images/projects/` or `assets/videos/`
- Update project titles, descriptions, and tags
- Add GitHub/demo links

#### Certificates
- Add certificate images to `assets/certificates/`
- Duplicate the certificate card for each certification
- Update certificate names, issuers, dates, and verification links

#### Skills
- Update skill categories and items
- Adjust progress bar widths to reflect your proficiency
- Add or remove skills as needed

#### Contact Information
- Update email address
- Add LinkedIn profile URL
- Add GitHub profile URL
- Add any other social media links

### 2. Customize Content for Both Languages

Each text element has `data-tr` (Turkish) and `data-en` (English) attributes:

```html
<h2 data-tr="Hakkımda" data-en="About Me">Hakkımda</h2>
```

Update both attributes with your content in Turkish and English.

### 3. Open the Website

Simply open `index.html` in your web browser to view your portfolio.

For a better development experience, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🎨 Customization

### Colors

Edit the CSS variables in `styles.css` to change the color scheme:

```css
:root {
    --accent-purple: #8B5CF6;
    --accent-blue: #3B82F6;
    --accent-cyan: #06B6D4;
    /* ... more colors */
}
```

### Fonts

The website uses Inter font from Google Fonts. To change the font:

1. Update the Google Fonts link in `index.html`
2. Update the `--font-family` variable in `styles.css`

### Animations

Adjust animation speeds and effects in the CSS animations section.

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🔧 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties, Grid, Flexbox
- **JavaScript (ES6+)**: Interactive functionality
- **Google Fonts**: Inter font family

## 📝 TODO Checklist

Before deploying your portfolio, make sure to:

- [ ] Add your profile photo
- [ ] Update all personal information (name, email, social links)
- [ ] Add project details with images/videos
- [ ] Add certificate images
- [ ] Update skills and proficiency levels
- [ ] Translate all content to both Turkish and English
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Optimize images for web
- [ ] Update meta tags for SEO
- [ ] Add favicon (optional)

## 🌐 Deployment

You can deploy this portfolio to various platforms:

### GitHub Pages
1. Create a GitHub repository
2. Push your code
3. Enable GitHub Pages in repository settings

### Netlify
1. Drag and drop the portfolio folder to Netlify
2. Or connect your GitHub repository

### Vercel
1. Import your GitHub repository
2. Deploy with one click

### Traditional Hosting
Upload all files to your web hosting via FTP.

## 📧 Contact Form Integration

The contact form currently logs to console. To make it functional:

1. **EmailJS**: Free email service
   - Sign up at [emailjs.com](https://www.emailjs.com/)
   - Follow their integration guide
   - Update the form handler in `script.js`

2. **Formspree**: Simple form backend
   - Sign up at [formspree.io](https://formspree.io/)
   - Add your form endpoint
   - Update the form action

3. **Custom Backend**: Create your own API endpoint

## 🎯 Best Practices

- Keep images optimized (use WebP format when possible)
- Compress videos before uploading
- Test on multiple devices and browsers
- Keep content concise and professional
- Update regularly with new projects and skills
- Use high-quality images for projects and certificates

## 📄 License

This portfolio template is free to use for personal and commercial projects.

## 🤝 Support

If you encounter any issues or have questions, feel free to reach out!

---

**Built with ❤️ for AI Engineers**

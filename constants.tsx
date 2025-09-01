import React from 'react';
import type { AdFormatCategory } from './types';

const Icon = ({ path }: { path: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

export const AD_FORMAT_CATEGORIES: AdFormatCategory[] = [
  {
    name: 'Digital',
    formats: [
      {
        id: 'digital_banner',
        name: 'Digital Banner Ad',
        prompt: "Take the product from the provided image and integrate it into a sleek digital banner ad for a modern tech news website. The banner should be a wide horizontal rectangle, feature a clean layout, a call-to-action button, and minimal text.",
        icon: <Icon path="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm14 0H6v4h12V6z" />
      },
      {
        id: 'email_newsletter',
        name: 'Email Newsletter Ad',
        prompt: "Using the product from the image, create a feature section for an email newsletter for a minimalist lifestyle brand. Present the product with a soft, cozy aesthetic, surrounded by neutral-toned props on a clean background. Include some placeholder text for a headline.",
        icon: <Icon path="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      },
      {
        id: 'website_hero_luxury',
        name: 'Luxury Website Banner',
        prompt: "Using the product from the image, create a website hero banner for a high-end, luxury brand. It should be a very wide, panoramic image. Place the product elegantly on a sophisticated, dark-themed background with minimalist typography and a premium feel.",
        icon: <Icon path="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      },
      {
        id: 'website_hero_corporate',
        name: 'Corporate Website Banner',
        prompt: "Take the product from the image and place it in a professional website hero banner for a corporate or B2B business. The banner needs to be wide and horizontal, with a clean, trustworthy design, a blue and white color palette, sharp lines, and space for a compelling headline.",
        icon: <Icon path="M19 21V10a2 2 0 00-2-2H7a2 2 0 00-2 2v11m14 0h2m-2 0h-5m-7 0H5m2 0v-5h3v5m4 0v-5h3v5M5 12h14" />
      },
      {
        id: 'website_hero_tech',
        name: 'Tech Startup Banner',
        prompt: "Integrate the product from the image into a website hero banner for a modern IT or tech startup. This should be a wide, horizontal image. Set the product against a dynamic, abstract background with circuit patterns or glowing data streams. The aesthetic should be innovative and clean.",
        icon: <Icon path="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      },
      {
        id: 'website_hero_futuristic',
        name: 'Futuristic Website Banner',
        prompt: "Place the product from the image into a futuristic website hero banner. The banner must be a wide, horizontal image. Showcase the product in a sleek, sci-fi inspired setting with holographic elements, neon accents, and a dark, high-tech background.",
        icon: <Icon path="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      },
      {
        id: 'website_hero_ecommerce',
        name: 'E-commerce Sale Banner',
        prompt: "Take the product from the image and feature it in a vibrant e-commerce website banner designed to drive sales. The banner should be wide and horizontal. Include elements like a '50% Off' or 'Shop Now' button, bright, attention-grabbing colors, and a clean layout that makes the product the hero.",
        icon: <Icon path="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      },
      {
        id: 'website_hero_seasonal',
        name: 'Seasonal Holiday Banner',
        prompt: "Create a seasonal-themed website banner featuring the product from the image. The banner must be a wide, horizontal image. For winter, use a cozy, festive theme with snow and warm lights. For summer, use a bright, sunny beach or picnic theme. Adapt the scene to a relevant holiday or season.",
        icon: <Icon path="M5 3v4M3 5h4M4 17v4m-2-2h4m11-15v4m4-2h-4m2 15h4m-4-2v4M12 8a4 4 0 100 8 4 4 0 000-8z" />
      },
      {
        id: 'website_hero_minimalist',
        name: 'Minimalist Website Banner',
        prompt: "Using the product from the image, design an ultra-minimalist website hero banner. The banner should be wide and horizontal. Focus on a simple color palette, generous negative space, and elegant, clean typography. The product should be the sole focus with no distracting elements.",
        icon: <Icon path="M4 8h16M4 16h16" />
      },
      {
        id: 'website_hero_nature',
        name: 'Nature-themed Banner',
        prompt: "Place the product from the image into a nature-themed website banner. The banner should be wide and horizontal. The setting should be a serene natural landscape, such as a misty forest, a calm lake at sunrise, or a field of wildflowers. The lighting should be soft and natural.",
        icon: <Icon path="M12 1.75l-3.75 3.75-5-2.5 2.5 5L2.25 12l3.75 3.75-2.5 5 5-2.5 3.75 3.75 3.75-3.75 5 2.5-2.5-5 3.75-3.75-3.75-3.75 2.5-5-5 2.5L12 1.75z" />
      },
      {
        id: 'website_banner_saas',
        name: 'SaaS Platform Banner',
        prompt: "Place the product from the image into a clean and modern website banner for a SaaS (Software-as-a-Service) platform. The banner should be wide and horizontal. The product should be featured alongside abstract UI elements, graphs, or icons that represent data and connectivity. Use a bright, professional color scheme.",
        icon: <Icon path="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6" />
      },
      {
        id: 'website_banner_portfolio',
        name: 'Creative Portfolio Banner',
        prompt: "Use the provided image as a featured piece in a hero banner for a professional creative portfolio (e.g., photographer, artist, designer). The banner must be wide and panoramic. The product/image should be presented elegantly, perhaps in a stylized frame or as part of a larger, artistic composition with minimalist typography for a name and title.",
        icon: <Icon path="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      },
      {
        id: 'website_banner_realestate',
        name: 'Real Estate Banner',
        prompt: "If the image is of a building, feature it as a luxury property in a wide, horizontal website banner for a high-end real estate agency. The image should be aspirational, with perfect lighting (e.g., golden hour). If it's a product, place it inside a luxurious modern home that is being featured. Include clean, elegant text for a property title and a 'View Listing' call-to-action.",
        icon: <Icon path="M8 20V10a2 2 0 012-2h4a2 2 0 012 2v10a2 2 0 01-2 2H10a2 2 0 01-2-2zM4 20h4v-1a2 2 0 012-2h4a2 2 0 012 2v1h4a2 2 0 002-2V8a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
      },
      {
        id: 'website_banner_healthcare',
        name: 'Healthcare/Medical Banner',
        prompt: "Take the product from the image and feature it in a professional, trustworthy website banner for a healthcare provider or medical technology company. The banner should be wide and horizontal, using a clean design with a palette of blues, greens, and white. The overall feel should be reassuring, professional, and sterile.",
        icon: <Icon path="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      },
      {
        id: 'website_banner_elearning',
        name: 'E-learning Platform Banner',
        prompt: "Integrate the product from the image into a website banner for an online learning platform or educational institution. The banner should be wide and horizontal. The scene should be bright and engaging, perhaps showing the product on a desk with books, a laptop, and other learning materials. The tone should be inspiring and modern.",
        icon: <Icon path="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      },
      {
        id: 'website_banner_nonprofit',
        name: 'Non-Profit Organization Banner',
        prompt: "Create an emotionally resonant website banner for a non-profit or charity organization, using the product from the image. The banner must be wide and horizontal. If the product is relevant (e.g., food, books), feature it being given or used in a positive, impactful scene. The imagery should be authentic and heartfelt, with space for a powerful message and a 'Donate Now' button.",
        icon: <Icon path="M12 8c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2 2zM3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945C19.49 14.63 17.51 18 12 18s-7.49-3.37-9.945-7zM12 2a10 10 0 00-9.945 9H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945A10 10 0 0012 2z" />
      },
      {
        id: 'website_banner_restaurant',
        name: 'Restaurant/Food Banner',
        prompt: "If the image contains a food or beverage item, create a delicious-looking website banner for a restaurant or food blog. The banner should be wide and horizontal. The food item should be the hero, beautifully styled and photographed with shallow depth of field. The background should be a rustic or modern restaurant setting. The lighting must be warm and appetizing.",
        icon: <Icon path="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      },
      {
        id: 'website_banner_fintech',
        name: 'Financial/Fintech Banner',
        prompt: "Design a website banner for a financial services or fintech company, incorporating the product from the image. The banner must be wide and horizontal. The aesthetic should be professional and secure, using a color palette of deep blues, grays, and a sharp accent color. The product can be shown alongside abstract data visualizations, charts, or icons representing growth and security.",
        icon: <Icon path="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      },
       {
        id: 'ar_filter_ad',
        name: 'AR Filter Ad',
        prompt: "Visualize the product from the image as an interactive AR filter for Instagram or Snapchat. The generated image should show a smartphone screen in a vertical orientation, with a person's face playfully interacting with a 3D version of the product.",
        icon: <Icon path="M12 18h.01M7 12h.01M17 12h.01M7 18h.01M12 12h.01M17 18h.01M12 6h.01M7 6h.01M17 6h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      },
      {
        id: 'interactive_carousel',
        name: 'Interactive Carousel Ad',
        prompt: "Design a multi-panel interactive carousel ad for a website using the provided product. The panels should be square. The first panel should feature the product prominently, with subsequent panels highlighting different features or benefits with clean icons and short text.",
        icon: <Icon path="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      },
      {
        id: 'video_ad_preroll',
        name: 'Video Ad Preroll',
        prompt: "Create a mockup of a 5-second skippable video ad (like on YouTube) featuring the product from the image. The image should look like a video player in a standard widescreen format, showing the product in a dynamic, attention-grabbing scene, with a 'Skip Ad' button visible.",
        icon: <Icon path="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      },
      {
        id: 'gaming_app_banner',
        name: 'Gaming In-App Banner',
        prompt: "Design an in-app banner ad for a mobile game, featuring the provided product as a 'power-up' or reward. The ad must be a wide, short horizontal banner, displayed at the bottom of the screen. The style should be vibrant and exciting, matching the high-energy aesthetic of a modern mobile game.",
        icon: <Icon path="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      },
      {
        id: 'podcast_sponsor_visual',
        name: 'Podcast Sponsor Visual',
        prompt: "Create a visual banner for a podcast sponsorship using the product from the image. The image should be square, suitable for a podcast app's 'now playing' screen. It should feature the product alongside a placeholder for the podcast's logo and a special offer code, all in a clean and professional style.",
        icon: <Icon path="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      },
    ]
  },
  {
    name: 'Social Media',
    formats: [
      {
        id: 'instagram_post',
        name: 'Instagram Post',
        prompt: "Take the product from the image and create a vibrant, square-format Instagram post. Place the product in a trendy, eye-catching setting with bright colors and a modern, clean aesthetic perfect for a lifestyle brand's feed.",
        icon: <Icon path="M3 9a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM12 15a3 3 0 100-6 3 3 0 000 6z" />
      },
      {
        id: 'instagram_story',
        name: 'Instagram Story Ad',
        prompt: "Create a vertical ad for an Instagram Story using the product from the provided image. The design should be immersive and engaging, with space at the top for a brand logo and at the bottom for a 'Swipe Up' call-to-action.",
        icon: <Icon path="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      },
      {
        id: 'facebook_post',
        name: 'Facebook Post',
        prompt: "Create a visually engaging Facebook post ad in a landscape orientation. Take the product from the image and feature it in a realistic, relatable scenario that encourages likes and shares, with warm and inviting lighting.",
        icon: <Icon path="M17 8h2a2 2 0 00-2-2h-2v2m-5 4h.01M12 12h.01M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      },
      {
        id: 'linkedin_post',
        name: 'LinkedIn Post',
        prompt: "Design a professional and sophisticated advertisement for LinkedIn using the product from the image. The image should be square for maximum visibility in the feed. Present the product in a clean, corporate setting with a muted color palette. The overall tone should be trustworthy and suitable for a B2B audience.",
        icon: <Icon path="M10 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2h-4zM8 7h8v2H8V7z" />
      },
      {
        id: 'tiktok_background',
        name: 'TikTok Video Background',
        prompt: "Create a dynamic, vertical background image for a TikTok video. The image should be visually stimulating with bold graphics and colors, leaving empty space for a person to appear in front. The product from the image should be integrated naturally into the background scene.",
        icon: <Icon path="M9 19V6l8-3v10l-8 3zM9 9l8-3" />
      },
      {
        id: 'pinterest_pin',
        name: 'Pinterest Pin Ad',
        prompt: "Design a tall, vertical Pinterest Pin. The ad should be visually appealing and informative, like a mini-infographic, combining the product image with elegant text overlays highlighting key features.",
        icon: <Icon path="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.866 8.168 6.737 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.308.678.92.678 1.854 0 1.338-.012 2.419-.012 2.747 0 .268.18.577.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" />
      },
      {
        id: 'twitter_x_ad',
        name: 'Twitter/X Image Ad',
        prompt: "Create a compelling image ad for Twitter/X using the product from the image. The ad should be in a landscape orientation for optimal display. The image should be bold and simple, optimized for quick scrolling, and designed to work well with a short, punchy caption.",
        icon: <Icon path="M12 1.002c-3.314 0-6 2.686-6 6 0 1.748.747 3.31 1.942 4.432l-1.942 1.942v-1.374c0-3.314-2.686-6-6-6s-6 2.686-6 6 2.686 6 6 6h1.374l-1.942-1.942c-1.121 1.195-2.684 1.942-4.432 1.942-3.314 0-6-2.686-6-6s2.686-6 6-6c1.748 0 3.31.747 4.432 1.942l1.942-1.942v1.374c0 3.314 2.686 6 6 6s6-2.686 6-6-2.686-6-6-6z" />
      },
      {
        id: 'snapchat_filter',
        name: 'Snapchat Geofilter',
        prompt: "Design a fun and branded Snapchat Geofilter using the product from the image. The design should be a transparent overlay for a vertical screen with graphics and text that users can apply to their photos. Feature the product in a playful, cartoonish style.",
        icon: <Icon path="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      },
      {
        id: 'youtube_thumbnail',
        name: 'YouTube Thumbnail',
        prompt: "Create a click-worthy YouTube thumbnail for a product review video. Use the product from the image as the main focus. The thumbnail should be widescreen, high-contrast, with bold, readable text that creates curiosity.",
        icon: <Icon path="M10 12l4-2-4-2v4z M20 12a8 8 0 11-16 0 8 8 0 0116 0z" />
      },
    ]
  },
  {
    name: 'Print',
    formats: [
      {
        id: 'newspaper',
        name: 'Vintage Newspaper Ad',
        prompt: "Take the product from the image and integrate it into a classic, black and white newspaper advertisement. The style should look like a vintage print ad from the 1950s, with a tall, portrait orientation, halftone textures and retro typography.",
        icon: <Icon path="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3h2m-4 3h2" />
      },
      {
        id: 'magazine_spread',
        name: 'Magazine Spread',
        prompt: "Using the product from the image, create a full-page, high-fashion magazine advertisement. The ad should have a standard vertical portrait orientation. Make the product the centerpiece, with dramatic lighting, a luxurious background, and elegant typography for a brand name.",
        icon: <Icon path="M4 6h16M4 10h16M4 14h16M4 18h16" />
      },
      {
        id: 'magazine_cover',
        name: 'Magazine Cover Mockup',
        prompt: "Create a mockup of a high-end, luxury fashion magazine cover featuring the product from the image as the central focus. The cover must have a vertical, portrait orientation, with a clean, modern design and bold typography for the magazine title and headlines.",
        icon: <Icon path="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm4 0v12h10V6H6z" />
      },
      {
        id: 'book_cover',
        name: 'Book Cover Mockup',
        prompt: "Design a book cover for a modern thriller where the product from the image is a central element of the story. The cover should have a standard portrait orientation. The title should be bold and the author's name prominent. The overall mood should be mysterious and compelling.",
        icon: <Icon path="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm4 0v12" />
      },
      {
        id: 'product_catalog',
        name: 'Product Catalog Page',
        prompt: "Create a page layout for a premium product catalog. The image should be a standard vertical page layout. Showcase the product from the image with multiple angles or variations, accompanied by detailed specifications, pricing, and a short description. The design must be clean and organized.",
        icon: <Icon path="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm2 0h14" />
      },
      {
        id: 'event_poster',
        name: 'Event Poster/Flyer',
        prompt: "Design an event poster for a product launch party, making the product from the image the star of the poster. The poster should have a standard vertical portrait orientation. The style should be modern and energetic, with bold typography, vibrant colors, and placeholder event details.",
        icon: <Icon path="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      },
      {
        id: 'vinyl_sleeve',
        name: 'Vinyl Record Sleeve',
        prompt: "Create album art for a vinyl record sleeve, integrating the product from the image in a creative, non-obvious way. The image must be perfectly square. The music genre is indie electronic, and the design should be artistic, abstract, and thought-provoking.",
        icon: <Icon path="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      },
      {
        id: 'menu_feature',
        name: 'Restaurant Menu Feature',
        prompt: "Showcase the product from the image (if it's a food or beverage item) as a special feature on a high-end restaurant menu. The menu should have an elegant design, with descriptive text next to a mouth-watering picture of the product.",
        icon: <Icon path="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      },
    ]
  },
  {
    name: 'Outdoor & Retail',
    formats: [
        {
            id: 'billboard',
            name: 'City Billboard',
            prompt: "Take the product from the image and place it on a massive billboard in a bustling, futuristic city square at night, inspired by Times Square or Shibuya Crossing. The billboard itself should be an ultra-wide, panoramic landscape format. The lighting should be vibrant and neon, reflecting off the product.",
            icon: <Icon path="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-7 0H5m2 0v-5h3v5m4 0v-5h3v5" />
          },
          {
            id: 'bus_stop',
            name: 'Bus Stop Ad',
            prompt: "Display the product from the image in a modern, minimalist bus stop advertisement mockup. The ad should be in a vertical portrait format to fit the shelter. The scene should be a clean, urban environment during a bright, sunny day. The ad should be clear and easily readable from a distance.",
            icon: <Icon path="M12 19.5v-6m0 0V6.5m0 7h7.5m-7.5 0H4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          },
          {
            id: 'packaging_mockup',
            name: 'Product Packaging Mockup',
            prompt: "Showcase the product from the image inside its packaging on a clean, modern retail shelf. The packaging should be well-lit and the focus of the image, with other blurred products in the background to create depth.",
            icon: <Icon path="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          },
          {
            id: 'subway_ad',
            name: 'Subway/Metro Ad',
            prompt: "Create an advertisement designed for a subway or metro car interior, featuring the product from the image. The ad should be a long, thin horizontal banner, placed above the windows, and designed to be eye-catching even in a crowded environment.",
            icon: <Icon path="M19 12H5m14 0-4 4m4-4-4-4" />
          },
          {
            id: 'mall_kiosk',
            name: 'Shopping Mall Kiosk',
            prompt: "Design a 3D mockup of a shopping mall kiosk or pop-up shop for the product from the image. The kiosk should be modern, inviting, and branded, with the product prominently displayed.",
            icon: <Icon path="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          },
          {
            id: 'pos_display',
            name: 'In-Store POS Display',
            prompt: "Generate an image of the product from the image on a point-of-sale (POS) display next to a cash register in a retail store. The display should be compact, eye-catching, and designed to encourage impulse buys.",
            icon: <Icon path="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          },
          {
            id: 'trade_show_booth',
            name: 'Trade Show Booth',
            prompt: "Design the backdrop for a trade show booth featuring the product from the image. The backdrop should be a large-format, wide horizontal banner designed to attract attention from across a crowded convention hall.",
            icon: <Icon path="M13 10V3L4 14h7v7l9-11h-7z" />
          },
          {
            id: 'vehicle_wrap',
            name: 'Vehicle Wrap Ad',
            prompt: "Create a mockup of a branded vehicle wrap on a modern delivery van. The design should be bold and readable from a distance, prominently featuring the product image, a company logo, and a website.",
            icon: <Icon path="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          },
    ]
  },
  {
    name: 'Lifestyle & Creative',
    formats: [
        {
            id: 'lifestyle_flatlay',
            name: 'Lifestyle Flatlay',
            prompt: "Create a top-down 'flatlay' lifestyle photo. Take the product from the image and arrange it neatly on a textured surface (like wood or marble) alongside complementary items like a coffee cup, a notebook, and a plant.",
            icon: <Icon path="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v4m0 0h-4m4 0l-5-5" />
          },
          {
            id: 'surreal_art',
            name: 'Surreal Art Piece',
            prompt: "Reimagine the product from the image as the subject of a surrealist painting. Place it in a dreamlike landscape with unexpected elements, inspired by artists like Salvador Dalí or René Magritte.",
            icon: <Icon path="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
          },
          {
            id: 'gallery_art',
            name: 'Art Gallery Piece',
            prompt: "Present the product from the image as a piece of modern art displayed in a minimalist art gallery. It should be on a pedestal or hanging on a clean white wall, with gallery-style lighting.",
            icon: <Icon path="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          },
          {
            id: 'minimalist_composition',
            name: 'Minimalist Composition',
            prompt: "Create a minimalist, abstract composition featuring the product from the image. Use geometric shapes, a limited color palette, and lots of negative space to create a sophisticated and artistic image.",
            icon: <Icon path="M5 12h14M12 5l7 7-7 7" />
          },
          {
            id: 'cyberpunk_theme',
            name: 'Cyberpunk/Sci-Fi Ad',
            prompt: "Create an ad for the product set in a dark, rainy, neon-lit cyberpunk city. Use the product from the image and integrate it naturally into a futuristic and gritty scene inspired by movies like Blade Runner.",
            icon: <Icon path="M13 10V3L4 14h7v7l9-11h-7z" />
          },
          {
            id: 'cottagecore_aesthetic',
            name: 'Cottagecore Aesthetic',
            prompt: "Place the product from the image in a cozy, rustic 'cottagecore' scene. Imagine it on a wooden table in a sunlit kitchen, surrounded by wildflowers, fresh-baked bread, and vintage crockery. The mood should be warm and idyllic.",
            icon: <Icon path="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          },
          {
            id: 'pop_art_style',
            name: 'Pop Art Style Ad',
            prompt: "Reimagine the product from the image in a bold, colorful Pop Art style, inspired by Andy Warhol. Use repeating patterns of the product in different vibrant colors, with a comic-book-like feel.",
            icon: <Icon path="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          },
    ]
  }
];
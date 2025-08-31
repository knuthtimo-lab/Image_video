import React from 'react';
import type { AdFormatCategory } from './types';

const Icon = ({ path }: { path: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
        prompt: "Place this product in a sleek digital banner ad on a modern tech news website. The banner should be horizontal and feature a clean layout, a call-to-action button, and minimal text.",
        icon: <Icon path="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm14 0H6v4h12V6z" />
      },
      {
        id: 'email_newsletter',
        name: 'Email Newsletter Ad',
        prompt: "Feature this product in an email newsletter for a minimalist lifestyle brand. The product should be presented with a soft, cozy aesthetic, surrounded by neutral-toned props on a clean background. Include some placeholder text for a headline.",
        icon: <Icon path="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      },
      {
        id: 'website_hero_luxury',
        name: 'Luxury Website Banner',
        prompt: "Design a website hero banner for a high-end, luxury brand. The product should be presented with elegance on a sophisticated, dark-themed background with minimalist typography and a premium feel.",
        icon: <Icon path="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      },
      {
        id: 'website_hero_corporate',
        name: 'Corporate Website Banner',
        prompt: "Create a professional website hero banner for a corporate or B2B business. The product should be featured in a clean, trustworthy design with a blue and white color palette, sharp lines, and space for a compelling headline.",
        icon: <Icon path="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      },
      {
        id: 'website_hero_tech',
        name: 'Tech Startup Banner',
        prompt: "Generate a website hero banner for a modern IT or tech startup. The product should be set against a dynamic, abstract background with circuit patterns or glowing data streams. The aesthetic should be innovative and clean.",
        icon: <Icon path="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      },
      {
        id: 'website_hero_futuristic',
        name: 'Futuristic Website Banner',
        prompt: "Design a futuristic website hero banner. The product should be showcased in a sleek, sci-fi inspired setting with holographic elements, neon accents, and a dark, high-tech background.",
        icon: <Icon path="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      },
    ]
  },
  {
    name: 'Social Media',
    formats: [
        {
            id: 'instagram_post',
            name: 'Instagram Post',
            prompt: "Generate a vibrant, square-format Instagram post. The product should be the hero, placed in a trendy, eye-catching setting with bright colors and a modern, clean aesthetic perfect for a lifestyle brand's feed.",
            icon: <Icon path="M3 9a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM12 15a3 3 0 100-6 3 3 0 000 6z" />
        },
        {
            id: 'facebook_post',
            name: 'Facebook Post',
            prompt: "Create a visually engaging Facebook post ad in landscape orientation. Feature the product in a realistic, relatable scenario that encourages likes and shares, with warm and inviting lighting.",
            icon: <Icon path="M17 8h2a2 2 0 00-2-2h-2v2m-5 4h.01M12 12h.01M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        },
        {
            id: 'linkedin_post',
            name: 'LinkedIn Post',
            prompt: "Design a professional and sophisticated advertisement for LinkedIn. The product should be presented in a clean, corporate setting with a muted color palette. The overall tone should be trustworthy and suitable for a B2B audience.",
            icon: <Icon path="M10 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2h-4zM8 7h8v2H8V7z" />
        },
        {
            id: 'tiktok_background',
            name: 'TikTok Video Background',
            prompt: "Create a dynamic, vertical (9:16 aspect ratio) background image for a TikTok video. The image should be visually stimulating with bold graphics and colors, leaving empty space for a person to appear in front. The product should be integrated naturally into the background scene.",
            icon: <Icon path="M9 19V6l8-3v10l-8 3zM9 9l8-3" />
        },
    ]
  },
  {
    name: 'Print',
    formats: [
      {
        id: 'newspaper',
        name: 'Vintage Newspaper Ad',
        prompt: "Integrate this product into a classic, black and white newspaper advertisement. The style should look like a vintage print ad from the 1950s, with halftone textures and retro typography.",
        icon: <Icon path="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3h2m-4 3h2" />
      },
      {
        id: 'magazine_spread',
        name: 'Magazine Spread',
        prompt: "Create a full-page, high-fashion magazine advertisement. The product should be the centerpiece, with dramatic lighting, a luxurious background, and elegant typography for a brand name.",
        icon: <Icon path="M4 6h16M4 10h16M4 14h16M4 18h16" />
      },
      {
        id: 'magazine_cover',
        name: 'Magazine Cover Mockup',
        prompt: "Feature this product on the cover of a high-end, luxury fashion magazine. The cover should have a clean, modern design with bold typography for the magazine title and headlines. The product must be the central focus.",
        icon: <Icon path="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm4 0v12h10V6H6z" />
      },
    ]
  },
  {
    name: 'Outdoor & Retail',
    formats: [
        {
            id: 'billboard',
            name: 'City Billboard',
            prompt: "Place this product on a massive billboard in a bustling, futuristic city square at night, inspired by Times Square or Shibuya Crossing. The lighting should be vibrant and neon, reflecting off the product.",
            icon: <Icon path="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-7 0H5m2 0v-5h3v5m4 0v-5h3v5" />
          },
          {
            id: 'bus_stop',
            name: 'Bus Stop Ad',
            prompt: "Display this product in a modern, minimalist bus stop advertisement mockup. The scene should be a clean, urban environment during a bright, sunny day. The ad should be clear and easily readable from a distance.",
            icon: <Icon path="M12 19.5v-6m0 0V6.5m0 7h7.5m-7.5 0H4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          },
          {
            id: 'packaging_mockup',
            name: 'Product Packaging Mockup',
            prompt: "Showcase this product inside its packaging on a clean, modern retail shelf. The packaging should be well-lit and the focus of the image, with other blurred products in the background to create depth.",
            icon: <Icon path="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          },
    ]
  },
  {
    name: 'Lifestyle & Creative',
    formats: [
        {
            id: 'lifestyle_flatlay',
            name: 'Lifestyle Flatlay',
            prompt: "Create a top-down 'flatlay' lifestyle photo. Arrange the product neatly on a textured surface (like wood or marble) alongside complementary items like a coffee cup, a notebook, and a plant.",
            icon: <Icon path="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v4m0 0h-4m4 0l-5-5" />
          },
          {
            id: 'surreal_art',
            name: 'Surreal Art Piece',
            prompt: "Reimagine this product as the subject of a surrealist painting. Place it in a dreamlike landscape with unexpected elements, inspired by artists like Salvador Dalí or René Magritte.",
            icon: <Icon path="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
          },
    ]
  }
];
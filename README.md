# Raju Landscape & Nursery

A React + Vite nursery catalog web app for Raju Landscape in Madhapur, Hyderabad. The app lets customers browse plants, add items to a basket, and send an order request through WhatsApp. It also includes a browser-based admin portal for managing plant catalog entries.

## Features

- Plant catalog with category filters and search
- Plant detail modal with care information
- Basket/order list with quantity controls
- WhatsApp order sharing with customer details and selected plants
- Admin login route and protected admin portal route
- Add, edit, delete, and feature catalog plants from the admin portal
- Catalog and basket persistence using browser storage
- Responsive UI built with Tailwind CSS classes and Motion animations

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- lucide-react icons
- motion/react animations





## WhatsApp Order Flow

Customers can add plants to the basket, fill in their name, phone number, and delivery address, then click **Order via WhatsApp**. The app opens WhatsApp with a prepared message containing:

- Customer name
- Phone number
- Selected plants and quantities
- Estimated plant subtotal
- Delivery address

The WhatsApp number is configured in `src/data/plants.ts` under `NURSERY_INFO.whatsAppNumber`.

## Getting Started

### Prerequisites

- Node.js
- npm

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

The app runs on:

```txt
http://localhost:3000
```

### Build

```bash
npm run build
```

### Type Check

```bash
npm run lint
```

## Project Structure

```txt
src/
  App.tsx                     Main app state, routes, catalog, basket, admin flow
  main.tsx                    React entry point
  index.css                   Global styles
  data/
    plants.ts                 Plant catalog and nursery information
  components/
    Header.tsx                Navigation and basket button
    NurseryHero.tsx           Landing/catalog hero
    PlantCard.tsx             Plant listing card
    PlantModal.tsx            Plant details modal
    OrderWishlist.tsx         Basket and WhatsApp order form
    AboutSection.tsx          Nursery information section
    Footer.tsx                Contact and map links
    AdminLoginModal.tsx       Admin login UI
    AdminPanel.tsx            Admin catalog management UI
  types.ts                    Shared TypeScript types
```

## Browser Storage

This app stores data locally in the browser:

- `raju_plants_catalog_v1` - Admin-edited plant catalog
- `raju_landscape_cart_v1` - Customer basket
- `raju_admin_auth_v1` - Admin session flag

Clearing browser storage resets the catalog and basket to their default state.

# 🌿 Raju Landscape & Nursery - Requirements Document

This document outlines the design, features, and technical specifications implemented for the **Raju Landscape** plant nursery digital catalog and order portal.

---

## 1. General Business Context
* **Nursery Name**: Raju Landscape & Nursery
* **Primary Focus**: Digital plant catalog & smart procurement assistant.
* **Target Audience**: Hyderabad citizens (Madhapur, Jubilee Hills, Gachibowli, etc.) wanting low-effort residential green plants, balconies setups, and kitchen gardens.
* **Operational Model**: Direct self-service plant booking where final selection lists compile on-browser and route to the nursery staff on **WhatsApp** for instant slot delivery confirmation.

---

## 2. Core Operational Requirements

### A. Plant Catalog Browsing & Search
* Interactive client-side plant lists containing category labels, high-res previews, brief descriptions, price indicators, and environmental attributes (Sunlight, Water, Pot/bag sizes).
* Multi-category quick-chip filtering:
  * Flowering Plants
  * Decorative Plants
  * Indoor Plants
  * Vegetable Plants
  * All Plants
* Case-insensitive instant search mechanism looking up item names, descriptions, and scientific nomenclature.

### B. Interactive Basket & Order Formulation
* **Adjustable Plant Quantities**: Customers can manually adjust plant units directly through numerical input fields or stepper triggers (`+`/`-`) on both individual catalog cards and inside the order panel.
* Persistent local storage backups so basket selections preserve over browser tab closures.

### C. WhatsApp Inquiry Routing
* Formulated integration with the **WhatsApp URL API** to automatically generate a pre-arranged inquiry summary containing:
  1. Customer Contact Name
  2. Phone Number
  3. Ordered Varieties List (formatted with quantity multiplier e.g. `1. Rose Plant × 2`)
  4. Precise Hyderabad Delivery Address

---

## 3. Dedicated About Section Specifications
The "About Raju Landscape" area presents the following exact parameters formatted beautifully to ensure clarity and high readability:
1. **Nursery Name**: Raju Landscape
2. **Location / Address**: Plot No. 42, Hitech City Main Rd, near Madhapur Metro Station, Madhapur, Hyderabad, Telangana 500081
3. **Contact Number**: +91 98480 22338
4. **Email Address**: rajulandscape@gmail.com
5. **Short Business Description**: *"Established with a passion for greenery, Raju Landscape is Hyderabad's premium plant nursery in Madhapur. We specialize in bringing handpicked ornamental, flowering, indoor, and kitchen garden plants to homes and offices."*

---

## 4. Secure Catalog Management (Admin Panel)

* **Admin Authentication Gateway**: Protected dashboard accessed via a user-friendly secure Login Pop-up.
* **Default Authorized Credentials**:
  * **Username**: `admin`
  * **Password**: `admin`
* **Route & View Protection**: Protected states prevent unauthorized catalog updates until a valid login session is authenticated. Session status persists beautifully in browser cache.
* **Catalog Operations**: Is fully capable of **CRUD** (Create, Read, Update, Delete) catalog items:
  1. **Add Plant**: Provide plant name, select category, input price, configure care tags, draft description, and upload device photo (encoded instantly as safe base64) or paste external web link.
  2. **Update Plant**: Modify titles, categories, prices, pot dimensions, descriptions, or visual images.
  3. **Delete Plant**: Safely purge dynamic products from inventory with interactive confirmation prompts to avoid mistakes.

---

## 5. Visual Identity & Cultural Design Guidelines
* **Warm Organic / Cultural Aesthetic Theme**: Natural, earthy hues highlighting traditional botanical garden structures:
  * **Forest Green accents**: `#2D4A22` (primary brand background color, icons, actions).
  * **Warm Khaki/Chalk background**: `#F5F5F0` & `#FAF9F6` (extremely eye-safe reading landscape).
  * **Aesthetic Serif Headings**: Elegant, high-contrast serif typeface `"Playfair Display"` paired with modern crisp sans-serif `"Inter"` and `"JetBrains Mono"` for clear operational coordinates.
* **Enhanced Mobile-First Responsiveness**: Designed to fully adapt to mobile breakpoints (`320px–768px`) for effortless finger-tap selections, quick-touch quantity sliders, simple layout flows, and fast asset loading.

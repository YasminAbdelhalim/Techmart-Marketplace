# TechMart | Electronics Marketplace

A responsive e-commerce storefront built with HTML, CSS, and vanilla JavaScript. Products are loaded from a local JSON catalog and rendered dynamically as cards, with client-side filtering and a shopping cart that is saved in the browser.

**Live demo:** [yasminabdelhalim.github.io/Techmart-Marketplace](https://techmart-marketplace-neon.vercel.app/)]([https://yasminabdelhalim.github.io/Techmart-Marketplace/](https://techmart-marketplace-neon.vercel.app/))

![TechMart screenshot](./assets/screenshot.png)

## Features

- Dynamic product grid rendered from a local JSON file
- Live text search by product name or category
- Multi-select category filters (Phones, Laptops, Accessories)
- Maximum price slider with a live value label
- Search, category, and price filters work together at the same time
- "No products found" message when nothing matches
- Shopping cart side panel with add, remove, and quantity controls
- Cart total and item counter that update automatically
- Cart saved in `localStorage`, so it survives page refreshes
- Responsive grid layout with keyboard-friendly focus styles

## Tech Stack

| Area | Technology |
|---|---|
| Structure | HTML5 (semantic elements) |
| Styling | CSS3 (Grid, Flexbox, transitions) |
| Logic | JavaScript ES6+ (fetch, async/await, array methods, event delegation) |
| Storage | Web Storage API (`localStorage`) |
| Hosting | GitHub Pages |

## Project Structure

```
Techmart-Marketplace/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── data/
│   └── products.json
└── assets/
    └── (product images)
```

## Getting Started

1. Clone the repository:

```bash
   git clone https://github.com/YasminAbdelhalim/Techmart-Marketplace.git
```

2. Open the folder in VS Code.
3. Start the project with the **Live Server** extension.

> A local server is required because browsers block `fetch` requests for local files when `index.html` is opened directly.

## How It Works

- **State and render:** all products are stored in one array, and a single `renderProducts()` function redraws the grid whenever the data changes.
- **Combined filtering:** one `applyFilters()` function reads the search box, the selected categories, and the price slider, then keeps only the products that match all three.
- **Cart persistence:** only `{ id, quantity }` is saved in `localStorage`, so names, prices, and images always come from the product catalog.
- **Event delegation:** one click listener on the grid handles every "Add to Cart" button, including cards created after filtering.

## What I Learned

- Loading and rendering data from a JSON file
- Structuring JavaScript around state and a render function
- Combining several filters in a single function
- Persisting data with `localStorage`
- Debugging case-sensitive file paths when deploying
- Publishing a static site with Git and GitHub Pages

## Future Improvements

- Sort products by price (low to high, high to low)
- Product details modal
- Checkout summary page

## Author

**Yasmin Abdelhalim**
GitHub: [@YasminAbdelhalim](https://github.com/YasminAbdelhalim)

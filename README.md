# NFT List

This is a sample web application displays the latest NFT listings in a grid format and allows users to search for specific NFTs.

## Technologies Used

- React
- Vite (for fast development)
- TypeScript
- TailwindCSS (for styling)

## Features

- On load, show first 20 NFT listings in a grid, the grid should be responsive
- Each card consists of an image, name and price.
- Show more listing as user scrolls down the page
- Virtualize the grid to improve performance
- Add a search bar that filter NFTs on client side, only the nfts match the search string
  should show up
- Retry on api failure since it’s public faced and have rate limit
  please readme

## Installation

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Open the app in your browser at [http://localhost:3000](http://localhost:3000)

## Deployment

To deploy the app in production, you can use the following command:

```
npm run build
```

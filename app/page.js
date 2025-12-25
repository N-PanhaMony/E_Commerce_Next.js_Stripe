import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

// Function to fetch all products from the API route
export async function getProducts() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  console.log(baseURL);
  
  const response = await fetch(baseURL +'/api/products')
  const products = await response.json()
  return products
}

export default async function Home() {
  
  // Fetch products from Stripe via API
  const products = await getProducts()
  
  let painting = null   // Static painting
  let stickers = []     // Dynamic stickers

  // Separate painting from stickers
  for (let prod of products) {
    if (prod.name === 'Angkor Wat') {
      painting = prod
      continue
    }
    stickers.push(prod)
  }

  return (
    <div>
      <ImageBanner/>  {/* Banner at the top */}
      <section>
        {/* Pass painting as static, stickers as dynamic */}
        <Products painting={painting} stickers={stickers}/>
      </section>
    </div>
  );
}

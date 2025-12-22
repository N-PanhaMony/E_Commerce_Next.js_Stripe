import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

export async function getProducts() {
  const response = await fetch('http://localhost:3000/api/products')
  const products = await response.json()
  return products
}

export default async function Home() {

  const products = await getProducts()
  console.log(products)

  return (
    <div>
      <ImageBanner/>
      <section>
        <Products/>
      </section>
    </div>
  );
}

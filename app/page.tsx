import Product from "./components/Product";
import getProducts from "@/util/getProducts";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Product {...product} key={product.id} />
      ))}
    </main>
  );
}

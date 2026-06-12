import { getAllProduct } from "@/services/productService";
import ProductShowcase from "@/components/product/ProductShowcase";

export default async function Home() {
  const productList = await getAllProduct();

  return (
    <ProductShowcase products={productList ?? []} />
  );
}
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";

function Shop() {
  const { products, loading, error } = useProducts();

  const handleAddToCart = (product, quantity) => {
   
    console.log("Add to cart:", product.title, quantity);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  return (
    <section>
      <h1>Shop</h1>
      <div>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

export default Shop;
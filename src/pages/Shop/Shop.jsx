import useProducts from "../../hooks/useProducts";

function Shop() {
    const {products,loading,error} = useProducts();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong: {error}</p>;

    return (
        <div>
            <h1>Shop</h1>
            <p>Loaded {products.length} products</p>
        </div>
    );
}

export default Shop;
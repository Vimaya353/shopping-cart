import {useState,useEffect} from "react";

function useProducts() {
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchProducts() {
            try{
                const response = await fetch ("https://fakestoreapi.com/products", {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }

                const data = await response.json();
                setProducts(data);
            } catch(err) {
                if (err.name !== "AbortError") {
                  setError(err.message);
                }
            } finally {
              if (!controller.signal.aborted) {
                setLoading(false);
              }
            }
        }

        fetchProducts();
        return() => controller.abort();
    }, []);

    return {products,loading,error};
}

export default useProducts;
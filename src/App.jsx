import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { CartProvider } from "./context/CartContext";

function App() {
    return (
        <CartProvider>
          <Navbar/>
          <main>
            <Outlet/>
          </main>
        </CartProvider>
    );
}

export default App;
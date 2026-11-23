import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <section className={styles.hero}>
      <h1>Welcome to MyStore</h1>
      <p>Quality products at fair prices. Browse our collection today.</p>
      <Link to="/shop" className={styles.cta}>
        Start shopping
      </Link>
    </section>
  );
}

export default Home;
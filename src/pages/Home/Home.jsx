import {Link} from "react-router-dom";

function Home() {
    return (
        <section>
            <h1>Welcome to MyStore</h1>
            <p>Quality products at fair prices. Browse our collection today.</p>
            <Link to="/shop">Start shopping</Link>
        </section>
    );
}

export default Home;
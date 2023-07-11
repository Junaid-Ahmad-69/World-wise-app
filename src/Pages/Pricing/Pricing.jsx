import styles from "./../Product/Product.module.css"
import {Navbar} from "../../Components/Navbar/Navbar.jsx";

export default function Pricing() {
    return (
        <main className={styles.product}>
            <Navbar/>
            <section>
                <div>
                    <h2>
                        Simple pricing.
                        <br />
                        Just $9/month.
                    </h2>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
                        labore mollitia iusto. Recusandae quos provident, laboriosam fugit
                        voluptatem iste.
                    </p>
                </div>
                <img src="../../../public/images/img-2.jpg" alt="overview of a large city with skyscrapers" />
            </section>
        </main>
    );
}

import { useContext, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import { CartContext } from "../context/CartContextProvider";
import { DeviceContext } from "../context/DeviceContextProvider";
import Link from "next/link";
import styles from "../styles/components/header.module.scss";
import Logo from "../assets/logo.png";
import Image from "next/image";
import { ButtonGroup } from "./Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faShoppingCart,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useInView } from "react-intersection-observer";
import { Container } from "./Containers";
import { useCategories } from "../hooks/categories";
import { useRouter } from "next/router";

export default function Header() {
  const [user] = useContext(UserContext);
  const [ref, inView] = useInView();

  return (
    <div className={styles.header} ref={ref}>
      <div className={styles["top"]}>
        <div className={styles["top-logo"]}>
          <Image
            src={Logo}
            alt="khanekura"
            layout="fill"
            objectFit="scale-down"
            priority="false"
          />
        </div>
        <div className={styles["top-menu"]}>
          <SearchBar />

          <div className={styles["top-menu__user-options"]}>
            {user.isLogged ? (
              <div className="item">
                <span className={styles["username"]}>
                  Hello, {`${user.data.firstName} ${user.data.lastName}`}
                </span>
                <span>
                  <Link href="/logout">
                    <a>Logout</a>
                  </Link>
                </span>
                <span>
                  <Link href="/user">
                    <a>View profile</a>
                  </Link>
                </span>
              </div>
            ) : (
              <div className="item">
                <span>
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </span>
                /{"  "}
                <span>
                  <Link href="/signup">
                    <a>Signup</a>
                  </Link>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* navbar*/}
      <NavBar />
    </div>
  );

  //nav
  function NavBar() {
    const { categories, isLoading } = useCategories();
    const [showNav, setShowNav] = useState(false);
    const [isMobile] = useContext(DeviceContext);

    const router = useRouter();
    const { slug } = router.query;

    const MobileNav = () => {
      return (
        <nav className={styles["mobile-nav"]}>
          <button
            className={styles["quit-btn"]}
            onClick={() => setShowNav(false)}
          >
            <FontAwesomeIcon icon={faTimesCircle} size="2x" />
          </button>
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>

            {/* fetch all categories data freom api */}
            {isLoading && <span>Loading...</span>}
            {categories?.map((category) => (
              <li key={category.id}>
                <Link href={`/categories/${category.slug}`}>
                  <a>{category.title}</a>
                </Link>
              </li>
            ))}

            <li>
              <Link href="/">
                <a>About Us</a>
              </Link>
            </li>
          </ul>
        </nav>
      );
    };

    const DesktopNav = () => {
      return (
        <nav>
          {isMobile && (
            <button
              className={styles["quit-btn"]}
              onClick={() => setShowNav(false)}
            >
              <FontAwesomeIcon icon={faTimesCircle} size="2x" />
            </button>
          )}
          <ul>
            <li>
              <Link href="/">
                <a className={`${router.asPath==="/" ? styles["active"]:""}`}>Home</a>
              </Link>
            </li>

            {/* fetch all categories data freom api */}
            {isLoading && <span>Loading...</span>}
            {categories?.map((category) => (
              <li key={category.id}>
                <Link href={`/categories/${category.slug}`}>
                  <a className={`${category.slug === slug ? styles["active"] : ""}`}>{category.title}</a>
                </Link>
              </li>
            ))}

            <li>
              <Link href="/about-us">
                <a className={`${router.asPath === "/about-us" ? styles['active']:''}`}>About Us</a>
              </Link>
            </li>
          </ul>
        </nav>
      );
    };
    return (
      <div className={`${styles["bottom"]} ${!inView ? styles["sticky"] : ""}`}>
        <Container>
          <div className={styles["nav-container"]}>
            {isMobile && (
              <button
                className={styles["hamburger"]}
                onClick={() => setShowNav(!showNav)}
              >
                <FontAwesomeIcon icon={faBars} size="2x" />
              </button>
            )}
            {showNav && isMobile && <MobileNav />}
            {!isMobile && <DesktopNav />}
            <Cart />
          </div>
        </Container>
      </div>
    );
  }

  function Cart() {
    const [cartData] = useContext(CartContext);

    return (
      <div className={styles["cart"]}>
        <Link href="/user/cart">
          <a>
            <span className={styles["product-no"]}>
              {cartData?.cartProducts.length}
            </span>
            <FontAwesomeIcon size="2x" icon={faShoppingCart} />
          </a>
        </Link>
      </div>
    );
  }
}

const SearchBar = () => {
  return (
    <form>
      <ButtonGroup>
        <input type="text" placeholder="eg: momo" />
        <button type="submit">
          <span className={styles["icon"]}>
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </span>
        </button>
      </ButtonGroup>
    </form>
  );
};

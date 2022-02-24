import styles from "../styles/components/footer.module.scss";

export default function Footer() {
  return (
    <div className={styles["footer"]}>
      KhaneKura &copy; 2022
      <div className={styles["credit"]}>
        <small>
          Developed by{" "}
          <a
            href="https://facebook.com/aaces.rae"
            target="_blank"
            referrer="noreferrer"
          >
            Aashish Rai
          </a>
        </small>
      </div>
    </div>
  );
}

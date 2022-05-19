import styles from "../styles/components/footer.module.scss";

export default function Footer() {
  return (
    <div className={styles["footer"]}>
      KhaneKura &copy; 2022
      <div className={styles["credit"]}>
        <small>your site credit here</small>
      </div>
    </div>
  );
}

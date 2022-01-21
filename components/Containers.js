import styles from "../styles/components/container.module.scss";

export const FlexContainer = ({ children, modifierClass }) => {
  return (
    <div className={styles["flex-container"] + " " + styles[modifierClass]}>
      {children}
      {modifierClass}
    </div>
  );
};

FlexContainer.defaultProps = {
  modifierClass: "",
};

export const Container = ({ children, fluid }) => {
  return (
    <div
      className={`${styles["container"]} ${
        fluid ? styles["container--fluid"] : ""
      }`}
    >
      {children}
    </div>
  );
};

export const Section = {
  Container: ({ children }) => {
    return <section className={styles["page-section"]}>{children}</section>;
  },
  Title: ({ title, children }) => {
    return (
      <div className={styles["page-section__title"]}>
        <h2>{title}</h2>
        {children}
      </div>
    );
  },
  Divider: ({ children }) => {
    return <div className={styles["section-divider"]}>{children}</div>;
  },
};

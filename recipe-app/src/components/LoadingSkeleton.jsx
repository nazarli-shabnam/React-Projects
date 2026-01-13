import styles from "./LoadingSkeleton.module.css";

export function RecipeCardSkeleton() {
  return (
    <div className={styles.recipeCardSkeleton}>
      <div className={styles.imageSkeleton} />
      <div className={styles.contentSkeleton}>
        <div className={styles.titleSkeleton} />
        <div className={styles.textSkeleton} />
        <div className={styles.buttonSkeleton} />
      </div>
    </div>
  );
}

export function RecipeDetailsSkeleton() {
  return (
    <div className={styles.detailsSkeleton}>
      <div className={styles.headerSkeleton}>
        <div className={styles.titleSkeleton} style={{ width: "70%" }} />
        <div className={styles.imageSkeleton} style={{ height: "300px" }} />
      </div>
      <div className={styles.infoSkeleton}>
        <div className={styles.badgeSkeleton} />
        <div className={styles.badgeSkeleton} />
        <div className={styles.badgeSkeleton} />
      </div>
      <div className={styles.sectionSkeleton}>
        <div className={styles.sectionTitleSkeleton} />
        <div className={styles.listSkeleton}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={styles.listItemSkeleton} />
          ))}
        </div>
      </div>
    </div>
  );
}


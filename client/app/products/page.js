import SimilarStores from '../components/similar-products';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  return (
    <div className={`max-w-7xl mx-auto mt-28 ${styles.container}`}>
      <div className={styles.backButton}>
        <button>&larr; Back</button>
      </div>
      <div className={styles.content}>
        <div className={styles.textSection}>
          <h1>Chiku Brown Printed Cotton Zari Weaving</h1>
          <p>Red floral print a-line Ethnic Dress</p>
          <p>V-neck, Short, puff sleeve</p>
          <p>Midi length in flared hem</p>

          <h2>Niha Chronicles</h2>
          <p>Lorem Ipsum is a dummy block of text used in publishing and graphic design to fill gaps in the page before the actual words are added to the finished product.</p>

          <h3>Fit & Care</h3>
          <p>Fit•Any face shape&nbsp;&nbsp; Price•$79.99</p>
          <p>Material & Care•100% Cotton&nbsp;&nbsp; Price•Machine Wash</p>

          <h3>Specifications</h3>
          <p>Fabric•Cotton&nbsp;&nbsp; Hemline•Flared</p>
          <p>Knit or Woven•Woven&nbsp;&nbsp; Length•Midi&nbsp;&nbsp; Main Trend•Floral</p>
          <p>Neck•V-Neck&nbsp;&nbsp; Occasion•Daily&nbsp;&nbsp; Pattern•Printed</p>
        </div>
        <div className={styles.imageSection}>
          <img src="/images/main-image.jpg" alt="Main product" className={styles.mainImage} />
          <div className={styles.thumbnailImages}>
            <img src="/images/thumb1.jpg" alt="Thumbnail 1" />
            <img src="/images/thumb2.jpg" alt="Thumbnail 2" />
            <img src="/images/thumb3.jpg" alt="Thumbnail 3" />
          </div>
        </div>
      </div>
      <div>
        <SimilarStores/>
      </div>
    </div>
  );
}

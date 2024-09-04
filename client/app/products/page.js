import React from 'react';
import styles from './ProductDetail.module.css';
import SimilarStores from '../components/similar-products';

const ProductPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton}>← Back</button>
      </div>

      <div className={styles.mainContent}>
        {/* Mobile view image */}
        <div className={`${styles.imageSection} ${styles.imageSectionMobile}`}>
          <img src="/assets/product.png" alt="Dress Front" className={styles.mainImage} />
        </div>

        {/* Text content */}
        <div className={styles.textSection}>
          <h2 className={styles.title}>Chiku Brown Printed Cotton Zari Weaving</h2>
          <p className={styles.subtext}>Red floral print a-line Ethnic Dress</p>
          <ul className={styles.features}>
            <li>V-neck, Short, puff sleeve</li>
            <li>Midi length in flared hem</li>
          </ul>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Niha Chronicles</h3>
            <p className={styles.loremText}>Lorem Ipsum is a dummy block of text used in publishing and graphic design to fill gaps in the page before the actual words are added to the finished product.</p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Fit & Care</h3>
            <p className={styles.fitInfo}>Fit: Any face shape &bull; Price: $79.99</p>
            <p className={styles.fitInfo}>Material & Care: 100% Cotton &bull; Machine Wash</p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Specifications</h3>
            <p className={styles.specInfo}>Fabric: Cotton &bull; Hemline: Flared</p>
            <p className={styles.specInfo}>Knit or Woven: Woven &bull; Length: Midi &bull; Main Trend: Floral</p>
            <p className={styles.specInfo}>Neck: V-Neck &bull; Occasion: Daily &bull; Pattern: Printed</p>
          </div>
        </div>

        {/* Desktop view images */}
        <div className={`${styles.imageSection} ${styles.imageSectionDesktop}`}>
          <img src="/assets/product.png" alt="Dress Front" className={styles.mainImage} />
          <div className={styles.sideImages}>
            <img src="/assets/product.png" alt="Dress Back" />
            <img src="/assets/product.png" alt="Dress Side" />
          </div>
        </div>
      </div>

      <div className='mb-40'>
        <SimilarStores />
      </div>

      <div className={styles.footer}>
        <div className={`hidden lg:block ${styles.footerSection}`}>
          <h3>Select Size</h3>
          <div className={styles.buttonGroup}>
            <button>XS</button>
            <button>S</button>
            <button className={styles.selected}>M</button>
            <button>L</button>
            <button>XL</button>
            <button>XXL</button>
          </div>
        </div>
        <div className={`hidden lg:block ${styles.footerSection}`}>
          <h3>Select Color & Texture</h3>
          <div className={styles.colorOptions}>
            <button className={`${styles.colorButton} ${styles.selectedColor}`} />
            <button className={styles.colorButton} />
            <button className={styles.colorButton} />
          </div>
        </div>
        <div className={`hidden lg:block ${styles.footerSection}`}>
          <h3>Delivery</h3>
          <p className={styles.deliveryInfo}>Delivery in 3 days &bull; Machine Wash</p>
        </div>
        <div className={`hidden lg:block ${styles.footerSection}`}>
          <h3>Fit & Care</h3>
          <p className={styles.fitInfoFooter}>Upto Any face shape &bull; $66</p>
        </div>

        {/* Price displayed only on mobile */}
        <div className={`block lg:hidden ${styles.mobilePrice}`}>
          <p>$79.99</p>
        </div>

        <div className={styles.footerButtons}>
          <button className={styles.addToCart}>Add to Cart</button>
          <button className={styles.shopNow}>Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

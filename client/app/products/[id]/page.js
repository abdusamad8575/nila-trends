
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../ProductDetail.module.css';
import SimilarStores from '../../components/similar-products';
import { useParams, useRouter } from 'next/navigation';

const ProductPage = () => {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    console.log('ids', id);

    const [product, setProduct] = useState(null);

    const fetchProduct = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/client/${id}`)

            .then((response) => {
                console.log('response', response.data);
                setProduct(response.data);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    }


    useEffect(() => {
        if (id) {
            fetchProduct()
        }
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={() => router.back()}>← Back</button>
            </div>

            <div className={styles.mainContent}>
                {/* Mobile view image */}
                <div className={`${styles.imageSection} ${styles.imageSectionMobile}`}>
                    <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${product?.image[0]}`} alt={product?.name} className={styles.mainImage} />
                </div>

                {/* Text content */}
                <div className={styles.textSection}>
                    <h2 className={styles.title}>{product?.name}</h2>
                    {/* <h3 className={styles.sectionTitle}>{product.brand}</h3> */}
                    <p className={styles.subtext}>{product?.subheading}</p>
                    <ul className={styles.features}>
                        {product?.feature?.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Niha Chronicles</h3>
                        <p className={styles.loremText}>{product?.description}</p>
                    </div>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Fit & Care</h3>
                        {product?.fitAndCare?.map((fit, index) => (
                            <p key={index} className={styles.fitInfo}>{fit}</p>
                        ))}
                    </div>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Specifications</h3>
                        {product?.spec?.map((spec, index) => (
                            <p className={styles.specInfo}>{spec}</p>
                        ))}
                    </div>
                </div>

                {/* Desktop view images */}
                <div className={`${styles.imageSection} ${styles.imageSectionDesktop}`}>
                    <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${product?.image[0]}`} alt={product?.name} className={styles.mainImage} />
                    <div className={styles.sideImages}>
                        {product?.image?.slice(1).map((img, index) => (
                            <img key={index} src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${img}`} alt={`${product?.name} ${index}`} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mb-40">
                <SimilarStores similarProducts={product.similarProduct} />
            </div>

            {/* Footer and other sections remain unchanged */}
            <div className={styles.footer}>
                <div className={`hidden lg:block ${styles.footerSection}`}>
                    <h3>Select Size</h3>
                    <div className={styles.buttonGroup}>

                        {/* <button className={styles.selected}>M</button> */}
                        {product.sizes.map((sizeObj) => (
                            <button key={sizeObj.sizes}>{sizeObj.sizes} </button>
                        ))}

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
                    <p className={styles.fitInfoFooter}>{product.fitAndCare[0]} &bull; AED:{product.sale_rate}</p>
                </div>

                {/* Price displayed only on mobile */}
                <div className={`block lg:hidden ${styles.mobilePrice}`}>
                    <p>AED:{product.sale_rate}</p>
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


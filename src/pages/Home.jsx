import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../slices/productSlice';
import ProductCard from '../components/ProductCard';
import '../styles/pages_styles/Home.scss';
import Loading from '../components/Loading';

function Home() {
    const dispatch = useDispatch();
    const allProducts = useSelector(store => store.productSlice.products);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [onlyFeatured, setOnlyFeatured] = useState(false);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        filterProducts();
    }, [allProducts, selectedTag, selectedBrand, onlyFeatured]);


    const filterProducts = () => {
        let result = [...allProducts];

        if (selectedTag) {
            result = result.filter(p => p.tags?.includes(selectedTag));
        }

        if (selectedBrand) {
            result = result.filter(p => p.brand === selectedBrand);
        }

        if (onlyFeatured) {
            result = result.filter(p => p.is_featured);
        }

        setFilteredProducts(result);
    };

    const availableTags = Array.from(new Set(allProducts.flatMap(p => (Array.isArray(p.tags) ? p.tags : []))));
    const availableBrands = Array.from(new Set(allProducts.map(p => p.brand).filter(Boolean)));
    if (!allProducts.length) return <Loading />;

    return (
        <div className="home-container">
            <div className="filter-bar">
                <select value={selectedTag || ''} onChange={(e) => setSelectedTag(e.target.value || null)}>
                    <option value="">Tüm Etiketler</option>
                    {availableTags.length > 0 && availableTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>

                <select value={selectedBrand || ''} onChange={(e) => setSelectedBrand(e.target.value || null)}>
                    <option value="">Tüm Markalar</option>
                    {availableBrands.length > 0 && availableBrands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>

                <label className="checkbox-wrapper">
                    <input
                        type="checkbox"
                        checked={onlyFeatured}
                        onChange={() => setOnlyFeatured(prev => !prev)}
                    />
                    <span>Yalnız Öne Çıxanlar</span>
                </label>
            </div>

            <div className='product_list'>
                {filteredProducts.map(prod => (
                    <ProductCard
                        key={prod.id}
                        id={prod.id}
                        image={prod.image}
                        title={prod.title}
                        description={prod.description}
                        category={prod.category}
                        price={prod.price}
                        quantity={prod.quantity}
                        quality={prod.quality}
                        gallery={prod.gallery}
                        total_quantity={prod.total_quantity}
                        tags={prod.tags}
                        brand={prod.brand}
                        stock_status={prod.stock_status}
                        is_featured={prod.is_featured}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;

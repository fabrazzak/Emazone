import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useProducts();
    const [cart, setCart] = useCart();
    const [pagesCount,setPagesCount]=useState(0);
    const [pages, setpages]=useState(0);
    const [size,setSize]=useState(10);
 
    const arrayPagesCont = [...Array(pagesCount).keys()];
  

    useEffect(() => {
        fetch(`http://localhost:5000/product?pages=${pages}&size=${size}`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [pages,size]);


    useEffect(()=>{
        fetch('http://localhost:5000/product-count')
        .then(res =>res.json())
        .then(data => {
            const count=data.count;
            const pages=Math.ceil(count/size);
            setPagesCount(pages);
        })
    },[size])

  

    const handleAddToCart = (selectedProduct) => {
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }

        setCart(newCart);
        addToDb(selectedProduct._id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
                <div >
                    {
                        


                        arrayPagesCont.map(number => <button className={pages == number ? `btn-link bg-warning ms-3 px-3 mb-3 py-2 rounded border-2 text-decoration-none text-white fs-5 border-warning`:`btn-link bg-white ms-3 px-3 mb-3 py-2 rounded border-2 text-decoration-none fs-5 border-warning`} onClick={()=>setpages(number)} key={number}> {number + 1 }</button>)
                    }
                   
                    <select defaultValue="10" className='btn-link bg-white ms-3 px-3 mb-3 py-2 rounded border-2 text-decoration-none fs-5 border-warning' onChange={(e)=>setSize(e.target.value)}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>

                </div>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/orders">
                        <button>Review Order </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
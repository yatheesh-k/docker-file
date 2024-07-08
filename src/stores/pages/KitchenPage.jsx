import React, { useState } from 'react'
import { kitchenData } from '../data/kitchen'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const KitchenPage = () => {

    const [selectedProduct, setSelectedProduct] = useState([])

    const companyHandler = (mango) => {
        if (selectedProduct.includes(mango)) {
            setSelectedProduct(selectedProduct.filter(item => item !== mango))
        } else {
            setSelectedProduct([...selectedProduct, mango])
        }
    }


    const filteredProduct = selectedProduct.length === 0 ?
        kitchenData : kitchenData.filter((orange) => selectedProduct.includes(orange.brand))

    return (
        <>
            <Navbar />
            <img className='image' src="/banner.jpeg" alt="" />
            <div className="fullpage">

                <div className='pageSection'>
                    {filteredProduct.map((item) => {
                        return (
                            <div>

                                <Link to={`/kitchen/${item.id}`}>
                                    <div className="pageImg">
                                        <img src={item.image} alt="" />
                                    </div>
                                </Link>
                                <div className="proModel">
                                    {item.brand}, {item.model}
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
            <Footer />
        </>
    )
}

export default KitchenPage
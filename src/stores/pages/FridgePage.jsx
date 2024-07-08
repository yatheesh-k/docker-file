import React, { useState } from 'react'
import { fridgeData } from '../data/fridge'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

const FridgePage = () => {

    const [selectedProduct, setSelectedProduct] = useState([])

    const companyHandler = (mango) => {
        if (selectedProduct.includes(mango)) {
            setSelectedProduct(selectedProduct.filter(item => item !== mango))
        } else {
            setSelectedProduct([...selectedProduct, mango])
        }
    }


    const filteredProduct = selectedProduct.length === 0 ?
        fridgeData : fridgeData.filter((orange) => selectedProduct.includes(orange.brand))

    return (
        <>
            <Navbar />
            <img className='image' src="/banner.jpeg" alt="" />
            <div className="fullpage">

                <div className='pageSection'>
                    {filteredProduct.map((item) => {
                        return (
                            <div>

                                <Link to={`/fridge/${item.id}`}>
                                    <div className="pageImg">
                                        <img src={item.image} alt="" />
                                    </div>
                                </Link>
                                <div className="proModel">
                                    {item.brand}, {item.model}
                                </div>
                                <div className="proModel2">
                                    <FontAwesomeIcon icon={faIndianRupeeSign}/>
                                    {item.price}
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

export default FridgePage
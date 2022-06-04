import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Icon, Col, Card, Row} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import {categories} from './Sections/Datas'

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0 )
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters , setFilters ] = useState({
        categories: [],
        price: [ ]
    })

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body)
        
    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body).then(response => {
            if (response.data.success) {
                if(body.loadMore){
                    setProducts([...Products, ...response.data.productInfo])
                }else {
                    setProducts(response.data.productInfo)
                }
                setPostSize(response.data.postSize)
            } else {
                alert("failed upload")
            }
        }) 
    }

    const loadMoreHandler = () => {
        let skip = Skip + Limit

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body)
        setSkip(skip)
    }

    const renderCards = Products.map((product, index) => {
        return <Col lg={6} md={8} xs={24} key={index}>
        <Card
             cover={<ImageSlider images={product.images} /> }
        > 
        <Meta
            title={product.title}
            description={`$${product.price}`}
        /> 
        </Card>
        </Col>
    })
    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)
        setSkip(0)
    }

    const handleFilters = (filters, leibie) => {

        const newFilters = {...Filters}
        newFilters[leibie] = filters

        showFilteredResults(newFilters)
    }

    return (
    <div style={{width: '75%', margin: '3rem auto'}}>
        <div style={{textAlign: 'center'}}>
            <h2> Let`s buy Everything <Icon type='rocket' /></h2>
        </div>
        
        {/* Filter */}


        {/* Check Box */}
        <CheckBox list={categories} handleFilters={filters => handleFilters(filters, 'categories')}/>

        {/* RadioBox */}

        {/* Search */}

        {/* Cards */}
  



        <Row gutter={[16,16]}>
             {renderCards}
        </Row>
        {PostSize >= Limit &&
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreHandler}>Load More</button>
            </div>
        }
        
    </div>
    )
}

export default LandingPage

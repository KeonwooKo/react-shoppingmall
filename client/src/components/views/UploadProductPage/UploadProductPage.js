import React, { useState } from 'react'
import {Typography, Button, Form, Input} from 'antd'
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const{ TextArea } = Input;

const Categories = [
    { key: 1, value: 'Shirt'},
    { key: 2, value: 'T-Shirt'},
    { key: 3, value: 'Hood'},
    { key: 4, value: 'Coat'},
    { key: 5, value: 'Pants'},
    { key: 6, value: 'Underwear'}
]
function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Category, setCategory] = useState(1)
    const [Images, setImages] = useState([])


    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }
    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }
    const categoryChangeHandler = (event) => {
        setCategory(event.currentTarget.value)
    }
    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const submitHandler = (event) => {
        event.preventDefault();
        if(!Title || !Description || !Price || !Category || !Images){
            return alert("please fill all  fields")
        }
        //서버에 채운 값들을 보내준다
        const body = {
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            categories: Category
        }
        
        Axios.post('/api/product', body).then(response => {
            if(response.data.success){
                alert("Upload Successful")
                props.history.push('/')
            } else {
                alert("Upload Failed")
            }
        }
        )
    }

  return (
    <div style={{maxWidth: '700px', margin: '2rem auto'}}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
              <h2> upload product </h2>
        </div>

    <Form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updateImages} />
        <br/>
        <br/>
        <label>name</label>
        <Input value={Title} onChange={titleChangeHandler}/>
        <br/>
        <br/>
        <label>description</label>
        <TextArea value={Description} onChange={descriptionChangeHandler}/>
        <br/>
        <br/>
        <label>price</label>
        <Input type='number' value={Price} onChange={priceChangeHandler} />
        <br/>
        <br/>
        <select onChange={categoryChangeHandler} value={Category}>
            {Categories.map(item => (
                <option key={item.key} value={item.key}>{item.value}</option>
            ))}
            
        </select>
        <br/>
        <br/>

        <Button htmlType='submit'>
            confirm 
        </Button>
    </Form>
    </div>
  )
}

export default UploadProductPage
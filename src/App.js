import React, { useState, useEffect } from 'react';
import apiRequest from './api/productApi';
import apiRequestCate from './api/categoryApi';
import dataFake from './dataFake';
import Routers from './routers'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await apiRequest.getAll();
        setProducts(data);
      } catch (error) {
        console.log('You have an error: ', error);
      }
    }
    getProducts();
    const getCategories = async () => {
      try {
        const { data } = await apiRequestCate.getAll();
        setCategories(data);
      } catch (error) {
        console.log('You have an error: ', error);
      }
    }
    getCategories();
  }, [])

  const onHandleRemove = async (id) => {
    try {
      await apiRequest.remove(id);
      const newProducts = products.filter(product => product.id !== id);
      setProducts(newProducts);
    } catch (error) {
      console.log('You have an error', error)
    }
  }

  // Delete categories
  const onHandleRemoveCate = async (id) => {
    try {
      await apiRequestCate.remove(id);
      const newCategories = categories.filter(categories => categories.id !== id);
      setCategories(newCategories);
    } catch (error) {
      console.log('You have an error', error)
    }
  }
 

  const onHandleAdd = async (product) => {
    try {
      const { data } = await apiRequest.create(product);
      setProducts([
        ...products,
        data
      ])
    } catch (error) {
      console.log('You have an error', error)
    }

  }
  const onHandleEdit = (newProduct) => {
    try {
      apiRequest.update(newProduct.id, newProduct);
      const editedProduct = products.map(product => (
        product.id === newProduct.id ? newProduct : product
      ));
      // localStorage.setItem('products', JSON.stringify(editedProduct));
      setProducts(editedProduct);
    } catch (error) {
      console.log('You have an error', error)
    }
  }

  //Edit  categories
  const onHandleEditcate = (newCategories) => {
    try {
      apiRequest.update(newCategories.id, newCategories);
      const editedCategories = categories.map(categories => (
        categories.id === newCategories.id ? newCategories : categories
      ));
      // localStorage.setItem('products', JSON.stringify(editedProduct));
      setCategories(editedCategories);
    } catch (error) {
      console.log('You have an error', error)
    }
  }

  const onHandleAddCate = async (category) => {
    try {
      const { data } = await apiRequestCate.create(category);
      setCategories([
        ...categories,
        data
      ])
    } catch (error) {
      console.log('You have an error', error)
    }
  }
  return (
    <div className="App">
      <Routers
        products={products}
        onRemove={onHandleRemove}
        onAdd={onHandleAdd}
        onEdit={onHandleEdit}
        categories={categories} onAddCate={onHandleAddCate}
        onRemoveCate={onHandleRemoveCate}
        onEditcate={onHandleEditcate}
      />
    </div>
  )

}
export default App;
// check props.curentProduct mà undefined thì call api rồi hiển thị ra xem sao
// kiểu như này 
// if (currentCategory) {
//                 setCategoryName(currentCategory.name);
//                 setCategoryDes(currentCategory.description);
//             } else {
//                 getCategory(categoryId).then(
//                     (res) => {
//                         if (res.status === 200) {
//                             currentCategory = res.data;
//                             setCategoryName(currentCategory.name);
//                             setCategoryDes(currentCategory.description);

// đặt trong useEffect(() => {}, [])

// category/:id
// const listProduct = products.filter(product => product.cateId === id)

// category

// {
//   id: 1,
//   name: 'nước hoa'
//   }

//   // product

//   {
//   id: 1, 
//   cateId: 1,
//   name: 'Sản phẩm nước hoa 1'
//   },
//   {
//   id: 2, 
//   cateId: 1,
//   name: 'Sản phẩm nước hoa 1'
//   }
//   Lê Trọng Đạt (FPL HN)10:04
//   uncategory
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from "react-router-dom"
import { Editor } from '@tinymce/tinymce-react'
import firebase from '../../../../firebase'
import PropTypes from 'prop-types'
import Categories from '../Categories'

const EditCategories = ({ categories, onEditcate }) => {

    const { register, handleSubmit, errors } = useForm();
    let { id } = useParams();
    let redirect = useHistory();

    const categorie = categories.find(categories => categories.id === id);

    const onHandleSubmit = (data) => {
        let file = data.image[0];
        // console.log(file);
        let storageRef = firebase.storage().ref(`categories/${file.name}`);
        storageRef.put(file).then(() => {
            storageRef.getDownloadURL()
                .then((url) => {
                    const newData = {
                        id,
                        ...data,
                        image: url
                    }
                    // console.log(newData);
                    onEditcate(newData);
                    redirect.push('/admin/categories');
                })
        })
    }
   
    return (
        <div>
        {/* Page Heading */}
        <h1 className="h3 mb-2 text-gray-800">Edit-Products</h1>
        <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below. For more
      information about DataTables, please visit the <a target="_blank" href="https://datatables.net">official
        DataTables documentation</a>.</p>
        {/* DataTales Example */}
        <div className="card shadow mb-4">
            <div className="card-header py-3 clearfix">
                <h6 className="mt-2 font-weight-bold text-primary float-left">Products</h6>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onHandleSubmit)}>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text" className="form-control" placeholder="Enter name"
                                    name="name"
                                    defaultValue={categorie.name}
                                    ref={register}
                                />
                                {errors.name && errors.name.type === "required" && <div className="alert alert-danger mt-3">Bạn chưa nhập tên</div>}
                            </div>

                            <div className="form-group">
                                    <label>Image</label>
                                    <img src={categorie.image} width="50px" height="50px" />
                                    <input
                                        type="file" className="form-control-file"
                                        name="image"
                                        ref={register}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        className="form-control" rows="5"
                                        name="desc"
                                        ref={register}
                                    >{categorie.desc}</textarea>
                                    {errors.desc && <div className="alert alert-danger mt-3">Bạn chưa nhập chi tiết sản phẩm</div>}
                                </div>
                        </div>
                      
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div >
    )
}

EditCategories.propTypes = {

}

export default EditCategories

import { Avatar, Button } from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import TweetCard from '../Home/TweetCard';

const validationSchema = Yup.object().shape({
    content: Yup.string().required("Tweet text is required")
})

const HomeSection = () => {

    const [uploadingImage ,setUploadingImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState(false);

    const handleSubmit = (values) => {
        console.log("values ", values);
    }
    const formik = useFormik({
        initialValues:{
            content:'',
            image:''
        },
        onSubmit: handleSubmit,
        validationSchema,
    });

    const handleSelectImage = (event) => {
        setUploadingImage(true);
        const imgUrl = event.target.files[0];
        formik.setFieldValue('image', imgUrl);
        setSelectedImage(imgUrl);
        setUploadingImage(false);
    }
    return (
        <div className='space-y-5'>
            <section>
                <h1 className='py-5 text-xl font-bold opacity-90'>
                    Home
                </h1>
            </section>

            <section className={`pb-10`}>
                <div className='flex space-x-5'>
                    <Avatar alt='username' src='https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369989.png'/>
                    <div className='w-full'>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <input type='text' name='content' placeHolder='What is happening' className={`border-none outline-none text-xl bg-transparent`}
                                 {...formik.getFieldProps("content")}
                                 />
                                 {formik.errors.content && formik.touched.content && (
                                    <span className='text-red-500'>{formik.errors.content}</span>
                                 )}
                            </div>
                            {/* <div>
                                <img src="" alt=""/>
                            </div> */}

                            <div className='flex justify-between items-center mt-5'>
                                <div className='flex space-x-5 items-center'>
                                    <label className='flex items-center space-x-2 rounded-md cursor-pointer'>
                                        <ImageIcon className='text-[#1d9bf0]'/>
                                        <input type='file' name='imageFile' className='hidden' onChange={handleSelectImage}/>
                                    </label> 
                                    <label className='flex items-center space-x-2 rounded-md cursor-pointer'>
                                        <FmdGoodIcon className='text-[#1d9bf0]'/>
                                    </label>
                                    <label className='flex items-center space-x-2 rounded-md cursor-pointer'>
                                        <TagFacesIcon className='text-[#1d9bf0]'/>
                                    </label>
                                </div>
                                <div>
                                    <Button sx={{width: '100%',borderRadius:'20px',py:'6px', px:'20px',bgcolor:'#1e88e5', }} variant="contained" type='submit'>
                                        Tweet
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <section>
                {[1,1,1,1,1,1,1].map((item)=>
                    <TweetCard/>
                )};
            </section>
        </div>
    )
};

export default HomeSection;
import React from 'react'
import RepeatIcon from '@mui/icons-material/Repeat';
import { useNavigate } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar, Button } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BarChartIcon from '@mui/icons-material/BarChart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplyModal from './ReplyModal';
import { useState } from 'react';

const TweetCard = () => {

    const navigate = useNavigate();

    const [openReplyModal,setOpenReplyModal] = useState(false)
    const handleOpenReplyModal = () => setOpenReplyModal(true);
    const handleCloseReplyModal = () => setOpenReplyModal(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteTweet = () => {
        console.log("Delete tweet");
        handleClose();
    }


    const handleCreateRetweet = () => {
        console.log("Handle create retweet");
    }

    const handleLikeTweet = () => {
        console.log("Handle like tweet");
    }

    return (
        <React.Fragment>
            {/* <div className='flex items-center font-semibold text-gray-700 py-2'>
                <RepeatIcon className='mx-1' />
                <p className='mx-1'>You Retweet</p>
            </div> */}
            <div className='flex space-x-5'>
                <Avatar src='https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369989.png' alt='username' className='cursor-pointer' onClick={() => navigate(`/profile/${6}`)} />
                <div className='w-full'>
                    <div className='flex justify-between items-center'>
                        <div className='flex cursor-pointer items-centre space-x-2'>
                            <span className='font-semibold'>Code with Sarique</span>
                            <span className='text-gray-600'>@itz_Sarique . 2m</span>
                            <VerifiedIcon className='text-[#1d9bf0]' />
                        </div>
                        <div>
                            <Button
                                id="fade-button"
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MoreHorizIcon />
                            </Button>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                                <MenuItem onClick={handleDeleteTweet}>Edit</MenuItem>
                            </Menu>
                        </div>
                    </div>

                    <div className='mt-2'>
                        <div onClick={() => navigate(`/tweet/${4}`)} className='cursor-pointer'>
                            <p className='mb-2 p-0'>This is the best full stack Tweeter clone project using React and SpringBoot</p>
                            <img className='w-[28rem] border border-gray-400 p-5 rounded-md' src='https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369989.png' alt=''></img>
                        </div>
                        <div className='py-5 flex justify-between items-center'>
                            <div className='space-x-3 flex items-center text-gray-600'>
                                <ChatBubbleOutlineIcon className='cursor-pointer' onClick={handleOpenReplyModal}/>
                                <p>43</p>
                            </div>
                            <div className={`${true ? "text-pink-600" : "text-gray-600" } space-x-3 flex items-center`}>
                                <RepeatIcon onClick={handleCreateRetweet} className='cursor-pointer'/>
                                <p>54</p>
                            </div>
                            <div className={`${true ? "text-pink-600" : "text-gray-600" } space-x-3 flex items-center`}>
                                {true ? <FavoriteIcon onClick={handleLikeTweet} className='cursor-pointer'/> : <FavoriteBorderIcon onClick={handleLikeTweet} className='cursor-pointer'/>} 
                                <p>54</p>
                            </div>
                            <div className='space-x-3 flex items-center text-gray-600'>
                                <BarChartIcon className='cursor-pointer' onClick={handleOpenReplyModal}/>
                                <p>430</p>
                            </div>
                            <div className='space-x-3 flex items-center text-gray-600'>
                                <FileUploadIcon className='cursor-pointer' onClick={handleOpenReplyModal}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <ReplyModal open={openReplyModal} handleClose={handleCloseReplyModal}/>
            </section>
        </React.Fragment>
    )
}

export default TweetCard;
import { Grid, Button } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import AuthModal from './AuthModal';
import { useState } from 'react';

const Authentication = () => {
    const [openAuthModal,setOpenAuthModal] = useState(false);
    const handleOpenAuthModal = () => setOpenAuthModal(true);
    const handleCloseAuthModal = () => setOpenAuthModal(false);
    return (
        <div>
            <Grid className='overflow-y-hidden' container>
                <Grid item lg={7} className='hidden lg:block'>
                    <img
                        className="w-[100vh] h-[100vh] object-cover"
                        src='https://pixelz.cc/wp-content/uploads/2023/09/twitter-x-logo-uhd-4k-wallpaper.jpg'
                        alt='Twitter Preview'
                    />
                </Grid>

                <Grid item lg={5} xs={12} className='px-10'>
                    <h1 className='mt-10 font-bold text-7xl'>Happening Now</h1>
                    <h1 className='font-bold text-3xl py-16'>Join Twitter Today</h1>

                    <div className='w-[60%]'>
                        <div className='w-full'>
                            <GoogleLogin width="330" />
                            <p className='py-5 text-center'>OR</p>

                            <Button onClick={handleOpenAuthModal}
                                fullWidth
                                variant="contained"
                                sx={{
                                    borderRadius: "29px",
                                    py: "7px",
                                }}
                            >
                                Create Account
                            </Button>

                            <p className='text-sm mt-2'>
                                By signing up, you agree to the Terms Of Service and Privacy Policy, including Cookie Use.
                            </p>
                        </div>

                        <div className='mt-10'>
                            <h1 className='font-bold text-xl mb-5'>Already Have an Account?</h1>
                            <Button onClick={handleOpenAuthModal}
                                fullWidth
                                variant="outlined"
                                size="large"
                                sx={{
                                    borderRadius: "29px",
                                    py: "7px",
                                }}
                            >
                                LogIn
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal}/>
        </div>
    );
};

export default Authentication;

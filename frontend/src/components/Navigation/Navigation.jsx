import React from "react";
import { navigationMenu } from "./NavigationMenu"; 
import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../store/store";
import { logOut } from "../../store/auth/Action";

const Navigation = () => {
    const {auth} = useSelector(store => store)
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();


    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        console.log("Log out")
        handleClose()
        dispatch(logOut())
    };

    return (
        <div className="h-screen sticky top-0">
           
            <div className="py-5 flex items-center justify-center lg:justify-start lg:ml-8">
                <img
                    src="https://logohistory.net/wp-content/uploads/2023/02/Twitter-Log%D0%BE.svg"
                    alt="Twitter Logo"
                    className="h-8 w-auto mr-2" // Reduced height, added right margin for spacing
                />
            </div>

            {/* Navigation Menu Items */}
            <div className="mt-2 space-y-3"> {/* Added margin-top for separation */}
                {navigationMenu.map((item, index) => (
                    // Use flex and items-center to put icon and text on same line
                    <div key={index} className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-100 rounded-full cursor-pointer" 
                    onClick={() => item.title==='Profile' ? navigate(`/profile/${5}`) : navigate(item.path)}>
                        <div className="text-2xl"> 
                            {item.icon}
                        </div>
                        <p className="text-xl hidden lg:block">{item.title}</p>
                    </div>
                ))}
            </div>

            <div className="py-10">
                <Button sx={{width: '100%',borderRadius:'29px',py:'15px',bgcolor:'#1e88e5', }} variant="contained">
                    Tweet
                </Button>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Avatar alt="username" src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369989.png"/>
                    <div>
                        <span>{auth.user?.fullName}</span>
                        <br></br>
                        <span className="opacity-70">@{auth.user?.fullName.split(" ").join("_").toLowerCase()}</span>
                    </div>
                    <Button
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                       <MoreHorizIcon/>
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
                        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
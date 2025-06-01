import { Grid } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import RightPart from "../RightPart/RightPart";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import TweetCard from "./TweetCard";
import TweetDetails from "../TweetDetails/TweetDetails";

const  HomePage = () => {
  return (
    <Grid container className="min-h-screen px-0 pl-10 pr-10" spacing={3}>
      
      {/* Left Part: Hidden on small screens, visible on lg+ */}
      <Grid
       item
        xs={false}
        lg={4}
        className="hidden lg:block relative lg:pl-10"
      >
        <Navigation />
      </Grid>

      {/* Middle Part : Always visible. Full width on small screens, 6 on large */}
      <Grid
        item
        size={'grow'}
        className="relative lg:px-4 lg:border-x border-gray-200"
      >
        <Routes>
          <Route path="/" element={<HomeSection />} ></Route>
          <Route path="/home" element={<HomeSection />} ></Route>
          <Route path="/profile/:id" element={<Profile />} ></Route>
          <Route path="/tweet/:id" element={<TweetDetails />} ></Route>
        </Routes> 
      </Grid>

      {/* Right Part: Hidden on small screens, visible on lg+ */}
      <Grid
        xs={false}
        lg={3}
        className="hidden lg:block relative lg:pr-10"
      >
        <RightPart/>
      </Grid>

    </Grid>
  );
};

export default HomePage;

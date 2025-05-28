import { Grid } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import RightPart from "../RightPart/RightPart";

const HomePage = () => {
  return (
    <Grid container className="min-h-screen px-0" spacing={3}>
      
      {/* Left Part: Hidden on small screens, visible on lg+ */}
      <Grid
        size="grow"
        className="hidden lg:block relative lg:pl-10"
      >
        <Navigation />
      </Grid>

      {/* Middle Part: Always visible. Full width on small screens, 6 on large */}
      <Grid
        item
        xs={12}
        lg={6}
        className="relative lg:px-4 lg:border-x border-gray-200"
      >
        <HomeSection />
      </Grid>

      {/* Right Part: Hidden on small screens, visible on lg+ */}
      <Grid
        size="grow"
        className="hidden lg:block relative lg:pr-10"
      >
        <RightPart/>
      </Grid>

    </Grid>
  );
};

export default HomePage;

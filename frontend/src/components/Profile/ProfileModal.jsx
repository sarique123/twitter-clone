import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { Avatar, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
  border: "none",
  borderRadius: 4,
};

export default function ProfileModal({open,handleClose}) {
  //const [open, setOpen] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const handleSubmit = (value) => {
    console.log("Handle submit" , value);
  };
  
  const handleImageChange = (event) => {
    console.log("BackGround Image Changed");
    setUploading(true);
    const { name } = event.target;
    const file = event.target.files[0];
    formik.setFieldValue(name, file);
    setUploading(false);
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      website: "",
      location: "",
      bio: "",
      backgroundImage: "",
      profileImage: "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose} aria-label="delete">
                  <CloseIcon />
                </IconButton>
                <p>Edit profile</p>
              </div>
              <Button
                type="submit"
                sx={{ padding: "8px", paddingX: "15px", borderRadius: "20px" }}
              >
                Save
              </Button>
            </div>

            <div className="hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]">
              <React.Fragment>
                {/* Background Image Upload */}
                <div className="w-full">
                  <div className="relative">
                    <img
                      className="w-full h-[12rem] object-cover object-center"
                      src="https://cdn.pixabay.com/photo/2023/01/18/07/25/road-7726202_1280.jpg"
                      alt="Background image"
                    />
                    <input
                      type="file"
                      name="backgroundImage"
                      onChange={handleImageChange}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Profile Image with Camera Icon */}
                <div className="w-full transform -translate-y-20 ml-4 h-[6rem]">
                  <label className="relative w-[10rem] h-[10rem] block cursor-pointer">
                    {/* Avatar image */}
                    <Avatar
                      src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369989.png"
                      sx={{
                        width: "10rem",
                        height: "10rem",
                        border: "4px solid white",
                      }}
                    />

                    {/* Hidden file input triggered by clicking anywhere */}
                    <input
                      type="file"
                      name="profileImage"
                      hidden
                      onChange={handleImageChange}
                    />

                    {/* Camera icon overlay */}
                    <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md">
                      <AddAPhotoIcon fontSize="small" />
                    </div>
                  </label>
                </div>
              </React.Fragment>

              <div className="space-y-6">
                <TextField
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id="bio"
                  name="bio"
                  label="Bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />
                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  label="Location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.location && Boolean(formik.errors.location)
                  }
                  helperText={formik.touched.location && formik.errors.location}
                />
                <TextField
                  fullWidth
                  id="website"
                  name="website"
                  label="Website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.website && Boolean(formik.errors.website)
                  }
                  helperText={formik.touched.website && formik.errors.website}
                />
                <div className="my-3">
                  <p className="text-lg">Birth Date . Edit</p>
                  <p className="text-2xl">February 21, 2000</p>
                </div>
                <div>
                  <p className="py-3 text-lg">Edit Professional Profile</p>
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

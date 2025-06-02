import * as React from "react";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import VerifiedIcon from "@mui/icons-material/Verified";
import { useFormik } from "formik";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

export default function ReplyModal({handleClose,open}) {

   const [uploadingImage ,setUploadingImage] = React.useState(false);
   const [selectedImage, setSelectedImage] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("Handle submit", values);
  }

  const formik = useFormik({
    initialValues:{
        content:'',
        image:'',
        tweetId:5,
    },
    onSubmit:handleSubmit
  });

  const handleSelectImage = (event) => {
        setUploadingImage(true);
        const imgUrl = event.target.files[0];
        formik.setFieldValue('image', imgUrl);
        setSelectedImage(imgUrl);
        setUploadingImage(false);
    };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex space-x-5">
            <Avatar
              src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369989.png"
              alt="username"
              className="cursor-pointer"
              onClick={() => navigate(`/profile/${6}`)}
            />
            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex cursor-pointer items-centre space-x-2">
                  <span className="font-semibold">Code with Sarique</span>
                  <span className="text-gray-600">@itz_Sarique . 2m</span>
                  <VerifiedIcon className="text-[#1d9bf0]" />
                </div>
              </div>

              <div className="mt-2">
                <div
                  onClick={() => navigate(`/tweet/${4}`)}
                  className="cursor-pointer"
                >
                  <p className="mb-2 p-0">
                    This is the best full stack Tweeter clone project using
                    React and SpringBoot
                  </p>
                </div>
              </div>
            </div>
          </div>
          <section className={`py-10`}>
              <div className="flex space-x-5">
                <Avatar
                  alt="username"
                  src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369989.png"
                />
                <div className="w-full">
                  <form onSubmit={formik.handleSubmit}>
                    <div>
                      <input
                        type="text"
                        name="content"
                        placeHolder="What is happening"
                        className={`border-none outline-none text-xl bg-transparent`}
                        {...formik.getFieldProps("content")}
                      />
                      {formik.errors.content && formik.touched.content && (
                        <span className="text-red-500">
                          {formik.errors.content}
                        </span>
                      )}
                    </div>
                    {/* <div>
                                <img src="" alt=""/>
                            </div> */}

                    <div className="flex justify-between items-center mt-5">
                      <div className="flex space-x-5 items-center">
                        <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                          <ImageIcon className="text-[#1d9bf0]" />
                          <input
                            type="file"
                            name="imageFile"
                            className="hidden"
                            onChange={handleSelectImage}
                          />
                        </label>
                        <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                          <FmdGoodIcon className="text-[#1d9bf0]" />
                        </label>
                        <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                          <TagFacesIcon className="text-[#1d9bf0]" />
                        </label>
                      </div>
                      <div>
                        <Button
                          sx={{
                            width: "100%",
                            borderRadius: "20px",
                            py: "6px",
                            px: "20px",
                            bgcolor: "#1e88e5",
                          }}
                          variant="contained"
                          type="submit"
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
        </Box>
      </Modal>
    </div>
  );
}

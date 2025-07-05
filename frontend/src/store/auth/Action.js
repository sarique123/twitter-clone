import axios from "axios"
import { API_BASE_URL } from "../../config/Api";
import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAILURE, LOGOUT } from "./ActionType";

export const loginUser = (loginData) => async(dispatch) => {
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`,loginData);
        console.log("Logged In User" , data);
        
        if(data.jwtToken){
            localStorage.setItem("jwtToken", data.jwtToken)
        }
        dispatch({type:LOGIN_USER_SUCCESS,payload:data.jwtToken});
    } catch (error) {
        console.log("error : " , error);
        dispatch({type:LOGIN_USER_FAILURE,payload:error.message});
    }
}

export const registerUser = (registerData) => async(dispatch) => {
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`,registerData);
        console.log("Sign Up User" , data);

        if(data.jwtToken){
            localStorage.setItem("jwtToken", data.jwtToken)
        }
        dispatch({type:REGISTER_USER_SUCCESS,payload:data.jwtToken});
    } catch (error) {
        console.log("error : " , error);
        dispatch({type:REGISTER_USER_FAILURE,payload:error.message});
    }
}

export const getUserProfile = (jwtToken) => async(dispatch) => {
    try {
        const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`,{
            headers:{
                "Authorization": `Bearer ${jwtToken}`
            }
        });

        console.log("Get User Profile ", data);

        dispatch({type:GET_USER_PROFILE_SUCCESS,payload:data});
    } catch (error) {
        console.log("error : " , error);
        dispatch({type:GET_USER_PROFILE_FAILURE,payload:error.message});
    }
}

export const logOut = () => async(dispatch) => {
    localStorage.removeItem("jwtToken");
    dispatch({type:LOGOUT,payload:null});
}
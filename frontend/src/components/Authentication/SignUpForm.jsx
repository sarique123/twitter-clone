import React from 'react';
import { Button, Grid, Select, TextField,MenuItem,InputLabel } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { blue } from '@mui/material/colors'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/auth/Action';

const validationSchema = Yup.object().shape({
    email:Yup.string().email("Invalid email").required("Email is Required"),
    password:Yup.string().required("Password is required")
})

const currentYear = new Date().getFullYear();
const years = Array.from({length:100},(_,i)=>currentYear-i);
const days = Array.from({length:31},(_,i)=>i+1);
const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" }
];
const SignUpForm = () => {

    const dispatch = useDispatch();

    const formik = useFormik({
            initialValues:{
                fullName:"",
                email:"",
                password:"",
                dateOfBirth:{
                    date:'',
                    month:'',
                    year:''
                }
            },
            validationSchema,
            onSubmit:(values) => {
                const {day,month,year} = values.dateOfBirth
                const dateOfBirth = `${year}-${month}-${day}`
                values.dateOfBirth = dateOfBirth;

                dispatch(registerUser(values))
                console.log("Form value ",values);
            }
        })

        const handleDateChange = (name) => (event) => {
            formik.setFieldValue("dateOfBirth", {
                ...formik.values.dateOfBirth,
                [name]:event.target.value
            })
        }
        return (
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className='w-full'>
                        <TextField fullWidth label="Full Name" name='fullName' variant='outlined' size="large" 
                        value={formik.values.fullName} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                        />
                    </Grid>
                    <Grid item xs={12} className='w-full'>
                        <TextField fullWidth label="Email" name='email' variant='outlined' size="large" 
                        value={formik.values.email} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} className='w-full'>    
                        <TextField fullWidth label="Password" name='password' variant='outlined' size='large' 
                        type='password'
                        value={formik.values.password} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid>
                    <Grid item xs={4} className='w-3/12'>
                        <InputLabel>Date</InputLabel>
                        <Select name='day'
                        fullWidth
                        value={formik.values.dateOfBirth.day}
                        onChange={handleDateChange("day")}
                        onBlur={formik.handleBlur}>
                            {days.map((day) => (
                                <MenuItem key={day} value={day}>
                                    {day}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={4} className='w-4/12'>
                        <InputLabel>Month</InputLabel>
                        <Select name='month'
                        fullWidth
                        value={formik.values.dateOfBirth.month}
                        onChange={handleDateChange("month")}
                        onBlur={formik.handleBlur}>
                            {months.map((month) => (
                                <MenuItem key={month} value={month.value}>
                                    {month.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={4}className='w-4/12'>
                        <InputLabel>Year</InputLabel>
                        <Select name='year'
                        fullWidth
                        value={formik.values.dateOfBirth.year}
                        onChange={handleDateChange("year")}
                        onBlur={formik.handleBlur}>
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} className="mt-4 w-full">
                        <Button
                        fullWidth  
                        variant='contained'
                        size='large'
                        sx={{borderRadius:"29px",py:"15px",bgcolor:blue[500]}}
                        type='submit' 
                        >
                            SignUp</Button>
                    </Grid>
                </Grid>
            </form>
        )
}
export default SignUpForm;
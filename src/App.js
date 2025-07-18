import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  TextField, Button, RadioGroup, FormControlLabel,
  Radio, Checkbox, Select, MenuItem, InputLabel,
  FormControl, Typography, Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import './App.css';

const App = () => {

  const [formData, setFormData] = useState({
    name: '',
    email:'',
    gender: '',
    hobbies: {
      reading: false,
      sports: false,
    },
    city: '',
    dob: dayjs(),
     image: null,
  });

   const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

     if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        hobbies: {
          ...prev.hobbies,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

   const handleDateChange = (newDate) => {
    setFormData((prev) => ({ ...prev, dob: newDate }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
   const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    alert('Form submitted! Check console for data.');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{max:500, mx:'auto', mt: 4, p: 3, border: '1px solid #ccc'}}>
        <Typography variant="h5" gutterBottom>
          Material UI Form
        </Typography>
        <form>
          <TextField 
           label="Name"
           name="name"
           fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}/>

          <TextField 
           label="Email"
           name="email"
           fullWidth
           margin="normal"
           value={formData.email}
           onChange={handleChange}
           />

          <Typography sx={{textAlign: 'left', mt: 2}}>Gender</Typography>
          <FormControl component="fieldset" sx={{mt: 2}}>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              row
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
              </RadioGroup>
          </FormControl> 

          <Typography sx={{textAlign: 'left', mt: 2}}>Hobbies</Typography>
          <FormControlLabel
            control={
              <Checkbox
                name="reading"
                checked={formData.hobbies.reading}
                onChange={handleChange}
              />
            }
            label="Reading"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="sports"
                checked={formData.hobbies.sports}
                onChange={handleChange}
              />
            }
            label="Sports"
          />

            <FormControl fullWidth margin="normal">
            <InputLabel>City</InputLabel>
            <Select
              name="city"
              value={formData.city}
              onChange={handleChange}
              label="City"
            >
              <MenuItem value="Mumbai">Mumbai</MenuItem>
              <MenuItem value="Pune">Pune</MenuItem>
              <MenuItem value="Nagpur">Nagpur</MenuItem>
            </Select>
          </FormControl>

          <DatePicker
            label="Date of Birth"
            value={formData.dob}
            onChange={handleDateChange}
            sx={{ mt: 2, width: '100%' }}
          />

            <Box sx={{ mt: 2 }}>
            <Typography>Upload Image</Typography>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ marginTop: 10, maxWidth: '100%', height: 150 }}
              />
            )}
          </Box>

           <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
            Submit
          </Button>

        </form>
      </Box>
    </LocalizationProvider>
  )
}

export default App


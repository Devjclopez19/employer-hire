import React, { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const initial = { profile: "", exp: 0, techs: [], desc:"" };

const CreateForm = () => {

  const [form, setForm] = useState(initial);
  const navigate = useNavigate();

  const {profile, exp, desc} = form

  const skillSet = [
    {
      name: "Javascript"
    },
    {
      name: "Java"
    },
    {
      name: "Python"
    },
    {
      name: "Django"
    },
    {
      name: "Rust"
    }
  ];

  const handleChange = (e) => {
    const selectedTech = e.target.value;
    const existTech= form.techs.includes(selectedTech);

    if(e.target.checked) {
      if(!existTech) {
        setForm({...form , techs : [...form.techs, e.target.value]});
      }

    }else {
      if(existTech) {
        const techs = form.techs.filter(tech => tech !== selectedTech);
        setForm({...form, techs})
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8081/post", form, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( response => {
      navigate('/employer/feed')
    }).catch((error) => {
      console.log("Error:", error);
    })
  }

  return (
    <Paper sx={{ padding:"2%"}} elevation={3}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Create New Post
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, profile: e.target.value })}
            label="Job-profile"
            variant="outlined"
            value={profile}
          />
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, exp: e.target.value })}
            label="Years of Experience"
            variant="outlined"
            value={exp}
          />
           <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            multiline
            rows={4}
            label="Job-desc"
            variant="outlined"
            value={desc}
          />
          <Box sx={{ margin:"1% auto"}}>
          <h3>Please mention required skills</h3>
         <ul>
        {skillSet.map(({ name }, index) => {
          return (
            <li key={index}>
              <div >
                <div>
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    onChange={handleChange} 
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
              </div>
            </li>
          );
        })}
       
      </ul>
          </Box>
          <Button
            sx={{ width: "50%", margin: "2% auto" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  )
}

export default CreateForm
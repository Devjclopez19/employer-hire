import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { Box } from '@mui/system';
import axios from 'axios';

const Feed = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts();
  }, [])

  const getPosts = async () => {
    const response = await axios.get(" http://localhost:8081/posts");
    setPosts(response.data);
  }

  const setQuery = async (e) => {
    const text =  e.value.trim();
    if(text !== '' && text.length > 1) {
      const response = await axios.get(`http://localhost:8081/posts/${text}`);
      setPosts(response.data);
    } else {
      const response = await axios.get("http://localhost:8081/posts");
      setPosts(response.data);
    }
  }

  return (
    <Grid container spacing={2} sx={{ margin: "2%" }}>
      <Grid item xs={12} md={12} lg={12}>
      <Button sx={{ margin: "1% 2%" }} variant="outlined">
            <Link to="/">Home</Link>
          </Button>
        <Box>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search..."
            sx={{ width: "75%", padding: "2% auto" }}
            fullWidth
            onChange={(e) => setQuery(e.target)}
          />
        </Box>
      </Grid>
      { posts.length < 1 ? <h3>Ops!!! There are no results, please review your query and try again.</h3> : 
        posts?.map((p) => {
          return (
            <Grid key={p.id} item xs={12} md={6} lg={4}>
              <Card sx={{ padding: "3%", overflow: "hidden", width: "84%" }}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "2rem", fontWeight: "600" }}
                >
             {p.profile}
                </Typography>
                <Typography sx={{ color: "#585858", marginTop:"2%" }} variant="body" >
                  Description: {p.desc}
                </Typography>
                <br />
                <br />
                <Typography variant="h6">
                  Years of Experience: {p.exp} years
                </Typography>

                <Typography gutterBottom  variant="body">Skills : </Typography>
                {p.techs.map((s, i) => {
                  return (
                    <Typography variant="body" gutterBottom key={i}>
                      {s} .
                      {` `}
                    </Typography>
                  );
                })}
  
              </Card>
            </Grid>
          );
        })}
    </Grid>
  )
}

export default Feed
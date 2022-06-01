import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';

import { useDispatch } from 'react-redux';

import { getPosts } from './redux/actions/posts';

import memories from './images/memories.png';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import useStyles from './styles.js';
import { createTheme } from '@mui/system';

const App = () => {
  const theme = createTheme();
  const dispatch = useDispatch();
  const classes = useStyles;
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);
  return (
    <Container maxWidth="lg">
      <AppBar sx={classes.appBar} position="static" color="inherit">
        <Typography sx={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img sx={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>

      <Grow in>
        <Container>
          <Grid
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column-reverse',
              },
            })}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} lg={8}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>

            <Grid item xs={12} lg={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;

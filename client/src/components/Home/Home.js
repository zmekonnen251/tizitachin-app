import React,{ useEffect, useState } from 'react';
import { Container, Grow, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../redux/actions/posts';
import Form from '../../components/Form/Form';
import Posts from '../../components/Posts/Posts';
import { createTheme } from '@mui/system';

const Home = () => {
  const theme = createTheme();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);
  return (
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
  )
}

export default Home
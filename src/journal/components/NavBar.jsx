import { useDispatch } from 'react-redux';
import { AppBar, IconButton, Grid, Toolbar, Typography, Tooltip } from '@mui/material';
import { AutoStories, LoginOutlined, MenuOutlined } from '@mui/icons-material';
import { startLogout } from '../../store/auth';


export const NavBar = ({drawerWidth = 240}) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(startLogout());
    }


  return (
      <AppBar
          position='fixed'
          sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: {sm: `${drawerWidth}px`}
          }}
      >
          <Toolbar>
              <IconButton
                  color='inherit'
                  edge="start"
                  sx={{ mr: 2, display: {sm: 'none'} }}
              >
                  <MenuOutlined />
              </IconButton>

              <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                  
                    <AutoStories fontSize='large'/>
                  
                    <Typography variant='h6' noWrap component='div'>JOURNAL App</Typography>
                    <Tooltip
                        arrow
                        title={<h2>LogOut</h2>}
                    >
                        <IconButton
                            color='error'
                            onClick={onLogout}
                        >
                            <LoginOutlined fontSize='large'/>
                        </IconButton>
                    </Tooltip>
                  
              </Grid>
          </Toolbar>
      
    </AppBar>
  )
}



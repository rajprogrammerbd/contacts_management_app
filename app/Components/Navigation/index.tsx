'use client';
import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    CssBaseline,
    Drawer,
    IconButton,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

interface IObject {
    id: number;
    name: string;
}

type IState = IObject[];

const drawerWidth = 240;

function NavigationBar({
    children,
    window
  }: Readonly<{
    children: React.ReactNode;
    window?: () => Window;
  }>) {
    const [state, ] = useState<IState>(() => {
        return [
            {
                id: 0,
                name: 'All Contacts'
            },
            {
                id: 1,
                name: 'Add Contacts'
            }
        ]
    });

    const container = window !== undefined ? () => window().document.body : undefined;

    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
    };
  
    const drawer = (
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <List>
          {state.map((item: IObject) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar component="nav">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {state.map((item: IObject) => (
                  <Button key={item.id} sx={{ color: '#fff' }}>
                    {item.name}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
          <nav>
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
          </nav>
          <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            {children}
          </Box>
        </Box>
    );
}

export default NavigationBar;

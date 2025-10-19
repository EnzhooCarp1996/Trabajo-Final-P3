import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps{
    toggleDrawer: () => void;
}


export const Header: React.FC<HeaderProps> = ({ toggleDrawer }) => {


    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={toggleDrawer}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Mi Aplicación
                </Typography>
            </Toolbar>
        </AppBar>

    )
}
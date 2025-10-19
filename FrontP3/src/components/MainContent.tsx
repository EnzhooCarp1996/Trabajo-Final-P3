import { Box, Toolbar, Typography } from "@mui/material"

interface MainContentProps {
    open: boolean,
    drawerWidth: number,
}

export const MainContent: React.FC<MainContentProps> = ({ open, drawerWidth}) => {

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, marginLeft: open ? `${drawerWidth}px` : 0, transition: "0.3s" }}
        >
            <Toolbar />
            <Typography paragraph>
                Aquí va el contenido principal de tu aplicación.
            </Typography>
        </Box>
    )
}
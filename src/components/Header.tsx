// import drawer from mui
import { View } from 'react-native';
import { AppBar, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar, changeTheme } from "../redux/store";
import { PaletteMode } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export const Header: React.FC = ({}) => {
    let dispatch = useDispatch();
    const theme = useSelector(state => state);

    let state = theme as unknown as { sideBar: { isOpen: boolean, theme: PaletteMode }};
    return (
        <AppBar  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, flex: 1 }}>
            <Toolbar>
                <MenuIcon color="inherit" onClick={() => dispatch(toggleSideBar())} sx={{position:'relative', marginLeft:'5vw'}}/>
                <View style={{ position: "relative", marginLeft:'80vw' }}>
                    {state.sideBar.theme === 'dark' ? <DarkModeIcon color="inherit" onClick={() => dispatch(changeTheme("light"))}/> 
                    :
                    <LightModeIcon color="inherit" onClick={() => dispatch(changeTheme("dark"))}/>}
                </View>

            </Toolbar>
        </AppBar>
    )
}
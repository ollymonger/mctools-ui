import { PaletteMode } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { myTheme } from './CustomThemeProvider';

export const Container: React.FC = ({ children }) => {
    const theme = myTheme;
    let options = useSelector(state => state);

    let state = options as unknown as { sideBar: { isOpen: boolean, theme: PaletteMode }};

    return(
        <Box style={{position:'relative', textAlign: 'center', top:'9.7vh', height:'100%',
        backgroundColor: state.sideBar.theme === "dark" ? "#121212" : "#fff",
        transition: theme.transitions.create('margin', { easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-2vw`, ...(state.sideBar.isOpen && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
              marginLeft: "17vw",
              width: '83vw'
        })}}>
            {children}
        </Box>
    )
}
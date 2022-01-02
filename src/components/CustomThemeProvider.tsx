import { useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { createTheme, PaletteMode } from "@mui/material";

export let myTheme: any;

export const CustomThemeProvider: React.FC = ({ children }) => {
    const theme = useSelector(state => state);

    let state = theme as unknown as { sideBar: { isOpen: boolean, theme: PaletteMode }};

    myTheme = createTheme({
        palette: {
            mode: state.sideBar.theme,
            background: {
                default: state.sideBar.theme === "dark" ? "#121212" : "#fff"
            },
        }
    })

    return (
        <ThemeProvider theme={myTheme}>
            {children}
        </ThemeProvider>
    )
};
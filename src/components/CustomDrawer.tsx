// import drawer from mui
import { Drawer, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../redux/store";

export const CustomDrawer: React.FC = ({}) => {
    const [ open, setOpen ] = useState(false);
    
    let dispatch = useDispatch();
    
    let openState = useSelector(state => state);

    useEffect(() => {
        let state = openState as unknown as { sideBar: { isOpen: boolean }};
        setOpen(state.sideBar.isOpen);
    }, [openState]);

    return(
        <>
            <Drawer variant="persistent" anchor="left" open={open} onClose={() => { 
                dispatch(toggleSideBar());
            }}
            
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
              }}>     
                <Toolbar/>
                <Typography>MenuItem1</Typography>
            </Drawer>

        </>
    )    
}
import React, { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem, SidebarHeader } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
// import Item from './Item'; // Import the corrected Item component
import { Link } from "react-router-dom";
import Logo from '../../assets/logo.png';
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ExtensionIcon from '@mui/icons-material/Extension';
import QuizIcon from '@mui/icons-material/Quiz';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SmartToySharpIcon from '@mui/icons-material/SmartToySharp';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SportsBaseballSharpIcon from '@mui/icons-material/SportsBaseballSharp';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
// import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
// import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
// import Chatbot from './Chatbot'; // Import the Item component
import fire from '../../config/Fire';
import { AuthContext } from '../../context/Auth';


const Item = ({ title, to, icon, selected, setSelected, isExternal }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      {isExternal ? (
        <a href={to} target="_blank" rel="noopener noreferrer">
          {/* Open external links in a new tab */}
        </a>
      ) : (
        <span>
          <Link to={to} /> {/* Internal links */}
        </span>
      )}
    </MenuItem>
  );
};

// export default Item;

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { currentUser } = useContext(AuthContext);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${theme.palette.mode === 'light' ? colors.pastel[200] : colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        {!isCollapsed && (
          <SidebarHeader>
            <Box display="flex" justifyContent="center" alignItems="center" p={2}>
              <img
                alt="Play2Grow Logo"
                src={Logo}
                style={{ width: "80%", height: "auto" }}
              />
            </Box>
          </SidebarHeader>
        )}

        <Menu iconShape="square">
          {/* Collapse Icon - Positioned below Logo when expanded */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              {/* User Email Section - Logo removed from here */}
              <Box textAlign="center">
                <Typography variant="h5" color={colors.orangeAccent[500]} sx={{ mt: 2 }}>
                  {currentUser.email}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>

            <Typography
              variant="body1"
              style={{
                marginLeft: '10px',
                fontSize: '20px', // Increase font size
                fontWeight: 'bold', // Make font thicker
              }} >

              <Item
                title="Dashboard"
                to="/Home"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Autism Quiz"
                to="/AQTest"
                icon={<QuizIcon />}
                selected={selected}
                setSelected={setSelected}
              />


              <p>
                <hr />
              </p>
              <Typography
                variant="h5"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
                fontWeight="bold"
                textAlign={"flex"}
              >
                Games
              </Typography>

              <Item
                title="Finger-Tapping"
                to="/FingerTapping"
                icon={<SportsEsportsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Emoji Test"
                to="/EmojiTest"
                icon={<EmojiEmotionsIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Memory Test"
                to="/MemoryTest"
                icon={<PsychologyIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Ball Clicking Test"
                to="/BallGame"
                icon={<SportsBaseballSharpIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Eye Tracking Game"
                to="/WebGazerGame"
                icon={<RemoveRedEyeIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Contact Doctor"
                to="/ContactDoctor"
                icon={<ContactPhoneIcon />}
                selected={selected}
                setSelected={setSelected}
              />

            </Typography>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
}

export default Sidebar

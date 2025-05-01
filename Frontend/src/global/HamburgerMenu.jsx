import { useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar,collapsed } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";

import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"; //1. Home icon
import AccountBalanceSharpIcon from "@mui/icons-material/AccountBalanceSharp"; //2. my watchlist icon
import DashboardSharpIcon from "@mui/icons-material/DashboardSharp"; //3. Tesla Dashboard icon
import MultilineChartSharpIcon from "@mui/icons-material/MultilineChartSharp"; //4. tesla advance chart
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined"; //5,6,7,8, reports
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
// import { useNavigate } from "react-router-dom";
import Divider from '@mui/material/Divider';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import CandlestickChartOutlinedIcon from '@mui/icons-material/CandlestickChartOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const HamburgerMenu = () => {
  const theme = useTheme();
  // const { user } = useAuthContext();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");//Represents the tab which is currently selected(Change Later)
  const { collapseSidebar } = useProSidebar();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <Box
      sx={{
        // "& .sidebar-root": {
        //   backgroundColor: colors.primary[700],
        // },
        // // "& .icon-wrapper": {
        //   backgroundColor: colors.primary[300],
        // },
        // "& .pro-inner-item": {
        //   padding: "5px 35px 5px 20px !important",
        // },
        // "& .inner-item:hover": {
        //   color: "#868dfb !important",
        // },
        // "& .menu-item.active": {
        //   color: "#FFFFFF !important",
        // },
      }}
    >
      <Sidebar collapsed={isCollapsed} rootStyles={{
        // [`.${sidebarClasses.container}`]: {
             backgroundColor:  colors.primary[1000],
            // },
        }}>
        <Box isCollapsed sx={{backgroundColor:colors.background}}>
        <Menu iconshape="square">
          {/* Logo amd menu item  */}
          <MenuItem
            onClick={() =>{collapseSidebar(); setIsCollapsed(!isCollapsed)}}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.blueAccent[700],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Menu
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
                
              </Box>
            )}
          </MenuItem>
          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center"  >
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src="https://thumbs.dreamstime.com/b/man-business-suit-icon-illustration-98773345.jpg"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user.firstNameSaved?user.firstNameSaved:user.firstName}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[100]}>
                  Elite Investor
                </Typography>
              </Box>
            </Box>
          )}
          
          <Box paddingLeft={isCollapsed ? undefined : "1%"}>
            <MenuItem
              component={<Link to="/home" />}
              icon={<HomeOutlinedIcon style={{ color: colors.grey[100] }} />}
              onClick={() => setSelected("Dashboard")}
            >
              <Typography color={colors.grey[100]}>
                Stock Listings
              </Typography>
            </MenuItem>

            <Typography
              variant="h6"
              color={colors.grey[100]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>

            <MenuItem
              component={<Link to="/watchlist" />}
              icon={<AccountBalanceSharpIcon style={{ color: colors.grey[100] }} />}
              onClick={() => setSelected("Watchlist")}
            >
              <Typography color={colors.grey[100]}>
                Watchlist
              </Typography>
            </MenuItem>

            <MenuItem
              component={<Link to="/portfolio" />}
              icon={<ContactsOutlinedIcon style={{ color: colors.grey[100] }}/>}
              onClick={() => setSelected("Portfolio")}
            >
              <Typography color={colors.grey[100]}>
                Portfolio
              </Typography>
            </MenuItem>

            <MenuItem
              component={<Link to="/orders" />}
              icon={<ReceiptLongOutlinedIcon style={{ color: colors.grey[100] }}/>}
              onClick={() => setSelected("Orders")}
            >
              <Typography color={colors.grey[100]}>
                Orders
              </Typography>
            </MenuItem>

            <Typography
              variant="h6"
              color={colors.grey[100]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>

            <MenuItem
              component={<Link to="/news" />}
              icon={<NewspaperOutlinedIcon style={{ color: colors.grey[100] }}/>}
              onClick={() => setSelected("News")}
            >
              <Typography color={colors.grey[100]}>
                News
              </Typography>
            </MenuItem>

            <MenuItem
              component={<Link to="/ipo" />}
              icon={<CandlestickChartOutlinedIcon style={{ color: colors.grey[100] }}/>}
              onClick={() => setSelected("IPO")}
            >
              <Typography color={colors.grey[100]}>
                IPO
              </Typography>
            </MenuItem>

            <MenuItem
              component={<Link to="/testimonials" />}
              icon={<RateReviewOutlinedIcon style={{ color: colors.grey[100] }}/>}
              onClick={() => setSelected("Reviews")}
            >
              <Typography color={colors.grey[100]}>
                Reviews
              </Typography>
            </MenuItem>
            
            
            
          </Box>
        </Menu>
        </Box>
      </Sidebar>
    </Box>
  );
};

export default HamburgerMenu;

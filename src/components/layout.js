import { Outlet } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import userinfo from "../_helpers/user";
import { RoleConstants } from "../constants/role.constants";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";

// Drawer

const Layout = () => {
  // Drawer
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    ></Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu open={isMobileMenuOpen} onClose={handleMobileMenuClose}></Menu>
  );

  const user = useSelector((state) => state.authentication.user);
  return (
    <>
      {
        user ? (
          <>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                  >
                    {/* <MenuIcon /> */}
                  </IconButton>

                  {localStorage.getItem("user") && userinfo && (
                    <Navbar
                      className="cel-head"
                      // bg={userinfo.role === RoleConstants.ADMIN ? "light" : "light"}
                      variant="light"
                      expand="lg"
                    >
                      <Container>
                        <Navbar.Brand href="/dashboard">
                          Technovation 2022
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                          <Nav className="me-auto">
                            <Link to="/dashboard" className="nav-link">
                              Dashboard
                            </Link>
                            {userinfo.role === RoleConstants.ADMIN && (
                              <Link to="/createquiz" className="nav-link">
                                Create Quiz
                              </Link>
                            )}
                            {userinfo.role === RoleConstants.ADMIN && (
                              <Link to="/managequestion" className="nav-link">
                                Add Question
                              </Link>
                            )}
                            {userinfo.role === RoleConstants.ADMIN && (
                              <Link to="/questionlist" className="nav-link">
                                Question List(s)
                              </Link>
                            )}
                            {userinfo.role === RoleConstants.ADMIN && (
                              <Link to="/startquiz" className="nav-link">
                                Start Quiz
                              </Link>
                            )}
                            {userinfo.role === RoleConstants.USER && (
                              <Link to="/joinquiz" className="nav-link">
                                Join Quiz
                              </Link>
                            )}
                            {userinfo.role === RoleConstants.USER && (
                              <Link to="/demoquiz" className="nav-link">
                                Self Assesment
                              </Link>
                            )}

                            {userinfo.role === RoleConstants.ADMIN && (
                              <Link to="/questionpreview" className="nav-link">
                                Quiz Preview
                              </Link>
                            )}
                            <Link to="/updateprofile" className="nav-link">
                              Update Profile
                            </Link>
                          </Nav>
                        </Navbar.Collapse>
                      </Container>
                    </Navbar>
                  )}

                  {/*  */}
                  <Box sx={{ flexGrow: 1 }} />
                  <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <div className="text-light cel-mt-24">
                      {/* Hi {user.firstName} {user.lastName} */}
                    </div>
                    <IconButton
                      size="large"
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <Nav.Link href="/logout">
                        {" "}
                        <LogoutIcon />
                      </Nav.Link>
                    </IconButton>
                  </Box>
                  <Box sx={{ display: { xs: "flex", md: "none" } }}>
                    <IconButton
                      size="large"
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <MoreIcon />
                    </IconButton>
                  </Box>
                </Toolbar>
              </AppBar>
              {renderMobileMenu}
              {renderMenu}
            </Box>
          </>
        ) : null}
      <Container>
        <Col>
          <Outlet />
        </Col>
      </Container>

      <div className="footer">© 2022 Celsior Technologies™</div>
    </>
  );
};

export default Layout;

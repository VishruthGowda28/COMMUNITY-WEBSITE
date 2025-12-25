import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {

  const isLoggedIn = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role") === "admin";

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location = "/login";
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar className="flex justify-between">
        
        <Typography variant="h6">
          AITSP Community
        </Typography>

        <div className="space-x-3">

          {/* Logged In Only */}
          {isLoggedIn && (
            <Button component={Link} to="/members" color="inherit">
              Members
            </Button>
          )}

          {isLoggedIn && (
            <Button component={Link} to="/profile" color="inherit">
              Profile
            </Button>
          )}

          {isLoggedIn && (
            <Button component={Link} to="/create" color="inherit">
              Create Post
            </Button>
          )}

          {/* Admin Only */}
          {isAdmin && (
            <Button component={Link} to="/admin" color="inherit">
              Dashboard
            </Button>
          )}

          {/* Not Logged In */}
          {!isLoggedIn && (
            <>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="secondary"
              >
                Login
              </Button>

              <Button
                component={Link}
                to="/register"
                variant="outlined"
                color="inherit"
              >
                Register
              </Button>
            </>
          )}

          {/* Logged In */}
          {isLoggedIn && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}

        </div>

      </Toolbar>
    </AppBar>
  );
}

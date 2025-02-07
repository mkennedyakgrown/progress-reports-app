import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NavBar({ sessionUser, setSessionUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    fetch("/api/logout", {
      method: "DELETE",
    }).then(() => {
      setSessionUser({
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        courses: [],
      });
      navigate("/login");
    });
  }

  return (
    <Stack justifyContent={"space-between"} direction="row" useFlexGap>
      <h3>Reports App</h3>
      {sessionUser.id == 0 ? null : (
        <Button type="button" variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </Stack>
  );
}

export default NavBar;

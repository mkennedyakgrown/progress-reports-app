import { Stack } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import logoSvg from "../assets/CS Logo Horizontal.svg";

function NavBar() {
  // const navigate = useNavigate();

  // function handleLogout() {
  //   fetch("https://progress-reports-app.onrender.com/api/logout", {
  //     method: "DELETE",
  //   }).then(() => {
  //     setSessionUser({
  //       id: 0,
  //       first_name: "",
  //       last_name: "",
  //       email: "",
  //       courses: [],
  //     });
  //     navigate("/login");
  //   });
  // }

  return (
    <Stack
      justifyContent={"space-between"}
      direction="row"
      useFlexGap
      sx={{ maxHeight: 40 }}
    >
      <img src={logoSvg} alt="logo" sizes="auto" />
      {/* {sessionUser.id == 0 ? null : (
        <Button type="button" variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      )} */}
    </Stack>
  );
}

export default NavBar;

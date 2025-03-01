import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function Login() {
  const [errors, setErrors] = useState([]);
  const { sessionUser, setSessionUser } = useOutletContext<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionUser.id) {
      if (sessionUser.is_admin) {
        navigate("/reports", { replace: true });
      } else {
        navigate(`/reports/users/${sessionUser.id}`, { replace: true });
      }
    }
  }, [sessionUser]);

  const formSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("https://progress-reports-app.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.errors) {
            setErrors(data.errors);
          } else {
            setSessionUser(data);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          formik.resetForm();
          // navigate("/reports", { replace: true });
        });
    },
  });

  return (
    <>
      <Stack
        justifyContent={"center"}
        spacing={{ xs: 1, sm: 4 }}
        component="form"
        direction="column"
        useFlexGap
        sx={{ margin: "auto", maxWidth: 500, padding: "auto" }}
        autoComplete="on"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="email"
          label="Email"
          variant="standard"
          error={formik.errors.email ? true : false}
          helperText={formik.errors.email ? formik.errors.email : null}
          required
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          autoComplete="email-address"
        />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          error={formik.errors.password ? true : false}
          helperText={formik.errors.password ? formik.errors.password : null}
          required
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          autoComplete="password"
        />
        <Button type="submit" variant="outlined">
          Login
        </Button>
        {errors ? <p>errors</p> : null}
      </Stack>
    </>
  );
}

export default Login;

import { LoadingButton } from "@mui/lab";
import { Alert, Button, Grid, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import logoTbus from "assets/images/logo-blue.png";
import MessageIcon from "assets/images/message.svg";
import PasswordIcon from "assets/images/password.svg";
import InputAuth from "components/InputAuth/InputAuth";
import TextWithLink from "components/TextWithLink/TextWithLink";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { get } from "lodash";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { authActions } from "store/auth/authSlice";
import { selectAuth } from "store/auth/selectors";
import { useStyles } from "./styles";

interface Values {
  email: string;
  password: string;
}

function LoginPage() {
  const { statusLogin } = useAppSelector(selectAuth);
  const { t } = useTranslation("auth");
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpenMessageFailure, setIsOpenMessageFailure] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });
  const handleNavigate = () => {
    navigate("/sign-up");
  };

  const handleOpenMessageFailure = () => {
    setIsOpenMessageFailure(true);
  };
  const handleCloseMessageFailure = () => {
    setIsOpenMessageFailure(false);
  };

  const onSubmit = (values: Values) => {
    dispatch(
      authActions.loginRequest({
        password: values.password,
        email: values.email,
        onSuccess: () => {},
        onFailure: handleOpenMessageFailure,
      })
    );
  };

  const handleForgotPage = () => {
    navigate("/forgot-password");
  };

  return (
    <form onSubmitCapture={handleSubmit(onSubmit)}>
      <Box className={classes.root}>
        <Box display={{ mobile: "block", desktop: "none" }} textAlign="center" mb="50px">
          <img src={logoTbus} alt="logo" width="50%" />
        </Box>
        <Grid className={classes.textWrap}>
          <Grid item xs={12} md={8}>
            <Highlighter
              textToHighlight={t("title_login")}
              highlightClassName={classes.highlightText}
              searchWords={["Tbus"]}
              autoEscape={true}
              className={classes.title}
            />
          </Grid>
        </Grid>
        <InputAuth
          control={control}
          nameInput={"email"}
          labelText={t("email")}
          id="email"
          placeholder="Input your e-mail"
          iconStart={MessageIcon}
          type="email"
          error={!!errors.email}
          messageErr={get(errors, "email.message", "")}
        />
        <InputAuth
          control={control}
          nameInput={"password"}
          labelText={t("password")}
          id="password"
          placeholder="Input your password"
          iconStart={PasswordIcon}
          type="password"
          error={!!errors.password}
          messageErr={get(errors, "password.message", "")}
        />
        <Button className={classes.forgotBtn} onClick={handleForgotPage}>
          {t("forgotPassword")}
        </Button>
        <LoadingButton
          variant="contained"
          fullWidth
          className={classes.btnSubmit}
          type="submit"
          loading={statusLogin === "loading"}
        >
          {t("login")}
        </LoadingButton>
        <TextWithLink text={t("notHaveAccount")} highlight={t("register_link")} onClick={handleNavigate} />
      </Box>
      <Snackbar
        open={isOpenMessageFailure}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleCloseMessageFailure}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {t("login_failure")}
        </Alert>
      </Snackbar>
    </form>
  );
}

export default LoginPage;

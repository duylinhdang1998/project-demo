import { Button, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import MessageIcon from "assets/images/message.svg";
import PasswordIcon from "assets/images/password.svg";
import InputAuth from "components/InputAuth/InputAuth";
import ToastCustom from "components/ToastCustom/ToastCustom";
import { get } from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useToastStyle } from "theme/toastStyles";

interface Values {
  email: string;
  password: string;
  repassword: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  btnSubmit: {
    margin: "12px 0 !important",
    height: "48px",
    borderRadius: "4px",
    fontWeight: "700 !important",
    "&:hover": {
      backgroundColor: theme.palette.primary.main + "!important",
    },
  },
  btnCancel: {
    height: "48px",
    borderRadius: "4px",
    color: theme.palette.primary.main + "!important",
    fontWeight: "700 !important",
  },
}));

export default function ForgetPassword() {
  const { t } = useTranslation("auth");
  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();
  const toastClass = useToastStyle();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Values>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      repassword: "",
    },
  });

  const onSubmit = (values: Values) => {
    if (tabIndex === 0) {
      setTabIndex(1);
      return;
    }
    navigate("/login");
    toast(
      <ToastCustom
        type="success"
        text="Password reset is successful!
    Please login to use the service"
      />,
      {
        className: toastClass.toastSuccess,
      }
    );
  };

  useEffect(() => {
    reset({ password: "", repassword: "" });
  }, [tabIndex]);

  const handleCancel = () => {
    navigate(-1);
  };

  const renderResetPassInput = () => {
    return (
      <Fragment>
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
        <InputAuth
          control={control}
          nameInput={"repassword"}
          labelText={t("confirm_password")}
          id="repassword"
          placeholder="Input your password"
          iconStart={PasswordIcon}
          type="password"
          error={!!errors.repassword}
          rules={{
            validate: {
              isEqual: (v) =>
                getValues("password") === v || `${t("error_password")}`,
            },
          }}
          messageErr={get(errors, "repassword.message", "")}
        />
        <Button
          variant="contained"
          fullWidth
          className={classes.btnSubmit}
          onClick={handleSubmit(onSubmit)}
        >
          {t("save_password")}
        </Button>
      </Fragment>
    );
  };

  return (
    <Box minWidth="400px" padding="0 16px">
      <Typography component="h2" fontWeight={400} fontSize="36px" mb="20px">
        {tabIndex === 0 ? t("find_account") : t("reset_pass")}
      </Typography>
      <Typography component="p" fontSize={14} fontWeight={400} width="80%">
        {t(tabIndex === 0 ? "sub_forgot_pass" : "reset_u_password")}
      </Typography>
      {tabIndex === 0 ? (
        <>
          <InputAuth
            control={control}
            nameInput={"email"}
            labelText={t("email")}
            id="email"
            placeholder="Input your e-mail"
            iconStart={MessageIcon}
            type="email"
            error={!!errors["email"]}
            messageErr={get(errors, "email.message", "")}
          />
          <Button
            variant="contained"
            fullWidth
            className={classes.btnSubmit}
            onClick={handleSubmit(onSubmit)}
          >
            {t("continue")}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            className={classes.btnCancel}
            onClick={handleCancel}
          >
            {t("cancel")}
          </Button>
        </>
      ) : (
        renderResetPassInput()
      )}
    </Box>
  );
}

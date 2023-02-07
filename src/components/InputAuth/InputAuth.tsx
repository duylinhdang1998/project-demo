import { InputAdornment, InputBase, InputBaseProps, InputLabel, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EyeNonIcon from "assets/images/eye-non.svg";
import EyeIcon from "assets/images/eye.svg";
import React, { useState } from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useStyles } from "./styles";

export interface InputAuthProps<T extends FieldValues> extends InputBaseProps {
  iconStart?: string;
  iconEnd?: string;
  labelText?: string;
  nameInput: UseControllerProps<T>["name"];
  control: UseControllerProps<T>["control"];
  rules?: UseControllerProps<T>["rules"];
  messageErr?: string;
}

function InputAuth<T extends FieldValues>({
  id,
  type,
  iconStart,
  labelText,
  iconEnd,
  control,
  nameInput,
  rules,
  error,
  messageErr,
  ...rest
}: InputAuthProps<T>) {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const { t } = useTranslation(["translation"]);
  const startAdor = !!iconStart && (
    <InputAdornment position="start">
      <img src={iconStart} className={classes.iconStartAdor} alt="start-ador" />
    </InputAdornment>
  );
  const renderIconEye = show ? EyeNonIcon : EyeIcon;

  const handleShowPass = () => {
    setShow((prev) => !prev);
  };

  const endAdor =
    type === "password" ? (
      <InputAdornment position="end" onClick={handleShowPass} sx={{ cursor: "pointer" }}>
        <img src={type === "password" ? renderIconEye : iconEnd} className={classes.iconStartAdor} alt="start-ador" />
      </InputAdornment>
    ) : null;
  return (
    <Controller
      control={control}
      name={nameInput}
      rules={{
        required: {
          value: true,
          message: t("error_required", { name: nameInput }),
        },
        ...(type === "email"
          ? {
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: t("error_email"),
              },
            }
          : {}),
        ...rules,
      }}
      render={({ field }) => {
        return (
          <Box my="24px">
            <InputLabel htmlFor={id} className={classes.label}>
              {labelText}
            </InputLabel>
            <InputBase
              {...rest}
              {...field}
              type={type === "password" ? (show ? "text" : "password") : "text"}
              id={id}
              className={classes.input}
              startAdornment={startAdor}
              endAdornment={endAdor}
              fullWidth
              error={error}
            />
            {!!error && (
              <Typography component="p" className={classes.error} fontSize={12}>
                {messageErr}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
}
export default InputAuth;

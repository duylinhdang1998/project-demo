import { Box } from "@mui/material";
import Button from "components/Button/Button";
import { useAppSelector } from "hooks/useAppSelector";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "store/auth/selectors";
import "./style.css";

export default function NotFound() {
  const { t } = useTranslation();
  const { userInfo } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(userInfo?.role === "admin" ? "/admin" : "/agent");
  };
  return (
    <Box
      display="flex"
      height="100vh"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <h1 style={{ textAlign: "center", margin: "15px 30px" }}>
        404 Error Page
      </h1>
      <section className="error-container">
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>4</span>
        </span>
      </section>
      <Button
        variant="contained"
        color="primary"
        backgroundButton="#1AA6EE"
        onClick={handleBack}
        sx={{ padding: "0 10px" }}
      >
        {t("back_home")}
      </Button>
    </Box>
  );
}

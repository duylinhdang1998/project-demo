import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

interface UseNotificationAfterActionFailure {
  message: string;
}

export const useNotificationAfterActionFailure = ({ message }: UseNotificationAfterActionFailure) => {
  const [isOpenMessageFailure, setIsOpenMessageFailure] = useState(false);

  const handleOpenMessageFailure = () => {
    setIsOpenMessageFailure(true);
  };
  const handleCloseMessageFailure = () => {
    setIsOpenMessageFailure(false);
  };

  const Notification = (
    <Snackbar
      open={isOpenMessageFailure}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleCloseMessageFailure}
    >
      <Alert severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );

  return {
    Notification,
    open: handleOpenMessageFailure,
    close: handleCloseMessageFailure,
  };
};

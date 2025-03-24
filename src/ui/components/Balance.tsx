import { FC, useEffect, useRef, useState } from "react";
import { Box, IconButton, Typography, TextField } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type BalanceCardProps = {
  balance: number;
  balanceChanged: (newBalance: number) => void;
};

const schema = yup.object({
  newBalance: yup.number().required().min(0),
});

type FormData = yup.InferType<typeof schema>;

const Balance: FC<BalanceCardProps> = ({ balance, balanceChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      newBalance: balance,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (isEditing && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    balanceChanged(data.newBalance);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      {isEditing ? (
        <>
          <Typography variant="h6" sx={{ mr: 1 }}>
            Current Balance:
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Controller
              name="newBalance"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  inputRef={inputRef}
                  variant="standard"
                  sx={{ maxWidth: 100 }}
                />
              )}
            />
            <IconButton
              data-testid="BalanceSaveButton"
              type="submit"
              size="small"
              disabled={!!errors.newBalance}
            >
              <SaveOutlinedIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h6">
            Current Balance: ${balance.toFixed(2)}
          </Typography>
          <IconButton data-testid="BalanceEditButton" onClick={handleEditClick}>
            <EditOutlinedIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default Balance;

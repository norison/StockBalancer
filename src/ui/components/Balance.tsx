import { FC, useEffect, useRef, useState } from "react";
import { Box, IconButton, Typography, TextField, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react-lite";
import { usePortfolioStore } from "../container/container.ts";
import { formatNumberToCurrency } from "../utils.ts";

const schema = yup.object({
  newBalance: yup.number().required().min(0),
});

type FormData = yup.InferType<typeof schema>;

const Balance: FC = observer(() => {
  const portfolioStore = usePortfolioStore();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      newBalance: portfolioStore.balance,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (isEditing && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setValue("newBalance", portfolioStore.balance);
  }, [portfolioStore.balance, setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    portfolioStore.updateBalance(data.newBalance);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setValue("newBalance", portfolioStore.balance);
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
                  size="small"
                  sx={{ maxWidth: 55 }}
                />
              )}
            />
            <IconButton
              data-testid="BalanceCancelButton"
              onClick={handleCancelClick}
              size="small"
            >
              <CloseOutlinedIcon />
            </IconButton>
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
            Current Balance: {formatNumberToCurrency(portfolioStore.balance)}
          </Typography>
          <Tooltip title="Edit balance" placement="right" arrow>
            <IconButton
              data-testid="BalanceEditButton"
              onClick={handleEditClick}
            >
              <EditOutlinedIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
});

export default Balance;

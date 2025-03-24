import { FC, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { Position } from "../types/Position.ts";

const schema = yup.object({
  ticker: yup.string().required(),
  quantity: yup.number().required().integer().min(0),
  price: yup.number().required().positive(),
  target: yup.number().required().positive().max(100),
});

type FormData = yup.InferType<typeof schema>;

type PositionFormDialogProps = {
  open: boolean;
  position?: Position;
  onCancel: () => void;
  onSubmit: (data: Position) => void;
};

const PositionFormDialog: FC<PositionFormDialogProps> = ({
  open,
  position,
  onCancel,
  onSubmit,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (open) {
      if (position) {
        setValue("ticker", position.ticker);
        setValue("quantity", position.quantity);
        setValue("price", position.price);
        setValue("target", position.target);
      } else {
        reset();
      }
    }
  }, [open, reset, setValue, position]);

  const onSubmitInternal = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Add Position</DialogTitle>
      <DialogContent>
        <Divider />
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitInternal)}
          sx={{ mt: 2 }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <Controller
                name="ticker"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    inputRef={field.ref}
                    variant="outlined"
                    label="Ticker"
                    error={!!errors.ticker}
                    helperText={errors.ticker?.message}
                  />
                )}
              />
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    label="Quantity"
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                  />
                )}
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    label="Price"
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                )}
              />
              <Controller
                name="target"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    label="Target %"
                    error={!!errors.target}
                    helperText={errors.target?.message}
                  />
                )}
              />
            </Stack>
          </Stack>

          <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PositionFormDialog;

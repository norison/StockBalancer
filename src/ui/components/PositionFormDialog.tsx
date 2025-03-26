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
import { observer } from "mobx-react-lite";
import { usePortfolioStore } from "../container/container.ts";

const PositionFormDialog: FC = observer(() => {
  const portfolioStore = usePortfolioStore();

  const schema = yup.object({
    ticker: yup
      .string()
      .required()
      .test("unique", "Ticker already exists", (value) => {
        if (!value || portfolioStore.currentPosition) {
          return true;
        }
        return !portfolioStore.positions.some(
          (position) => position.ticker.toLowerCase() === value.toLowerCase(),
        );
      }),
    quantity: yup
      .number()
      .typeError("Must be a number")
      .required()
      .integer()
      .min(0),
    price: yup.number().typeError("Must be a number").required().positive(),
    target: yup
      .number()
      .typeError("Must be a number")
      .required()
      .positive()
      .max(100),
  });

  type FormData = yup.InferType<typeof schema>;

  const {
    handleSubmit,
    control,
    reset,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      ticker: "",
      // eslint-disable-next-line
      // @ts-ignore
      quantity: "",
      // eslint-disable-next-line
      // @ts-ignore
      price: "",
      // eslint-disable-next-line
      // @ts-ignore
      target: "",
    },
  });

  useEffect(() => {
    if (portfolioStore.dialogOpen) {
      reset();
      clearErrors();

      if (portfolioStore.currentPosition) {
        setValue("ticker", portfolioStore.currentPosition.ticker);
        setValue("quantity", portfolioStore.currentPosition.quantity);
        setValue("price", portfolioStore.currentPosition.price);
        setValue("target", portfolioStore.currentPosition.target);
      }
    }
  }, [
    reset,
    setValue,
    portfolioStore.currentPosition,
    portfolioStore.dialogOpen,
    clearErrors,
  ]);

  const onSubmitInternal = (data: FormData) => {
    console.log("Submitting", data);
    console.log("Current Position", portfolioStore.currentPosition);

    if (portfolioStore.currentPosition) {
      portfolioStore.editPosition(data);
    } else {
      console.log("adding position");
      portfolioStore.addPosition(data);
    }
  };

  return (
    <Dialog
      open={portfolioStore.dialogOpen}
      onClose={() => portfolioStore.cancelDialog()}
      disableRestoreFocus
    >
      <DialogTitle>
        {portfolioStore.currentPosition ? "Edit Position" : "Add Position"}
      </DialogTitle>
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
                    autoFocus
                    {...field}
                    variant="outlined"
                    label="Ticker"
                    error={!!errors.ticker}
                    helperText={errors.ticker?.message}
                    sx={{ width: 200 }}
                    disabled={!!portfolioStore.currentPosition}
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
                    sx={{ width: 200 }}
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
                    sx={{ width: 200 }}
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
                    sx={{ width: 200 }}
                  />
                )}
              />
            </Stack>
          </Stack>

          <DialogActions>
            <Button onClick={() => portfolioStore.cancelDialog()}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
});

export default PositionFormDialog;

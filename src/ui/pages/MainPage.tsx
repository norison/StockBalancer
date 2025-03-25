import { FC } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CalculateIcon from "@mui/icons-material/Calculate";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import { observer } from "mobx-react-lite";
import { usePortfolioStore, useStorage } from "../container/container.ts";
import PositionTable from "../components/PositionTable.tsx";
import PositionFormDialog from "../components/PositionFormDialog.tsx";
import Balance from "../components/Balance.tsx";
import CalculationResult from "../components/CalculationResult.tsx";

const MainPage: FC = observer(() => {
  const portfolioStore = usePortfolioStore();
  const storage = useStorage();

  const savePortfolio = async () => {
    await storage.savePortfolio({
      balance: portfolioStore.balance,
      positions: portfolioStore.positions,
    });
  };

  return (
    <Container sx={{ my: 2 }}>
      <Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Balance />

          <Box>
            <Tooltip title="Save balance and positions" arrow sx={{ mx: 2 }}>
              <IconButton onClick={savePortfolio}>
                <SaveAsOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => (portfolioStore.dialogOpen = true)}
            >
              Add Position
            </Button>
          </Box>
        </Box>

        <PositionTable />

        <Tooltip
          title="You need to have 100% target allocation to calculate"
          arrow
          disableHoverListener={portfolioStore.shouldCalculate}
          disableFocusListener={portfolioStore.shouldCalculate}
        >
          <Box component="span" sx={{ alignSelf: "flex-start", mt: 2 }}>
            <Button
              startIcon={<CalculateIcon />}
              variant="contained"
              disabled={!portfolioStore.shouldCalculate}
            >
              Calculate
            </Button>
          </Box>
        </Tooltip>

        <CalculationResult />
      </Stack>

      <PositionFormDialog />
    </Container>
  );
});

export default MainPage;

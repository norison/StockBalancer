import { FC } from "react";
import { Box, Container, IconButton, Stack, Tooltip } from "@mui/material";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
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

  const restorePortfolio = async () => {
    const portfolio = await storage.getPortfolio();
    if (portfolio) {
      portfolioStore.loadPortfolio(portfolio);
    }
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
            <Tooltip title="Restore saved balance and positions" arrow>
              <IconButton onClick={restorePortfolio}>
                <RestoreOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Save balance and positions" arrow>
              <IconButton onClick={savePortfolio}>
                <SaveAsOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Add new position" arrow>
              <IconButton onClick={() => portfolioStore.openAddDialog()}>
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <PositionTable />
        <CalculationResult />
      </Stack>

      <PositionFormDialog />
    </Container>
  );
});

export default MainPage;

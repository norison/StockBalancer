import { FC, useState } from "react";
import { Box, Button, Container, Stack, Tooltip } from "@mui/material";
import { Position } from "./types/Position.ts";
import PositionTable from "./components/PositionTable.tsx";
import AddIcon from "@mui/icons-material/Add";
import CalculateIcon from "@mui/icons-material/Calculate";
import Balance from "./components/Balance.tsx";
import PositionFormDialog from "./components/PositionFormDialog.tsx";

const App: FC = () => {
  const [addPositionDialogOpen, setAddPositionDialogOpen] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [positions, setPositions] = useState<Position[]>([]);
  const [editPosition, setEditPosition] = useState<Position>();

  const possibleToCalculate =
    positions.reduce((prev, position) => prev + position.target, 0) === 100;

  const handleEditRequested = (ticker: string) => {
    setEditPosition(positions.find((p) => p.ticker === ticker) ?? undefined);
    setAddPositionDialogOpen(true);
  };

  const handleDeleteRequested = (ticker: string) => {
    setPositions(positions.filter((position) => position.ticker !== ticker));
  };

  const handleSubmitPosition = (position: Position) => {
    const existingPosition = positions.find(
      (p) => p.ticker === position.ticker,
    );

    if (existingPosition) {
      setPositions(
        positions.map((p) => (p.ticker === position.ticker ? position : p)),
      );
      setEditPosition(undefined);
    } else {
      setPositions([...positions, position]);
      setEditPosition(undefined);
    }

    setAddPositionDialogOpen(false);
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
          <Balance balance={balance} balanceChanged={setBalance} />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddPositionDialogOpen(true)}
          >
            Add Position
          </Button>
        </Box>

        <PositionTable
          positions={positions}
          editRequested={handleEditRequested}
          deleteRequested={handleDeleteRequested}
        />

        <Tooltip
          title="You need to have 100% target allocation to calculate"
          arrow
          disableHoverListener={possibleToCalculate}
          disableFocusListener={possibleToCalculate}
        >
          <Box component="span" sx={{ alignSelf: "flex-start", mt: 2 }}>
            <Button
              startIcon={<CalculateIcon />}
              variant="contained"
              disabled={!possibleToCalculate}
            >
              Calculate
            </Button>
          </Box>
        </Tooltip>
      </Stack>

      <PositionFormDialog
        open={addPositionDialogOpen}
        position={editPosition}
        onCancel={() => setAddPositionDialogOpen(false)}
        onSubmit={handleSubmitPosition}
      />
    </Container>
  );
};

export default App;

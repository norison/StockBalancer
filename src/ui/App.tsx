import {FC, useState} from "react";
import {Box, Button, Container, Stack, Tooltip} from "@mui/material";
import {Position} from "./types/Position.ts";
import PositionTable from "./components/PositionTable.tsx";
import AddIcon from '@mui/icons-material/Add';
import CalculateIcon from '@mui/icons-material/Calculate';
import Balance from "./components/Balance.tsx";

const App: FC = () => {
  const [balance, setBalance] = useState(1000);
  const [positions, setPositions] = useState<Position[]>([
    {ticker: 'AAPL', quantity: 100, price: 150, target: 25},
    {ticker: 'GOOGL', quantity: 50, price: 2500, target: 25},
    {ticker: 'AMZN', quantity: 10, price: 3500, target: 25},
    {ticker: 'TSLA', quantity: 5, price: 600, target: 25},
  ]);

  const possibleToCalculate = positions.reduce((prev, position) => prev + position.target, 0) === 100;

  const handleEditRequested = (ticker: string) => {
    console.log(`Edit requested for ${ticker}`);
  }

  const handleDeleteRequested = (ticker: string) => {
    setPositions(positions.filter((position) => position.ticker !== ticker));
  }

  return (
    <Container sx={{my: 2}}>
      <Stack>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
          <Balance balance={balance} balanceChanged={setBalance}/>
          <Button variant="contained" startIcon={<AddIcon/>}>Add Position</Button>
        </Box>

        <PositionTable positions={positions} editRequested={handleEditRequested}
                       deleteRequested={handleDeleteRequested}/>

        <Tooltip title="You need to have 100% target allocation to calculate" arrow
                 disableHoverListener={possibleToCalculate}>
          <Box component="span" sx={{alignSelf: "flex-start", mt: 2}}>
            <Button startIcon={<CalculateIcon/>}
                    variant="contained"
                    disabled={!possibleToCalculate}>Calculate</Button>
          </Box>
        </Tooltip>

      </Stack>
    </Container>
  )
}

export default App;
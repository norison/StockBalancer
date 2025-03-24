import {FC, useState} from "react";
import {Box, Button, Container} from "@mui/material";
import {Position} from "./services/balancer/models/Position.ts";
import PositionTable from "./components/PositionTable.tsx";
import AddIcon from '@mui/icons-material/Add';
import Balance from "./components/Balance.tsx";

const App: FC = () => {
  const [balance, setBalance] = useState(1000);
  const [positions, setPositions] = useState<Position[]>([
    {ticker: 'AAPL', quantity: 100, price: 150, percentage: 25},
    {ticker: 'GOOGL', quantity: 50, price: 2500, percentage: 25},
    {ticker: 'AMZN', quantity: 10, price: 3500, percentage: 25},
    {ticker: 'TSLA', quantity: 5, price: 600, percentage: 25},
  ]);

  const handleEditRequested = (ticker: string) => {
    console.log(`Edit requested for ${ticker}`);
  }

  const handleDeleteRequested = (ticker: string) => {
    setPositions(positions.filter((position) => position.ticker !== ticker));
  }

  return (
    <Container sx={{my: 2}}>

      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
        <Balance balance={balance} balanceChanged={setBalance}/>
        <Button variant="contained" startIcon={<AddIcon/>}>Add Position</Button>
      </Box>

      <PositionTable positions={positions} editRequested={handleEditRequested} deleteRequested={handleDeleteRequested}/>
    </Container>
  )
}

export default App;
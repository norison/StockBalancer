import {FC} from "react";
import PositionTable from "./components/PositionTable.tsx";
import {Button, Card, CardActions, CardContent, Container} from "@mui/material";

const App: FC = () => {
  return (
    <Container sx={{my: 5}}>

      <Card>
        <CardContent>
          <PositionTable positions={[
            {ticker: "AAPL", quantity: 10, price: 100, targetPercentage: 50},
            {ticker: "GOOGL", quantity: 5, price: 200, targetPercentage: 25},
            {ticker: "TSLA", quantity: 3, price: 300, targetPercentage: 15},
          ]}/>
        </CardContent>
        <CardActions>
          <Button sx={{display: "block", ml: "auto", mb: 1}} variant="outlined">Add Ticker</Button>
        </CardActions>
      </Card>


    </Container>
  )
}

export default App;
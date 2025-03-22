import {FC} from "react";
import {Position} from "../services/balancer/models/Position.ts";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

type PositionTableProps = {
  positions: Position[];
}

const PositionTable: FC<PositionTableProps> = ({positions}) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ticket</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Percentage</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((position) => (
            <TableRow key={position.ticker}>
              <TableCell>{position.ticker}</TableCell>
              <TableCell>{position.quantity}</TableCell>
              <TableCell>{position.price}</TableCell>
              <TableCell>{position.targetPercentage}</TableCell>
              <TableCell><IconButton size="small"><MoreVertIcon/></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default PositionTable;
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
  TableRow, Typography,
} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

type PositionTableProps = {
  positions: Position[];
  editRequested: (ticker: string) => void;
  deleteRequested: (ticker: string) => void;
}

const PositionTable: FC<PositionTableProps> = ({positions, editRequested, deleteRequested}) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left"><Typography>Ticket</Typography></TableCell>
            <TableCell align="right"><Typography>Quantity</Typography></TableCell>
            <TableCell align="right"><Typography>Price</Typography></TableCell>
            <TableCell align="right"><Typography>Percentage</Typography></TableCell>
            <TableCell align="right"><Typography>Actions</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.length === 0
            ?
            <TableRow><TableCell colSpan={5} sx={{padding: 2, textAlign: "center"}}>
              <Typography>No positions</Typography></TableCell></TableRow>
            : positions.map((position) => (
              <TableRow key={position.ticker} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell align="left" component="th"
                           scope="row"><Typography sx={{fontWeight: 'bold'}}>{position.ticker}</Typography></TableCell>
                <TableCell align="right"><Typography>{position.quantity}</Typography></TableCell>
                <TableCell align="right"><Typography>${position.price}</Typography></TableCell>
                <TableCell align="right"><Typography>{position.percentage}%</Typography></TableCell>
                <TableCell align="right">
                  <IconButton data-testid="PositionTableEditButton" size="small"
                              onClick={() => editRequested(position.ticker)}><EditOutlinedIcon/></IconButton>
                  <IconButton data-testid="PositionTableDeleteButton" size="small" onClick={() => deleteRequested(position.ticker)}><DeleteOutlineOutlinedIcon/></IconButton>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default PositionTable;
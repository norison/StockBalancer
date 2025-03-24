import { FC } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { usePortfolio } from "../stores/PortfolioStore.ts";
import { observer } from "mobx-react-lite";

const PositionTable: FC = observer(() => {
  const portfolioStore = usePortfolio();

  const calculateCurrentPercentage = (quantity: number, price: number) => {
    return ((quantity * price) / portfolioStore.totalValue) * 100;
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography>Ticker</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Quantity</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Price</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Target %</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Current %</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portfolioStore.positions.length === 0 ? (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell colSpan={6} sx={{ padding: 2, textAlign: "center" }}>
                <Typography>No positions</Typography>
              </TableCell>
            </TableRow>
          ) : (
            portfolioStore.positions.map((position) => (
              <TableRow
                key={position.ticker}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" component="th" scope="row">
                  <Typography sx={{ fontWeight: "bold" }}>
                    {position.ticker}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{position.quantity}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>${position.price}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{position.target}%</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                    {calculateCurrentPercentage(
                      position.quantity,
                      position.price,
                    ).toFixed(2)}
                    %
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    data-testid="PositionTableEditButton"
                    size="small"
                    onClick={() =>
                      portfolioStore.openEditDialog(position.ticker)
                    }
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton
                    data-testid="PositionTableDeleteButton"
                    size="small"
                    onClick={() =>
                      portfolioStore.removePosition(position.ticker)
                    }
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default PositionTable;

import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { MUITableProps } from "../types/types";

const MUITable: React.FC<MUITableProps> = ({
    thead,

    children,
}) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {thead.map((head, index) => (
                            <TableCell key={index} align='center'>
                                {head}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {children}
            </Table>
        </TableContainer>
    );
};

export default MUITable;

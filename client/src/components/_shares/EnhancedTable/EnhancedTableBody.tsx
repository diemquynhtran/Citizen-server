import React from 'react';
import clsx from 'clsx';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useStylesTable } from "./useStyles";

interface Props{
	head: any,
	rows: any,
}

const EnhancedTableHead: React.FC<Props> = ({ head }) => {
	return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {head.map((headCell: any) => (
          <TableCell
            key={head.id}
            align={'left'}
            padding={'normal'}
          >
		  {headCell.label}
          </TableCell>
        ))}
		<TableCell padding="checkbox">
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableBody: React.FC<Props> = ({ head, rows }) => {
	const classes = useStylesTable();
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleChangePage = (event: unknown, newPage: number) => {
	setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
	setRowsPerPage(parseInt(event.target.value, 10));
	setPage(0);
	};
	
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
	
	return (
		<div >
		<TableContainer>
			  <Table
				className={classes.table}
				aria-labelledby="tableTitle"
				size={'medium'}
			  >
				<EnhancedTableHead head={head} rows={rows} />
				<TableBody>
				  {rows.map((row: any, index: any) => {
					  const labelId = `enhanced-table-checkbox-${index}`;

					  return (
						<TableRow
						  hover
						  tabIndex={-1}
						  key={row.name}
						>
						  <TableCell padding="checkbox">
						  </TableCell>
						  
						  {Object.values(row).map((key: any) => {return <TableCell>{key}</TableCell>})}		
						  
						  <TableCell padding="checkbox">
						  </TableCell>
						</TableRow>
					  );
					})}
				  {emptyRows > 0 && (
					<TableRow style={{ height: 53 * emptyRows }}>
					  <TableCell colSpan={6} />
					</TableRow>
				  )}
				</TableBody>
			  </Table>
			</TableContainer>
			<TablePagination
			  rowsPerPageOptions={[5, 10, 25]}
			  component="div"
			  count={rows.length}
			  rowsPerPage={rowsPerPage}
			  page={page}
			  onPageChange={handleChangePage}
			  onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div >
	);
};

export default EnhancedTableBody;
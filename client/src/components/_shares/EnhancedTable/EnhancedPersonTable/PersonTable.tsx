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

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface Data {
	uid: string;
	name: string;
	birthday: string;
	gender: string;
	level: number;
	religion: string;
	job: string;
	defaultAddr: string;
	currentAddr: string;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
	{ id: 'uid', numeric: true, disablePadding: false, label: 'Số CMND/CCCD' },
	{ id: 'name', numeric: false, disablePadding: true, label: 'Tên' },
	{ id: 'birthday', numeric: true, disablePadding: false, label: 'Ngày sinh' },
	{ id: 'gender', numeric: true, disablePadding: false, label: 'Giới tính' },
	{ id: 'level', numeric: true, disablePadding: false, label: 'Trình độ Học vấn' },
	{ id: 'religion', numeric: true, disablePadding: false, label: 'Tôn giáo' },
	{ id: 'job', numeric: true, disablePadding: false, label: 'Nghề nghiệp' },
	{ id: 'defaultAddr', numeric: true, disablePadding: false, label: 'Địa chỉ Thường trú' },
	{ id: 'currentAddr', numeric: true, disablePadding: false, label: 'Địa chỉ Tạm trú' },
];

interface EnhancedTableProps {
	classes: ReturnType<typeof useStylesTable>;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { classes, order, orderBy, rowCount, onRequestSort } = props;
	const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
	onRequestSort(event, property);
	};

	return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface Props {
	rows: any;
}

const PersonTable: React.FC<Props> = ({ rows }) => {
	const classes = useStylesTable();
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	
	const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
	const isAsc = orderBy === property && order === 'asc';
	setOrder(isAsc ? 'desc' : 'asc');
	setOrderBy(property);
	};

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
				<EnhancedTableHead
				  classes={classes}
				  order={order}
				  orderBy={orderBy}
				  onRequestSort={handleRequestSort}
				  rowCount={rows.length}
				/>
				<TableBody>
				  {stableSort(rows, getComparator(order, orderBy))
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map((row, index) => {
					  const labelId = `enhanced-table-checkbox-${index}`;

					  return (
						<TableRow
						  hover
						  tabIndex={-1}
						  key={row.name}
						>
						  <TableCell padding="checkbox">
						  </TableCell>
						  <TableCell component="th" id={labelId} scope="row" padding="none">
							{row.uid}
						  </TableCell>
						  <TableCell align="left">{row.name}</TableCell>
						  <TableCell align="left">{row.birthday}</TableCell>
						  <TableCell align="left">{row.gender}</TableCell>
						  <TableCell align="left">{row.birthday}</TableCell>
						  <TableCell align="left">{row.level}</TableCell>
						  <TableCell align="left">{row.religion}</TableCell>
						  <TableCell align="left">{row.job}</TableCell>
						  <TableCell align="left">{row.defaultAddr}</TableCell>
						  <TableCell align="left">{row.currentAddr}</TableCell>
						  <TableCell padding="checkbox">
						  </TableCell>
						</TableRow>
					  );
					})}
				  {emptyRows > 0 && (
					<TableRow style={{ height: 33 * emptyRows }}>
					  <TableCell colSpan={6} />
					</TableRow>
				  )}
				</TableBody>
			  </Table>
			</TableContainer>
			<TablePagination
			  rowsPerPageOptions={[25, 50, 100]}
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

export default PersonTable;
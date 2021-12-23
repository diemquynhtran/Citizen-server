import * as React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import { useStylesTable } from "./useStyles";
import TableToolbar from "./TableToolbar";
import StatisticalTable from "./StatisticalTable";

interface Props {
	tableName: string;
	rows: any;
}

const EnhancedStatisticalTable: React.FC<Props> = ({ tableName, rows }) => {
	const classes = useStylesTable();
	
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<TableToolbar tableName={tableName} />
				<StatisticalTable rows={rows} />
			</Paper>
		</div>
	);
};

export default EnhancedStatisticalTable;
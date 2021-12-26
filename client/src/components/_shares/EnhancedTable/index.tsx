import * as React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import { useStylesTable } from "./useStyles";
import TableToolbar from "./TableToolbar";
import EnhancedTableBody from "./EnhancedTableBody";

interface Props {
	tableName?: string;
	rows: any;
	head: any;
	hasButtons?: boolean;
}

const EnhancedTable: React.FC<Props> = ({ tableName, rows, head, hasButtons }) => {
	const classes = useStylesTable();
	
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<TableToolbar tableName={tableName? tableName: ""} />
				<EnhancedTableBody rows={rows} head={head} hasButtons={hasButtons} />
			</Paper>
		</div>
	);
};

export default EnhancedTable;
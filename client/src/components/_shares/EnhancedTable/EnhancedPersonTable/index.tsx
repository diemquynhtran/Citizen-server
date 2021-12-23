import * as React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import { useStylesTable } from "./useStyles";
import TableToolbar from "./TableToolbar";
import PersonTable from "./PersonTable";

interface Props {
	tableName: string;
	rows: any;
}

const EnhancedPersonTable: React.FC<Props> = ({ tableName, rows }) => {
	const classes = useStylesTable();
	
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<TableToolbar tableName={tableName} />
				<PersonTable rows={rows} />
			</Paper>
		</div>
	);
};

export default EnhancedPersonTable;
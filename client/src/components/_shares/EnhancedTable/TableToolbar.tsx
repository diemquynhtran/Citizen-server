import * as React from 'react';
import PropTypes from 'prop-types';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useStylesToolbar } from "./useStyles";

interface Props {
	tableName: string;
}

const TableToolbar: React.FC<Props> = ({ tableName }) => {
	const classes = useStylesToolbar();
    return (
        <Toolbar
			className={classes.root}
        >
			<Typography
				className={classes.title}
			>
				{tableName}
			</Typography>
        </Toolbar>
    );
};

export default TableToolbar;
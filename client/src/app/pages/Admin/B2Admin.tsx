import React from "react";

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import PersonForm from "components/form/PersonForm"

const B2AdminPage = () => {
	return (
		<Box mx="auto" mt={2}>
		<Paper>
			<PersonForm />
		</Paper>	
		</Box>
	);
};

export default B2AdminPage;

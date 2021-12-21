import { Button, ListItem, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";
import { useStyleItem } from "./useStyles";
interface Props {
  className?: string;
  href: string;
  icon?: any;
  title: string;
  rest?: any;
}
const SideBarItem: React.FC<Props> = (props: Props) => {
  const classes = useStyleItem();
  const { className, href, icon: Icon, title, ...rest } = props;
  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <Button
        activeClassName={classes.active}
        className={classes.button}
        component={NavLink}
        to={href}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
      </Button>
    </ListItem>
  );
};

export default SideBarItem;

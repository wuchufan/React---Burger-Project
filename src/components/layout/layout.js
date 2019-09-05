import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
<Aux>
  <Toolbar/>
  <SideDrawer/>
  <main className={classes.content}>
    {props.children}
  </main>
</Aux>);

export default layout;

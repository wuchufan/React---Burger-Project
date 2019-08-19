import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './layout.module.css'

const layout = (props) => (<Aux>
  <div>
    ToolBar, SideDrawer, Backdrop
  </div>
  <main className={classes.content}>
    {props.children}
  </main>
</Aux>);

export default layout;

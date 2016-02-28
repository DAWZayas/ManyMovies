import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import CircularProgress from 'material-ui/lib/circular-progress';
import Color from 'material-ui/lib/styles/colors';
import Tab from 'material-ui/lib/tabs/tab';
import FollowList from '../Friends/FollowList';

const styles = {
  label: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  miniSpinner: { textAlign: 'center', marginBottom: '1em' },
  usersTabIcon: { color: 'white', marginRight: '0.5em' },
  tab: { backgroundColor: Color.orange600 }
};

export const createIconButton = (style, handler, tooltip, icon) => (
  <IconButton
    iconClassName="material-icons"
    iconStyle={style}
    tooltipPosition="top-left"
    tooltip={tooltip}
    onTouchTap={handler}>
    {icon}
  </IconButton>
);

export const createUsersTab = (users, icon, label) => {
  const miniSpinner = (
    <div style={styles.miniSpinner}>
      <CircularProgress color={Color.deepOrangeA200} />
    </div>);

  return(
    <Tab
      style={styles.tab}
      label={
        <div style={styles.label}>
          <FontIcon className="material-icons" style={styles.usersTabIcon}>{icon}</FontIcon>
          <span> {label} </span>
        </div>
      }>
      {
        users.loading ?
          miniSpinner :
          <FollowList users={users.users}/>
      }
    </Tab>);
};

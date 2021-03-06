/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import useAuth from 'src/hooks/useAuth';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Typography,
  makeStyles
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import {
  Briefcase as BriefcaseIcon,
  ShoppingCart as ShoppingCartIcon,
  Folder as FolderIcon,
  BarChart as BarChartIcon,
  BarChart2 as BarChartIcon2,
  PieChart as PieChartIcon,
  Users as UsersIcon,
  User as UserIcon,
} from 'react-feather';
import Logo from 'src/components/Logo';
import NavItem from './NavItem';

const sections = [
  {
    subheader: 'General',
    items: [
      {
        title: 'Account',
        icon: UserIcon,
        href: '/app/general/account',
        items: [
          {
            title: 'Account Details',
            href: '/app/general/account'
          },
          {
            title: 'Notifications',
            href: '/app/general/account/notifications'
          },
          {
            title: 'Security',
            href: '/app/general/account/security'
          },
          {
            title: 'Client Subscription',
            href: '/app/general/account/subscription'
          }
        ]
      },
      {
        title: 'Organisations',
        icon: BriefcaseIcon,
        href: '/app/general/organisations'
      },
      {
        title: 'Trainer Profile',
        icon: UserIcon,
        href: '/app/general/trainer'
      }
    ]
  },
  {
    subheader: 'Reports',
    items: [
      {
        title: 'Client Dashboard',
        icon: PieChartIcon,
        href: '/app/reports/dashboard'
      },
      {
        title: 'Salesman Dashboard',
        icon: BarChartIcon,
        href: '/app/reports/dashboard-seller'
      },
      {
        title: 'Trainer Dashboard',
        icon: BarChartIcon2,
        href: '/app/reports/dashboard-trainer'
      }
    ]
  },
  {
    subheader: 'Management',
    items: [
      {
        title: 'Contacts',
        icon: UsersIcon,
        href: '/app/management/contacts',
        items: [
          {
            title: 'List Contacts',
            href: '/app/management/contacts'
          },
          {
            title: 'View Contact',
            href: '/app/management/contacts/1'
          },
          {
            title: 'Edit Contact',
            href: '/app/management/contacts/1/edit'
          }
        ]
      },
      {
        title: 'Products',
        icon: ShoppingCartIcon,
        href: '/app/management/products',
        items: [
          {
            title: 'List Products',
            href: '/app/management/products'
          },
          {
            title: 'Create Product',
            href: '/app/management/products/create'
          }
        ]
      },
      {
        title: 'Demands',
        icon: FolderIcon,
        href: '/app/management/demands',
        items: [
          {
            title: 'List Demands',
            href: '/app/management/demands'
          },
          {
            title: 'View Demands',
            href: '/app/management/demands/1'
          }
        ]
      },
      {
        title: 'Invoices',
        icon: ReceiptIcon,
        href: '/app/management/invoices',
        items: [
          {
            title: 'List Invoices',
            href: '/app/management/invoices'
          },
          {
            title: 'View Invoice',
            href: '/app/management/invoices/1'
          }
        ]
      },
      {
        title: 'Sessions Platform',
        href: '/app/sessions',
        icon: BriefcaseIcon,
        items: [
          {
            title: 'Overview',
            href: '/app/sessions/overview'
          },
          {
            title: 'Browse sessions',
            href: '/app/sessions/browse'
          },
          {
            title: 'Create Session',
            href: '/app/sessions/create'
          },
          {
            title: 'View Session',
            href: '/app/sessions/1'
          },
          {
            title: 'Calendar',
            href: '/app/calendar',
          }
        ]
      },
    ]
  },
];

function renderNavItems({
  items,
  pathname,
  depth = 0,
  user
}) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth, user }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth,
  user
}) {
  const key = item.title + depth;
  
  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });
    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
          user
        })}
      </NavItem>
    );
  } else {
      if(user && user.trainer && user.salesman){
        acc.push(
          <NavItem
            depth={depth}
            href={item.href}
            icon={item.icon}
            info={item.info}
            key={key}
            title={item.title}
          />
        );
      }else if(user && !user.trainer && user.salesman){
        if(item.title !== 'Trainer Dashboard'){
          acc.push(
            <NavItem
              depth={depth}
              href={item.href}
              icon={item.icon}
              info={item.info}
              key={key}
              title={item.title}
            />
          );
        }
      }else if(user && user.trainer && !user.salesman){
        if(item.title !== 'Salesman Dashboard'){
          acc.push(
            <NavItem
              depth={depth}
              href={item.href}
              icon={item.icon}
              info={item.info}
              key={key}
              title={item.title}
            />
          );
        }
      }else if(user && !user.trainer && !user.salesman){
        if(item.title !== 'Trainer Dashboard' && item.title !== 'Salesman Dashboard'){
          acc.push(
            <NavItem
              depth={depth}
              href={item.href}
              icon={item.icon}
              info={item.info}
              key={key}
              title={item.title}
            />
          );
        }
      }
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useAuth();
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box
            p={2}
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/app/general/account">
              <Avatar
                alt="User"
                className={classes.avatar}
                src={user.avatar}
              />
            </RouterLink>
          </Box>
          <Box
            mt={2}
            textAlign="center"
          >
            <Link
              component={RouterLink}
              to="/app/general/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {user.name}
            </Link>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              <Link
                component={RouterLink}
                to="/pricing"
              >
                {user.tier}
              </Link>
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {sections.map((section) => (
            <List
              key={section.subheader}
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                >
                  {section.subheader}
                </ListSubheader>
              )}
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname,
                user: user,
              })}           
            </List>
          ))}
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;

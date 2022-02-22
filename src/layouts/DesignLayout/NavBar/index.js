/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Typography,
  makeStyles,
  ListItemIcon
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import {
  Briefcase as BriefcaseIcon,
  Calendar as CalendarIcon,
  ShoppingCart as ShoppingCartIcon,
  Folder as FolderIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  UserPlus as UserPlusIcon,
  Shield as ShieldIcon,
  Settings as SettingsIcon,
  AlertCircle as AlertCircleIcon,
  Trello as TrelloIcon,
  User as UserIcon,
  Layout as LayoutIcon,
  Edit as EditIcon,
  DollarSign as DollarSignIcon,
  Mail as MailIcon,
  MessageCircle as MessageCircleIcon,
  PieChart as PieChartIcon,
  Share2 as ShareIcon,
  Users as UsersIcon,
  Sliders as SlidersIcon,
  CloudLightning as CloudLightningIcon,
  Menu as MenuIcon,
  List as ListIcon,
  PlayCircle as PlayCircleIcon,
  Server as ServerIcon,
  GitPullRequest as GitPullRequestIcon,
  Upload as UploadIcon,
  Image as ImageIcon,
  Printer as PrinterIcon,
  Activity as ActivityIcon,
  Bell as BellIcon
} from 'react-feather';
import Logo from 'src/components/Logo';
import NavItem from './NavItem';

const navConfig = [
  {
    subheader: 'Reports',
    items: [
      {
        title: 'Dashboard',
        icon: PieChartIcon,
        href: '/app/reports/dashboard'
      }
    ]
  },
  {
    subheader: 'Management',
    items: [
      {
        title: 'Security',
        icon: ShieldIcon,
        items: [
          {
            title: 'Users',
            icon: UsersIcon,
            href: '/app/management/users'
          },
          {
            title: 'Roles',
            icon: GitPullRequestIcon,
            href: '/app/management/users/1'
          }
        ]
      },
      {
        title: 'Configuration',
        icon: SettingsIcon,
        items: [
          {
            title: 'Sections',
            icon: ListIcon,
            href: '/app/management/sections'
          },
          {
            title: 'Menus',
            icon: MenuIcon,
            href: '/app/management/products/create'
          },
          {
            title: 'Authors',
            icon: UsersIcon,
            href: '/app/management/products/create'
          },
          {
            title: 'Banners',
            icon: ServerIcon,
            href: '/app/management/products/create'
          },
          {
            title: 'Analytics',
            icon: BarChartIcon,
            href: '/app/management/products/create'
          },
          {
            title: 'Weather',
            icon: CloudLightningIcon,
            href: '/app/management/products/create'
          },
          {
            title: 'Social Platforms',
            icon: ShareIcon,
            href: '/app/management/products/create'
          },
          {
            title: 'Setup',
            icon: SlidersIcon,
            href: '/app/management/products/create'
          },
          {
            title: 'Notifications',
            href: '/app/mail',
            icon: BellIcon
          }
        ]
      },
      {
        title: 'Stats',
        icon: BarChartIcon,
        href: '/app/management/customers',
        items: [
          {
            title: 'Overview',
            href: '/app/management/customers'
          },
          {
            title: 'Sections',
            href: '/app/management/customers/1'
          }
        ]
      }
    ]
  },
  {
    subheader: 'Stories',
    items: [
      {
        title: 'News Stories',
        icon: EditIcon,
        href: '/app/stories'
      },
      {
        title: 'Featured Stories',
        href: '/app/kanban2',
        icon: TrelloIcon
      },
      {
        title: 'Front Sections',
        icon: LayoutIcon,
        href: '/app/kanban3'
      },
      {
        title: 'Publish',
        icon: UploadIcon,
        href: '/app/kanban'
      }
    ]
  },
  {
    subheader: 'Modules',
    items: [
      {
        title: 'Multimedia',
        href: '/app/kanban',
        icon: PlayCircleIcon
      },
      {
        title: 'Galleries',
        href: '/app/kanban',
        icon: ImageIcon
      },
      {
        title: 'Print Edition',
        href: '/app/kanban',
        icon: PrinterIcon
      },
      {
        title: 'Polls',
        href: '/app/kanban',
        icon: ActivityIcon
      },
      {
        title: 'Comments',
        href: '/app/kanban',
        icon: MessageCircleIcon
      },
      {
        title: 'Calendar',
        href: '/app/calendar',
        icon: CalendarIcon,
        info: () => (
          <Chip
            color="secondary"
            size="small"
            label="Updated"
          />
        )
      },
    ]
  }
];

function renderNavItems({ items, ...rest }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth = 0
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
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
      />
    );
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

function NavBar({ openMobile, onMobileClose, }) {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useSelector((state) => state.account);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
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
            <RouterLink to="/app/account">
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
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {`${user.firstName} ${user.lastName}`}
            </Link>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              {user.bio}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {navConfig.map((config) => (
            <List
              key={config.subheader}
              subheader={(
                <ListSubheader
                  disableGutters
                  disableSticky
                >
                  {config.subheader}
                </ListSubheader>
              )}
            >
              {renderNavItems({ items: config.items, pathname: location.pathname })}
            </List>
          ))}
        </Box>
        <Divider />
        <Box p={2}>
          <Box
            p={2}
            borderRadius="borderRadius"
            bgcolor="background.dark"
          >
            <Typography
              variant="h6"
              color="textPrimary"
            >
              Need Help?
            </Typography>
            <Link
              variant="subtitle1"
              color="secondary"
              component={RouterLink}
              to="/docs"
            >
              Check our docs
            </Link>
          </Box>
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
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;

import './Dashboard.css';
import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import {useWindowSize} from 'react-use';

import React, {useState, useRef , useEffect} from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';


import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import LayerGroup from 'ol/layer/Group';
import {Attribution, defaults as defaultControls} from 'ol/control';
import {fromLonLat,toLonLat} from 'ol/proj';

import MapSearchTextField from './MapSearchTextField';


import LayerSwitcher from 'ol-layerswitcher';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        background: '#369',
        zIndex: theme.zIndex.drawer + 1,
        // transition: theme.transitions.create(['width', 'margin'], {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.leavingScreen,
        // }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        // transition: theme.transitions.create(['width', 'margin'], {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.enteringScreen,
        // }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        // transition: theme.transitions.create('width', {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.enteringScreen,
        // }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        // transition: theme.transitions.create('width', {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.leavingScreen,
        // }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'none',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Dashboard({map,setMap}) {
    const { width, height } = useWindowSize();
    const _AppBarElm = useRef(null);
    const _MapContainerElm = useRef(null);
    const _MainElm = useRef(null);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
        console.log(_MapContainerElm.current.style.width);
        _MapContainerElm.current.style.width = _MainElm.current.clientWidth + "px";
        map.updateSize();
        console.log(_MapContainerElm.current.style.width);
    };
    const handleDrawerClose = () => {
        setOpen(false);
        console.log(_MapContainerElm.current.style.width);
        _MapContainerElm.current.style.width = _MainElm.current.clientWidth + "px";
        map.updateSize();
        console.log(_MapContainerElm.current.style.width);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        // window resize
        console.log("windows resize");
    },[width, height]);

    useEffect(() => {
        // window resize
        console.log("map resize");
    },[_MapContainerElm]);

    useEffect(() =>{
        console.log("_MainElm resize");
    },[_MainElm]);

    useEffect(() => {
        const _attribution = new Attribution({
            collapsible: false,
        });

        const _map = new Map({
            target: 'mapContainer',
            layers: [
                new LayerGroup({
                        title: 'Base maps',
                        layers: [
                            new TileLayer({
                                title: 'GSI MAP',
                                type: 'base',
                                source: new XYZ({
                                    url: `https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png`,
                                    attributions: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
                                })
                            })
                        ]
                    }
                )
            ],
            view: new View({
                center: fromLonLat([139.767, 35.681]),
                zoom: 10,
                maxZoom: 21,
                minZoom: 7
            }),
            controls: defaultControls({attribution: false}).extend([_attribution]),

        })

        // console.log(_AppBarElm.current.clientHeight);
        // // _MapContainerElm
        // console.log(_MapContainerElm.current.clientHeight);
        // console.log(_MapContainerElm.current.style);
        // console.log(height);

        console.log(window.innerHeight - _AppBarElm.current.clientHeight + 'px');

        _MapContainerElm.current.style.height = window.innerHeight - _AppBarElm.current.clientHeight + 'px';
        _map.updateSize();
        setMap(_map);

    },[]);


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar ref={_AppBarElm} position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        BASIC MAP APP
                    </Typography>
                    <MapSearchTextField />
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <SettingsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                transitionDuration={0}
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
            <main ref={_MainElm} className={classes.content}>
                <div className={classes.appBarSpacer} />
                <div ref={_MapContainerElm} id="mapContainer"></div>
                {/*<Container maxWidth="lg" className={classes.container}>*/}
                {/*    <Grid container spacing={3}>*/}
                {/*        /!* Chart *!/*/}
                {/*        <Grid item xs={12} md={8} lg={9}>*/}
                {/*            <Paper className={fixedHeightPaper}>*/}
                {/*                <Chart />*/}
                {/*            </Paper>*/}
                {/*        </Grid>*/}
                {/*        /!* Recent Deposits *!/*/}
                {/*        <Grid item xs={12} md={4} lg={3}>*/}
                {/*            <Paper className={fixedHeightPaper}>*/}
                {/*                <Deposits />*/}
                {/*            </Paper>*/}
                {/*        </Grid>*/}
                {/*        /!* Recent Orders *!/*/}
                {/*        <Grid item xs={12}>*/}
                {/*            <Paper className={classes.paper}>*/}
                {/*                <Orders />*/}
                {/*            </Paper>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*    <Box pt={4}>*/}
                {/*        <Copyright />*/}
                {/*    </Box>*/}
                {/*</Container>*/}
            </main>
        </div>
    );
}
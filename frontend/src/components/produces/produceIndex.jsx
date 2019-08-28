import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import { css } from '@emotion/core';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import BounceLoader from 'react-spinners/BounceLoader';
import ProduceDetail from './ProduceShow';


const styles = theme => ({
    typographyHeader: {
        fontFamily: "'Roboto Mono', monospace"
    },
    indexContainer: {
        height: "71.5vh",
        overflow: "scroll",
        padding: "5%",
        "box-shadow": "none",
        border: "1px solid rgba(0,0,0,0.12)",
    },
    divider: {
        marginBottom: "1em"
    }
});

const loader = css`
        display: block;
        margin: 50% auto;
        .css-10hh9gs-style {
            background-color: rgba(102, 205, 170, .3);
        }
    `

const ProduceIndex = (props) => {
    const { classes } = props;

        const listItems = () => {
            return props.produce.map((produce, i) => {
                return(
                    <Link key={i} to={`/produces/${produce.id}?`}>
                        <ProduceDetail produce={produce} />
                    </Link>
                    )
                });
        }
        const [count, setCount] = React.useState(props.produce.length);

        React.useEffect(() => {
            setCount(props.produce.length);
        }, [props.produce])

        let plural;
        let display;
        if (count > 1) {
            plural = " types of";
        } else {
            plural = "";
        }

        if (props.loading) {
            display = (
                <BounceLoader css={loader} />
            )
        } else {
            display = (
                <React.Fragment>
                    <Typography className={classes.typographyHeader} align="center" variant="h5">
                        {count} harvestable{plural} produce
                    </Typography>
                    <Divider className={classes.divider} />
                    <List>
                        {listItems()}
                    </List>
                </React.Fragment>
            );
        }
        return (
            <Paper id={"scroll-container"} elevation={1} className={classes.indexContainer}>
                {display}
            </Paper>
        )

}
    

export default withStyles(styles)(ProduceIndex);
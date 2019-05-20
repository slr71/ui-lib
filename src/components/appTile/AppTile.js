/**
 *  @author sriram
 *
 **/

import React, { useState } from "react";
import classnames from "classnames";
import { injectIntl } from "react-intl";
import md5 from "md5";
import PropTypes from "prop-types";

import AppStatusIcon from "./AppStatusIcon";
import intlData from "./messages";
import palette from "../../util/CyVersePalette";
import Rate from "../rating/Rate";
import withI18N from "../../util/I18NWrapper";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
    card: {
        minWidth: 300,
        maxWidth: 400,
        minHeight: 120,
        maxHeight: 120,
        margin: 15,
        padding: 5,
        cursor: "pointer",
        "&:hover": {
            border: "1px solid",
        },
    },
    selectedCard: {
        border: "1px solid",
        backgroundColor: palette.lightGray,
    },
    avatar: {
        float: "left",
        margin: 10,
    },
    type: {
        textAlign: "center",
        fontSize: 10,
    },
    name: {
        margin: 10,
        fontSize: 12,
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "inline-block",
        maxWidth: 150,
        "&:hover": {
            textDecoration: "underline",
            cursor: "pointer",
        },
    },
    more: {
        float: "right",
        height: 120,
    },
    creator: {
        margin: 10,
        top: 50,
        fontSize: 12,
        fontStyle: "italic",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "inline-block",
        maxWidth: 150,
    },
    status: {
        position: "relative",
        top: 40,
        right: -10,
    },
    statusNoMenu: {
        position: "relative",
        top: 90,
        right: 10,
    },
    rating: {
        width: "80%",
    },
});

function AppTile(props) {
    const {
        classes,
        uuid,
        name,
        creator,
        rating,
        type,
        isPublic,
        isBeta,
        isDisabled,
        isExternal,
        onRatingChange,
        onDeleteRatingClick,
        MenuItems,
        intl,
        onAppNameClicked,
        onAppSelected,
        selected,
    } = props;

    const {
        average: averageRating,
        user: userRating,
        total: totalRating,
    } = rating;

    const [anchorEl, setAnchorEl] = useState("");
    const open = Boolean(anchorEl);
    const getGravatarIconSrc = `https://www.gravatar.com/avatar/${md5(
        uuid
    )}?d=identicon&s=60`;

    return (
        <Paper
            className={
                selected
                    ? classnames(classes.card, classes.selectedCard)
                    : classes.card
            }
            onClick={onAppSelected}
        >
            <div className={classes.avatar}>
                <div>
                    <img src={getGravatarIconSrc} alt="avatar image" />
                </div>
                <div className={classes.type}>{type.toLowerCase()}</div>
            </div>
            <div>
                <div
                    title={name}
                    className={classes.name}
                    onClick={onAppNameClicked}
                >
                    {name}
                </div>
                <div className={classes.more}>
                    {MenuItems && (
                        <div>
                            <IconButton
                                aria-label="More"
                                aria-owns={open ? "long-menu" : null}
                                aria-haspopup="true"
                                onClick={(event) =>
                                    setAnchorEl(event.currentTarget)
                                }
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                <MenuItems />
                            </Menu>
                        </div>
                    )}
                    <div
                        className={
                            MenuItems ? classes.status : classes.statusNoMenu
                        }
                    >
                        <AppStatusIcon
                            isPublic={isPublic}
                            isBeta={isBeta}
                            isDisabled={isDisabled}
                        />
                    </div>
                </div>
            </div>
            <div className={classes.creator}>{creator}</div>
            <div className={classes.rating}>
                <Rate
                    value={userRating || averageRating}
                    readOnly={isExternal}
                    total={totalRating}
                    onChange={onRatingChange}
                    onDelete={userRating ? onDeleteRatingClick : undefined}
                />
            </div>
        </Paper>
    );
}

AppTile.propTypes = {
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    rating: PropTypes.shape({
        average: PropTypes.number,
        user: PropTypes.number,
        total: PropTypes.number,
    }),
    type: PropTypes.string.isRequired,
    isPublic: PropTypes.bool,
    isBeta: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isExternal: PropTypes.bool,
    onRatingChange: PropTypes.func,
    onDeleteRatingClick: PropTypes.func,
    MenuItems: PropTypes.node,
    onAppNameClicked: PropTypes.func,
    onAppSelected: PropTypes.func,
    selected: PropTypes.bool,
};

export default withStyles(styles)(withI18N(injectIntl(AppTile), intlData));
/**
 * @author Sriram, psarando
 */
import React from "react";
import PropTypes from "prop-types";

import build from "../DebugIDUtil";
import DECheckbox from "./DECheckbox";
import messages from "./messages";
import withI18N, { getMessage } from "../I18NWrapper";

import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";

class EnhancedTableHead extends React.Component {
    createSortHandler = (property) => (event) => {
        this.props.onRequestSort(event, property);
    };
    getColumnAlignment(column) {
        if (column.align) {
            return column.align;
        } else if (column.numeric) {
            return "right";
        } else {
            return "inherit";
        }
    }
    render() {
        const {
            onSelectAllClick,
            order,
            orderBy,
            numSelected,
            columnData,
            selectable,
            padding,
            rowsInPage,
        } = this.props;

        let isInDeterminate = numSelected > 0 && numSelected !== rowsInPage;
        return (
            <TableHead>
                <TableRow>
                    {selectable && (
                        <TableCell padding={padding ? padding : "checkbox"}>
                            <DECheckbox
                                indeterminate={isInDeterminate}
                                checked={numSelected === rowsInPage}
                                onChange={onSelectAllClick}
                                inputProps={{
                                    "aria-label": getMessage("selectAll"),
                                }}
                            />
                        </TableCell>
                    )}
                    {columnData.map((column) => {
                        const key = column.key || column.name;
                        const align = this.getColumnAlignment(column);
                        return (
                            <TableCell
                                key={key}
                                id={build(this.props.baseId, column.id)}
                                variant="head"
                                align={align}
                                padding={column.padding || padding || "default"}
                                sortDirection={orderBy === key ? order : false}
                            >
                                {column.enableSorting ? (
                                    <Tooltip
                                        title={getMessage("sort")}
                                        placement={
                                            column.numeric
                                                ? "bottom-end"
                                                : "bottom-start"
                                        }
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === key}
                                            direction={order.toLowerCase()}
                                            onClick={
                                                this.props.onRequestSort &&
                                                this.createSortHandler(key)
                                            }
                                        >
                                            {column.name}
                                        </TableSortLabel>
                                    </Tooltip>
                                ) : (
                                    column.name
                                )}
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    selectable: PropTypes.bool,
    numSelected: PropTypes.number,
    onRequestSort: PropTypes.func,
    onSelectAllClick: PropTypes.func,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    rowsInPage: PropTypes.number,
    baseId: PropTypes.string.isRequired,
    columnData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
            padding: PropTypes.string,
            numeric: PropTypes.bool,
            enableSorting: PropTypes.bool,
            key: PropTypes.string,
            align: PropTypes.string,
        })
    ),
    padding: PropTypes.string,
};

EnhancedTableHead.defaultProps = {
    selectable: false,
};

export default withI18N(EnhancedTableHead, messages);

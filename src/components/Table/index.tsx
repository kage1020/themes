import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table, { type TableProps } from "@mui/material/Table";
import TableBody, { type TableBodyProps } from "@mui/material/TableBody";
import TableCell, { type TableCellProps } from "@mui/material/TableCell";
import TableContainer, {
  type TableContainerProps,
} from "@mui/material/TableContainer";
import TableHead, { type TableHeadProps } from "@mui/material/TableHead";
import MUITableRow, {
  type TableRowProps as MUITableRowProps,
} from "@mui/material/TableRow";
import type React from "react";
import { useState } from "react";

export type TableRowProps = Omit<MUITableRowProps, "slotProps"> & {
  slotProps?: {
    expandIconCell?: Omit<TableCellProps, "children">;
    expandRow?: Omit<MUITableRowProps, "children">;
    expandCell?: Omit<TableCellProps, "colSpan" | "children">;
    subTable?: {
      head?: React.ReactNode[];
      rows?: React.ReactNode[][];
      colSpan?: number;
      duration?: number;
      slotProps?: {
        container?: Omit<TableContainerProps, "children">;
        table?: Omit<TableProps, "size" | "children">;
        head?: Omit<TableHeadProps, "children">;
        body?: Omit<TableBodyProps, "children">;
        row?: Omit<MUITableRowProps, "children">;
        cell?: Omit<TableCellProps, "children">;
      };
    };
  };
};

function TableRow({
  sx,
  onClick,
  children,
  slotProps,
  ...props
}: TableRowProps) {
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (onClick) onClick(e);
    setOpen(
      !!slotProps?.subTable?.rows &&
        slotProps.subTable.rows.length > 0 &&
        !open,
    );
  };

  return (
    <>
      <MUITableRow
        onClick={handleClick}
        sx={{
          cursor: slotProps?.subTable?.rows?.length ? "pointer" : "default",
          ...sx,
        }}
        {...props}
      >
        <TableCell
          {...slotProps?.expandIconCell}
          sx={{ padding: 0, ...slotProps?.expandIconCell?.sx }}
        >
          {slotProps?.subTable?.rows &&
            slotProps.subTable.rows.length !== 0 && (
              <IconButton
                sx={{ padding: 0 }}
                disabled={
                  !slotProps.subTable.rows ||
                  slotProps.subTable.rows.length === 0
                }
              >
                <ExpandMore
                  sx={{
                    transform: open ? "rotate(0deg)" : "rotate(-90deg)",
                    transition: `${slotProps.subTable.duration ?? 250}ms`,
                  }}
                />
              </IconButton>
            )}
        </TableCell>
        {children}
      </MUITableRow>
      {slotProps?.subTable?.head &&
        slotProps?.subTable?.rows &&
        slotProps.subTable.rows?.length !== 0 && (
          <MUITableRow
            {...slotProps?.expandRow}
            sx={{
              ":hover": {
                backgroundColor: open
                  ? "transparent !important"
                  : "rgb(0 0 0 / 0.08)",
              },
              ...slotProps?.expandRow?.sx,
            }}
          >
            <TableCell
              {...slotProps?.expandCell}
              colSpan={(slotProps?.subTable?.colSpan ?? 0) + 1}
              sx={{
                padding: open ? "8px 0 8px 32px" : "0px 0px 0px 32px",
                borderBottomStyle: open ? "solid" : "none",
                ...slotProps?.expandCell?.sx,
              }}
            >
              <Collapse
                in={open}
                timeout={slotProps.subTable.duration ?? 250}
                unmountOnExit
              >
                <TableContainer {...slotProps?.subTable?.slotProps?.container}>
                  <Table
                    size="small"
                    {...slotProps?.subTable?.slotProps?.table}
                  >
                    <TableHead {...slotProps?.subTable?.slotProps?.head}>
                      <MUITableRow
                        {...slotProps?.subTable?.slotProps?.row}
                        sx={{
                          backgroundColor: "rgb(0 0 0 / 0.08)",
                          ":hover": {
                            backgroundColor: "rgb(0 0 0 / 0.08) !important",
                          },
                          ...slotProps?.subTable?.slotProps?.row?.sx,
                        }}
                      >
                        {slotProps?.subTable?.head.map((cell, i) => (
                          <TableCell
                            key={i}
                            {...slotProps?.subTable?.slotProps?.cell}
                          >
                            {cell}
                          </TableCell>
                        ))}
                      </MUITableRow>
                    </TableHead>
                    <TableBody {...slotProps?.subTable?.slotProps?.body}>
                      {slotProps?.subTable?.rows.map((row, i) => (
                        <MUITableRow
                          key={i}
                          {...slotProps?.subTable?.slotProps?.row}
                        >
                          {row.map((cell, j) => (
                            <TableCell
                              key={j}
                              {...slotProps?.subTable?.slotProps?.cell}
                            >
                              {cell}
                            </TableCell>
                          ))}
                        </MUITableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Collapse>
            </TableCell>
          </MUITableRow>
        )}
    </>
  );
}

export { Table, TableBody, TableCell, TableContainer, TableHead, TableRow };

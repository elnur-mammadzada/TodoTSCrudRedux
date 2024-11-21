import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { MUIDialogProps } from "../types/types";

const MUIDialog: React.FC<MUIDialogProps> = ({
    open,
    onClose,
    children,
    title,
    accept,
    decline,
    onSubmit,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{decline}</Button>
                {onSubmit && (
                    <Button onClick={onSubmit} color='primary' type='button'>
                        {accept}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default MUIDialog;

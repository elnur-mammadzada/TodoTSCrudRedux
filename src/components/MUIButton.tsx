import { Button } from "@mui/material";
import { MUIButtonProps } from "../types/types";

const MUIButton: React.FC<MUIButtonProps> = ({
    text,
    variant = "contained",
    ...props
}) => {
    return (
        <Button variant={variant} {...props}>
            {text}
        </Button>
    );
};

export default MUIButton;

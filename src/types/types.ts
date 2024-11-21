import { ButtonProps } from "@mui/material";
import { ReactNode } from "react";
export interface MUIButtonProps extends ButtonProps {
  text: string;
  variant?: "contained";
}

export interface MUITextFieldProps {
  name: string;
  control: any;
  placeholder: string;
  style?: React.CSSProperties;
  rules?: object;
}

export interface MUITableProps {
  todos: TodoType[];
  thead: string[];
  deleteIcon?: ReactNode;
  editIcon?: ReactNode;
  children?: React.ReactNode;
}
export interface TodoInitialState {
  todos: TodoType[];
  loading: boolean;
  isSnackbarOpen: boolean;
  snackbarMessage: string;
  error: string | null;
  thead?: string[];
  getById?: TodoType | null;
  todoById: TodoType;
}

export interface TodoType {
  id?: number;
  name?: string;
  description?: string;
}
export interface MUIDialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  accept?: string;
  decline?: string;
  onSubmit?: () => void;
}
export interface Todo {
  id?: number;
  name?: string;
  description?: string;
}

export interface UpdatePageProps {
  selectedTodo?: Todo;
  handleClose: () => void;
  onSubmit?: (data: { name: string; description: string }) => void;
  open: boolean;
}

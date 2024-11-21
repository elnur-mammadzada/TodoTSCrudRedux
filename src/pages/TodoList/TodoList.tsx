import { Snackbar } from "@mui/material";
import TodoBottom from "./TodoBottom/TodoBottom";
import TodoHeader from "./TodoHeader/TodoHeader";
import "./TodoList.css";
import { useAppDispatch, useAppSelector } from "../../store";
import { closeSnackbar } from "../../features/todoSlice";

const TodoList = () => {
    const dispatch = useAppDispatch();

    const { snackbarMessage, isSnackbarOpen } = useAppSelector(
        (state) => state.todos
    );
    const handleCloseSnackbar = () => {
        dispatch(closeSnackbar());
    };
    return (
        <div className='todo-list'>
            <TodoHeader />
            <TodoBottom />
            <Snackbar
                onClose={handleCloseSnackbar}
                open={isSnackbarOpen}
                autoHideDuration={1000}
                message={snackbarMessage}
            />
        </div>
    );
};

export default TodoList;

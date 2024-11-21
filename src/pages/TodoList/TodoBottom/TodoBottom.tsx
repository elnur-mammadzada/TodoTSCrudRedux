import { useEffect, useState } from "react";
import MUITable from "../../../components/MUITable";
import { deleteTodos, fetchTodos, getById } from "../../../features/todoSlice";
import { useAppDispatch, useAppSelector } from "../../../store";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { IconButton, TableBody, TableCell, TableRow } from "@mui/material";
import UpdatePage from "../UpdatePage/UpdatePage";
import { Todo } from "../../../types/types";

const TodoBottom = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { todos } = useAppSelector((state) => state.todos);
    const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const thead = ["ID", "Title", "Description"];

    const handleDeleteClick = (id?: number) => {
        dispatch(deleteTodos(id));
    };

    const handleEditClick = (todo?: Todo) => {
        if (todo) {
            dispatch(getById(todo.id));
            setSelectedTodo(todo);
            setOpen(true);
        } else {
            console.error("Todo undefined-dir!");
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <MUITable
                todos={todos}
                thead={thead}
                deleteIcon={<DeleteIcon />}
                editIcon={<ModeEditIcon />}>
                <TableBody>
                    {todos.map((todo) => (
                        <TableRow key={todo.id}>
                            <TableCell align='center'>{todo.id}</TableCell>
                            <TableCell align='center'>{todo.name}</TableCell>
                            <TableCell align='center'>{todo.description}</TableCell>
                            <TableCell align='center'>
                                <IconButton onClick={() => handleEditClick(todo)}>
                                    <ModeEditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align='center'>
                                <IconButton onClick={() => handleDeleteClick(todo.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </MUITable>

            {selectedTodo && (
                <UpdatePage
                    selectedTodo={selectedTodo}
                    open={open}
                    handleClose={handleClose}
                />
            )}
        </>
    );
};

export default TodoBottom;

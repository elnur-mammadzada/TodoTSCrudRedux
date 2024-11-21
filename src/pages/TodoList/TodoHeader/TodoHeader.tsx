import { yupResolver } from "@hookform/resolvers/yup";
import MUIButton from "../../../components/MUIButton";
import MUITextField from "../../../components/MUITextField";
import "./TodoHeader.css";
import { todoValidationSchema } from "../../../schemas/validationSchema";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store";
import { useEffect } from "react";
import { addTodo, fetchTodos } from "../../../features/todoSlice";

const TodoHeader = () => {
    const dispatch = useAppDispatch();

    const { handleSubmit, control, reset } = useForm({
        resolver: yupResolver(todoValidationSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleAddClick = (data: { name: string; description: string }) => {
        dispatch(addTodo(data));
        console.log(data);
        reset();
    };

    return (
        <form className='todo-header' onSubmit={handleSubmit(handleAddClick)}>
            <MUITextField
                name='name'
                control={control}
                placeholder='Name'
                style={{ width: "100%" }}
            />
            <MUITextField
                name='description'
                control={control}
                placeholder='Description'
                style={{ width: "100%" }}
            />
            <MUIButton variant='contained' text='ADD' color='success' type='submit' />
        </form>
    );
};

export default TodoHeader;

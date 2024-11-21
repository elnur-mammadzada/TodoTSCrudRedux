import { yupResolver } from "@hookform/resolvers/yup";
import MUITextField from "../../../components/MUITextField";
import { todoValidationSchema } from "../../../schemas/validationSchema";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { UpdatePageProps } from "../../../types/types";
import MUIDialog from "../../../components/MUIDialog";
import { useAppDispatch, useAppSelector } from "../../../store";
import { updateTodos } from "../../../features/todoSlice";

const UpdatePage: React.FC<UpdatePageProps> = ({
    selectedTodo,
    handleClose,
    open,
}) => {
    const { handleSubmit, control, setValue, reset } = useForm<{
        name: string;
        description: string;
    }>({
        resolver: yupResolver(todoValidationSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });
    const { todoById } = useAppSelector((state) => state.todos);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (selectedTodo) {
            setValue("name", selectedTodo.name || "");
            setValue("description", selectedTodo.description || "");
        }
    }, [selectedTodo, setValue]);

    const onSubmit = handleSubmit((data) => {
        dispatch(updateTodos({ id: todoById.id, ...data }));
        handleClose();
        reset();
    });

    return (
        <MUIDialog
            open={open}
            onClose={handleClose}
            title='Todo Yenilə'
            accept='Yenilə'
            decline='Bağla'
            onSubmit={onSubmit}>
            <form onSubmit={onSubmit}>
                <MUITextField
                    name='name'
                    control={control}
                    placeholder='Ad'
                    style={{ width: "100%" }}
                />
                <MUITextField
                    name='description'
                    control={control}
                    placeholder='Təsvir'
                    style={{ width: "100%" }}
                />
                <button type='submit' style={{ display: "none" }}></button>
            </form>
        </MUIDialog>
    );
};

export default UpdatePage;

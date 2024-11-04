import ListTask from "../components/ListTask";
import ModalFormAdd from "../components/modal-form-add/ModalFormAdd";

export default function Tasks() {
    return (
        <>
            <div className="flex justify-end mx-4">
                <ModalFormAdd />
            </div>
            <ListTask />
        </>
    )
}
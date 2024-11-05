import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import DatePicker from "./DatePicker";
import SelectPriority from "./SelectPriority";
export default function ModalAddTask() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Button onPress={onOpen} color="primary">Add Task</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 ">Agrega una tarea</ModalHeader>
                            <ModalBody>
                                <Input type="text" label="Titulo de la tarea" />
                                <SelectPriority/>
                                <DatePicker />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="success" onPress={onClose}>
                                    Agregar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
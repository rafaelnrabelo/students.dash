import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FiTrash2 } from "react-icons/fi";

import styles from "./styles.module.scss";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmationDialog = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: DeleteConfirmationDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered
      closeOnOverlayClick={!loading}
      closeOnEsc={!loading}
    >
      <AlertDialogOverlay className={styles.modalOverlay}>
        <AlertDialogContent className={styles.modalContent}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Excluir Aluno
          </AlertDialogHeader>
          <AlertDialogBody>
            Tem certeza? Você não pode desfazer esta ação.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              className={styles.cancelButton}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              ml={3}
              leftIcon={<FiTrash2 size={20} />}
              className={styles.deleteButton}
              isLoading={loading}
            >
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

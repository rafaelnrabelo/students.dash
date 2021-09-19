import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Avatar, useToast } from "@chakra-ui/react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";

import { api } from "../../../services/api";

import styles from "./styles.module.scss";
import { DeleteConfirmationDialog } from "../../../components/DeleteConfirmationDialog";
import { Button } from "../../../components/Button";
import { BackButton } from "../../../components/BackButton";

type Student = {
  id: string;
  name: string;
  address: string;
  avatar: string | null;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
};

interface StudentProps {
  student: Student;
}

const StudentPage: NextPage<StudentProps> = ({ student }) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const toast = useToast();

  const router = useRouter();

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.delete(`/students/${student.id}`);
      setDeleteLoading(false);
      setDeleteConfirmationOpen(false);
      toast({
        title: "Aluno excluido com sucesso!",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      router.replace("/");
    } catch (error) {
      setDeleteLoading(false);
      toast({
        title: "Erro ao excluir aluno, tente novamente.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>students.dash | {student.name}</title>
      </Head>

      <DeleteConfirmationDialog
        isOpen={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />

      <main className={styles.container}>
        <BackButton href="/" />
        <div className={styles.content}>
          <Avatar
            background="#1eb5ef"
            color="#fff"
            name={student.name}
            src={student.avatar_url}
            size="2xl"
            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
            marginTop={4}
          />
          <h2>{student.name}</h2>

          <div className={styles.addressContainer}>
            <span>ENDEREÇO</span>
            <p>{student.address}</p>
          </div>

          <div className={styles.buttonsContainer}>
            <Button
              className={styles.deleteButton}
              onClick={() => setDeleteConfirmationOpen(true)}
              icon={<FiTrash2 size={20} />}
            >
              Excluir
            </Button>
            <Button
              className={styles.editButton}
              onClick={() => router.push(`/student/edit/${student.id}`)}
              icon={<FiEdit2 size={20} />}
            >
              Editar
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default StudentPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;
    const { data } = await api.get<Student>(`/students/${id}`);

    return {
      props: { student: data },
    };
  } catch {
    return {
      redirect: {
        destination: "/",
        statusCode: 302,
      },
    };
  }
};

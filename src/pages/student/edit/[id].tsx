import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, ChangeEvent } from "react";
import { useToast, Input } from "@chakra-ui/react";
import { FiSave, FiSearch } from "react-icons/fi";
import InputMask from "react-input-mask";
import axios from "axios";

import { api } from "../../../services/api";

import styles from "./styles.module.scss";
import { Button } from "../../../components/Button";
import { BackButton } from "../../../components/BackButton";
import { AvatarInput } from "../../../components/AvatarInput";

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
  const [name, setName] = useState(student.name);
  const [address, setAddress] = useState(student.address);
  const [avatar, setAvatar] = useState(student.avatar_url);
  const [avatarFile, setAvatarFile] = useState<FormData>();
  const [cep, setCep] = useState("");

  const [nameError, setNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cepError, setCepError] = useState(false);

  const [cepLoading, setCepLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const toast = useToast();
  const router = useRouter();

  const handleAddressSearch = async () => {
    if (cep.replace("_", "").length < 9) {
      setCepError(true);
      return;
    } else {
      setCepError(false);
    }
    setCepLoading(true);
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (!data?.erro) {
      setAddress(
        `${data.logradouro}, ${data.bairro}, ${data.localidade}/${data.uf}`
      );
    } else {
      toast({
        title: "Endereço não encontrado.",
        status: "warning",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }

    setCepLoading(false);
  };

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const data = new FormData();

      setAvatar(URL.createObjectURL(e.target.files[0]));

      data.append("avatar", e.target.files[0]);
      setAvatarFile(data);
    }
  };

  const handleAvatarDelete = async () => {
    setAvatar(undefined);
    setAvatarFile(undefined);
  };

  const handleStudentUpdate = async () => {
    setUpdateLoading(true);
    try {
      let hasError = false;
      if (name.trim().length <= 0) {
        setNameError(true);
        setUpdateLoading(false);
        hasError = true;
      }
      if (address.trim().length <= 0) {
        setAddressError(true);
        setUpdateLoading(false);
        hasError = true;
      }

      if (hasError) return;

      if (avatarFile) {
        await api.patch(`/students/avatar/${student.id}`, avatarFile);
      } else if (!avatar && student.avatar) {
        await api.delete(`/students/avatar/${student.id}`);
      }

      const updateData = {
        id: student.id,
        name,
        address,
      };

      await api.put(`/students`, updateData);
      setUpdateLoading(false);
      toast({
        title: "Aluno atualizado com sucesso!",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      router.replace(`/student/view/${student.id}`);
    } catch (error) {
      setUpdateLoading(false);
      toast({
        title: "Erro ao atualizar aluno, tente novamente.",
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
        <title>students.dash | edit</title>
      </Head>

      <main className={styles.container}>
        <BackButton href={`/student/view/${student.id}`} />
        <div className={styles.content}>
          <AvatarInput
            handleAvatarChange={handleAvatarChange}
            handleAvatarDelete={handleAvatarDelete}
            avatar={avatar}
            avatarName={student.name}
          />
          <Input
            placeholder="Insira o nome do aluno"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.nameInput}
            isInvalid={nameError}
          />

          <div className={styles.addressContainer}>
            <span className={styles.addressLabel}>ENDEREÇO</span>
            <Input
              placeholder="Insira o endereço do aluno"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={styles.addressInput}
              isInvalid={addressError}
            />
            <div className={styles.addressSearch}>
              <p>Buscar endereço por CEP</p>
              <div>
                <Input
                  as={InputMask}
                  mask="99999-999"
                  value={cep}
                  placeholder="_____-___"
                  onChange={(e) => setCep(e.target.value)}
                  isInvalid={cepError}
                  errorBorderColor="#f55a4e"
                />
                <Button
                  onClick={handleAddressSearch}
                  icon={<FiSearch size={20} />}
                  loading={cepLoading}
                  aria-label="buscar cep"
                  name="buscar cep"
                />
              </div>
            </div>
          </div>

          <div className={styles.buttonsContainer}>
            <Button
              className={styles.cancelButton}
              onClick={() => router.replace(`/student/view/${student.id}`)}
              disabled={updateLoading}
            >
              Cancelar
            </Button>
            <Button
              className={styles.editButton}
              onClick={handleStudentUpdate}
              icon={<FiSave size={20} />}
              loading={updateLoading}
            >
              Salvar
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

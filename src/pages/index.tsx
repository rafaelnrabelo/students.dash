import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { api } from "../services/api";

import styles from "./home.module.scss";
import { StudentsTable } from "../components/StudentsTable";
import { FloatingButton } from "../components/FloatingButton";

type Student = {
  id: string;
  name: string;
  address: string;
};

type Pagination = {
  page: number;
  pageSize: number;
  totalDocs: number;
  totalPages: number;
};

interface ListReponse {
  students: Student[];
  pagination: Pagination;
}

const Home: NextPage<ListReponse> = ({ students, pagination }) => {
  return (
    <>
      <Head>
        <title>students.dash | home</title>
      </Head>

      <main className={styles.container}>
        <h2>Alunos</h2>
        <StudentsTable students={students} pagination={pagination} />
      </main>
      <FloatingButton />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get<ListReponse>("/students/list/1");

  const { students, pagination } = data;

  return {
    props: { students, pagination },
  };
};

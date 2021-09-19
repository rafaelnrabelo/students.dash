import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

import { api } from "../../services/api";

import styles from "./styles.module.scss";
import { Pagination } from "../Pagination";

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

interface StudentsTableProps {
  students: Student[];
  pagination: Pagination;
}

export const StudentsTable = ({ students, pagination }: StudentsTableProps) => {
  const [page, setPage] = useState(pagination?.page || 1);
  const [totalPages, setTotalPages] = useState(pagination?.totalPages || 1);
  const [studentsList, setStudentsList] = useState(students || []);

  const router = useRouter();

  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    const { data } = await api.get<ListReponse>(`/students/list/${newPage}`);

    const { students, pagination } = data;

    setStudentsList(students);
    setTotalPages(pagination?.totalPages || 1);
  };

  return (
    <div className={styles.tableWrapper}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Endereço</Th>
          </Tr>
        </Thead>
        <Tbody>
          {studentsList.map((student) => (
            <Tr
              key={student.id}
              className={styles.tableRow}
              onClick={() => router.push(`/student/view/${student.id}`)}
            >
              <Td>{student.name}</Td>
              <Td>{student.address}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {students.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

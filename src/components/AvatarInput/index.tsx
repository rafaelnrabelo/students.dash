import { ChangeEvent } from "react";
import { FiTrash, FiCamera } from "react-icons/fi";
import { Avatar } from "@chakra-ui/react";

import styles from "./styles.module.scss";

interface AvatarInputProps {
  avatar?: string;
  avatarName?: string;
  handleAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAvatarDelete?: () => void;
}

export const AvatarInput = ({
  avatar,
  avatarName,
  handleAvatarChange,
  handleAvatarDelete,
}: AvatarInputProps) => {
  return (
    <div className={styles.avatarInput}>
      <Avatar
        background={avatarName ? "#1eb5ef" : undefined}
        color={avatarName ? "#fff" : undefined}
        name={avatarName}
        src={avatar}
        size="2xl"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        marginTop={4}
      />
      {!!handleAvatarDelete && (
        <button
          onClick={handleAvatarDelete}
          aria-label="excluir avatar"
          name="excluir avatar"
        >
          <FiTrash />
        </button>
      )}
      <label
        htmlFor="avatar"
        tabIndex={0}
        role="button"
        aria-label="upload avatar"
      >
        <FiCamera />
        <input type="file" id="avatar" onChange={handleAvatarChange} />
      </label>
    </div>
  );
};

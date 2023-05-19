import {
  FileOutlined,
  FolderOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { FC } from "react";

import { INodeProps } from "../interfaces";
import styles from "./styles.module.scss";

export const NodeIcon: FC<INodeProps> = ({ node }) => {
  if (node.isInternal && node.isOpen) return <FolderOpenOutlined />;
  if (node.isInternal)
    return <FolderOutlined className={styles.closedFolderIcon} />;

  return <FileOutlined />;
};

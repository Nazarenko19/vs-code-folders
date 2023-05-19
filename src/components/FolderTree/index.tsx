import { FC, useState } from "react";
import { Tree, TreeApi, SimpleTreeData, NodeApi } from "react-arborist";
import { FileAddOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Button, Divider, Layout } from "antd";

import { TreeNode } from "./TreeNode";
import styles from "./styles.module.scss";

const { Sider } = Layout;

type TreeParams = TreeApi<SimpleTreeData> | null | undefined;

interface IFolderTreeProps {
  initialData?: SimpleTreeData[];
}

const FolderTree: FC<IFolderTreeProps> = ({ initialData = [] }) => {
  const [tree, setTree] = useState<TreeParams>(null);
  const [active, setActive] = useState<SimpleTreeData | null>(null);

  const handleActivate = (node: NodeApi<SimpleTreeData>) =>
    setActive(node.data);

  const handleCreate = (type: "leaf" | "internal") => {
    // add new items to the top of the list by default
    const defaultIndex = 0;
    const parentId = null;
    const newNode = {
      index: defaultIndex,
      parentId,
      type,
    };

    tree?.create(newNode);
  };

  const hasOpenFile = active?.name && !active?.children;

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}>
        <div className={styles.createButtons}>
          <Button
            data-testid="create-file"
            shape="circle"
            icon={<FileAddOutlined />}
            onClick={() => handleCreate("leaf")}
          />
          <Button
            data-testid="create-folder"
            shape="circle"
            icon={<FolderAddOutlined />}
            onClick={() => handleCreate("internal")}
          />
        </div>

        <Divider className={styles.divider} />

        <Tree
          disableMultiSelection
          // I don't like to mix it with CSS in JS, but in the class names, these styles get thrown in the wrong place
          width={"100%"}
          rowClassName={styles.row}
          initialData={initialData}
          selection={active?.id}
          ref={(t) => setTree(t)}
          onActivate={handleActivate}
        >
          {TreeNode}
        </Tree>
      </Sider>

      <Layout className={styles.contentContainer}>
        <span className={styles.content}>
          {hasOpenFile ? `Current open file: ${active?.name}` : "Empty"}
        </span>
      </Layout>
    </Layout>
  );
};

export default FolderTree;

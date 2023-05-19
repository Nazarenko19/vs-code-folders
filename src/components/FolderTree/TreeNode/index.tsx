import { FC } from "react";
import { NodeRendererProps, SimpleTreeData } from "react-arborist";

import { NodeInput } from "../NodeInput";
import { NodeIcon } from "../NodeIcon";
import styles from "./styles.module.scss";

export const TreeNode: FC<NodeRendererProps<SimpleTreeData>> = ({
  node,
  style,
  dragHandle,
}) => {
  const handleNodeClick = () => node.isInternal && node.toggle();
  const getNodeContent = () => {
    if (node.isEditing) return <NodeInput node={node} />;
    return <span className={styles.content}>{node.data.name}</span>;
  };

  const nodeContent = getNodeContent();

  return (
    <div
      data-testid="tree-node"
      className={styles.node}
      ref={dragHandle}
      style={style}
      onClick={handleNodeClick}
    >
      <NodeIcon node={node} />
      {nodeContent}
    </div>
  );
};

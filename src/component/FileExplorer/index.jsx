import { useState } from "react";
import styles from "./styles.module.css";

function FileExplorere({ fileData = [], addFolder, deleteFolder }) {
  const [isExpanded, setIsExpanded] = useState({});

  const onFolderClick = ({ name }) => {
    setIsExpanded((prev) => {
      return {
        ...prev,
        [name]: !prev?.[name],
      };
    });
  };

  return (
    <ul style={{ marginBottom: "4px" }}>
      {fileData.map((data) => {
        const { id, type, name, children = [] } = data || {};

        if (type === "folder") {
          return (
            <div key={id}>
              <li
                onClick={() => {
                  onFolderClick({ name });
                }}
              >
                🗂️{name}
                <button
                  className={styles.add_btn}
                  onClick={() => {
                    addFolder({ id });
                  }}
                >
                  Add Folder
                </button>
                <button
                  className={styles.add_btn}
                  onClick={() => {
                    deleteFolder({ id });
                  }}
                >
                  delete Folder
                </button>
              </li>
              {isExpanded?.[name] && (
                <FileExplorere
                  fileData={children}
                  addFolder={addFolder}
                  deleteFolder={deleteFolder}
                />
              )}
            </div>
          );
        }

        return <li key={name}>📄 {name}</li>;
      })}
    </ul>
  );
}

export default FileExplorere;

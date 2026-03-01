import { useState } from "react";
import FileExplorere from "./component/FileExplorer";

const sampleData = [
  {
    id: 1,
    name: "src",
    type: "folder",
    children: [
      {
        id: 2,
        name: "components",
        type: "folder",
        children: [
          { id: 3, name: "Button.tsx", type: "file" },
          { id: 4, name: "Card.tsx", type: "file" },
        ],
      },
      { id: 5, name: "App.tsx", type: "file" },
      { id: 6, name: "index.tsx", type: "file" },
    ],
  },
  {
    id: 7,
    name: "public",
    type: "folder",
    children: [
      { id: 8, name: "index.html", type: "file" },
      { id: 9, name: "favicon.ico", type: "file" },
    ],
  },
  {
    id: 10,
    name: "package.json",
    type: "file",
  },
  {
    id: 11,
    name: "README.md",
    type: "file",
  },
];

function App() {
  const [data, setData] = useState(sampleData);

  const addFolderHandler = ({ id }) => {
    const folderName = prompt("Enter Folder Name");

    const updateData = (list) => {
      return list.map((ele) => {
        if (ele.id === id) {
          return {
            ...ele,
            children: [
              ...ele.children,
              {
                id: Date.now(),
                name: folderName,
                type: "folder",
                children: [],
              },
            ],
          };
        }

        if (ele.children) {
          return {
            ...ele,
            children: updateData(ele.children),
          };
        }

        return ele;
      });
    };

    setData(updateData(data));
  };

  const deleteFolderHandler = ({ id }) => {
    const updateData = (list) => {
      return list
        .filter((ele) => ele.id !== id)
        .map((ele) => {
          if (ele.children) {
            return { ...ele, children: updateData(ele.children) };
          }

          return ele;
        });
    };

    setData(updateData(data));
  };

  return (
    <FileExplorere
      fileData={data}
      addFolder={addFolderHandler}
      deleteFolder={deleteFolderHandler}
    />
  );
}

export default App;

import { fireEvent, render, screen } from "@testing-library/react";
import FolderTree from ".";

const dragAndDrop = (draggableItem: HTMLElement, dropPlace: HTMLElement) => {
  fireEvent.dragStart(draggableItem);
  fireEvent.dragEnter(dropPlace);
  fireEvent.dragOver(dropPlace);
  fireEvent.drop(dropPlace);
};

describe("Should render the correct variation of the FolderTree component", () => {
  test("Should render the create file/folder button", () => {
    render(<FolderTree />);

    const createFileBtn = screen.getByTestId("create-file");
    const createFolderBtn = screen.getByTestId("create-folder");

    expect(createFileBtn).toBeInTheDocument();
    expect(createFolderBtn).toBeInTheDocument();
  });

  test("File should be moved by dragging it to the folder", () => {
    const initialMockData = [
      {
        id: "0",
        name: "First File",
      },
      {
        id: "1",
        name: "Second File",
        children: [{ id: "0.1", name: "First File in Folder" }],
      },
    ];

    render(<FolderTree initialData={initialMockData} />);

    const firstFile = screen.getByText("First File");
    const secondFile = screen.getByText("Second File");

    // check that the first file is in the first place
    expect(screen.getAllByTestId("tree-node")[0]).toHaveTextContent(
      "First File"
    );

    dragAndDrop(firstFile, secondFile);

    // check that the second file is in the first place after dnd
    expect(screen.getAllByTestId("tree-node")[0]).toHaveTextContent(
      "Second File"
    );
  });

  test("Parent folder shouldn't be dragged into a child folder", () => {
    const initialMockData = [
      {
        id: "0",
        name: "Folder",
        children: [{ id: "0.1", name: "File in Folder" }],
      },
    ];

    render(<FolderTree initialData={initialMockData} />);

    const folder = screen.getByText("Folder");
    const fileInFolder = screen.getByText("File in Folder");

    dragAndDrop(folder, fileInFolder);

    // check that the folder hasn't moved anywhere
    expect(screen.getAllByTestId("tree-node")[0]).toHaveTextContent("Folder");
  });
});

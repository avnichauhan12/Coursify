import React, { useState } from "react";
import pic from "../assets/pic.png";
import ModuleModal from "./Module";
import UploadModal from "./UploadModal";
import RenameFileModal from "./RenameFileModal";
import UploadLinkModal from "./UploadLinkModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderPlus,
  faLink,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [renameFileModalOpen, setRenameFileModalOpen] = useState(false);
  const [uploadLinkModalOpen, setUploadLinkModalOpen] = useState(false);
  const [modules, setModules] = useState([]);
  const [editingModuleIndex, setEditingModuleIndex] = useState(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(null);
  const [renamingFile, setRenamingFile] = useState({
    moduleIndex: null,
    fileIndex: null,
    file: null,
  });
  const [fileDropdownOpen, setFileDropdownOpen] = useState({
    moduleIndex: null,
    fileIndex: null,
  });

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    if (option === "Create a Module") {
      setEditingModuleIndex(null);
      setModuleModalOpen(true);
    } else if (option === "Upload") {
      setCurrentModuleIndex(null);
      setUploadModalOpen(true);
    } else if (option === "Add a Link") {
      setCurrentModuleIndex(null);
      setUploadLinkModalOpen(true);
    }
    setDropdownOpen(false);
  };

  const handleSaveModule = (moduleName) => {
    if (editingModuleIndex !== null) {
      const updatedModules = modules.map((module, index) =>
        index === editingModuleIndex ? { ...module, name: moduleName } : module
      );
      setModules(updatedModules);
    } else {
      setModules([...modules, { name: moduleName, files: [] }]);
    }
    setModuleModalOpen(false);
  };

  const handleSaveFile = (file) => {
    if (currentModuleIndex !== null) {
      const updatedModules = modules.map((module, index) =>
        index === currentModuleIndex
          ? { ...module, files: [...module.files, file] }
          : module
      );
      setModules(updatedModules);
    }
    setUploadModalOpen(false);
  };

  const handleSaveLink = (link) => {
    if (currentModuleIndex !== null) {
      const videoFile = {
        name: "Video Link", // You can customize the name as needed
        type: "video",
        link: link, 
      };
      const updatedModules = modules.map((module, index) =>
        index === currentModuleIndex
          ? { ...module, files: [...module.files, videoFile] }
          : module
      );
      setModules(updatedModules);
    }
    setUploadLinkModalOpen(false);
  };

  const handleRenameFile = (moduleIndex, fileIndex, newName) => {
    const updatedModules = modules.map((module, idx) => {
      if (idx === moduleIndex) {
        const updatedFiles = module.files.map((file, fIdx) =>
          fIdx === fileIndex ? { ...file, name: newName } : file
        );
        return { ...module, files: updatedFiles };
      }
      return module;
    });
    setModules(updatedModules);
    setRenamingFile({ moduleIndex: null, fileIndex: null, file: null });
    setRenameFileModalOpen(false);
  };

  const handleEditModule = (index) => {
    setEditingModuleIndex(index);
    setModuleModalOpen(true);
  };

  const handleDeleteModule = (index) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const openUploadModal = (index) => {
    setCurrentModuleIndex(index);
    setUploadModalOpen(true);
  };

  const openUploadLinkModal = (index) => {
    setCurrentModuleIndex(index);
    setUploadLinkModalOpen(true);
  };

  const openRenameFileModal = (moduleIndex, fileIndex, file) => {
    setRenamingFile({ moduleIndex, fileIndex, file });
    setRenameFileModalOpen(true);
  };

  const toggleFileDropdown = (moduleIndex, fileIndex) => {
    if (
      fileDropdownOpen.moduleIndex === moduleIndex &&
      fileDropdownOpen.fileIndex === fileIndex
    ) {
      setFileDropdownOpen({ moduleIndex: null, fileIndex: null });
    } else {
      setFileDropdownOpen({ moduleIndex, fileIndex });
    }
  };

  const handleDeleteFile = (moduleIndex, fileIndex) => {
    const updatedModules = modules.map((module, idx) => {
      if (idx === moduleIndex) {
        const updatedFiles = module.files.filter(
          (_, fIdx) => fIdx !== fileIndex
        );
        return { ...module, files: updatedFiles };
      }
      return module;
    });
    setModules(updatedModules);
    setFileDropdownOpen({ moduleIndex: null, fileIndex: null });
  };

  const handleDownloadFile = (file) => {
    const link = document.createElement("a");
    link.href = file.url; // Assuming file.url contains the download link
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <nav
        style={{
          color: "white",
          background: "#6F4E37",
          padding: "10px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            textAlign: "left",
            fontFamily: "sans-serif",
            fontSize: "2rem",
          }}
        >
          Course Builder
        </div>
        <div style={{ position: "relative", right: "55px" }}>
          <button
            onClick={toggleDropdown}
            style={{
              marginRight: "10px",
              padding: "12px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              background: "red",
              border: "2px solid white",
              radius: "50px",
            }}
          >
            {" "}
            + Add
          </button>
          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                background: "white",
                border: "1px solid white",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                zIndex: 100,
                minWidth: "200px",
              }}
            >
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                  <button
                    onClick={() => handleOptionClick("Create a Module")}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 16px",
                      background: "white",
                      color: "black",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faFolderPlus}
                      style={{ marginRight: "5px" }}
                    />{" "}
                    Create a Module
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleOptionClick("Add a Link")}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 16px",
                      background: "white",
                      color: "black",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faLink}
                      style={{ marginRight: "5px" }}
                    />{" "}
                    Add a Link
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleOptionClick("Upload")}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 16px",
                      background: "white",
                      color: "black",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faUpload}
                      style={{ marginRight: "5px" }}
                    />{" "}
                    Upload
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginTop: "60px",
        }}
      >
        {modules.length === 0 ? (
          <>
            <img src={pic} alt="React Logo" />
            <p style={{ marginTop: "20px", color: "black" }}>
              Nothing added here yet
            </p>
            <p style={{ color: "black" }}>
              Click on the [+] Add button to add items to this course
            </p>
          </>
        ) : (
          <div
            style={{
              marginTop: "5px",
              width: "80%",
              maxWidth: "900px",
              color: "black",
            }}
          >
            {modules.map((module, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "20px",
                  background: "#f9f9f9",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faFolderPlus}
                      style={{ marginRight: "5px" }}
                    />
                    <span>{module.name}</span>
                  </div>
                  <div>
                    <button
                      onClick={() => handleEditModule(index)}
                      style={{
                        marginRight: "10px",
                        padding: "5px 10px",
                        background: "blue",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteModule(index)}
                      style={{
                        padding: "5px 10px",
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div style={{ marginTop: "10px", width: "100%" }}>
                  <button
                    onClick={() => openUploadModal(index)}
                    style={{
                      padding: "5px 10px",
                      background: "green",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Upload File
                  </button>
                  <button
                    onClick={() => openUploadLinkModal(index)}
                    style={{
                      padding: "5px 10px",
                      background: "purple",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      marginLeft: "10px",
                    }}
                  >
                    Add Link
                  </button>
                  <ul
                    style={{
                      listStyleType: "none",
                      padding: "10px",
                      marginTop: "10px",
                    }}
                  >
                    {module.files.map((file, fileIndex) => (
                      <li
                        key={fileIndex}
                        style={{
                          padding: "5px 0",
                          borderBottom: "1px solid #ccc",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {file.type === "video" ? (
                          <video
                            controls
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              marginRight: "10px",
                            }}
                          >
                            <source src={file.link} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <span>{file.name}</span>
                        )}
                        <div style={{ position: "relative" }}>
                          <button
                            onClick={() => toggleFileDropdown(index, fileIndex)}
                            style={{
                              cursor: "pointer",
                              background: "transparent",
                              border: "none",
                              fontSize: "20px",
                              fontWeight: "bold",
                              color: "black",
                            }}
                          >
                            ⋮
                          </button>
                          {fileDropdownOpen.moduleIndex === index &&
                            fileDropdownOpen.fileIndex === fileIndex && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  right: 0,
                                  background: "white",
                                  border: "1px solid #ccc",
                                  borderRadius: "4px",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                  zIndex: 100,
                                  minWidth: "100px",
                                }}
                              >
                                <ul
                                  style={{
                                    listStyleType: "none",
                                    padding: 0,
                                    margin: 0,
                                  }}
                                >
                                  <li>
                                    <button
                                      onClick={() =>
                                        openRenameFileModal(
                                          index,
                                          fileIndex,
                                          file
                                        )
                                      }
                                      style={{
                                        width: "100%",
                                        textAlign: "left",
                                        padding: "8px 16px",
                                        background: "white",
                                        color: "black",
                                      }}
                                    >
                                      Rename
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() =>
                                        handleDeleteFile(index, fileIndex)
                                      }
                                      style={{
                                        width: "100%",
                                        textAlign: "left",
                                        padding: "8px 16px",
                                        background: "white",
                                        color: "black",
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() => handleDownloadFile(file)}
                                      style={{
                                        width: "100%",
                                        textAlign: "left",
                                        padding: "8px 16px",
                                        background: "white",
                                        color: "black",
                                      }}
                                    >
                                      Download
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ModuleModal
        show={moduleModalOpen}
        onClose={() => setModuleModalOpen(false)}
        onSave={handleSaveModule}
        initialName={
          editingModuleIndex !== null ? modules[editingModuleIndex].name : ""
        }
      />
      <UploadModal
        show={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSave={handleSaveFile}
      />
      <RenameFileModal
        show={renameFileModalOpen}
        onClose={() => setRenameFileModalOpen(false)}
        onSave={(newName) =>
          handleRenameFile(
            renamingFile.moduleIndex,
            renamingFile.fileIndex,
            newName
          )
        }
        initialName={renamingFile.file ? renamingFile.file.name : ""}
      />
      <UploadLinkModal
        show={uploadLinkModalOpen}
        onClose={() => setUploadLinkModalOpen(false)}
        onSave={handleSaveLink}
      />
      <hr></hr>
      <footer style={{width:'100%',height:'40%',textAlign:'center'}}>
            <p>  Devloped By : Aman Chauhan</p>
      </footer>
    </>
  );
};

export default Home;

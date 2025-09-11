import React, { useState } from "react";
import { FaBars, FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbars from "../../components/Navbars";

const LecturerResources = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleUpload = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://final-projects-1.onrender.com/resources",
        formData
      );
      setMessage(res.data.message);
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      if (error.response && error.response.data?.message) {
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        setMessage("Failed to upload resource. Please try again.");
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Mobile Menu Button */}
        <button
          className="btn btn-outline-primary d-lg-none mb-3"
          onClick={toggleSidebar}
        >
          <FaBars /> Menu
        </button>

        {/* Sidebar */}
        <div
          className={`col-lg-3 col-md-4 sidebar-container ${
            isSidebarVisible ? "d-block" : "d-none d-lg-block"
          }`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-lg-9 col-md-8">
          <div className="my-3">
            <Navbars />
          </div>

          {/* Upload Section */}
          <div className="card shadow-sm p-4">
            <h3 className="mb-3">📂 Upload Resources</h3>
            <form onSubmit={handleUpload}>
              {/* Title */}
              <div className="mb-3">
                <label className="form-label fw-bold">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter resource title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label fw-bold">Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter a short description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* File Upload */}
              <div className="mb-3">
                <label className="form-label fw-bold">Upload File</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </div>

          

              <button type="submit" className="btn btn-primary w-80">

               {isLoading ? (
                <>
               <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                     <span style={{ marginLeft: '8px' }}>Loading...</span>
               </>
              ) : (
                <span className="me-2"> <FaCloudUploadAlt  />  Upload</span>
                 )}
            </button>
            </form>

            {/* Status Message */}
            {message && (
              <div className="alert alert-info mt-3 text-center">{message}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerResources;

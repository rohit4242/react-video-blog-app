import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import JoditEditor from "jodit-react";

import { categories } from "../data";
import location_pin_alt from "../Assets/svg/location-pin-alt.svg";
import trash_alt from "../Assets/svg/trash-alt.svg";
import check_circle from "../Assets/svg/check-circle.svg";
import exclamation_triangle from "../Assets/svg/exclamation-triangle.svg";
import Spinner from "./Spinner";
import AlertMessage from "./AlertMessage";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import app, { fdb } from "../firebase";
import { fetchUser } from "../Utils/fetchUser";

const Create = () => {
  const editor = useRef(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Choose a Category");
  const [location, setLocation] = useState("");
  const [videoAsset, setVideoAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(45);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertIcon, setAlertIcon] = useState(null);
  const [content, setContent] = useState("");

  const [userInfo] = fetchUser();

  const storage = getStorage(app);
  const navigate = useNavigate();

  useEffect(() => {}, [title, category, location, content]);

  const uploadImage = (e) => {
    setLoading(true);
    const videoFile = e.target.files[0];
    const storegeRef = ref(storage, `Videos/${Date.now()} - ${videoFile.name}`);

    const uploadTask = uploadBytesResumable(storegeRef, videoFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const uploadProgress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setProgress(uploadProgress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setVideoAsset(downloadURL);
          setLoading(false);
          setAlert(true);
          setAlertIcon(check_circle);
          setAlertMessage("Your video is uploaded to our server");
          setTimeout(() => {
            setAlert(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    const deleteRef = ref(storage, videoAsset);
    deleteObject(deleteRef)
      .then(() => {
        setVideoAsset(null);
        setAlert(true);
        setAlertIcon(exclamation_triangle);
        setAlertMessage("Your video was removed from our server");
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const config = {
    placeholder: "Hello This is Rohit Luni",
    width: "100%",
    height: "300px",
  };

  const uploadDetails = async () => {
    try {
      setLoading(true);
      console.log(!videoAsset === null);
      if (title === "") {
        console.log("Title is missing");
        setAlert(true);
        setAlertIcon(exclamation_triangle);
        setAlertMessage("Required Field are the missing!");
        setTimeout(() => {
          setAlert(false);
        }, 4000);
        setLoading(false);
        return;
      }
      if (category === "Choose a Category") {
        console.log("Category is missing");
        setAlert(true);
        setAlertIcon(exclamation_triangle);
        setAlertMessage("Required Field are the missing!");
        setTimeout(() => {
          setAlert(false);
        }, 4000);
        setLoading(false);
        return;
      }
      if (videoAsset === null) {
        console.log("video is missing");
        setAlert(true);
        setAlertIcon(exclamation_triangle);
        setAlertMessage("Required Field are the missing!");
        setTimeout(() => {
          setAlert(false);
        }, 4000);
        setLoading(false);
        return;
      }

      const data = {
        id: `${Date.now()}`,
        title: title,
        userID: userInfo?.uid,
        category: category,
        location: location,
        videoURL: videoAsset,
        content: content,
      };

      await setDoc(doc(fdb, "videos", `${Date.now()}`), data);
      setLoading(false);
      setAlert(true);
      setAlertIcon(exclamation_triangle);
      setAlertMessage("Your Blog are Uploaded Successfully");
      setTimeout(() => {
        setAlert(false);
        navigate("/", { replace: true });
      }, 4000);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 text-base font-medium text-[#6B7280] ">
      <div className="mx-auto w-full max-w-[950px] bg-white border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <form className="py-6 px-9">
          <div className="mb-5 ">
            {alert && <AlertMessage message={alertMessage} icon={alertIcon} />}
            <input
              type="text"
              name="text"
              id="text"
              required
              placeholder="Enter Your Title"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:ring-teal-500 focus:border-teal-500 focus:shadow-md"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-between max-h-14">
            <select
              id="countries"
              required
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-50 border text-base font-medium text-[#6B7280] border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected disabled>
                {category}
              </option>

              {categories &&
                categories.map((data) => (
                  <option key={data.id} value={data.name}>
                    {data.name}
                  </option>
                ))}
            </select>
            <div className=" relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img src={location_pin_alt} width="25px" alt="apps" />
              </div>
              <input
                type="text"
                name="text"
                id="text"
                placeholder="Location"
                value={location}
                className="w-full pl-12 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:ring-teal-500 focus:border-teal-500 focus:shadow-md"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6 pt-4">
            <label className="mb-5 block text-xl  font-semibold text-[#07074D]">
              Upload Video
            </label>

            <div className="relative flex min-h-[200px] mb-8 items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-2 text-center">
              {!videoAsset ? (
                <>
                  <label
                    for="file"
                    className="relative flex min-h-[200px] md:w-96 xl:w-[600px] xl:h-80 2xl:w-[800px] 2xl:h-96 cursor-pointer min-w-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-8 text-center"
                  >
                    {loading ? (
                      <Spinner
                        message={"Uploading Your Video"}
                        progress={progress}
                      />
                    ) : (
                      <>
                        <input
                          type="file"
                          name="file"
                          id="file"
                          onChange={uploadImage}
                          className="sr-only"
                          accept="video/mp4,video/x-m4v,video/*"
                          style={{ widows: 0, height: 0 }}
                        />
                        <div>
                          <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                            Drop files here
                          </span>
                          <span className="mb-2 block text-base font-medium text-[#6B7280]">
                            Or
                          </span>
                          <span className="inline-flex cursor-pointer rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                            Browse
                          </span>
                        </div>
                      </>
                    )}
                  </label>
                </>
              ) : (
                <div className="w-full h-full  flex justify-center items-center relative">
                  <div
                    className="flex justify-center items-center w-10 h-10 rounded-full top-1 right-1 absolute cursor-pointer z-10 "
                    onClick={deleteImage}
                  >
                    <img src={trash_alt} width="25px" alt="apps" />
                  </div>
                  <video
                    src={videoAsset}
                    controls
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              )}
            </div>

            <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
              <div className="flex items-center justify-between">{content}</div>
            </div>

            <JoditEditor
              ref={editor}
              config={config}
              value={content}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              // onChange={(newContent) => setContent(newContent)}
            />
          </div>

          <div>
            <button
              disabled={loading}
              onClick={() => uploadDetails()}
              className="hover:shadow-form w-full rounded-md bg-teal-500 hover:bg-teal-400 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;

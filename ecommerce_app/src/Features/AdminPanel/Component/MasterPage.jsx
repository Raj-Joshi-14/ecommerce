import React, { useEffect, useRef, useState } from "react";
import Glide from "@glidejs/glide";
import { AiTwotoneDelete, AiTwotoneEdit, AiFillFileAdd } from "react-icons/ai";
import { FaUpload } from "react-icons/fa";
import { GrDocumentUpdate } from "react-icons/gr";
import TopProductEdit from "./TopProductEdit";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewFlexAsync,
  addStatusFalse,
  addStatusTrue,
  deleteFlexAsync,
  fetchHighlightsAsync,
  selectAddStatus,
  selectHighlight,
  selectUpdateStatus,
  updateFlexAsync,
  updateStatusFalse,
  updateStatusTrue,
} from "../adminSlice";
let imgid; //Storing img id
import Modal from "../../Common/Modal";
// import { useForm } from "react-hook-form";
const MasterPage = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const highlights = useSelector(selectHighlight);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const updateStatus = useSelector(selectUpdateStatus);
  const addStatus = useSelector(selectAddStatus);
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    // console.log(previewUrl);
  }, [file]);
  // console.log(previewUrl);
  let imageSizeInKB;
  if (previewUrl !== null) {
    // dataUriParts = previewUrl.split(",");
    // const data = dataUriParts[1];

    // const bytes = new Uint8Array(data.length);
    // for (let i = 0; i < data.length; i++) {
    //   bytes[i] = data.charCodeAt(i);
    // }

    // Calculate the size of the binary data
    const imageSizeInBytes = previewUrl.length;
    imageSizeInKB = imageSizeInBytes / 1024;
    const imageSizeInMB = imageSizeInKB / 1024;
    // console.log(
    //   `Image size: ${imageSizeInBytes} bytes (${imageSizeInKB.toFixed(
    //     2
    //   )} KB, ${imageSizeInMB.toFixed(2)} MB)`
    // );
  }
  if (imageSizeInKB > 80) {
    setPreviewUrl(null);
    toast.error("Please Select Image Below the Size of 80 Kb");
  }
  useEffect(() => {
    if (!highlights) {
      console.error("Highlights data is missing or undefined.");
      return;
    }

    if (!Array.isArray(highlights)) {
      console.error("Highlights is not an array:", highlights);
      return;
    }

    if (highlights.length === 0) {
      console.warn("Highlights array is empty.");
      return;
    }

    const slider = new Glide(".glide-06", {
      type: "slider",
      focusAt: "center",
      perView: 1,
      autoplay: 3000,
      animationDuration: 700,
      gap: 15,
      classes: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, [highlights]);

  const handleRemove = (e, id) => {
    dispatch(deleteFlexAsync(id));
  };

  // console.log("img id", imgid);
  function handleID(id) {
    imgid = id;
    // console.log("Get ID", id);
  }
  const handleupdate = () => {
    const img = { imgsrc: previewUrl };
    const update = { imgsrc: img, id: imgid };
    // console.log("Inside update function", update);
    dispatch(updateFlexAsync({ ...update }));
    dispatch(updateStatusFalse());
    setPreviewUrl(null);
  };
  // console.log("updateStatus", updateStatus);
  // console.log("addStatus", addStatus);
  return (
    <>
      <div className="h-auto ml-7 w-10/12 md:ml-24 lg:ml-32 mt-5 mb-20">
        <p className="mb-6 sm:text-lg lg:text-2xl">
          <b>Home Product Flex</b>
        </p>
        <div className="overflow-hidden" data-glide-el="track">
          {/* For Add New Image Independent */}
          <div>
            {!previewUrl && (
              <div className="relative h-44  flex-col border-4 border-gray-300 lg:ml-0   mt-5">
                <div className="mt-5 lg:ml-80 sm:ml-44">
                  <div className="lg:ml-52 sm:ml-36 ml-20">
                    <button
                      className="relative "
                      type="button"
                      id="selectedimg"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(addStatusTrue());
                        fileInputRef.current.click();
                      }}
                    >
                      <AiFillFileAdd size={100} color="green"></AiFillFileAdd>
                    </button>
                    <input
                      type="file"
                      id="imgsrc"
                      name="imgsrc"
                      autoComplete="off"
                      accept="image/*"
                      hidden
                      className="relative"
                      ref={fileInputRef}
                      onChange={async (e) => {
                        e.preventDefault();
                        setFile(e.target.files[0]);
                        // console.log("updateStatus", updateStatus);
                        // console.log("addStatus", addStatus);
                      }}
                    />
                  </div>
                  <div className="lg:ml-52 sm:ml-36 ml-20">
                    <span>Add New Image</span>
                  </div>
                </div>
              </div>
            )}
            {/* ////////////////  Adding image modu */}
            {previewUrl && (
              <div className="flex-col bg-black h-72">
                <div className="flex-row">
                  <img src={previewUrl} className="w-full h-72 m-auto" />
                </div>
                <div className="flex-row ml-10 -mt-10">
                  <button
                    type="button"
                    className="mr-5"
                    // onClick={(e) => {  }}
                  >
                    <AiTwotoneEdit size={30} color="black"></AiTwotoneEdit>
                  </button>
                  {updateStatus !== false ? (
                    <button
                      id="kdkdk"
                      className="mr-5"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(addStatusFalse());
                        handleupdate();
                      }}
                    >
                      <GrDocumentUpdate
                        size={30}
                        color="black"
                      ></GrDocumentUpdate>
                    </button>
                  ) : null}
                  {addStatus === true ? (
                    <button
                      className="mr-5"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(addStatusFalse());
                        const newFlex = {
                          imgsrc: previewUrl,
                        };
                        if (addStatus === true) {
                          dispatch(addNewFlexAsync({ item: newFlex }));
                        }
                        setPreviewUrl(null);
                      }}
                    >
                      <FaUpload size={30} color="black"></FaUpload>
                    </button>
                  ) : null}
                  <button
                    className=""
                    type="button"
                    onClick={() => {
                      setPreviewUrl(null);
                    }}
                  >
                    <AiTwotoneDelete size={30} color="red"></AiTwotoneDelete>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-auto ml-7 w-10/12 md:ml-24 lg:ml-32 mt-5 mb-20">
        {/* ********************************* 01 - 10 - 2023 editing  ********************************************************** */}
        {/*<!-- Component: Slider with controls inside --> */}
        <div className="bg-black relative  w-full  h-72 overflow-hidden rounded shadow-xl glide-06 shadow-slate-200">
          {/*    <!-- Slides --> */}
          <div className="overflow-hidden" data-glide-el="track">
            <ul className="whitespace-no-wrap flex-no-wrap relative flex w-full overflow-hidden p-0">
              {highlights &&
                highlights.map((img) => (
                  <li key={img.id}>
                    <div className="flex-col bg-black h-72">
                      <div className="flex-row">
                        <img src={img.imgsrc} className=" w-full h-72 m-auto" />
                      </div>
                      <div className="flex-row ml-10 -mt-10">
                        <button
                          type="button"
                          className="mr-5"
                          onClick={(e) => {
                            let idd = img.id;
                            e.preventDefault();
                            dispatch(updateStatusTrue());
                            handleID(idd); // For Update
                            // console.log(idd);
                            // handleupdate(e, img.id);  // Execute in update upload button

                            fileInputRef.current.click();
                            // console.log("updateStatus", updateStatus);
                            // console.log("addStatus", addStatus);
                          }}
                        >
                          <AiTwotoneEdit
                            size={30}
                            color="black"
                          ></AiTwotoneEdit>
                        </button>
                        <input
                          type="file"
                          id="imgsrc2"
                          name="imgsrc2"
                          autoComplete="off"
                          accept="image/*"
                          hidden
                          className="relative"
                          ref={fileInputRef}
                          onChange={async (e) => {
                            e.preventDefault();
                            setFile(e.target.files[0]);
                          }}
                        />
                        <Modal
                          title={"You want to remove this image"}
                          message="Are you sure you want to delete this image ?"
                          dangerOption="Delete"
                          cancelOption="Cancel"
                          dangerAction={(e) => handleRemove(e, img.id)}
                          cancelAction={() => setOpenModal(null)}
                          showModal={openModal === img.id}
                        ></Modal>
                        <button
                          className=""
                          type="button"
                          onClick={(e) => {
                            setOpenModal(img.id);
                          }}
                        >
                          <AiTwotoneDelete
                            size={30}
                            color="red"
                          ></AiTwotoneDelete>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          {/*    <!-- Controls --> */}
          <div
            className="absolute left-0 flex items-centera justify-between w-full h-0 px-4 top-1/2 "
            data-glide-el="controls"
          >
            <button
              className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
              data-glide-dir="<"
              aria-label="prev slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <title>prev slide</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
            </button>
            <button
              className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
              data-glide-dir=">"
              aria-label="next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <title>next slide</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
        {/*<!-- End Slider with controls inside --> */}
      </div>
      <TopProductEdit></TopProductEdit>
    </>
  );
};

export default MasterPage;

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserInfo,
  updateUser2Async,
  updateUserAsync,
} from "../userSlice";
import { useForm } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";
import { toast } from "react-toastify";
export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  // console.log(userInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  //TODO: We will add payment section when we work on backend.
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imgselected, setImgselected] = useState(false);
  const {
    register,
    handleSubmit,

    reset,
    setValue,
    formState: { errors },
  } = useForm();
  // @@@@@@@@@@@@ Image Processing @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
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
  // @@@@@@@@@@@@ Image Processing @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };

  const handleEditProfile = (profileUpdate) => {
    const newUser = { ...userInfo }; // for shallow copy issue
    newUser.name = profileUpdate.name;
    newUser.email = profileUpdate.email;
    newUser.profileimages = previewUrl;
    newUser.bio = profileUpdate.bio;
    newUser.occupation = profileUpdate.occupation;
    // console.log(newUser.id);
    dispatch(updateUser2Async(newUser));
  };

  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
    setValue("phone", address.phone);
    setValue("street", address.street);
  };

  const handleAdd = (address) => {
    const newUser = {
      ...userInfo,
      addresses: [...userInfo.addresses, address],
    };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };
  const [editStatus, setEditstatus] = useState(false);
  function handleedit() {
    setEditstatus(true);
  }
  return (
    <div>
      {" "}
      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Testing UI @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
        <main className="border-t mt-44 lg:mt-44 border-gray-200 px-4 py-6 sm:px-6">
          <section className="relative h-500-px">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")',
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              />
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
              style={{ transform: "translateZ(0px)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x={0}
                y={0}
              >
                <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <form
                  className="px-6"
                  onSubmit={handleSubmit((data, e) => {
                    e.preventDefault();
                    handleEditProfile(data);
                    setEditstatus(false);
                    setPreviewUrl(null);
                    reset();
                    // console.log(
                    //   "Here in update block !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
                    // );

                    /*
                    console.log(NewUserData);
                    const NewUserData = {
                      name: data.Name,
                      email: data.email,
                      profileimages: previewUrl,
                      bio: data.bio,
                      occupation: data.occupation,
                    };*/
                  })}
                >
                  <div className="w-full lg:w-4/12 px-36 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-3 sm:mt-0">
                      {editStatus === false ? (
                        <button
                          className="bg-blue-400 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          id="edit"
                          onClick={(e) => {
                            e.preventDefault();
                            handleedit();
                          }}
                        >
                          Edit
                        </button>
                      ) : (
                        <button
                          className="bg-blue-400 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                          id="submit"
                        >
                          SUBMIT
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        {editStatus === false ? (
                          <img
                            alt="..."
                            src={userInfo.profileimages}
                            //-m-16 -ml-20 lg:-ml-16
                            className="relative shadow-xl h-40 w-40 sm:h-30 sm:w-30 rounded-full align-middle border-none"
                          />
                        ) : null}
                        {imgselected === true && editStatus === true ? (
                          <img
                            alt="..."
                            src={previewUrl}
                            //-m-16 -ml-20 lg:-ml-16
                            className="relative shadow-xl h-40 w-40 sm:h-30 sm:w-30 rounded-full align-middle border-none"
                          />
                        ) : null}
                        {editStatus === true && imgselected === false ? (
                          <button
                            className="relative "
                            type="button"
                            id="selectedimg"
                            onClick={(e) => {
                              e.preventDefault();
                              fileInputRef.current.click();
                              setImgselected(true);
                            }}
                          >
                            <BiImageAdd className="relative shadow-xl h-32 w-32 sm:h-30 sm:w-30 rounded-full align-middle border-none"></BiImageAdd>
                          </button>
                        ) : null}
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
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    {editStatus === true ? (
                      <>
                        {/* ---------------------------- Input Box 111 ------------------------------ */}
                        <label>Name : </label>
                        <br></br>
                        <input
                          type="text"
                          name="Name"
                          id="Name"
                          {...register("Name", {
                            required: "name is required",
                          })}
                          className=" leading-normal text-gray-700  rounded-md mb-2"
                          placeholder={
                            userInfo.name ? userInfo.name : "New User"
                          }
                        ></input>
                        <br></br>
                        <br></br>
                      </>
                    ) : (
                      <h3 className="text-4xl font-semibold leading-normal text-gray-700 mb-2">
                        {userInfo.name ? userInfo.name : "New User"}
                      </h3>
                    )}
                    {editStatus === true ? (
                      /* -------------- Input Box 222 ---------------- */
                      <>
                        <label>Email : </label>
                        <br></br>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          className=" leading-normal text-gray-700  rounded-md mb-2"
                          placeholder={
                            userInfo.email ? userInfo.email : "your email"
                          }
                        ></input>
                      </>
                    ) : (
                      <h3 className="text-xl my-5 font-bold tracking-tight text-orange-400">
                        {userInfo.email}
                      </h3>
                    )}
                    {userInfo.role === "admin" && (
                      <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                        role : {userInfo.role}
                      </h3>
                    )}
                    <div className="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
                      {/*  Address For Profile */}
                      {userInfo.addresses.map((address, index) =>
                        editStatus === false ? (
                          <p className="text-sm leading-6 text-gray-500">
                            {address.city}, {address.state}
                          </p>
                        ) : null
                      )}
                    </div>
                    {editStatus === true ? (
                      <>
                        {/* -------------------- Input Box 333 ---------------------------- */}
                        <label>Bio : </label>
                        <br></br>
                        <input
                          type="text"
                          name="bio"
                          id="bio"
                          {...register("bio", {
                            required: "bio is required",
                          })}
                          className=" leading-normal text-gray-700  rounded-md mb-2"
                          placeholder={userInfo.bio ? userInfo.bio : "Your Bio"}
                        ></input>
                        <br></br>
                        <br></br>
                      </>
                    ) : (
                      <div className="mb-2 text-blueGray-600 mt-10">
                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400" />
                        Bio :{userInfo.bio}
                      </div>
                    )}
                    {editStatus === true ? (
                      ///* -------------------- Input Box 444 ---------------------------- */
                      <>
                        <label>Occupation : </label>
                        <br></br>
                        <input
                          type="text"
                          name="occupation"
                          id="occupation"
                          {...register("occupation", {
                            required: "occupation is required",
                          })}
                          className=" leading-normal text-gray-700  rounded-md mb-2"
                          placeholder={
                            userInfo.occupation
                              ? userInfo.occupation
                              : "Occupation"
                          }
                        ></input>
                      </>
                    ) : (
                      <div className="mb-2 text-blueGray-600">
                        <i className="fas fa-university mr-2 text-lg text-blueGray-400" />
                        Occupation : {userInfo.occupation}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
        {/* Testing UI @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <button
            onClick={(e) => {
              setShowAddAddressForm(true);
              setSelectedEditIndex(-1);
            }}
            type="submit"
            className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add New Address
          </button>
          {showAddAddressForm ? (
            <form
              className="bg-white px-5 py-12 mt-12"
              noValidate
              onSubmit={handleSubmit((data) => {
                // console.log(data);
                handleAdd(data);
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "name is required",
                          })}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "street is required",
                          })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.street && (
                          <p className="text-red-500">
                            {errors.street.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="state"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.state && (
                          <p className="text-red-500">{errors.state.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "pinCode is required",
                          })}
                          id="pinCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.pinCode && (
                          <p className="text-red-500">
                            {errors.pinCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          ) : null}

          <p className="mt-0.5 text-sm text-gray-500">Your Addresses :</p>
          {/* ---------------- Updating Address -------------------------------------------------------------- */}
          {userInfo.addresses.map((address, index) => (
            <div key={index}>
              {selectedEditIndex === index ? (
                <form
                  className="bg-white px-5 py-12 mt-12"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    // console.log(data);
                    handleEdit(data, index);
                    reset();
                  })}
                >
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("name", {
                                required: "name is required",
                              })}
                              id="name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.name && (
                              <p className="text-red-500">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register("email", {
                                required: "email is required",
                              })}
                              type="email"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.email && (
                              <p className="text-red-500">
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              {...register("phone", {
                                required: "phone is required",
                              })}
                              type="tel"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.phone && (
                              <p className="text-red-500">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("street", {
                                required: "street is required",
                              })}
                              id="street"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.street && (
                              <p className="text-red-500">
                                {errors.street.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("city", {
                                required: "city is required",
                              })}
                              id="city"
                              autoComplete="address-level2"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.city && (
                              <p className="text-red-500">
                                {errors.city.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("state", {
                                required: "state is required",
                              })}
                              id="state"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.state && (
                              <p className="text-red-500">
                                {errors.state.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="pinCode"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("pinCode", {
                                required: "pinCode is required",
                              })}
                              id="pinCode"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.pinCode && (
                              <p className="text-red-500">
                                {errors.pinCode.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        onClick={(e) => setSelectedEditIndex(-1)}
                        type="submit"
                        className="rounded-md px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}
              <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.state}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.pinCode}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Phone: {address.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-500">
                    {address.city}
                  </p>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <button
                    onClick={(e) => handleEditForm(index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

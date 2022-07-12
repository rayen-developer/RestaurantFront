import httpClient from "../http/http-client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../actions/AuthAction";

function Dashboard() {
  const [createdBy, setCreatedBy] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    profile();
    getCategories();
  });

  const profile = () => {
    httpClient
      .get("/users/profile")
      .then((response) => {
        setCreatedBy(response.data.userId);
      })
      .catch((err) => {
        dispatch(LOGOUT());
        localStorage.removeItem("token");
      });
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(LOGOUT());
    localStorage.removeItem("token");
    window.location.reload(false);
  };

  const getCategories = () => {
    httpClient
      .post("/categories/all", { createdBy: createdBy })

      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addCategory = (e) => {
    e.preventDefault();
    const items = [];

    httpClient
      .post("/categories", { name, items, createdBy })
      .then((response) => {
        alert("Category Added Successfully");
        setShowModal(false);
      })
      .catch((err) => {
        alert("Category Name Already Exists");
      });
  };

  const updateCategory = (name, newName) => {
    httpClient
      .put("/categories/update", { name, newName })
      .then((response) => {
        console.log(response);
        alert("Category Name Successfully updated");
        setShowModal3(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCategory = (id) => {
    httpClient
      .delete(`/categories/${id}`)
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addItem = () => {
    httpClient
      .put("/categories/add", { name, itemName, price, description })
      .then((response) => {
        console.log(response);
        alert("Item Added Successfully");
        setShowModal2(false);
      })
      .catch((err) => {
        alert("Wrong Category Name");
        console.log(err);
      });
  };

  const deleteItem = (name, itemName, price, description) => {
    httpClient.defaults.headers.delete = {
      "Content-Type": "application/json;charset=utf-8",
    };
    httpClient
      .delete("/categories/item", {
        data: { name, itemName, price, description },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div class="h-screen w-full flex bg-gray-800">
        <nav class="w-24 flex flex-col items-center bg-gray-900 py-4">
          <div class="text-lg font-semibold text-white">Menu</div>
          <ul class="mt-2 text-gray-300 font-semibold">
            {categories.map((category, key) => {
              return (
                <li class="mt-3 t">
                  <a class="flex flex-col items-center text-sm capitalize">
                    <svg class="fill-current h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9
                    17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10
                    8h-8v10h8V11m-10 4H3v6h8v-6z"
                      ></path>
                    </svg>
                    <span>{category.name}</span>
                  </a>
                </li>
              );
            })}

            <li class="mt-3 t" onClick={() => setShowModal(true)}>
              <a class="flex flex-col items-center text-sm capitalize">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />{" "}
                </svg>
                <span>New</span>
              </a>
            </li>
            <li class="mt-3 t" onClick={logout}>
              <a class="flex flex-col items-center text-sm capitalize">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>

        <main class="w-full overflow-y-auto">
          {categories.map((category, key) => {
            return (
              <div>
                <br />
                <div class="font-bold text-white text-lg px-10 grid grid-cols-10 grid-rows-0 gap-4">
                  {category.name}
                  <span
                    onClick={() => [
                      setShowModal2(true),
                      setName(category.name),
                    ]}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </span>
                  <span
                    onClick={() => [
                      setShowModal3(true),
                      setName(category.name),
                    ]}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </span>
                  <span onClick={() => deleteCategory(category._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </span>
                </div>
                <div class="px-10 grid grid-cols-4 gap-4">
                  {category.items.map((item, key) => (
                    <div class="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center">
                      <div class="bg-white rounded-lg mt-5">
                        <img
                          src="https://source.unsplash.com/MNtag_eXMKw/1600x900"
                          class="h-40 rounded-md"
                          alt=""
                        />
                      </div>

                      <div class="bg-white shadow-lg rounded-lg -mt-4 w-64">
                        <div class="py-5 px-5">
                          <span class="font-bold text-gray-800 text-lg">
                            {item.name}
                          </span>
                          <div class="flex items-center justify-between">
                            <div class="text-sm text-gray-600 font-light">
                              {item.description}
                            </div>
                            <div class="text-2xl text-red-600 font-bold">
                              {item.price}
                            </div>

                            <span
                              onClick={() =>
                                deleteItem(
                                  category.name,
                                  item.name,
                                  item.price,
                                  item.description
                                )
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </main>
      </div>

      <>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Add Category</h3>
                  </div>

                  <div className="relative p-6 flex-auto">
                    <input
                      type="text"
                      placeholder="Category Name"
                      className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={addCategory}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>

      <>
        {showModal2 ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Add Item to {name}
                    </h3>
                  </div>

                  <div className="relative p-6 flex-auto">
                    <input
                      type="text"
                      placeholder="Item Name"
                      className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                      name="itemName"
                      onChange={(e) => setItemName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Item Price"
                      className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                      name="price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Item Description"
                      className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                      name="description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal2(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() =>
                        addItem(name, itemName, price, description)
                      }
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>

      <>
        {showModal3 ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Update {name}</h3>
                  </div>

                  <div className="relative p-6 flex-auto">
                    <input
                      type="text"
                      placeholder="Category Name"
                      className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                      name="newName"
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal3(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => updateCategory(name, newName)}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    </div>
  );
}

export default Dashboard;

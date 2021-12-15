import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Table from "../components/Table";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  street: "",
  city: "",
  region: "",
  zip: "",
};
const defaultUserState = [];
export default function FormLayout() {
  const [formUser, setFormUser] = useState(initialState);
  const [userList, setUserList] = useState(defaultUserState);
  const [isEdit, setIsEdit] = useState(false);
  const { firstname, lastname, email, street, city, region, zip } = formUser;

  useEffect(() => {
    getUserData();
  }, []);

  const deleteUserById = async (id) => {
    try {
      await Swal.fire({
        icon: "error",
        title: "ต้องการลบหรือไม่??",
        confirmButtonText: "ลบ",
        cancelButtonText: "ไม่ลบ",
        showCancelButton: true,
      }).then(async (e) => {
        if (e.isConfirmed) {
          await axios.delete("/api/users/" + id);
          Swal.fire({
            icon: "success",
            title: "ลบแล้วนะครับ",
            showConfirmButton: false,
            timer: 2000,
          })
        }
      })

      getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get("/api/users/");

      setUserList(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserDataById = async (id) => {
    try {
      const { data } = await axios.get("/api/users/" + id);
      console.log(data);
      setIsEdit(true);
      setFormUser({
        _id: data.data._id,
        firstname: data.data.firstname,
        lastname: data.data.lastname,
        email: data.data.email,
        street: data.data.street,
        city: data.data.city,
        region: data.data.region,
        zip: data.data.zip,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const validationError = validationUser();
    if (validationError) return;

    const setDataError = await setUserData();
    if (setDataError) return;

    setFormUser(initialState);

    await Swal.fire({
      icon: "success",
      title: "บันทึกข้อมูลให้แล้วนะครับพรี่",
      showConfirmButton: false,
      timer: 2000,
    });

    await getUserData();
  };
  const setUserData = async () => {
    try {
      if (isEdit) {
        await axios.put("/api/users/" + formUser._id, formUser);
      } else {
        await axios.post("/api/users/", formUser);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "พังยับ",
        text: "พังอะครับพรี่ ติดต่อแอดมินด่วนๆ!",
      });
      return true;
    }
  };
  const validationUser = () => {
    if (!firstname || !lastname || !email || !street || !city || !zip) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "โปรดกรอกข้อมูลให้ครบนะจ๊ะ!",
      });
      return true;
    }
  };

  return (
    <>
      <div className="mt-10 pt-5 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-3">
            <form onSubmit={handelSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        onChange={(e) =>
                          setFormUser({
                            ...formUser,
                            firstname: e.target.value,
                          })
                        }
                        type="text"
                        value={firstname}
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        onChange={(e) =>
                          setFormUser({ ...formUser, lastname: e.target.value })
                        }
                        type="text"
                        value={lastname}
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        onChange={(e) =>
                          setFormUser({ ...formUser, email: e.target.value })
                        }
                        type="email"
                        value={email}
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street address
                      </label>
                      <input
                        onChange={(e) =>
                          setFormUser({ ...formUser, street: e.target.value })
                        }
                        type="text"
                        value={street}
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        onChange={(e) =>
                          setFormUser({ ...formUser, city: e.target.value })
                        }
                        type="text"
                        value={city}
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State / Province
                      </label>
                      <input
                        onChange={(e) =>
                          setFormUser({ ...formUser, region: e.target.value })
                        }
                        type="text"
                        value={region}
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP / Postal code
                      </label>
                      <input
                        onChange={(e) =>
                          setFormUser({ ...formUser, zip: e.target.value })
                        }
                        type="number"
                        value={zip}
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                  <button
                    type="reset"
                    onClick={() => setFormUser(initialState)}
                    className="m-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <Table
        data={userList}
        getUserDataById={getUserDataById}
        deleteUserById={deleteUserById}
      />
    </>
  );
}

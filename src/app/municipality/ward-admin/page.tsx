"use client";

import { useEffect, useState } from "react";

type WardAdmin = {
  id: number;
  full_name: string;
  username: string;
  password: string;
  phone: string;
  ward: string;
  is_active: boolean;
  last_login: string;
  failed_logins: number;
};

export default function WardAdminsPage() {
  const [admins, setAdmins] = useState<WardAdmin[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [tempPassword, setTempPassword] =
    useState("");

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    phone: "",
    ward: "",
  });

  useEffect(() => {
    const loadAdmins = () => {
      const stored =
        localStorage.getItem(
          "wardAdmins"
        );

      if (!stored) {
        return;
      }

      try {
        const parsed =
          JSON.parse(
            stored
          ) as WardAdmin[];

        setAdmins(parsed);

      } catch {
        console.error(
          "Invalid wardAdmins data"
        );
      }
    };

    loadAdmins();

  }, []);

  const generatePassword =
    () => {
      return Math.random()
        .toString(36)
        .slice(2, 10);
    };

  const handleSave = () => {
    const password =
      generatePassword();

    setTempPassword(
      password
    );

    const newAdmin: WardAdmin = {
      id: Date.now(),

      ...form,

      password,

      is_active: true,

      last_login: "-",

      failed_logins: 0,
    };

    const updated = [
      ...admins,
      newAdmin,
    ];

    setAdmins(
      updated
    );

    localStorage.setItem(
      "wardAdmins",
      JSON.stringify(updated)
    );

    setShowForm(false);

    setForm({
      full_name: "",
      username: "",
      phone: "",
      ward: "",
    });

    setTimeout(() => {
      setTempPassword("");
    }, 10000);
  };

  const toggleStatus = (
    id: number
  ) => {
    const updated =
      admins.map(
        (admin) =>
          admin.id === id
            ? {
              ...admin,
              is_active:
                !admin.is_active,
            }
            : admin
      );

    setAdmins(updated);

    localStorage.setItem(
      "wardAdmins",
      JSON.stringify(updated)
    );
  };

  const resetPassword = (
    id: number
  ) => {
    const newPassword =
      generatePassword();

    setTempPassword(
      newPassword
    );

    const updated =
      admins.map(
        (admin) =>
          admin.id === id
            ? {
              ...admin,
              password:
                newPassword,
            }
            : admin
      );

    setAdmins(updated);

    localStorage.setItem(
      "wardAdmins",
      JSON.stringify(updated)
    );

    setTimeout(() => {
      setTempPassword("");
    }, 10000);
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Ward Admin Management
      </h1>

      <button
        onClick={() =>
          setShowForm(
            !showForm
          )
        }
        className="
        bg-blue-600
        text-white
        px-4
        py-2
        mb-6
        "
      >
        Create Ward Admin
      </button>

      {showForm && (
        <div
          className="
          border
          p-4
          mb-6
          space-y-3
          "
        >
          <input
            placeholder="Full Name"
            className="border p-2 w-full"
            value={
              form.full_name
            }
            onChange={(
              e
            ) =>
              setForm({
                ...form,
                full_name:
                  e.target
                    .value,
              })
            }
          />

          <input
            placeholder="Username"
            className="border p-2 w-full"
            value={
              form.username
            }
            onChange={(
              e
            ) =>
              setForm({
                ...form,
                username:
                  e.target
                    .value,
              })
            }
          />

          <input
            placeholder="Phone"
            className="border p-2 w-full"
            value={
              form.phone
            }
            onChange={(
              e
            ) =>
              setForm({
                ...form,
                phone:
                  e.target
                    .value,
              })
            }
          />

          <select
            className="border p-2 w-full"
            value={
              form.ward
            }
            onChange={(
              e
            ) =>
              setForm({
                ...form,
                ward:
                  e.target
                    .value,
              })
            }
          >
            <option value="">
              Select Ward
            </option>

            <option>
              ward-001
            </option>

            <option>
              ward-002
            </option>

            <option>
              ward-003
            </option>

            <option>
              ward-004
            </option>
          </select>

          <button
            onClick={
              handleSave
            }
            className="
            bg-green-600
            text-white
            px-4
            py-2
            "
          >
            Save
          </button>
        </div>
      )}

      {tempPassword && (
        <div
          className="
          bg-yellow-100
          p-3
          mb-4
          "
        >
          Temporary Password:

          <b>
            {" "}
            {tempPassword}
          </b>
        </div>
      )}

      <table className="w-full border">

        <thead>

          <tr>

            <th className="border p-2">
              Full Name
            </th>

            <th className="border p-2">
              Username
            </th>

            <th className="border p-2">
              Ward
            </th>

            <th className="border p-2">
              Status
            </th>

            <th className="border p-2">
              Last Login
            </th>

            <th className="border p-2">
              Failed Logins
            </th>

            <th className="border p-2">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {admins.map(
            (admin) => (

              <tr
                key={
                  admin.id
                }
                className={
                  admin.failed_logins >=
                    3
                    ? "bg-red-100"
                    : ""
                }
              >

                <td className="border p-2">
                  {
                    admin.full_name
                  }
                </td>

                <td className="border p-2">
                  {
                    admin.username
                  }
                </td>

                <td className="border p-2">
                  {
                    admin.ward
                  }
                </td>

                <td className="border p-2">

                  {admin.is_active
                    ? "🟢 Active"
                    : "🔴 Disabled"}

                </td>

                <td className="border p-2">
                  {
                    admin.last_login
                  }
                </td>

                <td className="border p-2">

                  {
                    admin.failed_logins >=
                      3
                      ? `⚠ ${admin.failed_logins}`
                      : admin.failed_logins
                  }

                </td>

                <td className="border p-2">

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        toggleStatus(
                          admin.id
                        )
                      }
                      className="
                      bg-gray-600
                      text-white
                      px-2
                      py-1
                      "
                    >
                      {admin.is_active
                        ? "Disable"
                        : "Enable"}
                    </button>

                    <button
                      onClick={() =>
                        resetPassword(
                          admin.id
                        )
                      }
                      className="
                      bg-blue-600
                      text-white
                      px-2
                      py-1
                      "
                    >
                      Reset Password
                    </button>

                  </div>

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}
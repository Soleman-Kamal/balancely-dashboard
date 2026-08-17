import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Mail, MoreHorizontal, Plus, Search, ShieldCheck, UserCog, Users, X } from "lucide-react";

const defaultUsers = [
    {
        id: 1,
        name: "Soleman Kamal",
        email: "soleman@balancely.com",
        role: "Admin",
        department: "Management",
        status: "Active",
    },
    {
        id: 2,
        name: "Ahmed Salem",
        email: "ahmed@balancely.com",
        role: "Manager",
        department: "Finance",
        status: "Active",
    },
    {
        id: 3,
        name: "Lina Omar",
        email: "lina@balancely.com",
        role: "Accountant",
        department: "Accounting",
        status: "Active",
    },
    {
        id: 4,
        name: "Khaled Nasser",
        email: "khaled@balancely.com",
        role: "Viewer",
        department: "Operations",
        status: "Inactive",
    },
];

const UsersPage = () => {
    const [users, setUsers] = useState(() => {
        const stored = localStorage.getItem("balancely-users");

        if (stored) {
            return JSON.parse(stored);
        }

        return defaultUsers;
    });

    const [search, setSearch] = useState("");
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "Viewer",
        department: "",
        status: "Active",
    });

    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        role: "Viewer",
        department: "",
        status: "Active",
    });

    const saveUsers = (updated) => {
        setUsers(updated);

        localStorage.setItem("balancely-users", JSON.stringify(updated));

        window.dispatchEvent(
            new CustomEvent("users-updated", {
                detail: updated,
            }),
        );
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;

        setEditForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddUser = () => {
        if (!form.name.trim()) {
            alert("Please enter a user name.");
            return;
        }

        if (!form.email.trim()) {
            alert("Please enter an email address.");
            return;
        }

        const newUser = {
            id: Date.now(),
            name: form.name.trim(),
            email: form.email.trim(),
            role: form.role,
            department: form.department.trim(),
            status: form.status,
        };

        const updated = [newUser, ...users];

        saveUsers(updated);

        setForm({
            name: "",
            email: "",
            role: "Viewer",
            department: "",
            status: "Active",
        });

        setAddModalOpen(false);
    };

    const openEditModal = (user) => {
        setSelectedUser(user);

        setEditForm({
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            status: user.status,
        });

        setEditModalOpen(true);
    };

    const handleSaveChanges = () => {
        if (!selectedUser) return;

        if (!editForm.name.trim()) {
            alert("Please enter a user name.");
            return;
        }

        if (!editForm.email.trim()) {
            alert("Please enter an email address.");
            return;
        }

        const updated = users.map((user) =>
            user.id === selectedUser.id
                ? {
                      ...user,
                      name: editForm.name.trim(),
                      email: editForm.email.trim(),
                      role: editForm.role,
                      department: editForm.department.trim(),
                      status: editForm.status,
                  }
                : user,
        );

        saveUsers(updated);

        setSelectedUser(null);
        setEditModalOpen(false);
    };

    const filteredUsers = useMemo(() => {
        const query = search.toLowerCase();

        return users.filter((user) => {
            return (
                user.name.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.role.toLowerCase().includes(query) ||
                user.department.toLowerCase().includes(query)
            );
        });
    }, [users, search]);

    const activeUsers = users.filter((user) => user.status === "Active").length;

    const admins = users.filter((user) => user.role === "Admin").length;

    const managers = users.filter((user) => user.role === "Manager").length;

    const getInitials = (name) => {
        return name
            .split(" ")
            .filter(Boolean)
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    const getRoleStyles = (role) => {
        const styles = {
            Admin: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
            Manager: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
            Accountant: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
            Viewer: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
        };

        return styles[role] || styles.Viewer;
    };

    return (
        <div className="flex flex-col gap-6">
            {/* HEADER */}
            <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">System</p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Users & Roles</h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Manage team members, access levels and account status.</p>
                </div>

                <button
                    type="button"
                    onClick={() => setAddModalOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                    <Plus size={17} />
                    Add User
                </button>
            </section>

            {/* KPI CARDS */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <Users size={20} />
                        </div>

                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Total</span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">Total Users</p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{users.length}</p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <UserCog size={20} />
                        </div>

                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Active</span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">Active Users</p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{activeUsers}</p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                            <ShieldCheck size={20} />
                        </div>

                        <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">Admin</span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">Administrators</p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{admins}</p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            <UserCog size={20} />
                        </div>

                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">Manager</span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">Managers</p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{managers}</p>
                </article>
            </section>

            {/* SEARCH */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="relative max-w-md">
                    <Search
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search users..."
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                </div>
            </section>

            {/* TABLE */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead className="bg-slate-50 dark:bg-slate-950/50">
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">User</th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Department</th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Role</th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>

                                <th className="px-5 py-4" />
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/40"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                                {getInitials(user.name)}
                                            </div>

                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>

                                                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                                                    <Mail size={13} />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">{user.department || "-"}</td>

                                    <td className="px-5 py-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getRoleStyles(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                user.status === "Active"
                                                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                            }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() => openEditModal(user)}
                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                                            aria-label={`Edit ${user.name}`}
                                        >
                                            <MoreHorizontal size={19} />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-10 text-center text-sm text-slate-500"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ADD USER MODAL */}
            {addModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Add User</h2>

                                <p className="mt-1 text-sm text-slate-500">Add a new team member and assign access.</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setAddModalOpen(false)}
                                className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                                aria-label="Close add user modal"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <UserForm
                            form={form}
                            handleChange={handleChange}
                        />

                        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5 dark:border-slate-800">
                            <button
                                type="button"
                                onClick={() => setAddModalOpen(false)}
                                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleAddUser}
                                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Add User
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT USER MODAL */}
            {editModalOpen && selectedUser && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Edit User</h2>

                                <p className="mt-1 text-sm text-slate-500">Update user role and account status.</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setEditModalOpen(false);
                                    setSelectedUser(null);
                                }}
                                className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                                aria-label="Close edit user modal"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <UserForm
                            form={editForm}
                            handleChange={handleEditChange}
                        />

                        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5 dark:border-slate-800">
                            <button
                                type="button"
                                onClick={() => {
                                    setEditModalOpen(false);
                                    setSelectedUser(null);
                                }}
                                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSaveChanges}
                                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const UserForm = ({ form, handleChange }) => {
    return (
        <div className="grid gap-4 p-6 md:grid-cols-2">
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>

                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="User name"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>

                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Department</label>

                <input
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="Finance"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Role</label>

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Viewer">Viewer</option>
                </select>
            </div>

            <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
        </div>
    );
};

UserForm.propTypes = {
    form: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,

    handleChange: PropTypes.func.isRequired,
};

export default UsersPage;

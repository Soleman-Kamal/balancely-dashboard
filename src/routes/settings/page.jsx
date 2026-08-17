import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import {
    Camera,
    Save,
    User,
    AtSign,
    Briefcase,
    Mail,
    Building2,
    MapPin,
} from "lucide-react";

import profileImg from "@/assets/profile-image.jpg";

const defaultProfile = {
    name: "Soleman Kamal",
    handle: "@solemankamal",
    role: "Frontend Engineer",
    email: "solemankamal@example.com",
    company: "Independent Developer",
    location: "Palestine",
    bio: "Frontend developer focused on building modern, responsive and user-friendly web experiences.",
    image: profileImg,
};

const SettingsPage = () => {
    const fileInputRef = useRef(null);

    const [profile, setProfile] = useState(defaultProfile);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const storedProfile = localStorage.getItem("balancely-profile");

        if (storedProfile) {
            setProfile({
                ...defaultProfile,
                ...JSON.parse(storedProfile),
            });
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));

        setSaved(false);
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            setProfile((prev) => ({
                ...prev,
                image: reader.result,
            }));

            setSaved(false);
        };

        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        localStorage.setItem(
            "balancely-profile",
            JSON.stringify(profile),
        );

        window.dispatchEvent(
            new CustomEvent("profile-updated", {
                detail: profile,
            }),
        );

        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2500);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950 lg:p-8">
            {/* PAGE HEADER */}
            <div className="mb-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
                    Personal account
                </p>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Account Settings
                </h1>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Manage your personal information and profile identity.
                </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
                {/* PROFILE CARD */}
                <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative">
                            <img
                                src={profile.image || profileImg}
                                alt={profile.name}
                                className="h-28 w-28 rounded-full border-4 border-slate-100 object-cover dark:border-slate-800"
                            />

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-emerald-500 text-white transition hover:bg-emerald-600 dark:border-slate-900"
                            >
                                <Camera size={16} />
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                            {profile.name || "Your Name"}
                        </h2>

                        <p className="mt-1 text-sm font-medium text-emerald-500">
                            {profile.handle || "@username"}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            {profile.role || "Your role"}
                        </p>

                        <div className="my-6 h-px w-full bg-slate-200 dark:bg-slate-800" />

                        <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                            {profile.bio || "Add a short bio about yourself."}
                        </p>
                    </div>
                </div>

                {/* FORM */}
                <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                    <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                        <h2 className="font-semibold text-slate-900 dark:text-white">
                            Profile Information
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Update how your profile appears across Balancely.
                        </p>
                    </div>

                    <div className="grid gap-5 p-6 md:grid-cols-2">
                        <Field
                            icon={User}
                            label="Full name"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                        />

                        <Field
                            icon={AtSign}
                            label="Handle"
                            name="handle"
                            value={profile.handle}
                            onChange={handleChange}
                            placeholder="@username"
                        />

                        <Field
                            icon={Briefcase}
                            label="Job title"
                            name="role"
                            value={profile.role}
                            onChange={handleChange}
                            placeholder="Frontend Engineer"
                        />

                        <Field
                            icon={Mail}
                            label="Email address"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            type="email"
                        />

                        <Field
                            icon={Building2}
                            label="Company"
                            name="company"
                            value={profile.company}
                            onChange={handleChange}
                            placeholder="Company name"
                        />

                        <Field
                            icon={MapPin}
                            label="Location"
                            name="location"
                            value={profile.location}
                            onChange={handleChange}
                            placeholder="Your location"
                        />

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Bio
                            </label>

                            <textarea
                                name="bio"
                                value={profile.bio}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Tell us something about yourself..."
                                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200 px-6 py-5 dark:border-slate-800">
                        <div>
                            {saved && (
                                <p className="text-sm font-medium text-emerald-500">
                                    Changes saved successfully.
                                </p>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleSave}
                            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                        >
                            <Save size={17} />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Field = ({
    icon: Icon,
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
}) => {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {label}
            </label>

            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800">
                <Icon
                    size={17}
                    className="shrink-0 text-slate-400"
                />

                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="h-12 w-full bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                />
            </div>
        </div>
    );
};
Field.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
};
export default SettingsPage;
"use client";
import Input from "@/app/components/meterial/input";
import { fetchActionApi } from "@/app/utils/action";
import { useState } from "react";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const register = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        let body = {
            username: username,
            email: email,
            password: password,
        };
        const res = await fetchActionApi("/api/auth/local/register", {
            method: "POST",
            body: JSON.stringify(body),
        });
    
        if (res) {
            if (res.status !== 200) {
                console.log(res);
                alert("An error occurred");
            }
            console.log(res);
        }
    };

    return (
        <div className="flex justify-center pt-16">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form onSubmit={register} className="space-y-4">
                <div className="flex justify-center mb-4">
                    <img
                        src="https://i.pinimg.com/736x/de/7e/23/de7e232432ca80481d6db4b0c1573442.jpg"
                        alt="Login Image"
                        className="w-[200px] h-[200px] object-contain rounded-xl"  // ขนาดภาพพอดีและมุมโค้ง
                    />
                </div>
                <Input
                    type="text"
                    id="usernamer"
                    value={username}
                    label="username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                <Input
                    type="email"
                    id="email"
                    label="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    required
                />
                <Input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label="Confirm Password"
                    required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-[#424264] text-white font-semibold rounded-md hover:bg-[#223C63] focus:ring-2 focus:ring-[#223C63]"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

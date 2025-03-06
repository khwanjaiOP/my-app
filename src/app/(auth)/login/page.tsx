"use client";
import Input from "@/app/components/meterial/input";
import { fetchActionApi, setAccessToken } from "@/app/utils/action";
import { useState } from "react";

interface LoginResponse {
    jwt: string;
    user: {
      id: number;
      documentId: number;
    }
  }

export default function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e: React.FormEvent) => {
        e.preventDefault();

        let body = {
            identifier: identifier,
            password: password,
        };
        const res = await fetchActionApi("/api/auth/local", {
            method: "POST",
            body: JSON.stringify(body),
        } as any);

        if (res) {
            console.log(res);
            if (res.status === 200) {
                const token = res.data as LoginResponse
                await setAccessToken(token.jwt);
                window.location.href = "/";
            } else {
                alert("Login failed. Please try again.");
            }
        }
    };

    return (
        <div className="flex justify-center pt-16">  {/* เพิ่ม padding-top ขยับกล่องขึ้น */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Login</h1>
                <div className="flex justify-center mb-4">
                    <img
                        src="https://i.pinimg.com/736x/75/2c/4c/752c4c0700976b2d9c1a2de401b8212e.jpg"
                        alt="Login Image"
                        className="w-[200px] h-[200px] object-contain rounded-xl"
                    />
                </div>

                <form onSubmit={(e) => login(e)} className="flex flex-col space-y-4">
                        <Input
                        type="text"
                        id="identifier"
                        value={identifier}
                        label="ชื่อผู้ใช้"
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                        />

                        <Input
                            type="password"
                            id="password"
                            value={password}
                            label="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    <button 
                        type="submit"
                        className="w-full py-2 px-4 bg-[#223C63] text-white font-semibold rounded-md hover:bg-[#424264] focus:ring-2 focus:ring-[#223C63]"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

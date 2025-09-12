import { useState } from "react";
import { useUser } from "../lib/context/user";
import { Link } from "react-router-dom";
import BaseButton from "../components/BaseButton";

export function Register() {
  const user = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="max-w-[1080px] mx-auto flex flex-col gap-4 mt-6 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold">Register</h1>
      <p>Create an account to share your ideas and brainstorm together!</p>

      <form className="w-full flex flex-col gap-3">
        <input
          className="bg-white border border-gray-300 p-3 rounded shadow outline-none"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          className="bg-white border border-gray-300 p-3 rounded shadow outline-none"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <BaseButton onClick={() => user.register(email, password)}>
          Register
        </BaseButton>
      </form>

      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </section>
  );
}

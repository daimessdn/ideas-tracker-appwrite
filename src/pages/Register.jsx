import { useState } from "react";
import { useUser } from "../lib/context/user";
import { Link } from "react-router-dom";
import BaseButton from "../components/BaseButton";
import BaseInput from "../components/BaseInput";

export function Register() {
  const user = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await user.register(email, password);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <section className="max-w-[1080px] mx-auto flex flex-col gap-4 mt-6 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold">Register</h1>
      <p>Create an account to share your ideas and brainstorm together!</p>

      <form className="w-full flex flex-col gap-3" onSubmit={handleRegister}>
        <BaseInput
          type="email"
          label="Email address"
          required={true}
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <BaseInput
          type="password"
          label="Password"
          required={true}
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <BaseButton type="submit" disabled={loading}>
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

import { useState } from "react";
import { useUser } from "../lib/context/user";
import { Link } from "react-router-dom";
import BaseButton from "../components/BaseButton";
import BaseInput from "../components/BaseInput";

export function Login() {
  const user = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await user.login(email, password);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-[1080px] mx-auto flex flex-col gap-4 mt-6 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold">Login</h1>
      <p>Welcome back! Please login to continue.</p>

      <form className="w-full flex flex-col gap-3" onSubmit={handleLogin}>
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
          Login
        </BaseButton>
      </form>

      <p className="text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </section>
  );
}

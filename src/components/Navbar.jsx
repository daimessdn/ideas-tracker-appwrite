import { useState } from "react";
import { Link } from "react-router-dom";

import { useUser } from "../lib/context/user";

import BaseButton from "./BaseButton";
import Popup from "./Popup";

export default function Navbar() {
  const user = useUser();
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <nav className="py-6 bg-white shadow-md w-full">
      <div className="max-w-[1080px] mx-auto w-full flex items-center justify-between">
        <Link className="me-auto font-bold" to="/">Idea Bulletin</Link>

        <div className="ms-auto">
          {user.current ? (
            <div className="flex items-center gap-2">
              <span>{user.current.email}</span>
              <BaseButton onClick={() => setConfirmLogout(true)}>Logout</BaseButton>
            </div>
          ) : (
            <BaseButton href="/login">Login</BaseButton>
          )}
        </div>
      </div>

      {/* Popup Confirm Logout */}
      <Popup
        isOpen={confirmLogout}
        onClose={() => setConfirmLogout(false)}
        title="Confirm Logout"
      >
        <p>Are you sure you want to logout?</p>
        <div className="mt-4 flex justify-end gap-2">
          <BaseButton variant="secondary" onClick={() => setConfirmLogout(false)}>
            Cancel
          </BaseButton>
          <BaseButton
            onClick={() => {
              user.logout();
              setConfirmLogout(false);
            }}
          >
            Logout
          </BaseButton>
        </div>
      </Popup>
    </nav>
  );
}

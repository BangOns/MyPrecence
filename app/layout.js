import "../styles/globals.css";
import { AddProvider } from "@/redux/provider";
import AuthProvider from "./provider";
export const metadata = {
  title: "MyPresence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

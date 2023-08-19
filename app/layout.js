import "../styles/globals.css";
import { AddProvider } from "@/redux/provider";
export const metadata = {
  title: "MyPresence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AddProvider>{children}</AddProvider>
      </body>
    </html>
  );
}

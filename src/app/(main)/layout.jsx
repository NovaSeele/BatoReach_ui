import { Nunito } from "next/font/google";
import "../globals.css";
import Header from "@/components/common/header";
import SideBar from "@/components/common/sideBar";

const inter = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "My Project",
  description: "miao miao",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + ""}>
        {children}
      </body>
    </html>
  );
}

'use client'
import Image from "next/image";
import Header from "@/Components/Header";
import BlogList from "@/components/blogList";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";


export default function Home() {
  return (
   <>
      <ToastContainer theme="dark"/>
      <Header/>
      <BlogList/>
      <Footer/>
   </>
  );
}

import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Toolkit from "./components/Toolkit";
function App() {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="toolkit"><Toolkit /></section>
      <section id="experience"><Experience /></section>
      <section id="projects"><Projects /></section>
      <section id="contact"><Contact /></section>
      <Footer />
    </div>
  );
}

export default App;

import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

// Components
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";

// Pages
import { Home } from "@/pages/Home";
import { Shop } from "@/pages/Shop";
import { ProductDetail } from "@/pages/ProductDetail";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";

function App() {
  return (
    <div className="App min-h-screen bg-[#FDFBF7]">
      <BrowserRouter>
        <Navbar brandName="Tamara's" />
        
        <main className="pb-safe">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <Footer />
        <BottomNav />
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: '#FDFBF7',
              border: '1px solid #E8E4DE',
              color: '#1A1A1A',
            },
          }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;

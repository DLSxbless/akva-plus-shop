import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const Catalog = lazy(() => import("./pages/Catalog"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const Favorites = lazy(() => import("./pages/Favorites"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Delivery = lazy(() => import("./pages/Delivery"));
const Payment = lazy(() => import("./pages/Payment"));
const Guarantee = lazy(() => import("./pages/Guarantee"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Admin = lazy(() => import("./pages/Admin"));
const Checkout = lazy(() => import("./pages/Checkout"));

function PageFallback() {
  return (
    <div className="min-h-[80vh]">
      <Loader />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-white">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Home />
                </Suspense>
              }
            />

            <Route
              path="/catalog"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Catalog />
                </Suspense>
              }
            />

            <Route
              path="/login"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Login />
                </Suspense>
              }
            />

            <Route
              path="/register"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Register />
                </Suspense>
              }
            />

            <Route
              path="/product/:id"
              element={
                <Suspense fallback={<PageFallback />}>
                  <ProductPage />
                </Suspense>
              }
            />

            <Route
              path="/delivery"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Delivery />
                </Suspense>
              }
            />

            <Route
              path="/payment"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Payment />
                </Suspense>
              }
            />

            <Route
              path="/guarantee"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Guarantee />
                </Suspense>
              }
            />

            <Route
              path="/contacts"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Contacts />
                </Suspense>
              }
            />

            <Route
              path="/checkout"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Checkout />
                </Suspense>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<PageFallback />}>
                    <Profile />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<PageFallback />}>
                    <Favorites />
                  </Suspense>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Suspense fallback={<PageFallback />}>
                    <Admin />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import Layout from "./layout/Layout"
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/Login"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans, { loader as vansLoader } from "./pages/vans/Vans"
import VanDetail, { loader as vanDetailLoader } from "./pages/vans/VanDetail"
import LayoutHost from "./layout/LayoutHost"
import Dashboard, { loader as dashboardLoader } from "./pages/host/Dashboard"
import Income from "./pages/host/Income"
import Reviews from "./pages/host/Reviews"
import HostVans, { loader as hostVansLoader } from "./pages/host/HostVans"
import HostVanDetail, {
  loader as hostVanDetailLoader,
} from "./pages/host/HostVanDetail"
import HostVanInfo from "./pages/host/hostVanDetailSections/HostVanInfo"
import HostVanPricing from "./pages/host/hostVanDetailSections/HostVanPricing"
import HostVanPhotos from "./pages/host/hostVanDetailSections/HostVanPhotos"
import PageNotFound from "./pages/PageNotFound"
import Error from "./components/Error"
import { requireAuth } from "./utils/require-auth"
import "./server"
import TestContext from "./context/TestContext"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
    >
      <Route
        index
        element={<Home />}
      />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route
        path="curso"
        element={<About />}
      />
      <Route
        path="data"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<Error />}
      />
      <Route
        path="data/:name"
        element={<VanDetail />}
        loader={vanDetailLoader}
        errorElement={<Error />}
      />
      <Route
        path="host"
        element={<LayoutHost />}
      >
        {/* Begin protected routes */}
        <Route
          index
          element={<Dashboard />}
          errorElement={<Error />}
          loader={dashboardLoader}
        />
        <Route
          path="income"
          element={<Income />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="host-vans"
          element={<HostVans />}
          loader={hostVansLoader}
          errorElement={<Error />}
        />
        <Route
          path="host-vans/:name"
          element={<HostVanDetail />}
          loader={hostVanDetailLoader}
          errorElement={<Error />}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async ({ request }) => await requireAuth(request)}
          />
        </Route>
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        {/* End protected routes */}
      </Route>
      <Route
        path="*"
        element={<PageNotFound />}
      />
    </Route>
  ),
  { basename: "/vanlife/" }
)

function App() {
  return <>
    <TestContext >
      <RouterProvider router={router} />
    </TestContext>
  </> 
}

export default App

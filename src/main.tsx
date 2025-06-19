import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import App from './App.tsx'
import MainRegistrationScreen from "./pages/registration_screen/main_registration_screen.tsx";
import './index.css'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route index path={"/"} element={<App />}/>
            <Route path={"/registration"} element={<MainRegistrationScreen />}/>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})

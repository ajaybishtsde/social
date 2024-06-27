import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContextProvider from "./context/userContextProvider.tsx";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
    <App />
    </UserContextProvider>
  </QueryClientProvider>
);

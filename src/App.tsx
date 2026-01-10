import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { SnippetProvider } from "@/context/SnippetContext";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import SnippetDetail from "./pages/SnippetDetail";
import NotFound from "./pages/NotFound";
import AllCategories from "./pages/AllCategories"; 

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <SnippetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/categories" element={<AllCategories />} /> 
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/snippet/:id" element={<SnippetDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </SnippetProvider>
  </ThemeProvider>
);

export default App;

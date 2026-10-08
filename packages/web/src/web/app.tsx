import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import Index from "./pages/index";
import Blog from "./pages/blog";
import BlogPost from "./pages/blog-post";
import { Loader } from "./components/brand";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function ScrollManager() {
  const [path] = useLocation();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [path]);
  return null;
}

function App() {
  return (
    <Provider>
      <Loader />
      <ScrollManager />
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route component={Index} />
      </Switch>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;

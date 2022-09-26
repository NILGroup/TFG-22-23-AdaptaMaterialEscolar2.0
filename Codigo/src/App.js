import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/header/header.component';
import EditorPage from './pages/editorpage/editorpage.component'
import HelpPage from './pages/helpPage/helppage.component';
import ContactPage from './pages/contactpage/contactpage.component';
function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header/>
      <main>
        <Switch>
          <Route exact path="/">
              <EditorPage/>
          </Route>
          <Route path="/help">
              <HelpPage/>
          </Route>
          <Route path="/contact">
              <ContactPage/>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;

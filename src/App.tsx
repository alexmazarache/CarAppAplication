import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp,IonTabButton,IonIcon,IonLabel, IonRouterOutlet,IonTabs,IonTabBar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { CarProvider } from './todo/CarProvider';
import { AuthProvider, Login, PrivateRoute } from './auth';
import { CarEdit, CarList } from './todo';
import Home from './pages/Home';
import { ellipse, triangle } from 'ionicons/icons';


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
     
      <IonRouterOutlet>
        <AuthProvider>
          <Route path="/login" component={Login} exact={true}/>
        
          <CarProvider>
            <PrivateRoute path="/posts" component={CarList} exact={true}/>
            <PrivateRoute path="/post" component={CarEdit} exact={true}/>
            <PrivateRoute path="/post/:id" component={CarEdit} exact={true}/>
          </CarProvider>
          
          <Route exact path="/" render={() => <Redirect to="/posts"/>}/>
        </AuthProvider>
      </IonRouterOutlet>
    
    </IonReactRouter>
  </IonApp>
);

export default App;

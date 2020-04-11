import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cutOutline, personCircleOutline, paperPlaneOutline, enterOutline } from 'ionicons/icons';

import Auth from './pages/Auth';
import Tailors from './pages/Tailors';
import AuthOptions from './pages/AuthOptions';
import Profile from './pages/Profile';

import { UserContext } from './providers/UserProvider';
import { signOut } from './firebase';

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
import './theme/theme.css';

const App: React.FC = () => {
	const user = useContext(UserContext);
	console.log(user);
	return (
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Route path="/tailors" exact>
							<Tailors />
						</Route>
						<Route path="/profile" exact>
							<Profile />
						</Route>
						<Route path="/auth/email" exact>
							<Auth />
						</Route>
						<Route path="/auth" exact>
							<AuthOptions />
						</Route>
						<Redirect path="/" to="/tailors" exact />
					</IonRouterOutlet>
					<IonTabBar slot="bottom">
						<IonTabButton tab="tailors" href="/tailors">
							<IonIcon icon={cutOutline} />
							<IonLabel>Tailors</IonLabel>
						</IonTabButton>
						<IonTabButton tab="designs" onClick={signOut}>
							<IonIcon icon={paperPlaneOutline} />
							<IonLabel>Designs</IonLabel>
						</IonTabButton>
						<IonTabButton tab="account" href="/profile">
						<IonIcon icon={personCircleOutline} />
						<IonLabel>Account</IonLabel>
					</IonTabButton>
						{!user && (
							<IonTabButton tab="account" href="/auth">
								<IonIcon icon={enterOutline} />
								<IonLabel>Sign Up</IonLabel>
							</IonTabButton>
						)}
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;

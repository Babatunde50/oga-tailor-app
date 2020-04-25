import React, { useContext } from 'react';
import {
	IonPage,
	IonGrid,
	IonHeader,
	IonContent,
	IonToolbar,
	IonTitle,
	IonRow,
	IonAvatar,
	IonCol,
	IonText,
	IonIcon,
	IonItem,
	IonLabel,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { mail } from 'ionicons/icons';

import { UserContext } from '../providers/UserProvider';
import { signOut } from '../firebase';
import './Profile.css';

console.log(window);

const Profile: React.FC = () => {
	const history = useHistory();
	const user: any = useContext(UserContext);
	console.log(user);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>My Navigation Bar</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonGrid>
					<IonRow>
						<IonCol size="6" offset="4">
							<IonAvatar className="img-tailor">
								<img
									src={user && user.type === 'tailor' ? user.companyLogoURL : user.photoURL}
									alt={user && user.displayName}
								/>
							</IonAvatar>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<h3 className="profile-name">{user && user.type === 'tailor' ? user.companyName : user.displayName}</h3>
							<h4 className="profile-email">
								<IonIcon color="primary" icon={mail} /> {user.email}
							</h4>
						</IonCol>
					</IonRow>
					{user && user.type !== 'tailor' && (
						<IonItem onClick={() => history.push('/tailor-signup')} lines="none">
							<IonLabel>
								<IonText color="primary">
									<p className="profile-tailor__signup"> Become a Tailor </p>
								</IonText>
							</IonLabel>
						</IonItem>
					)}
					<p className="profile-section__title">Measurements</p>
					{user && user.type === 'tailor' && (
						<IonItem href="#" detail>
							<IonLabel> Customer's Measurements</IonLabel>
						</IonItem>
					)}
					<IonItem href="#" detail>
						<IonLabel> Your Measurement </IonLabel>
					</IonItem>
					<p className="profile-section__title">Account Settings</p>
					<IonItem href="#" detail>
						<IonLabel> Account security </IonLabel>
					</IonItem>
					<IonItem href="#" detail>
						<IonLabel> Email Notification preferences </IonLabel>
					</IonItem>
					<p className="profile-section__title">Support</p>
					<IonItem href="#" detail>
						<IonLabel> About ogaTailor </IonLabel>
					</IonItem>
					<IonItem href="#" detail>
						<IonLabel> Frequently asked question </IonLabel>
					</IonItem>
					<IonItem href="#" detail>
						<IonLabel> Share the ogaTailor app </IonLabel>
					</IonItem>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary" onClick={signOut}>
								<p className="profile__signout">Sign out</p>
							</IonText>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Profile;

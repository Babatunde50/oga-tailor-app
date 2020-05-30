import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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

const Profile: React.FC = () => {
	const history = useHistory();
	const user: any = useContext(UserContext);
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
									src={user.d && user.d.type === 'tailor' ? user.d.companyLogoURL : user.d.photoURL}
									alt={user.d && user.d.displayName}
								/>
							</IonAvatar>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<h3 className="profile-name">
								{user.d && user.d.type === 'tailor' ? user.d.companyName : user.d.displayName}
							</h3>
							<h4 className="profile-email">
								<IonIcon color="primary" icon={mail} /> {user.d.email}
							</h4>
						</IonCol>
					</IonRow>
					{user.d && user.d.type !== 'tailor' && (
						<IonItem onClick={() => history.push('/tailor-signup')} lines="none">
							<IonLabel>
								<IonText color="primary">
									<p className="profile-tailor__signup"> Become a Tailor </p>
								</IonText>
							</IonLabel>
						</IonItem>
					)}
					<p className="profile-section__title">Measurements</p>
					<IonItem detail>
						<Link to="profile/new-measurement/new" className="profile__links">
							<IonLabel> Take New Measurement </IonLabel>
						</Link>
					</IonItem>
					{
						user.d && user.d.type !== 'tailor' && (
							<IonItem detail>
								<Link to="profile/your-measurement" className="profile__links">
									<IonLabel> Your Measurement </IonLabel>
								</Link>
							</IonItem>
						)
					}
					{user.d && user.d.type === 'tailor' && (
						<IonItem detail>
							<Link to="profile/customers-measurements" className="profile__links">
								<IonLabel> Customer's Measurements</IonLabel>
							</Link>
						</IonItem>
					)}
					<p className="profile-section__title">Account Settings</p>
					<IonItem detail>
						<Link to="profile/security" className="profile__links">
							<IonLabel> Account security </IonLabel>
						</Link>
					</IonItem>
					<IonItem detail>
						<Link to="profile/emails" className="profile__links">
							<IonLabel> Email Notification preferences </IonLabel>
						</Link>
					</IonItem>
					<p className="profile-section__title">Support</p>
					<IonItem detail>
						<Link to="about" className="profile__links">
							<IonLabel> About ogaTailor </IonLabel>
						</Link>
					</IonItem>
					<IonItem detail>
						<Link to="frequent-questions" className="profile__links">
							<IonLabel> Frequently asked question </IonLabel>
						</Link>
					</IonItem>
					<IonItem detail>
						<Link to="share" className="profile__links">
							<IonLabel> Share the ogaTailor app </IonLabel>
						</Link>
					</IonItem>
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

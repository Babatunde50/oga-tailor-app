import React from 'react';
import {
	IonApp,
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
} from '@ionic/react';
import { mail } from 'ionicons/icons';

const Profile: React.FC = () => {
	return (
		<IonApp>
			<IonHeader>
				<IonToolbar>
					<IonTitle slot="start">My Navigation Bar</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonGrid>
					<IonRow>
						<IonCol size="6" offset="3">
							<IonAvatar>
								<img
									src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
									alt="baba"
								/>
							</IonAvatar>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<h3 style={{ textAlign: 'center', marginBottom: 0, marginTop: '.3rem' }}>Babatunde Ololade</h3>
							<h4 style={{ textAlign: 'center', marginTop: '.2rem' }}>
								{' '}
								<IonIcon color="primary" icon={mail} /> babatundeoladele@dele.com{' '}
							</h4>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonText color="primary">
								<p style={{ textAlign: 'center', fontWeight: 'bold' }}>Become a Tailor</p>
							</IonText>
						</IonCol>
					</IonRow>
					<IonRow></IonRow>
				</IonGrid>
			</IonContent>
		</IonApp>
	);
};

export default Profile;

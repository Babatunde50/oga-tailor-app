import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	IonPage,
	IonItem,
	IonInput,
	IonText,
	IonContent,
	IonLabel,
	IonGrid,
	IonRow,
	IonCol,
	IonButton,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonHeader,
	IonAlert,
	IonSpinner,
} from '@ionic/react';

import { auth, createUserProfileDocument } from '../firebase';

interface FormData {
	email: string;
	password: string;
	name: string;
}

const Auth: React.FC = () => {
	const [data, setData] = useState<FormData>({ email: '', password: '', name: '' });
	const [showErrorAlert, setShowErrorAlert] = useState(false);
	const [errorMessage, setErrorMessage] = useState();
	const [showLoading, setShowLoading] = useState(false);
	const history = useHistory();
	const submitDataHandler = async (event: any) => {
		event.preventDefault();
		const { email, password, name: displayName } = data;
		if (displayName.length <= 6) {
			return console.log('Too short');
		}
		setShowLoading(true);
		try {
			const { user } = await auth.createUserWithEmailAndPassword(email, password);
			if (user) {
				setShowLoading(false);
			}
			createUserProfileDocument(user, { displayName });
			history.replace('/profile');
		} catch (err) {
			setErrorMessage(err.message);
			setShowLoading(false);
			setShowErrorAlert(true);
		}
		setData({ email: '', password: '', name: '' });
	};
	const dataHandler = (event: any) => {
		const { name, value } = event.target;
		setData({ ...data, [name]: value });
	};
	return (
		<IonPage>
			<IonAlert
				isOpen={showErrorAlert}
				onDidDismiss={() => setShowErrorAlert(false)}
				header={'Authenticated Failed'}
				message={errorMessage}
				buttons={['OK']}
			/>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton color="light" defaultHref="/auth" />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent color="primary">
				<IonGrid>
					<form onSubmit={submitDataHandler}>
						<IonRow>
							<IonCol sizeMd="6" offsetMd="3">
								<h2 style={{ textAlign: 'center', padding: '1rem' }}> Create an account </h2>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol sizeMd="6" offsetMd="3">
								<IonItem color="primary">
									<IonLabel position="floating">Name</IonLabel>
									<IonInput name="name" onIonChange={dataHandler} minlength={6} />
								</IonItem>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol sizeMd="6" offsetMd="3">
								<IonItem color="primary">
									<IonLabel position="floating"> Email </IonLabel>
									<IonInput type="email" name="email" onIonChange={dataHandler} />
								</IonItem>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol sizeMd="6" offsetMd="3">
								<IonItem color="primary">
									<IonLabel position="floating"> Password(6+ characters) </IonLabel>
									<IonInput type="password" name="password" onIonChange={dataHandler} minlength={6} />
								</IonItem>
							</IonCol>
						</IonRow>
						<IonRow>
							<div style={{ marginTop: '1rem' }}></div>
							<IonCol sizeMd="3" offsetMd="3">
								<IonText>
									{' '}
									Have an account? <br /> Sign in{' '}
								</IonText>
							</IonCol>
							<IonCol sizeMd="3" offsetMd="auto">
								<IonButton color="light" expand="full" type="submit">
									<span style={{ textTransform: 'none' }}>
										{' '}
										Create account {showLoading && <IonSpinner color="primary" name="crescent" />}{' '}
									</span>
								</IonButton>
							</IonCol>
						</IonRow>
					</form>
					<IonRow>
						<IonCol sizeMd="6" offsetMd="3">
							<IonText>By clicking on "Create account" you agree to our Terms of Use and Privacy Policy</IonText>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Auth;

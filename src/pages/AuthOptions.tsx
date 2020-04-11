import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonSpinner, IonAlert } from '@ionic/react';
import { mail, logoGoogle, logoFacebook } from 'ionicons/icons';
import { isPlatform } from '@ionic/react';
import { cfaSignIn } from 'capacitor-firebase-auth';

import { User } from 'firebase/app';

import { signInWithFacebook, signInWithGoogle } from '../firebase';

import '../theme/auth.css';

const AuthOptions: React.FC = () => {
	const [isSignUp, setIsSignUp] = useState(true);
	const [showLoadingGG, setShowLoadingGG] = useState(false);
	const [showLoadingFB, setShowLoadingFB] = useState(false);
	const [showErrorAlert, setShowErrorAlert] = useState(false);
	const [errorMessage, setErrorMessage] = useState();
	const history = useHistory();
	const signInWithGg = async () => {
		setShowLoadingGG(true);
		if (isPlatform('android')) {
			console.log(isPlatform('android'));
			cfaSignIn('google.com').subscribe((user: User) => console.log(user));
		} else {
			let user;
			try {
				user = await signInWithGoogle();
				if (user) {
					setShowLoadingGG(false);
					history.replace('/profile');
				}
			} catch (err) {
				setErrorMessage(err.message);
				setShowLoadingGG(false);
				setShowErrorAlert(true);
			}
		}
	};
	const signInWithFB = async () => {
		if (isPlatform('android')) {
			cfaSignIn('facebook.com').subscribe((user: User) => console.log(user));
		} else {
			let user;
			try {
				user = await signInWithFacebook();
				if (user) {
					setShowLoadingFB(false);
					history.replace('/profile');
				}
			} catch (err) {
				setErrorMessage(err.message);
				setShowLoadingFB(false);
				setShowErrorAlert(true);
			}
		}
	};
	return (
		<IonPage>
			<IonContent color="primary">
				<IonAlert
					isOpen={showErrorAlert}
					onDidDismiss={() => setShowErrorAlert(false)}
					header={'Authenticated Failed'}
					message={errorMessage}
					buttons={['OK']}
				/>
				<IonGrid>
					<IonRow>
						<IonCol sizeMd="6" offsetMd="3">
							<h2 style={{ textAlign: 'center', padding: '2.5rem' }}> {isSignUp ? 'Create an account' : 'Sign in'} </h2>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol sizeMd="6" offsetMd="3">
							<IonButton color="light" size="large" expand="block" routerLink="/auth/email">
								<IonIcon color="danger" icon={mail} /> &nbsp;&nbsp;{' '}
								<span style={{ textTransform: 'none' }}> {`Sign ${isSignUp ? 'up' : 'in'} with email`} </span>
							</IonButton>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol sizeMd="6" offsetMd="3">
							<p style={{ textAlign: 'center', padding: '2rem' }}> or </p>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol sizeMd="6" offsetMd="3">
							<IonButton onClick={signInWithGg} color="light" size="large" expand="block">
								<IonIcon color="danger" icon={logoGoogle} /> &nbsp;&nbsp;{' '}
								{showLoadingGG ? (
									<IonSpinner name="crescent" color="primary" />
								) : (
									<span style={{ textTransform: 'none' }}>{`Sign ${isSignUp ? 'up' : 'in'} with Google`} </span>
								)}
							</IonButton>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol sizeMd="6" offsetMd="3">
							<IonButton onClick={signInWithFB} color="light" size="large" expand="block">
								<IonIcon color="tertiary" icon={logoFacebook} /> &nbsp;&nbsp;{' '}
								{showLoadingFB ? (
									<IonSpinner name="crescent" color="primary" />
								) : (
									<span style={{ textTransform: 'none' }}>{`Sign ${isSignUp ? 'up' : 'in'} with Facebook`} </span>
								)}
							</IonButton>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol sizeMd="6" offsetMd="3">
							<p
								onClick={() => setIsSignUp((initial) => !initial)}
								style={{ textAlign: 'center', marginTop: '3rem', cursor: 'pointer' }}
							>
								{' '}
								{!isSignUp ? 'New here? Create an account' : 'Have an account? Sign in'}{' '}
							</p>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default AuthOptions;

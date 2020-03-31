import React from 'react';
import {
	IonApp,
	IonHeader,
	IonItem,
	IonInput,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonContent,
	IonLabel,
	IonGrid,
	IonRow,
	IonCol,
    IonButton,
} from '@ionic/react';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

const Auth: React.FC = () => {
    const getCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
        console.log('Current', coordinates);
      }

	return (
		<IonApp>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/auth" />
					</IonButtons>
					<IonTitle className="ion-text-center"> Sign Up </IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonGrid className="absolute-center">
					<IonRow>
						<IonCol sizeMd="6" offsetMd="3">
							<IonItem>
								<IonLabel position="floating">Brand Name</IonLabel>
								<IonInput />
							</IonItem>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol sizeMd="6" offsetMd="3">
							<IonItem>
								<IonLabel position="floating"> Location </IonLabel>
								<IonInput />
							</IonItem>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol sizeMd="6" offsetMd="3">
							<IonItem>
								<IonLabel position="floating"> Email Address </IonLabel>
								<IonInput />
							</IonItem>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol sizeMd="6" offsetMd="3">
							<IonItem>
								<IonLabel position="floating">Password</IonLabel>
								<IonInput />
							</IonItem>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol sizeMd="6" offsetMd="3">
							<IonItem>
								<IonLabel position="floating">Confirm Password</IonLabel>
								<IonInput />
							</IonItem>
						</IonCol>
					</IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton onClick={getCurrentPosition}>Get Location</IonButton>
                        </IonCol>
                    </IonRow>
				</IonGrid>
			</IonContent>
		</IonApp>
	);
};

export default Auth;

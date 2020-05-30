import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonContent,
	IonGrid,
	IonButton,
	IonItem,
	IonLabel,
	IonInput,
} from '@ionic/react';

import { firestore } from '../firebase';
import { UserContext } from '../providers/UserProvider';

const inputsName = [
	'bust',
	'waist',
	'hips',
	'back width',
	'chest',
	'shoulder',
	'neck size',
	'dart',
	'top arm',
	'wrist',
	'ankle',
	'high ankle',
	'nape to waist',
	'front to shoulder waist',
	'armhole depth',
	'waist to knee',
	'waist to hip',
	'waist to floor',
	'body rise',
	'sleeve length',
	'sleeve length (jersey)',
	'Extra mesurements',
	'cuff size',
	'trouser bottom width',
	'jeans bottom width',
];

const pageState = {
	bust: '',
	waist: '',
	hips: '',
	'back width': '',
	chest: '',
	shoulder: '',
	'neck size': '',
	dart: '',
	'top arm': '',
	wrist: '',
	ankle: '',
	'high ankle': '',
	'nape to waist': '',
	'front to shoulder waist': '',
	'armhole depth': '',
	'waist to knee': '',
	'waist to hip': '',
	'waist to floor': '',
	'body rise': '',
	'sleeve length': '',
	'sleeve length (jersey)': '',
	'Extra mesurements': '',
	'cuff size': '',
	'trouser bottom width': '',
	'jeans bottom width': '',
	name: '',
};

const NewMeasurement: React.FC = () => {
	const [formState, setFormState] = useState(pageState);
	const [isLoading, setIsLoading] = useState(false);
	const [measurement, setMeasurement] = useState({});
	const history = useHistory();
	const { type } = useParams();
	const user = useContext(UserContext) as any;

	const fetchMeasurementHandler = async () => {
		setIsLoading(true);
		const fetchedMeasurements: any = [];
		try {
			const querySnapshot = await firestore.collection('measurements').where('tailorId', '==', user.uid).get();
			querySnapshot.forEach(function (doc) {
				fetchedMeasurements.push({ id: doc.id, ...doc.data() });
			});
			setMeasurement(fetchedMeasurements);
			setIsLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const submitMeasurementHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await firestore.collection('measurements').add({
			...formState,
			tailorId: user.uid,
		});
		history.goBack();
	};

	const changeInputHandler = (event: any) => {
		const { name, value } = event.target;
		setFormState((inputValues) => ({ ...inputValues, [name]: value }));
	};
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/profile" />
					</IonButtons>
					<IonTitle>New Measurement</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonGrid>
					<form onSubmit={submitMeasurementHandler}>
						<IonItem>
							<IonLabel>Customers Name</IonLabel>
							<IonInput required={true} onIonChange={changeInputHandler} name="name" />
						</IonItem>
						{inputsName.map((input) => (
							<IonItem key={input}>
								<IonLabel> {input} </IonLabel>
								<IonInput type="number" inputMode="numeric" name={input} onIonChange={changeInputHandler} />
							</IonItem>
						))}
						<br />
						<IonButton color="primary" type="submit" expand="block">
							{' '}
							Submit{' '}
						</IonButton>
					</form>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default NewMeasurement;

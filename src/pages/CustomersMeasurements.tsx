import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonContent,
	IonList,
	IonItem,
	IonLabel,
	IonSpinner,
} from '@ionic/react';

import { UserContext } from '../providers/UserProvider';
import { firestore } from '../firebase';

const CustomersMeasurements: React.FC = () => {
	const user = useContext(UserContext) as any;
	const [measurements, setMeasurements] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchMeasurementsHandler = async () => {
		setIsLoading(true);
		const fetchedMeasurements: any = [];
		try {
			const querySnapshot = await firestore.collection('measurements').where('tailorId', '==', user.uid).get();
			querySnapshot.forEach(function (doc) {
				fetchedMeasurements.push({ id: doc.id, ...doc.data() });
			});
			setMeasurements(fetchedMeasurements);
			setIsLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchMeasurementsHandler();
	}, []);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/profile" />
					</IonButtons>
					<IonTitle> Customer's Measurements </IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{isLoading ? (
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<IonSpinner color="primary" name="crescent" />
					</div>
				) : (
					<IonList>
						{measurements.length === 0 ? (
							<p> Your Measurements list is empty </p>
						) : (
							measurements.map((measurement: any) => (
								<IonItem detail>
                                    <Link to={`new-measurement/edit-${measurement.id}`} className="profile__links">
                                        <IonLabel> { measurement.name} </IonLabel>
                                    </Link>
								</IonItem>
							))
						)}  
					</IonList>
				)}
			</IonContent>
		</IonPage>
	);
};

export default CustomersMeasurements;

import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { IonRow, IonCol, IonSpinner } from '@ionic/react';

const Designs: React.FC<{ userId: string }> = ({ userId }) => {
	const designRef = firestore.collection('designs');
	const [designs, setDesigns] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		designRef
			.where('d.userId', '==', userId)
			.get()
			.then(function (querySnapshot) {
				let designs: any = [];
				querySnapshot.forEach(function (doc) {
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.id, ' => ', doc.data());
					designs.push({
						id: doc.id,
						...doc.data().d,
					});
				});
				setIsLoading(false);
				setDesigns(designs);
			})
			.catch(function (error) {
				setDesigns(designs);
				console.log('Error getting documents: ', error);
			});
	}, []);
	if (isLoading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<IonSpinner name="crescent" />
			</div>
		);
	}
	return (
		<IonRow>
			{designs.map((design: any) => (
                <>
				<IonCol key={design.id} size="4">
					<h1> {design.story} </h1>
				</IonCol>
				<IonCol key={design.id} size="4">
					<h1> {design.story} </h1>
				</IonCol>
				<IonCol key={design.id} size="4">
					<h1> {design.story} </h1>
				</IonCol>
				<IonCol key={design.id} size="4">
					<h1> {design.story} </h1>
				</IonCol>
                </>
			))}
		</IonRow>
	);
};

export default Designs;

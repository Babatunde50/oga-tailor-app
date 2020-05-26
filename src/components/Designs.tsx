import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { IonRow, IonCol, IonSpinner, IonIcon } from '@ionic/react';
import { chatbubbleOutline, heartOutline, eyeOutline } from 'ionicons/icons';

import './Designs.css';

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
				<IonCol key={design.id} size="4">
					<div
						className="design-post"
						style={{ background: `url(${design.imageURL})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
					>
						<IonRow className="overlay">
							<IonCol class="col">
								<div>
									<IonIcon icon={eyeOutline} role="img" />
									192
								</div>
								<div>
									<IonIcon icon={heartOutline} />4
								</div>
								<div>
									<IonIcon icon={chatbubbleOutline} />0
								</div>
							</IonCol>
						</IonRow>
					</div>
				</IonCol>
			))}
		</IonRow>
	);
};

export default Designs;

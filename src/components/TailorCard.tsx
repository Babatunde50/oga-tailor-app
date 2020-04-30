import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	IonCol,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonIcon,
	IonCardContent,
	IonChip,
	IonLabel,
} from '@ionic/react';
import { star, call, mail, helpCircleOutline } from 'ionicons/icons';

import getCurrentPosition from '../utils/getCurrentPosition';
import getDistanceDiff from '../utils/distance';
import './TailorCard.css';

const TailorCard: React.FC = (props: any) => {
	const [distance, setDistance] = useState<number | null>(null);

	const distanceDiff = async () => {
		const coords = [props.coordinates.V, props.coordinates.U];
		const curCoords = await getCurrentPosition();
		const disDiff: number = getDistanceDiff([curCoords.lat, curCoords.lng], coords);
		setDistance(disDiff);
	};

	useEffect(() => {
		distanceDiff();
	}, []);

	return (
		<IonCol size-md="6" offset-md="3">
			<IonCard>
				<img alt="tailor" src={props.companyLogoURL} />
				<IonCardHeader>
					<IonCardTitle> {props.displayName} </IonCardTitle>
					<IonCardSubtitle>
						<IonIcon color="warning" icon={star} />
						<IonIcon color="warning" icon={star} />
						<IonIcon color="warning" icon={star} />
						<IonIcon color="warning" icon={star} />
					</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent>
					<p className="distance"> {distance ? `${distance.toFixed(2)} miles away` : 'distance loading...'} </p>
					<IonChip>
						<IonLabel> Call </IonLabel>
						<IonIcon color="primary" icon={call} />
					</IonChip>
					<IonChip>
						<IonLabel> Mail </IonLabel> <IonIcon color="danger" icon={mail} />
					</IonChip>
					<IonChip>
						<Link to={`tailors/${props.id}`}>
							<IonLabel>More Info</IonLabel>
							<IonIcon color="warning" icon={helpCircleOutline} />
						</Link>
					</IonChip>
				</IonCardContent>
			</IonCard>
		</IonCol>
	);
};

export default TailorCard;
